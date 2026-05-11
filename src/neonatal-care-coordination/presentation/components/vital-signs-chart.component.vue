<script setup>
import Chart from 'primevue/chart';

defineProps({
  vitalSigns: {
    type: Array,
    required: true
  }
});

const buildChartData = (record) => {

  return {
    labels: record.dates,

    datasets: [
      {
        label: 'Temperature °C',
        data: record.temperatures,
        tension: 0.4
      }
    ]
  };
};
</script>

<template>

  <div
      v-for="record in vitalSigns"
      :key="record.id"
      class="mt-5"
  >

    <h2 class="text-2xl mb-3">
      {{ record.neonateName }} Vital Signs
    </h2>

    <Chart
        type="line"
        :data="buildChartData(record)"
        class="w-full"
    />

  </div>

</template>