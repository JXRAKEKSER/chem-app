<script setup lang="ts">
interface IProps {
  title: string;
}
const props = defineProps<IProps>();
</script>

<template>
  <header class="the-header">
    <h1 class="the-header__title">{{ props.title }}</h1>
  </header>
</template>

<style scoped>
.the-header {
  display: flex;
  align-items: center;
  padding: 3rem;
  background-color: var(--white);
}
.the-header__title {
  font-size: 3.6rem;
  font-weight: 500;
}
</style>
