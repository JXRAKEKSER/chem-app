<script setup lang="ts">
import TheLogo from "@/components/TheLogo.vue";
import { RouterView } from "vue-router";
</script>

<template>
  <div class="auth-layout">
    <main class="auth-layout__main">
      <section class="logo">
        <TheLogo />
      </section>
      <section class="auth-layout__credentials">
        <RouterView />
      </section>
    </main>
  </div>
</template>

<style scoped>
.auth-layout {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background: linear-gradient(
      120.1deg,
      #5edfae 1.06%,
      #27dcb4 53.11%,
      #31bdc6 100%
    ),
    linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4));
}
.auth-layout::after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1;
}
.auth-layout__main {
  display: flex;
  align-items: center;
  align-self: center;
  gap: 20rem;
  z-index: 2;
}
</style>
