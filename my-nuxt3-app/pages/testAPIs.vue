<template>
    <div>
      <p>Count: {{ count }}</p>
      <button @click="tang">Tăng</button>
      
      <p v-if="nhandoi.flex !== null">Double Count: {{ nhandoi.flex }}</p>
      <button @click="nhanDoi">Nhân đôi</button>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive } from 'vue';
  
  // Tạo một ref để lưu trữ giá trị đếm
  const count = ref(0);
  
  // Tạo hàm để tăng giá trị của count
  const tang = () => {
    count.value++;
  };
  
  // Tạo reactive object để theo dõi sự thay đổi của count và nhân đôi nó lên
  const nhandoi = reactive({
    flex: null
  });
  
  // Hàm để cập nhật giá trị flex
  const nhanDoi = () => {
    nhandoi.flex = count.value * 2;
  };
  </script>
  
  <style scoped>
  /* Thêm style tùy chỉnh nếu cần */
  </style>
  