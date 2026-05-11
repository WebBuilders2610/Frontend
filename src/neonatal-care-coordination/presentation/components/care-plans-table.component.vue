<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tag from 'primevue/tag';

defineProps({
  carePlans: {
    type: Array,
    required: true
  }
});

const getSeverity = (priority) => {

  switch (priority) {

    case 'Critical':
      return 'danger';

    case 'High':
      return 'warning';

    default:
      return 'success';
  }
};
</script>

<template>

  <DataTable
      :value="carePlans"
      paginator
      :rows="5"
      tableStyle="min-width: 50rem"
  >

    <Column
        field="neonateName"
        header="Neonate"
    />

    <Column
        field="riskLevel"
        header="Risk Level"
    />

    <Column
        field="status"
        header="Status"
    />

    <Column
        field="nextFollowUpDate"
        header="Next Follow-Up"
    />

    <Column header="Priority">

      <template #body="slotProps">

        <Tag
            :value="slotProps.data.priorityLevel"
            :severity="getSeverity(slotProps.data.priorityLevel)"
        />

      </template>

    </Column>

  </DataTable>

</template>