<script setup>
import { theme, toggleTheme } from '../utils/theme'
</script>
<template>
  <button class="theme-toggle" type="button" :title="theme === 'dark' ? 'Use light mode' : 'Use dark mode'" @click="toggleTheme">
    <span>{{ theme === 'dark' ? '☀' : '☾' }}</span>
    <small>{{ theme === 'dark' ? 'Light' : 'Dark' }}</small>
  </button>
</template>
