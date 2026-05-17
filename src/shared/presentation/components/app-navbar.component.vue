<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useIamStore } from '../../../iam/application/iam.store.js';

import Toolbar from 'primevue/toolbar';
import Button from 'primevue/button';
import SelectButton from 'primevue/selectbutton';

const { t, locale } = useI18n();
const router = useRouter();
const iamStore = useIamStore();

const languages = ref([
  { label: 'EN', value: 'en' },
  { label: 'ES', value: 'es' }
]);

const onLogout = () => {
  iamStore.logout();
  router.push('/sign-in');
};
</script>
<template>
  <Toolbar v-if="iamStore.isAuthenticated" class="bg-white border-none shadow-2 border-noround mb-5 px-5 py-3">
    
    <template #start>
      <div class="flex align-items-center gap-2" style="color: #4A7FF0;">
        <i class="pi pi-shield text-3xl"></i>
        <span class="font-bold text-2xl tracking-wide text-900">SIRAN</span>
      </div>
    </template>

    <template #center>
      <div class="flex gap-5">
        <router-link to="/dashboard" class="text-800 no-underline font-semibold hover:text-blue-500 transition-colors">
          {{ t('shared.navbar.dashboard') }}
        </router-link>
        <router-link to="/care-plans" class="text-800 no-underline font-semibold hover:text-blue-500 transition-colors">
          {{ t('shared.navbar.care-plans') }}
        </router-link>
      </div>
    </template>

    <template #end>
      <div class="flex align-items-center gap-4">
        
        <SelectButton 
          v-model="locale" 
          :options="languages" 
          optionLabel="label" 
          optionValue="value" 
          :allowEmpty="false"
          class="p-button-sm"
        />
        
        <div class="flex align-items-center gap-2 text-800">
          <i class="pi pi-user text-xl" style="color: #4A7FF0;"></i>
          <span class="font-semibold">{{ iamStore.currentUser?.fullName || 'Usuario' }}</span>
        </div>

        <Button 
          icon="pi pi-sign-out" 
          severity="danger" 
          text 
          rounded 
          v-tooltip.bottom="t('shared.navbar.logout')"
          @click="onLogout" 
        />
      </div>
    </template>

  </Toolbar>
</template>