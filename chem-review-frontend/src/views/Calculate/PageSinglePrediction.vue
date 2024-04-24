<script setup lang="ts">
import { ref, computed } from "vue";

import MoleculeStructure from "@/components/UI/RDKit/MoleculeStructure.vue";
import BaseTextArea from "@/components/UI/BaseTextArea.vue";
import BaseButton from "@/components/UI/BaseButton.vue";

import PredictionService from "@/core/Prediction/prediction.service";
import PredictionRepo from "@/core/Prediction/prediction.repository";

const smiles = ref<string>("");
const saveResult = ref<boolean>(false);
const predictedValue = ref<number | null>(null);

const isInvalidMol = computed<boolean>(() => {
  let mol;
  if (smiles.value) {
    mol = window.RDKit?.get_mol(smiles.value);
  }
  if (!mol || !smiles.value.length) {
    console.log({ mol });
    return true;
  }
  return false;
});

const handlePredict = async () => {
  try {
    const predictionService = new PredictionService(new PredictionRepo());
    predictedValue.value = await predictionService.computePrediction(
      smiles.value,
      saveResult.value
    );
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <section class="page-single-prediction">
    <h2 class="page-single-prediction__title">Быcтрый рассчёт</h2>
    <form
      class="form page-single-prediction__form"
      @submit.prevent="handlePredict"
    >
      <BaseTextArea class="form__input" v-model="smiles" labelText="Строка в виде SMILES" />
      <label class="form__checkbox">
        Сохранять результат
        <input type="checkbox" v-model="saveResult" />
      </label>
      <BaseButton class="form__submit-button" :disabled="isInvalidMol" type="submit">Рассчитать</BaseButton>
    </form>
    <div class="prediction-result page-single-prediction__prediction-result">
      <MoleculeStructure :structure="smiles" id="1" svg-mode />
      <span class="prediction-result__value">IC50: {{ predictedValue }}</span>
    </div>
  </section>
</template>

<style scoped>
.page-single-prediction {
  display: grid;
  grid-template-columns: minmax(max-content, 50%) 1fr;
  grid-template-rows: max-content 1fr;
  gap: 3rem;
  padding: 4rem;
}
.page-single-prediction__title {
  font-size: 3.2rem;
  font-weight: 600;
  line-height: 3.4rem;
}
.page-single-prediction__form {
  grid-row: 2;
}
.page-single-prediction__prediction-result {
  grid-column: 2/3;
  grid-row: 1/3;
}

.form {
  display: grid;
  grid-template-columns: 1fr max-content;
  grid-template-rows: max-content 1fr;
  gap: 1rem 2rem;
}
.form__checkbox {
  display: flex;
  align-items: center;
  height: fit-content;
}
.form__input {
  grid-row: 1/3;
}
.form__submit-button {
  grid-row: 1;
  grid-column: 2/3;
}
</style>
