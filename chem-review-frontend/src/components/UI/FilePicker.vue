<script setup lang="ts">
import DownloadIcon from '@/assets/icons/DownloadIcon.vue'

interface IProps {
  caption?: string;
}

const emits = defineEmits(['filePicked']);
const props = defineProps<IProps>();

const handlePickFile = (event: Event) => {
    const pickerFiles = (event.target as HTMLInputElement).files; 
    if (!pickerFiles?.length) {
        return;
    }
    const [ file ] = pickerFiles;
    emits('filePicked', file);
}
</script>

<template>
  <div class="file-picker">
    <input class="file-picker__input" type="file" @change="handlePickFile" accept=".csv" />
    <span class="file-picker__caption">{{ caption }}</span>
    <DownloadIcon class="file-picker__icon" />
  </div>
</template>

<style scoped>
.file-picker {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  width: 100%;
  height: 10rem;
  background-color: var(--blue);
  border-radius: 1.5rem;
}
.file-picker__input {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}
.file-picker__caption {
  font-size: 2.4rem;
  font-weight: 500;
  color: var(--white);
  width: fit-content;
}
.file-picker__icon {
  transform: rotate(180deg);
}

</style>
