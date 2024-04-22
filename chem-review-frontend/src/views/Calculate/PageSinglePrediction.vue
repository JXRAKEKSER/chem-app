<script setup lang="ts">
import { ref, computed } from "vue";

import MoleculeStructure from "@/components/UI/RDKit/MoleculeStructure.vue";
import BaseInput from "@/components/UI/BaseInput.vue";
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
    console.log({ mol })
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
    <h2 class="page-single-prediction__title">Рассчет из smiles</h2>
    <form class="form" @submit.prevent="handlePredict">
      <BaseInput v-model="smiles" labelText="Строка в виде SMILES" />
      <input type="checkbox" v-model="saveResult" />
      <BaseButton :disabled="isInvalidMol" type="submit">Рассчитать</BaseButton>
    </form>
    <MoleculeStructure :structure="smiles" id="1" svg-mode />
    <span class="">IC50: {{ predictedValue }}</span>
  </section>
</template>
