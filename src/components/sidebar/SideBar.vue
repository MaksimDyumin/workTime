<script setup lang="ts">
let s = 'dfdsf'
s.includes('2')
</script>

<template>
  <div class="sidebar-container">
    <slot />
  </div>
</template>

<style scoped>
.sidebar-container {
  position: absolute;
  left: 0;
  width: 450px;
  display: flex;
  align-items: center;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  height: 100%;
  overflow: auto;
  z-index: 2;
}
</style>