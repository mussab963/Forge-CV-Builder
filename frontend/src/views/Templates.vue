<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import SiteNav from '../components/SiteNav.vue'
import SiteFooter from '../components/SiteFooter.vue'
import TemplateCard from '../components/TemplateCard.vue'
import { resumeTemplates } from '../utils/templates'
import { createResume } from '../services/data'
const router = useRouter(); const filter = ref('all')
const visible = computed(() => filter.value === 'all' ? resumeTemplates : resumeTemplates.filter(t => filter.value === 'ats' ? t.kind === 'ATS Friendly' : t.kind === 'Creative'))
async function useTemplate(id) { const resume = await createResume('', id); router.push('/builder/' + resume.id) }
</script>
<template><div class="marketing-page"><SiteNav/>
<section class="page-hero wrap"><span class="eyebrow">14 PROFESSIONAL TEMPLATES</span><h1>Choose a layout that fits <em>your story.</em></h1><p>Seven clean ATS-friendly layouts and seven creative designs. Your content stays the same when you switch, so you can explore freely.</p><div class="template-filters"><button :class="{active:filter==='all'}" @click="filter='all'">All 14</button><button :class="{active:filter==='ats'}" @click="filter='ats'">ATS Friendly · 7</button><button :class="{active:filter==='creative'}" @click="filter='creative'">Creative · 7</button></div></section>
<section class="wrap template-gallery"><TemplateCard v-for="t in visible" :key="t.name" v-bind="t" @use="useTemplate"/></section>
<section class="template-cta"><div class="wrap"><div><span class="eyebrow">A SIMPLE RULE</span><h2>Choose clarity first, personality second.</h2><p>For application portals, start with an ATS-friendly layout. For direct outreach or creative roles, a visual template can add personality.</p></div><router-link to="/dashboard" class="btn big">Open workspace</router-link></div></section><SiteFooter/></div></template>
