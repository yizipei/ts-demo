<script setup lang="ts">
import { toRaw } from 'vue'

interface Props {
  foo?: number,
  bar: string,
}

const props = defineProps<Props>()
console.log(toRaw(props))
</script>

<template>
  <div :class="['about']">
    <h1>props</h1>
  </div>
</template>

<style scoped>

</style>
