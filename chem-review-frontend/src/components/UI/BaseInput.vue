<script setup lang="ts">
export type inputType = "text" | "password";
interface IProps {
  modelValue: string;
  placeHolder?: string;
  type?: inputType;
  labelText?: string;
}
const props = withDefaults(defineProps<IProps>(), {
  type: "text",
});
const emits = defineEmits({
  "update:modelValue": null,
});
</script>

<template>
  <div class="base-input">
    <label v-if="labelText" class="base-input__label">{{ labelText }}</label>
    <input
      class="base-input__input"
      :value="modelValue"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
      :placeholder="placeHolder"
      :type="type"
    />
  </div>
</template>

<style scoped>
.base-input {
  display: flex;
  flex-direction: column;
}
.base-input__label {
  width: fit-content;
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 1.1;
  margin: 0 0 1rem 0;
  color: #808284;
}
.base-input__input {
  border: 1px solid #c7c7c7;
  border-radius: 1rem;
  padding: 1rem;
}
</style>
