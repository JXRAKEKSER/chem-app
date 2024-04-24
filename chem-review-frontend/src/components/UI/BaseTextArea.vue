<script setup lang="ts">
interface IProps {
  modelValue: string;
  labelText?: string;
  name?: string;
  placeholder?: string;
}

const props = defineProps<IProps>();
const emits = defineEmits(['update:modelValue', 'blur', 'focus']);

</script>

<template>
  <div class="base-textarea">
    <label v-if="labelText" class="base-textarea__label">{{ labelText }}</label>
    <textarea
      :value="modelValue"
      :placeholder="placeholder"
      :name="name"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      @blur="$emit('blur', name)"
      @focus="$emit('focus', name)"
      class="base-textarea__input"
    />
    <slot name="icon"></slot>
  </div>
</template>

<style scoped>
.base-textarea {
  display: flex;
  flex-direction: column;
  position: relative;
}
.base-textarea__label {
  width: fit-content;
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 1.1;
  margin: 0 0 1rem 0;
  color: #808284;
}
.base-textarea__input {
  border-radius: 0.2rem;
  padding: 1rem;
  background-color: var(--low-blue);
  resize: none;
}
.base-textarea__input::placeholder {
  font-weight: 900;
  font-size: 1.7rem;
  color: #3f434b;
  position: relative;
  left: -2px;
}
</style>
