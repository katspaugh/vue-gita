<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import ChapterNav from './ChapterNav.vue'
import Words from './Words.vue'
import Waveform from './Waveform.vue'

import allVerses from '../../gita/data/verse.json'
import chapters from '../../gita/data/chapters.json'

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
      <Words :text="verse.text" :meanings="verse.word_meanings" />

      <Waveform :chapterNumber="chapter.chapter_number" :verseNumber="verse.verse_number" />
    </section>
  </main>

  <footer>
    <ChapterNav :chapterId="chapterId" :lastChapterId="lastChapterId" />
  </footer>
</template>

<style>
h1 {
  margin-bottom: 1rem;
}

h2 {
  margin-bottom: 5rem;
  padding: 0 1rem;
}

section {
  font-size: 1.2em;
  min-width: 40ex;
  margin-bottom: 4rem;
  padding-bottom: 4rem;
  border-bottom: 1px solid #ccc;
}

header,
footer,
main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}

header, footer {
  background: #eee;
}

header {
  margin-bottom: 4rem;
}

footer {
  margin-top: 4rem;
}
</style>
