<script setup>
import Card from 'primevue/card';
import Tag from 'primevue/tag';

defineProps({
  plan: {
    type: Object,
    required: true
  }
});
</script>

<template>

  <Card class="mb-3">

    <template #title>
      {{ plan.neonateName }}
    </template>

    <template #content>

      <div class="flex flex-column gap-3">

        <div>
          <strong>Risk Level:</strong>
          {{ plan.riskLevel }}
        </div>

        <div>
          <strong>Status:</strong>
          {{ plan.status }}
        </div>

        <div>
          <strong>Priority:</strong>
          {{ plan.priorityLevel }}
        </div>

        <div>
          <strong>Monitoring Frequency:</strong>
          {{ plan.monitoringFrequency }}
        </div>

        <div>
          <strong>Next Follow-Up:</strong>
          {{ plan.nextFollowUpDate }}
        </div>

        <Tag
            :value="plan.priorityLevel"
            severity="danger"
        />

      </div>

    </template>

  </Card>

</template>