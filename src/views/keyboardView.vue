<template>
  <div>
    123
    <!-- keyboard 只识别带有 data-mode 标识的输入框 -->
    <input data-mode="handwrite" value="你好" />
    <KeyBoard ref="keyBoardRef"  @change="change"/>
  </div>
</template>

<script lang="ts">
import "vue-keyboard-virtual-next/keyboard.min.css";
import KeyBoard from "vue-keyboard-virtual-next";
import { defineComponent, ref, onMounted } from "vue";
export default defineComponent({
  components: { KeyBoard },
  setup() {
    const keyBoardRef = ref<typeof KeyBoard | null>(null);

    onMounted(() => {
      // xxxx逻辑 给键盘重新注册输入框
      keyBoardRef.value?.reSignUp();
    })

    // 第一个参数为当前focus的输入框的value值变化
    // 第二个参数为当前foucs的输入框
    function change(value, inputEl) {
      console.log('change value ---->', value)
      console.log('change input dom ---->', inputEl)
    }

    return {
      change,
      keyBoardRef
    };
  },
});
</script>
