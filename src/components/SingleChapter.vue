<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import ChapterNav from './ChapterNav.vue'
import AnnotatedText from './AnnotatedText.vue'
import WaveformPlayer from './WaveformPlayer.vue'

import allVerses from '../../public/gita/data/verse.json'
import chapters from '../../public/gita/data/chapters.json'

// Access the id parameter from the route
const route = useRoute()
const chapterId = ref(Number(route.params.id))

watchEffect(() => {
  chapterId.value = Number(route.params.id)
})

const chapter = computed(() => chapters.find((item) => item.id === chapterId.value) || chapters[0])
const verses = computed(() => allVerses.filter((item) => item.chapter_id === chapterId.value))
const lastChapterId = computed(() => chapters[chapters.length - 1].chapter_number)
</script>

<template>
  <header>
    <ChapterNav :chapterId="chapterId" :lastChapterId="lastChapterId" />
  </header>

  <main>
    <h1>Chapter {{ chapter.chapter_number }}</h1>
    <h2>{{ chapter.name }} / {{ chapter.name_transliterated }} / {{ chapter.name_meaning }}</h2>

    <section v-for="verse of verses" v-bind:key="verse.verse_number">
      <AnnotatedText :text="verse.text" :meanings="verse.word_meanings" />

      <WaveformPlayer :chapterNumber="chapter.chapter_number" :verseNumber="verse.verse_number" />

      <p>
        {{ verse.word_meanings.split('; ').join('\n') }}
      </p>
    </section>
  </main>

  <footer>
    <ChapterNav :chapterId="chapterId" :lastChapterId="lastChapterId" />
  </footer>
</template>

<style>
section {
  display: flex;
  flex-direction: column;
  gap: 4rem;
  font-size: 1.2em;
  width: 60ex;
  margin-bottom: 4rem;
  padding-bottom: 4rem;
  border-bottom: 1px solid var(--border-color);
}

@media (max-width: 800px) {
  section {
    width: 100%;
  }
}

section p {
  white-space: pre-wrap;
}
</style>
