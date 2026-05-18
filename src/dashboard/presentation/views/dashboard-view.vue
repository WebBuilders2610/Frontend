<script setup>
import { onMounted } from 'vue';
import { useDashboardStore } from '../../application/dashboard.store.js';

// Componentes de PrimeVue
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Card from 'primevue/card';
import Tag from 'primevue/tag';
import ProgressSpinner from 'primevue/progressspinner';

const dashboardStore = useDashboardStore();

// Cargar los datos al montar la vista
onMounted(() => {
  dashboardStore.fetchSummaries();
});

// Manejar la selección de un bebé en la tabla
const onRowSelect = (event) => {
  dashboardStore.selectNeonate(event.data.id);
};

// Utilidad para los colores del estado (Tag)
const getSeverity = (status) => {
  switch (status?.toLowerCase()) {
    case 'normal': return 'success';
    case 'alerta': return 'danger';
    default: return 'info';
  }
};
</script>

<template>
  <div class="p-4">
    <h1 class="text-3xl font-bold mb-4">Dashboard Neonatal</h1>

    <div v-if="dashboardStore.loading" class="flex justify-content-center my-5">
      <ProgressSpinner />
    </div>

    <div v-else>
      <div class="surface-card p-4 shadow-2 border-round mb-5">
        <h2 class="text-xl mb-3">Lista de Bebés</h2>
        
        <DataTable 
          :value="dashboardStore.summaries" 
          selectionMode="single" 
          @rowSelect="onRowSelect" 
          dataKey="id"
          responsiveLayout="scroll"
          class="p-datatable-sm"
        >
          <Column field="neonateName" header="Nombre" sortable></Column>
          <Column field="age" header="Edad"></Column>
          <Column header="Estado">
            <template #body="{ data }">
              <Tag :value="data.status" :severity="getSeverity(data.status)" />
            </template>
          </Column>
          <Column field="weight" header="Peso"></Column>
          <Column field="lastUpdate" header="Última Actualización"></Column>
        </DataTable>
      </div>

      <div v-if="dashboardStore.selectedNeonate" class="surface-card p-4 shadow-2 border-round">
        <h2 class="text-xl mb-4">
          Detalles de Signos Vitales: <span class="text-primary">{{ dashboardStore.selectedNeonate.neonateName }}</span>
        </h2>
        
        <div class="grid">
          <div class="col-12 md:col-6 lg:col-3">
            <Card class="h-full border-1 surface-border">
              <template #title>
                <div class="flex align-items-center gap-2 text-sm text-500">
                  <i class="pi pi-heart text-red-500"></i> Frec. Cardíaca
                </div>
              </template>
              <template #content>
                <span class="text-2xl font-bold">{{ dashboardStore.selectedNeonate.heartRate }}</span>
                <span class="text-500 ml-2">bpm</span>
              </template>
            </Card>
          </div>

          <div class="col-12 md:col-6 lg:col-3">
            <Card class="h-full border-1 surface-border">
              <template #title>
                <div class="flex align-items-center gap-2 text-sm text-500">
                  <i class="pi pi-wave-pulse text-blue-500"></i> Frec. Respiratoria
                </div>
              </template>
              <template #content>
                <span class="text-2xl font-bold">{{ dashboardStore.selectedNeonate.respiratoryRate }}</span>
                <span class="text-500 ml-2">rpm</span>
              </template>
            </Card>
          </div>

          <div class="col-12 md:col-6 lg:col-3">
            <Card class="h-full border-1 surface-border">
              <template #title>
                <div class="flex align-items-center gap-2 text-sm text-500">
                  <i class="pi pi-cloud text-cyan-500"></i> Sat. Oxígeno (O2)
                </div>
              </template>
              <template #content>
                <span class="text-2xl font-bold">{{ dashboardStore.selectedNeonate.oxygenSaturation }}</span>
                <span class="text-500 ml-2">%</span>
              </template>
            </Card>
          </div>

          <div class="col-12 md:col-6 lg:col-3">
            <Card class="h-full border-1 surface-border">
              <template #title>
                <div class="flex align-items-center gap-2 text-sm text-500">
                  <i class="pi pi-thermometer text-orange-500"></i> Temperatura
                </div>
              </template>
              <template #content>
                <span class="text-2xl font-bold">{{ dashboardStore.selectedNeonate.temperature }}</span>
                <span class="text-500 ml-2">°C</span>
              </template>
            </Card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>