<template>
  <div class="h-checkbox-container">
    <div class="h-checkbox-wrapper group" :class="disabled ? `h-checkbox-wrapper__disabled` : ``">
      <input
        type="checkbox"
        class="h-checkbox"
        :id="`checkbox-${name}`"
        :class="customClass"
        :disabled="disabled"
        :checked="modelValue"
        @input="onCheck"
      />
      <label class="h-checkbox-label" :for="`checkbox-${name}`">
        <slot>
          <!-- {{ modelValue ? trueLabel : falseLabel }} -->
        </slot>
      </label>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { nextTick, onMounted } from 'vue'

const emit = defineEmits(['update:modelValue'])
const props = defineProps({
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
  label: {
    type: String,
    default: '',
    required: false,
  },
  modelValue: {
    type: Boolean,
    default: false,
    required: false,
  },
  name: {
    type: String,
    default: () => Math.random().toString(36).substring(2, 9),
    required: false,
  },
  trueLabel: {
    type: String,
    default: void 0,
    required: false,
  },
  falseLabel: {
    type: String,
    default: void 0,
    required: false,
  },
  checked: {
    type: Boolean,
    default: false,
    required: false,
  },
  size: {
    type: String,
    default: 'medium',
    required: false,
  },
  validateEvent: {
    type: Boolean,
    default: true,
    required: false,
  },
})

const onCheck = (arg: any) => {
  emit('update:modelValue', arg.target.checked)
}
</script>

<style lang="scss" scoped>
.h-checkbox-wrapper {
  @apply flex items-center;

  .h-checkbox {
    @apply h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 active:ring-indigo-500 transition;
  }

  .h-checkbox-label {
    @apply ml-2 block text-sm text-gray-900;
  }
}

.h-checkbox-wrapper__disabled {
  .h-checkbox {
    @apply bg-gray-200 border-gray-300 text-gray-500 cursor-not-allowed;
  }

  .h-checkbox-label {
    @apply text-gray-500 cursor-not-allowed;
  }
}
</style>
