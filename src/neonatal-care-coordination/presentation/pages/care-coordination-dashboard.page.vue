<script setup>
import { onMounted, ref } from 'vue';

import Button from 'primevue/button';

import { useCareCoordinationStore }
  from '../../application/care-coordination.store';

import DashboardStats
  from '../components/dashboard-stats.component.vue';

import NeonatalCarePlanCard
  from '../components/neonatal-care-plan-card.component.vue';

import CriticalAlertsPanel
  from '../components/critical-alerts-panel.component.vue';

import CarePlansTable
  from '../components/care-plans-table.component.vue';

import VitalSignsChart
  from '../components/vital-signs-chart.component.vue';

import CreateCarePlanDialog
  from '../components/create-care-plan-dialog.component.vue';

const store = useCareCoordinationStore();

const dialogVisible = ref(false);

onMounted(async () => {

  await store.fetchCarePlans();

  await store.fetchFollowUps();

  await store.fetchRecommendations();

  await store.fetchVitalSigns();
});

const handleCreateCarePlan =
    async (carePlan) => {

      await store.createCarePlan({
        ...carePlan,

        createdDate: new Date()
            .toISOString()
            .split('T')[0],

        lastReviewDate: new Date()
            .toISOString()
            .split('T')[0]
      });
    };
</script>

<template>

  <div class="p-4">

    <div
        class="flex justify-content-between align-items-center mb-4"
    >

      <h1 class="text-3xl">
        Neonatal Care Coordination Dashboard
      </h1>

      <Button
          label="New Care Plan"
          icon="pi pi-plus"
          @click="dialogVisible = true"
      />

    </div>

    <DashboardStats
        :totalCarePlans="store.carePlans.length"

        :criticalCases="
                store.carePlans.filter(
                    plan => plan.priorityLevel === 'Critical'
                ).length
            "

        :pendingFollowUps="store.followUps.length"

        :activeRecommendations="store.recommendations.length"
    />

    <CriticalAlertsPanel
        :carePlans="store.carePlans"
    />

    <div class="grid mt-4">

      <div
          v-for="plan in store.carePlans"
          :key="plan.id"
          class="col-12 md:col-6 lg:col-4"
      >

        <NeonatalCarePlanCard
            :plan="plan"
        />

      </div>

    </div>

    <h2 class="text-2xl mt-6 mb-3">
      Neonatal Monitoring Overview
    </h2>

    <CarePlansTable
        :carePlans="store.carePlans"
    />

    <VitalSignsChart
        :vitalSigns="store.vitalSigns"
    />

    <CreateCarePlanDialog
        v-model:visible="dialogVisible"
        @save="handleCreateCarePlan"
    />

  </div>

</template>