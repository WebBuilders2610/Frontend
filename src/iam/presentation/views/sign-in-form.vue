<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useIamStore } from '../../application/iam.store.js';
import { useI18n } from 'vue-i18n';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';
import Message from 'primevue/message';
import SelectButton from 'primevue/selectbutton';

const email = ref('');
const password = ref('');
const store = useIamStore();
const router = useRouter();
const { t, locale } = useI18n();

const languages = ref([
  { label: 'EN', value: 'en' },
  { label: 'ES', value: 'es' }
]);

const onSignIn = async () => {
  try {
    await store.signIn(email.value, password.value);
    router.push('/dashboard');
  } catch (error) {
    console.error("Fallo el login:", error);
  }
};
</script>

<template>
  <div class="flex align-items-center justify-content-center min-h-screen surface-ground relative">

    <div class="absolute top-0 right-0 p-4">
      <SelectButton 
        v-model="locale" 
        :options="languages" 
        optionLabel="label" 
        optionValue="value" 
        :allowEmpty="false"
      />
    </div>

    <div class="w-full sm:w-8 md:w-6 lg:w-4 xl:w-3">

      <div class="text-center mb-5">
        <i class="pi pi-shield text-primary text-4xl mb-3 block"></i>
        <h1 class="text-900 text-2xl font-bold mb-2 mt-0">{{ t('iam.sign-in.title') }}</h1>
        <p class="text-500 m-0">{{ t('iam.sign-in.welcome') }}</p>
      </div>

      <form @submit.prevent="onSignIn" class="flex flex-column gap-4">

        <Message v-if="store.error" severity="error" :closable="false">
          {{ store.error }}
        </Message>

        <div class="flex flex-column gap-2">
          <label for="email" class="text-900 font-medium">{{ t('iam.sign-in.email') }}</label>
          <InputText
            id="email"
            v-model="email"
            type="email"
            :placeholder="t('iam.sign-in.email-example')" 
            class="w-full"
            required
          />
        </div>

        <div class="flex flex-column gap-2">
          <label for="password" class="text-900 font-medium">{{ t('iam.sign-in.password') }}</label>
          <Password
            id="password"
            placeholder="••••••••"
            v-model="password"
            :feedback="false"
            toggleMask
            inputClass="w-full"
            class="w-full"
            required
          />
        </div>

        <Button
          type="submit"
          :label="t('iam.sign-in.submit')"
          :loading="store.isLoading"
          class="w-full mt-2"
        />

        <div class="text-center mt-3 text-sm text-600">
          {{ t('iam.sign-in.no-account') }}
          <router-link to="/sign-up" class="font-bold text-primary no-underline">
            {{ t('iam.sign-in.register') }}
          </router-link>
        </div>

      </form>
    </div>
  </div>
</template>