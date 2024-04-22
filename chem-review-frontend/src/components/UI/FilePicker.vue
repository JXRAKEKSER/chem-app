<script setup lang="ts">
const emits = defineEmits(['filePicked']);

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
    <input type="file" @change="handlePickFile" accept=".csv" />
  </div>
</template>
