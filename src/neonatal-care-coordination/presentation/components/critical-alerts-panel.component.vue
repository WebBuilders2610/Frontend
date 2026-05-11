<script setup>
import Card from 'primevue/card';
import Tag from 'primevue/tag';

defineProps({
  carePlans: {
    type: Array,
    required: true
  }
});

const criticalAlerts = (plans) => {

  return plans.filter(
      plan =>
          plan.priorityLevel === 'Critical'
  );
};

const getAlertMessage = (plan) => {

  switch (plan.riskLevel) {

    case 'High':
      return 'Immediate clinical attention required';

    default:
      return 'Monitoring required';
  }
};
</script>

<template>

  <Card class="mt-4">

    <template #title>

      <div class="flex align-items-center gap-2">

        <i class="pi pi-exclamation-triangle text-red-500" />

        <span>
                    Critical Alerts
                </span>

      </div>

    </template>

    <template #content>

      <div
          v-if="criticalAlerts(carePlans).length === 0"
      >
        No critical alerts detected.
      </div>

      <div
          v-for="plan in criticalAlerts(carePlans)"
          :key="plan.id"
          class="mb-4 p-3 border-round surface-100"
      >

        <div class="flex justify-content-between align-items-center">

          <div>

            <div class="font-bold text-lg">
              {{ plan.neonateName }}
            </div>

            <div class="mt-2">
              {{ getAlertMessage(plan) }}
            </div>

          </div>

          <Tag
              value="Critical"
              severity="danger"
          />

        </div>

      </div>

    </template>

  </Card>

</template>