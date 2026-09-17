<script setup>
import { computed } from 'vue'
import { findJobProfile, makeSummary, suggestedSkills, suggestedResponsibilities, suggestedKeywords } from '../utils/jobProfiles'
const props = defineProps({ title: String, resume: Object })
const emit = defineEmits(['add-skill', 'use-summary', 'add-responsibility'])
const profile = computed(() => findJobProfile(props.title))
const skills = computed(() => suggestedSkills(props.title).filter(s => !(props.resume?.skills || []).map(x => x.toLowerCase()).includes(s.toLowerCase())))
const summary = computed(() => makeSummary(props.title, props.resume))
const responsibilities = computed(() => suggestedResponsibilities(props.title))
const keywords = computed(() => suggestedKeywords(props.title))
</script>
<template>
    <div class="career-assistant">
        <div class="assistant-top">
            <div class="assistant-icon">✦</div>
            <div><span class="eyebrow">CAREER ASSISTANT</span>
                <h3>{{ title ? `Suggestions for ${title}` : 'Type a job title to get smart suggestions' }}</h3>
            </div><span class="local-badge">Works locally</span>
        </div>
        <template v-if="title">
            <div class="assistant-block">
                <div class="assistant-label"><b>Recommended skills</b><small>Click to add</small></div>
                <div class="suggestion-chips"><button v-for="s in skills.slice(0, 12)" :key="s"
                        @click="$emit('add-skill', s)">＋ {{ s }}</button><span v-if="!skills.length">You already added the
                        main skills ✓</span></div>
            </div>
            <div class="assistant-block">
                <div class="assistant-label"><b>Suggested professional summary</b><button
                        @click="$emit('use-summary', summary)">Use summary</button></div>
                <p class="summary-suggestion">{{ summary }}</p>
            </div>
            <div class="assistant-block">
                <div class="assistant-label"><b>Experience bullet ideas</b><small>Add to an experience entry</small>
                </div>
                <div class="bullet-suggestions">
                    <div v-for="(r, i) in responsibilities" :key="i"><span>{{ r }}</span><button
                            @click="$emit('add-responsibility', r)">Use</button></div>
                </div>
            </div>
            <div class="assistant-block">
                <div class="assistant-label"><b>Useful role vocabulary</b><small>Ideas to use only when they genuinely describe your experience</small></div>
                <div class="keyword-pills"><span v-for="k in keywords" :key="k">{{ k }}</span></div>
            </div>
        </template>
    </div>
</template>
