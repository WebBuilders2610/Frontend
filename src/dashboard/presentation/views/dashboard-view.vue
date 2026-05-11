<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import { useDashboardStore } from '../../application/dashboard.store.js';

const store = useDashboardStore();
const router = useRouter();

// Función para navegar al detalle
const goToSummary = (babyId) => {
    router.push({ name: 'health-summary', params: { babyId } });
};

onMounted(() => {
    store.fetchAllHealthSummaries();
    // store.fetchChartMetrics(); // Si integraste el gráfico
});
</script>

<template>
    <div class="p-4 md:p-6 lg:p-8 w-full max-w-screen-xl mx-auto">
        <h1 class="text-3xl font-bold mb-4 text-900">Dashboard General</h1>

        <div v-if="store.isLoading" class="flex justify-content-center p-5">
            <i class="pi pi-spin pi-spinner text-4xl text-primary"></i>
        </div>

        <div v-else-if="store.error" class="p-4 bg-red-50 text-red-600 border-round mb-4">
            <i class="pi pi-exclamation-circle mr-2"></i> {{ store.error }}
        </div>

        <div class="surface-card p-4 border-round shadow-2 mt-4">
            <h2 class="text-xl font-medium mb-4 text-700">Monitoreo Activo de Neonatos</h2>
            
            <DataTable :value="store.healthSummaries" responsiveLayout="scroll" :paginator="true" :rows="5">
                <Column field="babyId" header="ID Neonato" />
                
                <Column header="Temp. Promedio">
                    <template #body="slotProps">
                        <span :class="slotProps.data.isTemperatureNormal() ? 'text-green-500 font-bold' : 'text-orange-500 font-bold'">
                            {{ slotProps.data.averageTemperature }} °C
                        </span>
                    </template>
                </Column>

                <Column field="averageOxygen" header="O2 Promedio">
                    <template #body="slotProps">
                        {{ slotProps.data.averageOxygen }}%
                    </template>
                </Column>

                <Column header="Estado / Alertas">
                    <template #body="slotProps">
                        <span class="px-2 py-1 border-round text-sm font-bold"
                              :class="slotProps.data.hasCriticalAlerts() ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'">
                            {{ slotProps.data.alertsCount }} Alertas
                        </span>
                    </template>
                </Column>

                <Column header="Acciones">
                    <template #body="slotProps">
                        <Button icon="pi pi-eye" 
                                label="Ver Detalle" 
                                class="p-button-sm p-button-outlined" 
                                @click="goToSummary(slotProps.data.babyId)" />
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
</template>