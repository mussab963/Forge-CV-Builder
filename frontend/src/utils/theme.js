import { ref } from 'vue'

const stored = typeof localStorage !== 'undefined' ? localStorage.getItem('cvforge_theme') : null
const initial = stored || (typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
export const theme = ref(initial)

export function applyTheme(value = theme.value) {
  theme.value = value
  if (typeof document !== 'undefined') document.documentElement.dataset.theme = value
  if (typeof localStorage !== 'undefined') localStorage.setItem('cvforge_theme', value)
}

export function toggleTheme() {
  applyTheme(theme.value === 'dark' ? 'light' : 'dark')
}

if (typeof document !== 'undefined') applyTheme(initial)
