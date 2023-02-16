<template>
  <div class='h-input-wrapper group'>
    <input
      :type="nativeType"
      autocomplete="off"
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
    type: String,
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
  @apply block w-full sm:text-sm rounded-md border rounded-md border-gray-300 transition-colors duration-150 ease-in-out
  shadow-sm group-focus:border-indigo-500 group-focus:outline-none group-focus:ring-indigo-500;

  .h-input {
    @apply w-full px-3 py-2 appearance-none rounded-md placeholder-gray-400;
  }
}
</style>
