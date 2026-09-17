<script setup>
const props = defineProps({ name: String, kind: String, template: String, description: String })
const emit = defineEmits(['use'])
</script>
<template>
  <article class="template-card template-card-enter">
    <div :class="['template-preview', 'preview-' + template]">
      <div class="fake-head"><b>Alex Morgan</b><small>Senior Product Designer</small></div>
      <div class="fake-body"><i></i><i></i><i></i><strong>EXPERIENCE</strong><i></i><i></i><strong>SKILLS</strong><div class="fake-tags"><span></span><span></span><span></span></div></div>
    </div>
    <div class="template-info">
      <div><span :class="['kind-badge', kind === 'ATS Friendly' ? 'ats' : 'creative']">{{ kind }}</span><h3>{{ name }}</h3><p>{{ description }}</p></div>
      <button class="template-use" @click="emit('use', props.template)">Use template →</button>
    </div>
  </article>
</template>
