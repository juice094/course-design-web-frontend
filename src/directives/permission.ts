import type { Directive } from 'vue'
import { useUserStore } from '@/stores/user'

export const permissionDirective: Directive = {
  mounted(el, binding) {
    const userStore = useUserStore()
    const code = binding.value as string
    if (!userStore.checkButton(code)) {
      el.style.display = 'none'
    }
  },
  updated(el, binding) {
    const userStore = useUserStore()
    const code = binding.value as string
    el.style.display = userStore.checkButton(code) ? '' : 'none'
  }
}
