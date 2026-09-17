<script setup>
import { computed } from "vue";
const props = defineProps({
  resume: Object,
  template: String,
  language: { type: String, default: "" },
  fontFamily: { type: String, default: "" },
});
const isCreative = () =>
  ["creative-sidebar", "executive", "bold", "elegant"].includes(props.template);
const lang = computed(() => props.language || props.resume?.language || "en");
const resumeFont = computed(
  () =>
    props.fontFamily ||
    (lang.value === "ar"
      ? props.resume?.design?.fontAr || "Tajawal"
      : props.resume?.design?.fontEn || "Manrope"),
);
const labels = computed(() =>
  lang.value === "ar"
    ? {
        profile: "الملخص المهني",
        experience: "الخبرات العملية",
        education: "التعليم",
        projects: "المشاريع",
        skills: "المهارات",
        languages: "اللغات",
        name: "اسمك",
        title: "المسمى الوظيفي",
      }
    : {
        profile: "Profile",
        experience: "Experience",
        education: "Education",
        projects: "Projects",
        skills: "Skills",
        languages: "Languages",
        name: "Your Name",
        title: "Professional Title",
      },
);
</script>
<template>
  <div
    class="resume-sheet"
    :dir="lang === 'ar' ? 'rtl' : 'ltr'"
    :lang="lang"
    :style="{ fontFamily: `'${resumeFont}', sans-serif` }"
    :class="[
      'tpl-' + template,
      { 'creative-template': isCreative(), 'resume-ar': lang === 'ar' },
    ]"
  >
    <aside v-if="template === 'creative-sidebar'" class="resume-side">
      <div class="side-monogram">
        {{
          (resume.personal.name || "YN")
            .split(" ")
            .map((x) => x[0])
            .slice(0, 2)
            .join("")
            .toUpperCase()
        }}
      </div>
      <div v-if="resume.skills?.filter(Boolean).length" class="side-block">
        <h4>{{ labels.skills }}</h4>
        <span v-for="(s, i) in resume.skills.filter(Boolean)" :key="i">{{
          s
        }}</span>
      </div>
      <div v-if="resume.languages?.length" class="side-block">
        <h4>{{ labels.languages }}</h4>
        <span v-for="(x, i) in resume.languages" :key="i"
          >{{ x.name }}<small>{{ x.level }}</small></span
        >
      </div>
    </aside>
    <main class="resume-main">
      <header>
        <h1>{{ resume.personal.name || labels.name }}</h1>
        <h2>{{ resume.personal.title || labels.title }}</h2>
        <p>
          {{
            [
              resume.personal.email,
              resume.personal.phone,
              resume.personal.location,
            ]
              .filter(Boolean)
              .join(" · ")
          }}
        </p>
        <p
          v-if="resume.personal.linkedin || resume.personal.website"
          class="links"
        >
          {{
            [resume.personal.linkedin, resume.personal.website]
              .filter(Boolean)
              .join(" · ")
          }}
        </p>
      </header>
      <section v-if="resume.personal.summary">
        <h3>{{ labels.profile }}</h3>
        <p>{{ resume.personal.summary }}</p>
      </section>
      <section v-if="resume.experience?.length">
        <h3>{{ labels.experience }}</h3>
        <article v-for="(x, i) in resume.experience" :key="i">
          <div class="row">
            <b>{{ x.role }}</b
            ><span>{{ x.period }}</span>
          </div>
          <strong>{{ x.company }}</strong>
          <p>{{ x.description }}</p>
        </article>
      </section>
      <section v-if="resume.education?.length">
        <h3>{{ labels.education }}</h3>
        <article v-for="(x, i) in resume.education" :key="i">
          <div class="row">
            <b>{{ x.degree }}</b
            ><span>{{ x.period }}</span>
          </div>
          <strong>{{ x.school }}</strong>
        </article>
      </section>
      <section v-if="resume.projects?.length">
        <h3>{{ labels.projects }}</h3>
        <article v-for="(x, i) in resume.projects" :key="i">
          <div class="row">
            <b>{{ x.name }}</b
            ><span>{{ x.link }}</span>
          </div>
          <p>{{ x.description }}</p>
        </article>
      </section>
      <section
        v-if="
          template !== 'creative-sidebar' &&
          resume.skills?.filter(Boolean).length
        "
      >
        <h3>{{ labels.skills }}</h3>
        <div class="skill-list">
          <span v-for="(s, i) in resume.skills.filter(Boolean)" :key="i">{{
            s
          }}</span>
        </div>
      </section>
      <section
        v-if="template !== 'creative-sidebar' && resume.languages?.length"
      >
        <h3>{{ labels.languages }}</h3>
        <div class="language-list">
          <span v-for="(x, i) in resume.languages" :key="i"
            ><b>{{ x.name }}</b
            >{{ x.level ? " — " + x.level : "" }}</span
          >
        </div>
      </section>
    </main>
  </div>
</template>
