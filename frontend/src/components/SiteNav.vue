<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import ThemeToggle from './ThemeToggle.vue'
const open = ref(false); const scrolled = ref(false)
function onScroll() { scrolled.value = window.scrollY > 18 }
onMounted(() => { onScroll(); window.addEventListener('scroll', onScroll, { passive: true }) })
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>
<template>
  <header :class="['site-nav-wrap', scrolled ? 'scrolled' : '']">
    <nav class="site-nav wrap">
      <router-link to="/" class="brand">CV<span>Forge</span></router-link>
      <button class="mobile-menu" @click="open = !open" aria-label="Toggle menu">☰</button>
      <div :class="['nav-links', open ? 'open' : '']">
        <router-link to="/templates" @click="open = false">Templates</router-link>
        <a href="/#features" @click="open = false">Features</a>
        <a href="/#tips" @click="open = false">Resume tips</a>
      </div>
      <div class="nav-actions desktop-actions">
        <ThemeToggle />
        <router-link to="/dashboard" class="btn">Open workspace <span>↗</span></router-link>
      </div>
    </nav>
  </header>
</template>
