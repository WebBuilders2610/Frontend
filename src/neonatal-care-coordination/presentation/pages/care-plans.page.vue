<script setup>
import { onMounted, ref } from 'vue';

import Button from 'primevue/button';

import { useCareCoordinationStore }
  from '../../application/care-coordination.store';

import CarePlansTable
  from '../components/care-plans-table.component.vue';

import CreateCarePlanDialog
  from '../components/create-care-plan-dialog.component.vue';

const store = useCareCoordinationStore();

const dialogVisible = ref(false);

onMounted(async () => {

  await store.fetchCarePlans();
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
        Neonatal Care Plans
      </h1>

      <Button
          label="New Care Plan"
          icon="pi pi-plus"
          @click="dialogVisible = true"
      />

    </div>

    <CarePlansTable
        :carePlans="store.carePlans"
    />

    <CreateCarePlanDialog
        v-model:visible="dialogVisible"
        @save="handleCreateCarePlan"
    />

  </div>

</template>