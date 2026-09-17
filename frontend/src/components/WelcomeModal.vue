<script setup>
import { computed, ref } from 'vue'
import { getLocalProfile, saveLocalProfile } from '../services/data'

const existing = getLocalProfile()
const visible = ref(!existing?.name)
const name = ref(existing?.name || '')
const error = ref('')
const canContinue = computed(() => name.value.trim().length >= 2)

function submit() {
  const clean = name.value.trim().replace(/\s+/g, ' ')
  if (clean.length < 2) {
    error.value = 'Please enter your name so we can personalize your workspace.'
    return
  }
  saveLocalProfile({ name: clean })
  visible.value = false
  window.dispatchEvent(new CustomEvent('cvforge-profile-updated'))
}
</script>

<template>
  <div v-if="visible" class="welcome-overlay">
    <section class="welcome-card" role="dialog" aria-modal="true" aria-labelledby="welcome-title">
      <div class="welcome-mark">✦</div>
      <span class="eyebrow">WELCOME TO CVFORGE</span>
      <h2 id="welcome-title">Let’s make this workspace yours.</h2>
      <p>Your resumes stay on this browser. Start by telling us what to call you.</p>
      <label>Your name
        <input v-model="name" autofocus maxlength="60" placeholder="e.g. Mosab" @keyup.enter="submit">
      </label>
      <p v-if="error" class="welcome-error">{{ error }}</p>
      <button class="btn welcome-continue" :disabled="!canContinue" @click="submit">Enter my workspace →</button>
      <small class="welcome-privacy">No account, no password, no cloud sync.</small>
    </section>
  </div>
</template>
