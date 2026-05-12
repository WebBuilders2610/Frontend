<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useHealthProfilesStore } from '../../application/health-profiles.store.js';
import { NeonatalProfile } from '../../domain/model/neonatal-profile.entity.js';

const route = useRoute();
const router = useRouter();
const store = useHealthProfilesStore();

const isEdit = computed(() => !!route.params.id);
const form = ref({
  firstName: '',
  lastName: '',
  birthDate: '', // Se usa para la edad
  weight: null,
  height: null,
  birthType: '',
  bloodType: ''
});

onMounted(() => {
  if (isEdit.value) {
    const baby = store.getBabyById(route.params.id);
    if (baby) {
      form.value = { ...baby };
    }
  }
});

const handleSave = () => {
  const babyData = new NeonatalProfile({
    id: isEdit.value ? route.params.id : null,
    ...form.value
  });

  if (isEdit.value) {
    store.updateNeonatalProfile(babyData);
  } else {
    store.addNeonatalProfile(babyData);
  }
  router.push({ name: 'dashboard' });
};
</script>

<template>
  <div class="p-4 flex flex-column align-items-center">
    <div class="w-full md:w-8 lg:w-6">
      <h1 class="text-3xl font-bold mb-4">{{ isEdit ? 'Datos Personales' : 'Agregar Bebe' }}</h1>

      <div class="flex flex-column gap-3">
        <div class="field">
          <label for="name" class="block mb-1 font-semibold">Nombre</label>
          <pv-input-text id="name" v-model="form.firstName" class="w-full border-round-sm" />
        </div>

        <div class="field">
          <label for="lastname" class="block mb-1 font-semibold">Apellidos</label>
          <pv-input-text id="lastname" v-model="form.lastName" class="w-full border-round-sm" />
        </div>

        <div class="field">
          <label for="age" class="block mb-1 font-semibold">Edad</label>
          <pv-input-text id="age" v-model="form.birthDate" class="w-full border-round-sm" placeholder="Ej: 3 meses" />
        </div>

        <div class="field">
          <label for="weight" class="block mb-1 font-semibold">Peso</label>
          <pv-input-text id="weight" v-model="form.weight" class="w-full border-round-sm" placeholder="Ej: 3 kg" />
        </div>

        <div class="field">
          <label for="height" class="block mb-1 font-semibold">Talla</label>
          <pv-input-text id="height" v-model="form.height" class="w-full border-round-sm" placeholder="Ej: 50 cm" />
        </div>

        <div class="field">
          <label for="birthType" class="block mb-1 font-semibold">Tipo de Parto</label>
          <pv-input-text id="birthType" v-model="form.birthType" class="w-full border-round-sm" />
        </div>

        <div class="field">
          <label for="bloodType" class="block mb-1 font-semibold">Grupo Sanguineo</label>
          <pv-input-text id="bloodType" v-model="form.bloodType" class="w-full border-round-sm" />
        </div>

        <div class="flex gap-3 mt-4">
          <pv-button v-if="isEdit" label="Editar" class="flex-1 p-button-info border-none" style="background-color: #3B82F6;" />
          <pv-button label="Guardar" @click="handleSave" class="flex-1 p-button-info border-none" style="background-color: #3B82F6;" />
        </div>
      </div>
    </div>
  </div>
</template>