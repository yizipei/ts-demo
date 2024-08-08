<script setup lang="ts">
import { inject, onBeforeMount, onMounted, type PropType, type Ref, ref, toRaw } from 'vue'

import type { Props } from '@/type/props'
import { nameKey } from '@/type/injectionKeys'

const props = defineProps({
  foo: {
    type: Object as PropType<Props>,
    default: () => {
      return {
        foo: {qq: 444},
        content: '123',
        title: 'eeee'
      }
    }
  }
})

const emits = defineEmits<{
  change: [id: number, name: string]
}>()


let age: Ref<string> = ref('15')

console.log(toRaw(props))

const handleEvent = (event: Event) => {
  console.log(event)
  console.log((event.target as HTMLInputElement).value)
}

const input = ref<HTMLInputElement | null>(null)

onMounted(() => {
  let fn = inject<Function>(nameKey)
  fn && fn()

  console.log('mounted', input.value)
})

onBeforeMount(() => {
  console.log('beforeMount', input.value)
})
</script>

<template>
  <div :class="['about']">
    <h1>{{ props.foo?.foo?.qq }}</h1>
    <button @click="emits('change', 1, '123')">click</button>
    <div>{{ age }}</div>
    <button @click="age = String(Math.random())">click2</button>
    <input ref="input" @change="handleEvent">click3
  </div>
</template>

<style scoped>

</style>
