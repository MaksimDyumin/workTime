<script setup lang="ts">

</script>

<template>
  <div class="card-container">
    <slot />
  </div>
</template>

<style scoped>

.card-container {
  display: flex;
  align-items: center;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

</style>