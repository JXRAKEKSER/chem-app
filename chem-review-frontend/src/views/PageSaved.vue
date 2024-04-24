<script setup lang="ts">
import { ref } from "vue";

import PredictionCard from "@/components/UI/Prediction/PredictionCard.vue";

import PredictionService from "@/core/Prediction/prediction.service";
import PredictionRepo from "@/core/Prediction/prediction.repository";
import type { predictedDrug } from "@/api/prediction.api";

const predictions = ref<predictedDrug[] | null>(null);

const fetchSavedPredictions = async () => {
  const predictionService = new PredictionService(new PredictionRepo());
  predictions.value = await predictionService.getSavedPredictions();
};

fetchSavedPredictions();
</script>

<template>
  <section class="page-saved">
    <h2 class="page-saved__title">Сохраненные вычисления</h2>
    <ul class="page-saved__cards">
      <PredictionCard
        v-for="({ prediction, formula }, index) in predictions"
        :chemicalFormula="formula"
        :predictedValue="prediction"
        :id="String(index)"
      />
    </ul>
  </section>
</template>

<style scoped>
.page-saved {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding: 4rem;
}
.page-saved__title {
  font-size: 3.2rem;
  font-weight: 600;
  line-height: 3.4rem;
}
.page-saved__cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  background-color: var(--white);
  padding: 2rem;
  border-radius: 1.5rem;
}
</style>
