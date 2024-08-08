<script setup lang="ts">

import { getCurrentInstance, ref } from 'vue'
import { useMouse } from '@/composables/mouse'
import { useCounterStore } from '@/stores/counter'
import { storeToRefs } from 'pinia'

const { proxy }:any = getCurrentInstance()
console.trace(proxy.$msg)
// import app from '../main.js'

// console.log(app)

const objectOfAttrs = {
  class: 'about',
  style: {
    color: 'red'
  }
}

let { x, y } = useMouse()

const counter = useCounterStore()
const { count } = storeToRefs(counter)

// counter.increment()
// count.value++
counter.$patch((state) => {
  state.count++
})

const toggle = ref<boolean>(false)

</script>

<template>
  <div class="about 1" :count>
    <div v-bind="objectOfAttrs">
      <!--      {{ Date.now() }}-->
      <!--      {{ Math.random() }}-->
      <!--      {{ proxy.$msg }}-->
<!--      {{ x }} &#45;&#45; {{ y }}-->
<!--      {{ count }}-->
      <button @click="toggle = !toggle">toggle</button>
      <br />
      <Transition>
        <div v-show="toggle">qowueqowiue</div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.v-enter-active, .v-leave-active {
  transition: opacity 1s ease;
}

.v-enter-from, .v-leave-to {
  opacity: 0;
}
</style>
