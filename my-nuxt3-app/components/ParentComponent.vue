  <!-- /components/ParentComponent.vue -->
<template>
  <div>
    <MyInput v-model.lazy="customValue" />
    <p>Custom value: {{ customValue }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import MyInput from './MyInput.vue';

const customValue = ref('');
</script>
