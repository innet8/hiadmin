<template>
  <div class="h-input-container">
    <div class="h-input-wrapper group">
      <input
        :type="nativeType"
        :autocomplete="autocomplete"
        class="h-input"
        :class="customClass"
        :disabled="disabled"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      />
      <div class="clearable-btn" @click='clearBtnClick' v-if="clearable && modelValue !== ''">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-3 w-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {componentSizeMapProxy, componentSizes} from '../constant/size'

const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  autocomplete: {
    type: String,
    default: "off",
    required: false,
  },
  clearable: {
    type: Boolean,
    default: false,
    required: false,
  },
  customClass: {
    type: String,
    default: '',
    required: false,
  },
  disabled: {
    type: Boolean,
    default: false,
    required: false,
  },
  id: {
    type: String,
    default: void 0,
    required: false,
  },
  maxLength: {
    type: Number,
    default: 255,
    required: false,
  },
  minLength: {
    type: Number,
    default: 0,
    required: false,
  },
  modelValue: {
    type: [String, Number, Object],
    default: '',
  },
  nativeType: {
    type: String,
    default: 'text',
    required: false,
  },
  size: {
    type: String,
    values: componentSizes,
    required: false,
  }
})

const clearBtnClick = () => {
  emit('update:modelValue', '')
}
</script>

<style lang="scss" scoped>
.h-input-wrapper {
  @apply relative pr-2 flex justify-center items-center w-full sm:text-sm rounded-md border border-gray-300
  transition-colors duration-150 ease-in-out shadow-sm focus-within:shadow-md focus-within:border-indigo-500
  focus-within:outline-none focus-within:ring-indigo-500;

  .h-input {
    @apply relative px-3 py-2 w-full appearance-none rounded-md border-0 ring-0 border-transparent
    placeholder-gray-400 z-[0];
  }

  .clearable-btn {
    @apply relative h-fit text-gray-500 bg-gray-200 rounded-full cursor-pointer z-[1]
  }
}
</style>
