<script setup lang="ts">
import { toRaw } from 'vue'

const props = defineProps<{
  foo?: number,
  bar: string,
  baz: object,
}>()
console.log(toRaw(props))
</script>

<template>
  <div :class="['about']">
    <h1>props</h1>
  </div>
</template>

<style scoped>
</style>
