<script setup lang="ts">
import MoleculeStructure from "@/components/UI/RDKit/MoleculeStructure.vue";

interface IProps {
  chemicalFormula: string;
  predictedValue: number;
  id: string;
}
const props = defineProps<IProps>();
</script>

<template>
  <div class="prediction-card">
    <MoleculeStructure :structure="chemicalFormula" :id="id" />
    <span class="prediction-card__prediction">IC50 {{ predictedValue }}</span>
  </div>
</template>

<style scoped>
.prediction-card__prediction {
  font-size: 1.8rem;
  font-weight: 500;
}
</style>
