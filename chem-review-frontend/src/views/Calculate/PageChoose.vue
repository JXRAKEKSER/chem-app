<script setup lang="ts">
import BaseButton from "@/components/UI/BaseButton.vue";

import { ROUTE_NAMES } from "@/router/meta/route.names";
</script>

<template>
  <section class="page-calculator">
    <BaseButton @click="$router.push({ name: ROUTE_NAMES.CALULATE.SINGLE })">
      Из строки
    </BaseButton>
    <BaseButton
      @click="$router.push({ name: ROUTE_NAMES.CALULATE.FILE })"
    >
      Из файла
    </BaseButton>
  </section>
</template>
