<template>
  123
  <el-input
    ref="inputRef"
    v-model="model"
    @focus="focusInput"
    @blur="blurInput"
    @keyup.enter="handleEnter"
    v-bind="$attrs"
  >
    <template v-for="(item, index) in $slots" :key="index" #[index]>
      <slot :name="index"></slot>
    </template>
  </el-input>

  <div class="simple-keyboard"></div>


</template>

<script setup lang="ts">
import Keyboard from 'simple-keyboard'
import 'simple-keyboard/build/css/index.css'
import layout from 'simple-keyboard-layouts/build/layouts/chinese.js'
import { onMounted, onUnmounted, ref } from 'vue'
// import { debounce } from '@/utils/utils.js'
defineOptions({
  inheritAttrs: false
})
const model = defineModel<string>()
const emits = defineEmits(['onChange', 'enter', 'close', 'focus'])
const props = defineProps({
  layoutName: {
    type: String,
    default: 'default'
  },
  // 保留几位小数 layoutName为number时生效
  precision: {
    type: Number,
    default: 2
  },
  // 获取焦点打开键盘
  isOpen: {
    type: Boolean,
    default: true
  }
})
const keyboard = ref<any>(null)
const visible = ref(false)
const inputRef = ref()
const popoverRef = ref()
const entering = ref(false)
const width = ref(1000)
if (props.layoutName == 'number') width.value = 300
const displayDefault = ref({
  '{bksp}': 'backspace',
  '{lock}': 'caps',
  '{enter}': 'enter',
  '{tab}': 'tab',
  '{shift}': 'shift',
  '{change}': 'en',
  '{space}': 'space',
  '{clear}': '清空',
  '{close}': '关闭',
  '{arrowleft}': '←',
  '{arrowright}': '→'
})

const open = () => {
  if (visible.value) return
  inputRef.value.focus()
  emits('focus')
  visible.value = true
}

const focusInput = () => {
  if (visible.value) return
  emits('focus')
  if (props.isOpen) visible.value = true
}

// const blurInput = debounce(() => {
//  if (!entering.value) {
//    handleClose()
//  } else {
//    entering.value = false
//  }
// }, 100)

const blurInput = () => {
  setTimeout(()=>{
    if (!entering.value) {
      handleClose()
    } else {
      entering.value = false
    }
  },100)
}


const afterEnter = () => {
  // 存在上一个实例时移除元素
  const prevKeyboard = document.querySelectorAll('.init-keyboard')
  if (prevKeyboard.length > 0) prevKeyboard[0]?.remove()
  keyboard.value = new Keyboard('simple-keyboard', {
    onChange: onChange,
    onKeyPress: onKeyPress,
    onInit: onInit,
    layoutCandidates: (layout as any).layoutCandidates,
    layout: {
      // 默认布局
      default: [
        '` 1 2 3 4 5 6 7 8 9 0 - = {bksp}',
        '{tab} q w e r t y u i o p [ ] \\',
        "{lock} a s d f g h j k l ; ' {enter}",
        '{change} z x c v b n m , . / {clear}',
        '{arrowleft} {arrowright} {space} {close}'
      ],
      // 大小写
      shift: [
        '~ ! @ # $ % ^ & * ( ) _ + {bksp}',
        '{tab} Q W E R T Y U I O P { } |',
        '{lock} A S D F G H J K L : " {enter}',
        '{change} Z X C V B N M < > ? {clear}',
        '{arrowleft} {arrowright} {space} {close}'
      ],
      // 数字布局
      number: ['7 8 9', '4 5 6', '1 2 3', '. 0 {bksp}', '{arrowleft} {arrowright} {clear} {close}']
    },
    layoutName: props.layoutName,
    display: displayDefault.value,
    theme: 'hg-theme-default init-keyboard' // 添加自定义class处理清空逻辑
  })
}

const beforeLeave = () => {
  visible.value = false
  entering.value = false
  inputRef.value.blur()
  displayDefault.value['{change}'] = 'en'
  document.removeEventListener('click', handlePopClose)
}

const onInit = (keyboard: any) => {
  keyboard.setInput(model.value)
  keyboard.setCaretPosition(inputRef.value?.ref.selectionEnd)
  document.addEventListener('click', handlePopClose)
}
const onChange = (input: any) => {
  model.value = input
  emits('onChange', input)
}

const onKeyPress = (button: any) => {
  if (button === '{lock}') return handleLock()
  if (button === '{change}') return handleChange()
  if (button === '{clear}') return handleClear()
  if (button === '{enter}') return handleEnter()
  if (button === '{close}') return handleClose()
  if (button === '{arrowleft}') return handleArrow(0)
  if (button === '{arrowright}') return handleArrow(1)
}
const handleLock = () => {
  entering.value = true
  let currentLayout = keyboard.value.options.layoutName
  let shiftToggle = currentLayout === 'default' ? 'shift' : 'default'

  keyboard.value.setOptions({
    layoutName: shiftToggle
  })
}
const handleChange = () => {
  entering.value = true
  let layoutCandidates = keyboard.value.options.layoutCandidates
  // 切换中英文输入法
  if (layoutCandidates != null && layoutCandidates != undefined) {
    displayDefault.value['{change}'] = 'en'
    keyboard.value.setOptions({
      layoutName: 'default',
      layoutCandidates: null,
      display: displayDefault.value
    })
  } else {
    displayDefault.value['{change}'] = 'cn'
    keyboard.value.setOptions({
      layoutName: 'default',
      layoutCandidates: (layout as any).layoutCandidates,
      display: displayDefault.value
    })
  }
}
const handleClear = () => {
  keyboard.value.clearInput()
  model.value = ''
}
const handleEnter = () => {
  emits('enter')
}
const handleClose = () => {
  if (props.layoutName == 'number') {
    // 处理精度
    model.value = model.value?.replace(new RegExp(`(\\d+)\\.(\\d{${props.precision}}).*$`), '$1.$2').replace(/\.$/, '')
  }
  popoverRef.value.hide()
  emits('close')
}
const handleArrow = (num: number) => {
  // 处理左右箭头下标位置
  const index = keyboard.value.getCaretPositionEnd()
  if (num == 0 && index - 1 >= 0) {
    keyboard.value.setCaretPosition(index - 1)
  } else if (num == 1 && index + 1 <= (model.value?.length || 0)) {
    keyboard.value.setCaretPosition(index + 1)
  }
}

const handlePopClose = (e: any) => {
  // 虚拟键盘区域 输入框区域 中文选项区域
  if (
    (e.target as Element).closest('.keyboard-popper') ||
    e.target == inputRef.value?.ref ||
    /hg-candidate-box/.test(e.target.className)
  ) {
    entering.value = true
    const index = keyboard.value.getCaretPositionEnd()
    inputRef.value.ref.selectionStart = inputRef.value.ref.selectionEnd = index
    inputRef.value.focus()
  }
}

const close = () => {
  handleClose()
}

onMounted(() => {
  afterEnter()
})

onUnmounted(() => {
  // 某些情况下未触发动画关闭时销毁事件。此处销毁做后备处理
  document.removeEventListener('click', handlePopClose)
})

defineExpose({ inputRef, visible, open, close })
</script>

<style lang="less" scoped>

</style>

