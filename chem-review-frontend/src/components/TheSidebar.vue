<script setup lang="ts"></script>

<template>
  <aside class="the-sidebar">
    <slot></slot>
  </aside>
</template>

<style scoped>
.the-sidebar {
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 31.4rem;
  padding: 2rem;
  border-right: 1px solid #e2e2e2;
  background-color: var(--white);
}
</style>
