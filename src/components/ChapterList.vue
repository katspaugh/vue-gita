<script setup lang="ts">
import { RouterLink } from 'vue-router'

import chapters from '../../public/gita/data/chapters.json'
</script>

<template>
  <header>
    <h1>The Bhagavad Gita</h1>
  </header>

  <main>
    <ol>
      <li v-for="chapter of chapters" v-bind:key="chapter.id">
        <RouterLink :to="`/chapter-${chapter.chapter_number}`">
          {{ chapter.name }} / {{ chapter.name_meaning }}
        </RouterLink>
      </li>
    </ol>
  </main>

  <footer>Based on <a href="https://github.com/gita/gita">https://github.com/gita/gita</a></footer>
</template>

<style>
header h1 {
  margin: 0;
}

ol {
  margin: 0;
  padding: 0;
}

ol li {
  margin-left: 2rem;
}

@media (min-width: 1000px) {
  ol {
    max-width: 30vw;
  }
}
</style>
