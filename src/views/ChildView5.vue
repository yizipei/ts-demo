<script setup lang="ts">
import { ref, toRaw } from 'vue'

interface Props {
  foo?: number,
  bar: string,
  modelValue?: string
  title?: string
  modelModifiers?: Object
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [modelValue: string]
  'update:title': [title: string]
}>()

const isShow = ref<boolean>(false)

const open = () => {
  isShow.value = true
  console.log('open', isShow.value)
}

const title3 = defineModel('title3')



defineExpose({
  open,
})
</script>

<template>
  <div :class="['about']">
    <h1>props</h1>
    <input type="text" :value="props.modelValue" @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)" />
    ipt2
    <input :value="props.title" @input="emit('update:title', ($event.target as HTMLInputElement).value)">
    ipt3
    <input v-model="title3">
  </div>
</template>

<style scoped>

</style>
