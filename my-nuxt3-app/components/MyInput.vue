<!-- /components/MyInput.vue -->
<template>
  <input 
    :value="modelValue" 
    @input="$emit('update:modelValue', $event.target.value)" 
    @change="$emit('update:modelValue', $event.target.value)" 
  />
</template>

<script setup>
const props = defineProps({
  modelValue: String
});
</script>
