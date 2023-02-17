<template>
  <div class='h-input-wrapper group'>
    <input
      :type="nativeType"
      :autocomplete="autocomplete"
      class="h-input"
      :class="customClass"
      :value="modelValue"
    />
  </div>
</template>

<script lang='ts' setup>
import {componentSizeMapProxy, componentSizes} from '../constant/size'

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
    type: () => [String, Number, Object],
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
</script>

<style lang='scss' scoped>
.h-input-wrapper {
  @apply flex w-full sm:text-sm rounded-md border border-gray-300 transition-colors duration-150 ease-in-out shadow-sm
  focus-within:shadow-md focus-within:border-indigo-500 focus-within:outline-none focus-within:ring-indigo-500;

  .h-input {
    @apply relative px-3 py-2 w-full appearance-none rounded-md border-0 ring-0 border-transparent
    placeholder-gray-400 z-[0];
  }
}
</style>
