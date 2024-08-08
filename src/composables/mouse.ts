import { type Ref, ref } from 'vue'
import { useEvent } from '@/composables/event'

export function useMouse(){
  const x: Ref<number> = ref(0)
  const y: Ref<number> = ref(0)

  const mouseMoveFn = (e: MouseEvent): void => {
    x.value = e.pageX
    y.value = e.pageY

    console.log('mouseMoveFn', x.value, y.value)
  }
  useEvent(window, 'mousemove', mouseMoveFn)

  return { x, y }
}
