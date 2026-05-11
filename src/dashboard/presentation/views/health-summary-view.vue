<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useDashboardStore } from '../../application/dashboard.store.js';

const route = useRoute();
const store = useDashboardStore();

onMounted(() => {
  const babyId = route.params.babyId;
  if (babyId) {
    store.fetchHealthSummary(babyId);
  }
});
</script>

<template>
  <div class="p-4 md:p-6 lg:p-8 w-full max-w-screen-xl mx-auto">
    <h1 class="text-3xl font-bold mb-4 text-900">Resumen de Salud Neonatal</h1>

    <div v-if="store.isLoading" class="flex justify-content-center p-5">
      <i class="pi pi-spin pi-spinner text-4xl text-primary"></i>
    </div>

    <div v-else-if="store.error" class="p-4 bg-red-50 text-red-600 border-round">
      <i class="pi pi-exclamation-circle mr-2"></i> {{ store.error }}
    </div>

    <div v-else-if="store.healthSummary" class="grid">
      <div class="col-12 md:col-4">
        <div class="surface-card p-4 border-round shadow-2 border-top-3 border-orange-500">
          <div class="text-500 font-medium mb-3">Temperatura Promedio</div>
          <div class="text-4xl font-bold" 
               :class="store.healthSummary.isTemperatureNormal() ? 'text-green-500' : 'text-orange-500'">
            {{ store.healthSummary.averageTemperature }} °C
          </div>
        </div>
      </div>

      <div class="col-12 md:col-4">
        <div class="surface-card p-4 border-round shadow-2 border-top-3 border-blue-500">
          <div class="text-500 font-medium mb-3">Saturación O2</div>
          <div class="text-4xl font-bold text-blue-500">
            {{ store.healthSummary.averageOxygen }}%
          </div>
        </div>
      </div>

      <div class="col-12 md:col-4">
        <div class="surface-card p-4 border-round shadow-2 border-top-3"
             :class="store.healthSummary.hasCriticalAlerts() ? 'border-red-500 bg-red-50' : 'border-gray-500'">
          <div class="text-500 font-medium mb-3">Alertas Críticas</div>
          <div class="text-4xl font-bold" 
               :class="store.healthSummary.hasCriticalAlerts() ? 'text-red-500' : 'text-700'">
            {{ store.healthSummary.alertsCount }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>