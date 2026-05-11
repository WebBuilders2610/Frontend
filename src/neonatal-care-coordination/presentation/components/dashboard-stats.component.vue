<script setup>
import Card from 'primevue/card';

defineProps({
  totalCarePlans: Number,
  criticalCases: Number,
  pendingFollowUps: Number,
  activeRecommendations: Number
});
</script>

<template>

  <div class="grid mb-4">

    <div class="col-12 md:col-6 lg:col-3">

      <Card>
        <template #title>
          Neonates Monitored
        </template>

        <template #content>
          <div class="text-4xl font-bold">
            {{ totalCarePlans }}
          </div>
        </template>
      </Card>

    </div>

    <div class="col-12 md:col-6 lg:col-3">

      <Card>
        <template #title>
          Critical Cases
        </template>

        <template #content>
          <div class="text-4xl font-bold text-red-500">
            {{ criticalCases }}
          </div>
        </template>
      </Card>

    </div>

    <div class="col-12 md:col-6 lg:col-3">

      <Card>
        <template #title>
          Pending Follow-Ups
        </template>

        <template #content>
          <div class="text-4xl font-bold">
            {{ pendingFollowUps }}
          </div>
        </template>
      </Card>

    </div>

    <div class="col-12 md:col-6 lg:col-3">

      <Card>
        <template #title>
          Active Recommendations
        </template>

        <template #content>
          <div class="text-4xl font-bold">
            {{ activeRecommendations }}
          </div>
        </template>
      </Card>

    </div>

  </div>

</template>