<template>
    <header>
      <nav>
        <ul>
       
          <li><NuxtLink to="/building">Danh sách </NuxtLink></li>
          <li><NuxtLink to="/leaf">Bản đồ</NuxtLink></li>
        </ul>
      </nav>
    </header>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  header {
    background-color: #333;
    color: white;
    padding: 10px;
  }
  
  nav ul {
    display: flex;
    list-style: none;
    padding: 0;
  }
  
  nav li {
    margin-right: 20px;
  }
  
  nav a {
    color: white;
    text-decoration: none;
  }
  </style>
  