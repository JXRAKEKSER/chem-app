<script setup lang="ts">
</script>

<template>
  <nav class="navigation-bar">
    <slot></slot>
  </nav>
</template>

<style scoped>
.navigation-bar {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 3rem;
}
</style>
