<script setup>
import { ref } from 'vue';

import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';

const props = defineProps({
  visible: Boolean
});

const emit = defineEmits([
  'update:visible',
  'save'
]);

const initialForm = () => ({
  neonateName: '',
  riskLevel: '',
  status: 'Active',
  priorityLevel: '',
  monitoringFrequency: '',
  nextFollowUpDate: '',
  assignedPediatrician: ''
});

const carePlan = ref(initialForm());

const errors = ref({});

const riskLevels = [
  'Low',
  'Medium',
  'High'
];

const priorityLevels = [
  'Normal',
  'High',
  'Critical'
];

const validateForm = () => {

  errors.value = {};

  // Neonate Name
  if (!carePlan.value.neonateName.trim()) {

    errors.value.neonateName =
        'Neonate name is required';
  }

  // Risk Level
  if (!carePlan.value.riskLevel) {

    errors.value.riskLevel =
        'Risk level is required';
  }

  // Priority Level
  if (!carePlan.value.priorityLevel) {

    errors.value.priorityLevel =
        'Priority level is required';
  }

  // Monitoring Frequency
  if (!carePlan.value.monitoringFrequency.trim()) {

    errors.value.monitoringFrequency =
        'Monitoring frequency is required';
  }

  // Next Follow-Up Date
  if (!carePlan.value.nextFollowUpDate.trim()) {

    errors.value.nextFollowUpDate =
        'Next follow-up date is required';
  }

  // Assigned Pediatrician
  if (!carePlan.value.assignedPediatrician.trim()) {

    errors.value.assignedPediatrician =
        'Assigned pediatrician is required';
  }

  // Simple domain rule
  if (
      carePlan.value.priorityLevel === 'Critical'
      &&
      carePlan.value.riskLevel !== 'High'
  ) {

    errors.value.priorityLevel =
        'Critical priority requires High risk level';
  }

  return Object.keys(errors.value).length === 0;
};

const closeDialog = () => {

  emit('update:visible', false);
};

const resetForm = () => {

  carePlan.value = initialForm();

  errors.value = {};
};

const saveCarePlan = () => {

  if (!validateForm()) {
    return;
  }

  emit('save', {
    ...carePlan.value
  });

  resetForm();

  closeDialog();
};
</script>

<template>

  <Dialog
      header="Create Neonatal Care Plan"
      :visible="visible"
      modal
      :style="{ width: '30rem' }"
      @update:visible="closeDialog"
  >

    <div class="flex flex-column gap-3">

      <!-- Neonate Name -->

      <div class="flex flex-column gap-1">

        <InputText
            v-model="carePlan.neonateName"
            placeholder="Neonate Name"
        />

        <small
            v-if="errors.neonateName"
            class="text-red-500"
        >
          {{ errors.neonateName }}
        </small>

      </div>

      <!-- Risk Level -->

      <div class="flex flex-column gap-1">

        <Dropdown
            v-model="carePlan.riskLevel"
            :options="riskLevels"
            placeholder="Risk Level"
        />

        <small
            v-if="errors.riskLevel"
            class="text-red-500"
        >
          {{ errors.riskLevel }}
        </small>

      </div>

      <!-- Priority Level -->

      <div class="flex flex-column gap-1">

        <Dropdown
            v-model="carePlan.priorityLevel"
            :options="priorityLevels"
            placeholder="Priority Level"
        />

        <small
            v-if="errors.priorityLevel"
            class="text-red-500"
        >
          {{ errors.priorityLevel }}
        </small>

      </div>

      <!-- Monitoring Frequency -->

      <div class="flex flex-column gap-1">

        <InputText
            v-model="carePlan.monitoringFrequency"
            placeholder="Monitoring Frequency"
        />

        <small
            v-if="errors.monitoringFrequency"
            class="text-red-500"
        >
          {{ errors.monitoringFrequency }}
        </small>

      </div>

      <!-- Next Follow-Up Date -->

      <div class="flex flex-column gap-1">

        <InputText
            v-model="carePlan.nextFollowUpDate"
            placeholder="Next Follow-Up Date"
        />

        <small
            v-if="errors.nextFollowUpDate"
            class="text-red-500"
        >
          {{ errors.nextFollowUpDate }}
        </small>

      </div>

      <!-- Assigned Pediatrician -->

      <div class="flex flex-column gap-1">

        <InputText
            v-model="carePlan.assignedPediatrician"
            placeholder="Assigned Pediatrician"
        />

        <small
            v-if="errors.assignedPediatrician"
            class="text-red-500"
        >
          {{ errors.assignedPediatrician }}
        </small>

      </div>

    </div>

    <template #footer>

      <Button
          label="Cancel"
          severity="secondary"
          @click="closeDialog"
      />

      <Button
          label="Save"
          @click="saveCarePlan"
      />

    </template>

  </Dialog>

</template>