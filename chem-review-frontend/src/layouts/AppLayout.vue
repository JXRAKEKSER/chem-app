<script setup lang="ts">
import { RouterView } from 'vue-router';

import TheHeader from "@/components/TheHeader.vue";
import TheSidebar from "@/components/TheSidebar.vue";
import NavigationBar from "@/components/NavigationBar.vue";
import NavigationTab from "@/components/NavigationTab.vue";

import { tabs } from "@/router/meta/navigationData";
</script>

<template>
  <div class="app-layout">
    <TheHeader class="app-layout__the-header" title="Chem Review" />
    <TheSidebar>
      <NavigationBar>
        <NavigationTab
          v-for="{ text, link, id } in tabs"
          :link="link"
          :text="text"
          :key="id"
        ></NavigationTab>
      </NavigationBar>
    </TheSidebar>
    <main class="app-layout__main">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app-layout {
  height: 1px;
  flex: 1;
  display: grid;
  grid-template-columns: max-content 1fr;
  grid-template-rows: max-content 1fr;
}
.app-layout__the-header {
  grid-column: 1/3;
}
</style>
