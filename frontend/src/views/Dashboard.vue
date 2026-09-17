<script setup>
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import ThemeToggle from '../components/ThemeToggle.vue'
import { createResume, deleteResume, duplicateResume, getSessionUser, listResumes, saveLocalProfile } from '../services/data'

const router = useRouter(); const resumes = ref([]); const user = ref({}); const loading = ref(true); const error = ref(''); const menuOpen = ref(null); const editingName = ref(false); const draftName = ref('')
const completeCount = computed(() => resumes.value.filter(r => progress(r) >= 75).length)
const firstName = computed(() => user.value.name?.split(' ')[0] || 'there')
const tipIndex = computed(() => new Date().getDate() % tips.length)
const tips = [
  { icon:'◎', title:'Lead with outcomes', text:'Turn duties into impact: what changed because of your work? Add numbers when they are meaningful.' },
  { icon:'✦', title:'Keep the first third strong', text:'Recruiters scan quickly. Put your target title, strongest summary and most relevant experience near the top.' },
  { icon:'↗', title:'Tailor the story', text:'Duplicate your base resume and adjust the summary, skills and bullet order for each opportunity.' },
  { icon:'✓', title:'Make every line earn its space', text:'Remove repetition, vague adjectives and old details that do not support the role you want next.' },
  { icon:'Aa', title:'Readable beats decorative', text:'Use consistent spacing, concise sections and a typeface that stays comfortable at normal print size.' },
]
function progress(r){const d=r.data||{},p=d.personal||{};let s=0;if(p.name)s+=12;if(p.title)s+=10;if(p.email)s+=8;if((p.summary||'').length>60)s+=15;if(d.experience?.length)s+=22;if(d.education?.length)s+=10;if(d.skills?.filter(Boolean).length>=5)s+=15;if(d.languages?.length||p.linkedin||p.website)s+=8;return Math.min(100,s)}
function timeAgo(date){if(!date)return 'Not saved yet';const mins=Math.floor((Date.now()-new Date(date))/60000);if(mins<2)return 'Just now';if(mins<60)return `${mins} min ago`;const h=Math.floor(mins/60);if(h<24)return `${h}h ago`;const d=Math.floor(h/24);return d===1?'Yesterday':`${d} days ago`}
async function load(){loading.value=true;error.value='';try{user.value=await getSessionUser();draftName.value=user.value.name||'';resumes.value=await listResumes()}catch(e){error.value=e.message}finally{loading.value=false}}
async function create(){try{const r=await createResume();router.push('/builder/'+r.id)}catch(e){error.value=e.message}}
async function remove(id){if(!confirm('Delete this resume from this browser?'))return;await deleteResume(id);await load()}
async function duplicate(id){await duplicateResume(id);menuOpen.value=null;await load()}
function saveName(){const clean=draftName.value.trim();if(clean.length<2)return;saveLocalProfile({name:clean});user.value.name=clean;editingName.value=false}
function profileUpdated(){load()}
onMounted(()=>{load();window.addEventListener('cvforge-profile-updated',profileUpdated)})
onBeforeUnmount(()=>window.removeEventListener('cvforge-profile-updated',profileUpdated))
</script>
<template><div class="app-shell">
<aside class="sidebar"><div><router-link to="/" class="brand">CV<span>Forge</span></router-link><span class="workspace-label">LOCAL WORKSPACE</span></div><nav><a class="active"><span>▦</span> Dashboard</a><a @click="create"><span>＋</span> New Resume</a><router-link to="/templates"><span>◫</span> Templates</router-link></nav><div class="profile"><div class="avatar">{{(user.name||'U')[0]?.toUpperCase()}}</div><div><b>{{user.name||'User'}}</b><small>Saved on this browser</small></div><button title="Edit name" @click="editingName=true">✎</button></div></aside>
<main class="dashboard">
<div class="dashboard-mobile-top"><router-link to="/" class="brand">CV<span>Forge</span></router-link><ThemeToggle/></div>
<header><div><p class="eyebrow">YOUR WORKSPACE</p><h1>Welcome, {{firstName}} 👋</h1><p>Build a strong base resume, then create focused versions for the opportunities that matter.</p></div><div class="dashboard-header-actions"><ThemeToggle/><button class="btn" @click="create">＋ Create Resume</button></div></header>
<div v-if="error" class="error dashboard-error">{{error}}</div>
<section class="dashboard-hero"><div><span class="dashboard-hero-icon">✦</span><div><small>YOUR NEXT STEP</small><h2>{{resumes.length ? 'Keep your strongest resume current' : 'Create your first professional resume'}}</h2><p>{{resumes.length ? 'Review the top section, sharpen one achievement, then export when it feels focused.' : 'Start with your essentials. You can switch between all 14 templates anytime without losing content.'}}</p></div></div><div class="quick-actions"><button @click="create"><span>＋</span><b>Start a resume</b><small>Guided builder</small></button><router-link to="/templates"><span>◫</span><b>Browse templates</b><small>14 layouts</small></router-link><a href="#daily-tip"><span>✦</span><b>Resume guidance</b><small>Practical tips</small></a></div></section>
<section class="stats"><div><span>Total Resumes</span><strong>{{resumes.length}}</strong><small>saved in this browser</small></div><div><span>Application Ready</span><strong>{{completeCount}}</strong><small>75%+ profile completion</small></div><div><span>Templates</span><strong class="accent">14</strong><small>7 ATS-friendly · 7 creative</small></div></section>
<section id="daily-tip" class="advice-strip"><div class="advice-icon">{{tips[tipIndex].icon}}</div><div><span class="eyebrow">RESUME TIP OF THE DAY</span><h3>{{tips[tipIndex].title}}</h3><p>{{tips[tipIndex].text}}</p></div><router-link to="/templates">Explore layouts →</router-link></section>
<div v-if="loading" class="dashboard-skeleton"><i v-for="n in 3" :key="n"></i></div>
<section v-else><div class="section-title"><div><span class="eyebrow">YOUR RESUMES</span><h2>Application library</h2></div><span>{{resumes.length}} {{resumes.length===1?'resume':'resumes'}}</span></div>
<div v-if="!resumes.length" class="empty"><div class="empty-icon">✦</div><h3>Your first resume starts here</h3><p>Add your story once, then explore different professional layouts whenever you want.</p><div class="empty-actions"><button class="btn" @click="create">Create Resume</button><router-link class="ghost bordered" to="/templates">Browse templates</router-link></div></div>
<div class="resume-grid"><article v-for="r in resumes" :key="r.id" class="resume-card" @click="router.push('/builder/'+r.id)"><div class="thumb"><div :class="['paper-lines','mini-'+r.template]"><b>{{r.data?.personal?.name||'Your Name'}}</b><small>{{r.data?.personal?.title||'Professional Title'}}</small><i></i><i></i><i></i><i></i></div><span class="card-progress-badge">{{progress(r)}}%</span><div class="card-hover-action">Continue editing →</div></div><div class="card-body"><div class="card-title-row"><div><h3>{{r.title}}</h3><small>Updated {{timeAgo(r.updatedAt)}}</small></div><button class="more-btn" @click.stop="menuOpen=menuOpen===r.id?null:r.id">•••</button><div v-if="menuOpen===r.id" class="card-menu" @click.stop><button @click="router.push('/builder/'+r.id)">Edit resume</button><button @click="duplicate(r.id)">Duplicate</button><button class="danger" @click="remove(r.id)">Delete</button></div></div><div class="progress-track"><i :style="{width:progress(r)+'%'}"></i></div><div class="card-meta"><span>{{progress(r)>=75?'Application ready':'Keep building'}}</span><span>{{r.template?.replaceAll('-',' ')}}</span></div></div></article></div></section>
</main>
<div v-if="editingName" class="welcome-overlay"><section class="welcome-card compact-welcome"><span class="eyebrow">PERSONALIZE WORKSPACE</span><h2>What should we call you?</h2><label>Your name<input v-model="draftName" @keyup.enter="saveName"></label><div class="welcome-actions"><button class="ghost bordered" @click="editingName=false">Cancel</button><button class="btn" @click="saveName">Save name</button></div></section></div>
</div></template>
