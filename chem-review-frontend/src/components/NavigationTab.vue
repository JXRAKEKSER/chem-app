<script setup lang="ts">
import { RouterLink } from "vue-router";
interface IProps {
  text: string;
  link: string;
}

const props = defineProps<IProps>();
</script>

<template>
  <RouterLink :to="link" v-slot="{ isActive }">
    <div class="navigation-tab" :class="{ 'navigation-tab_active': isActive }">
      <slot name="icon" :isActive="isActive"></slot>
      <span class="navigation-tab__text" :class="{ 'navigation-tab__text_active': isActive }">{{ text }}</span>
    </div>
  </RouterLink>
</template>

<style scoped>
.navigation-tab {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1rem;
  border-radius: var(--grey-border-radius);
}
.navigation-tab_active {
  background-color: var(--blue);
}
.navigation-tab__text {
  font-size: 1.6rem;
  font-weight: 500;
  line-height: 1.7rem;
  width: 100%;
  color: #a8a8a9;
}
.navigation-tab__text_active {
  color: var(--white);
}
</style>
