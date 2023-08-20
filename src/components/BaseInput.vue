<script>
export default {
  props: {
    // input value
    modelValue: {
      type: String,
      default: ''
    },
    // input type
    type: {
      type: String, // value type; ex: String, Boolean, Array
      default: 'text', // default value
      validator: (value) => ['text', 'password'].includes(value) // accepted value
    }
  },
  emits: ['update:modelValue']
}
</script>

<template>
  <input
    :type="type"
    :value="modelValue"
    @input="($event) => $emit('update:modelValue', $event.target.value)"
  />
</template>