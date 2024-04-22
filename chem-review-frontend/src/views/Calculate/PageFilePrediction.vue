<script setup lang="ts">
import { reactive, ref } from "vue";

import FilePicker from "@/components/UI/FilePicker.vue";
import BaseButton from "@/components/UI/BaseButton.vue";
import PredictionCard from "@/components/UI/Prediction/PredictionCard.vue";

import type { filePredictResponse } from "@/api/prediction.api";
import { exportFile } from "@/api/export.api";
import { downloadFile } from "@/utils/downloadFile";

import PredictionService from "@/core/Prediction/prediction.service";
import PredictionRepo from "@/core/Prediction/prediction.repository";

const pickedFile = ref<File | null>(null);
const predictionResult = reactive<filePredictResponse>({
  predictedDrugs: [],
  invalidDrugs: [],
});

const handleFilePick = (file: File) => {
  pickedFile.value = file;
};

const handlePredict = async () => {
  try {
    if (!pickedFile.value) {
      return;
    }
    const predictionService = new PredictionService(new PredictionRepo());
    const prediction = await predictionService.computeFilePrediction(
      pickedFile.value
    );
    predictionResult.predictedDrugs = prediction.predictedDrugs;
    predictionResult.invalidDrugs = prediction.invalidDrugs;
  } catch (error) {
    console.log(error);
  }
};

const createFileName = (prefix: string): string => {
  const date = new Date();
  return `${prefix}_${date.getDate()}.${
    date.getMonth() + 1
  }.${date.getFullYear()}`;
};

const handleExport = async () => {
  try {
    const csvString: string = await exportFile(
      predictionResult.predictedDrugs,
      "csv"
    );
    const exportedFileName = `${createFileName("prediction")}.csv`;
    downloadFile(csvString, "text/csv", exportedFileName);
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <section class="page-file-prediction">
    <h1 class="page-file-prediction__title">Расчет из файла</h1>
    <BaseButton
      class="page-file-prediction__export-button"
      v-if="predictionResult.predictedDrugs.length"
      @click="handleExport"
      >Экспорт</BaseButton
    >
    <div class="page-file-prediction__work-area">
      <form class="form" @submit.prevent="handlePredict">
        <FilePicker @filePicked="handleFilePick" />
        <BaseButton type="submit" :disabled="!pickedFile">
          Рассчитать
        </BaseButton>
      </form>
      <div class="predicted-cards">
      <PredictionCard
        v-for="(prediction, index) in predictionResult.predictedDrugs"
        :chemicalFormula="prediction.formula"
        :predictedValue="prediction.prediction"
        :id="String(index)"
      />
    </div>
    </div>
  </section>
</template>

<style scoped>
.page-file-prediction {
  display: grid;
  grid-template-columns: 1fr max-content;
  grid-template-rows: max-content 1fr;
  gap: 2rem 0;
  padding: 4rem;
}
.page-file-prediction__work-area {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  grid-column: 1/-1;
  grid-row: 2/3;

  padding: 2rem;
  border-radius: 1.5rem;
  background-color: var(--white);
}
.form {
  display: flex;
  align-items: center;
}
.predicted-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));;
}
</style>
