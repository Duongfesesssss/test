<template>
    <div class="mb-3">
      <DatePicker v-model="internalValue" :dateFormat="dateFormat" class="form-control" @blur="onBlur" />
      <span class="text-danger">{{ error }}</span>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  import { useField } from 'vee-validate';
  import DatePicker from 'primevue/datepicker';
  
  const props = defineProps({
    name: {
      type: String,
      required: true
    },
    dateFormat: {
      type: String,
      default: 'dd/mm/yy'
    }
  });
  
  const { value: internalValue, errorMessage: error, handleBlur: onBlur } = useField(props.name);
  
  watch(internalValue, (newValue) => {
    emit('update:modelValue', newValue);
  });
  </script>
  
  <style scoped>
  /* Add any styles you need for the component */
  </style>
  