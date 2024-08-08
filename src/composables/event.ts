import { onBeforeUnmount, onMounted } from 'vue'

export function useEvent(target: Window | HTMLElement, eventName: string, callback: (e: any) => void) {
  onMounted(() => {
    target.addEventListener(eventName, callback)
  })
  onBeforeUnmount(() => {
    target.removeEventListener(eventName, callback)
  })
}
