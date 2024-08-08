<script setup lang="ts">
import { toRaw } from 'vue'

import type { Props } from '@/type/props'

const props = withDefaults(defineProps<Props>(), {
  // foo(prop) {
  //   // eslint-disable-next-line no-debugger
  //   debugger;
  //   console.log(12388853, prop)
  //   if (prop.foo.qq === 12388853) {
  //     return { qq: 123123 }
  //   } else {
  //     return prop.foo
  //   }
  // }
  foo: ({ foo }) => {
    console.log('p', foo)
    return {
      qq: 123
    }
  }

})
console.log(toRaw(props))
</script>

<template>
  <div :class="['about']">
    <h1>{{ props.foo.qq }}</h1>
  </div>
</template>

<style scoped>

</style>
