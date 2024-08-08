<template>
  <ChildView :baz="{aa: 123}" :foo="123"  bar="123"/>
  <br />
  <ChildView2 bar="hkdf" :foo="123"/>

  <ChildView3 title="title" content="dsflksdj" />
  <ChildView4 @change="(p1, p2) => {console.log(p1, p2)}" />
  <button @click="handleClick">open</button>
  <hr style="width: 100%" />
  --------------------
  {{title}} --- {{title2}} --- {{ title3 }}
<!--  <ChildView5 ref="model"  bar="234" v-model="title"/>-->

  <ChildView5 ref="model" v-model.trim="title"  bar="234" v-model:title="title2" v-model:title3.curs="title3"/>
</template>

<style scoped>

</style>
<script setup lang="ts">
import { createApp, provide, ref } from 'vue'
import ChildView from '@/views/ChildView.vue'
import ChildView2 from '@/views/ChildView2.vue'
import ChildView3 from '@/views/ChildView3.vue'
import ChildView4 from '@/views/ChildView4.vue'
import { nameKey } from '@/type/injectionKeys'
import ChildView5 from '@/views/ChildView5.vue'
import vue from '@vitejs/plugin-vue'

provide(nameKey, () => {
  console.log('provide')
})

const model = ref<InstanceType<typeof ChildView5> | null>(null)
const handleClick= () => {
  console.log('model', ChildView5)
  const open = createApp(ChildView5, { bar: '123'})
  console.log(open)
  // model.value?.open()
}
// model.value?.open()

const title =  ref('')
const title2 =  ref('')
const title3 =  ref('')
</script>
