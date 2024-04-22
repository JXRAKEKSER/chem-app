<script setup lang="ts">
type buttonType = "button" | "submit";
interface IProps {
  type?: buttonType;
}
const props = withDefaults(defineProps<IProps>(), { type: "button" });
</script>

<template>
  <button class="base-button" :type="type">
    <slot></slot>
  </button>
</template>

<style scoped>
.base-button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: max-content;
  height: max-content;
  padding: 0.8rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid transparent;
  background-color: var(--primary);
  color: var(--white);
  font-size: 2rem;
  font-weight: 500;
  user-select: none;
}
.base-button:hover {
  opacity: 0.8;
}
.base-button:disabled {
  cursor: default;
  border: 1px solid #d3d3d3;
  background-color: #f6f6f6;
}
</style>
