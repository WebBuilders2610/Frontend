<script setup>
import { ref } from 'vue';
import { useHealthProfilesStore } from '../../application/health-profiles.store.js';

const store = useHealthProfilesStore();

const parentForm = ref({
  name: store.currentParent?.fullName || '',
  email: store.currentParent?.email || '',
  password: ''
});

const notifications = ref({
  heartRate: false,
  temperature: false,
  saturation: false,
  channel: 'Email'
});

const saveChanges = () => {
  // Lógica para actualizar perfil del padre
  console.log("Datos guardados", parentForm.value, notifications.value);
};
</script>

<template>
  <div class="p-6 flex flex-column align-items-center gap-5" style="background-color: #f8fafc; min-height: 100vh;">

    <div class="p-4 border-round-sm shadow-1 w-full md:w-5" style="background-color: #C6F6D5;">
      <h2 class="text-2xl mb-4 mt-0">Perfil</h2>
      <div class="flex flex-column gap-3">
        <pv-input-text v-model="parentForm.name" placeholder="Nombre" class="w-full border-none p-3" />
        <pv-input-text v-model="parentForm.email" placeholder="Email" class="w-full border-none p-3" />
        <pv-input-text v-model="parentForm.password" type="password" placeholder="Contraseña" class="w-full border-none p-3" />
        <pv-button label="Guardar Cambios" @click="saveChanges" class="w-full border-none p-3 font-bold" style="background-color: #3B82F6;" />
      </div>
    </div>

    <div class="p-4 border-round-sm shadow-1 w-full md:w-5" style="background-color: #C6F6D5;">
      <h2 class="text-2xl mb-4 mt-0">Notificaciones</h2>
      <div class="flex flex-column gap-4">
        <div class="flex align-items-center gap-3">
          <pv-checkbox v-model="notifications.heartRate" :binary="true" />
          <label>Frecuencia Cardiaca alta</label>
        </div>
        <div class="flex align-items-center gap-3">
          <pv-checkbox v-model="notifications.temperature" :binary="true" />
          <label>Temperatura alta</label>
        </div>
        <div class="flex align-items-center gap-3">
          <pv-checkbox v-model="notifications.saturation" :binary="true" />
          <label>Saturacion baja</label>
        </div>

        <div class="border-top-1 border-400 pt-3 flex align-items-center gap-4">
          <span class="font-bold">Canal:</span>
          <div class="flex align-items-center gap-2">
            <pv-radio-button v-model="notifications.channel" value="Email" />
            <label>Email</label>
          </div>
          <div class="flex align-items-center gap-2">
            <pv-radio-button v-model="notifications.channel" value="App" />
            <label>App</label>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>

:deep(.p-inputtext) {
  border-radius: 0;
}
</style>