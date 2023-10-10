<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import { RouterLink } from 'vue-router'
import { useRoute } from 'vue-router'
import Words from './Words.vue'

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
  <main>
    <h1>Chapter {{ chapter.chapter_number }}</h1>
    <h2>{{ chapter.name }} / {{ chapter.name_transliterated }} / {{ chapter.name_meaning }}</h2>

    <section v-for="verse of verses">
      <p class="devanagari">
        {{ verse.text }}
      </p>

      <Words :meanings="verse.word_meanings" :transliteration="verse.transliteration" />
    </section>
  </main>

  <footer>
    <RouterLink :to="`/chapter-${chapterId - 1}`" v-if="chapterId > 1">
      ← Chapter {{ chapterId - 1 }}
    </RouterLink>

    <RouterLink to="/"> All chapters </RouterLink>

    <RouterLink :to="`/chapter-${chapterId + 1}`" v-if="chapterId < lastChapterId">
      Chapter {{ chapterId + 1 }} →
    </RouterLink>
  </footer>
</template>

<style>
h2 {
  margin-bottom: 3rem;
}

section {
  min-width: 30vw;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #ccc;
}

p {
  white-space: pre-wrap;
  line-height: 1.5;
  margin-bottom: 1rem;
}

p.devanagari {
  line-height: 1;
}

header,
footer,
main {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  gap: 1rem;
}

main {
  flex-direction: column;
}

footer {
  padding-bottom: 4rem;
}
</style>
