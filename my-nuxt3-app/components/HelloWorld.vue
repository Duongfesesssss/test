<template>
    <div class="hello">
      <h1>{{ message }}</h1>
      <button @click="changeMessage">Change Message</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'HelloWorld',
    data() {
      return {
        message: 'Hello, Vue!'
      };
    },
    methods: {
      changeMessage() {
        this.message = 'You clicked the button!';
      }
    }
  };
  </script>
  
  <style scoped>
  .hello {
    text-align: center;
  }
  </style>
  