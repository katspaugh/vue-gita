<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

import chapters from '../../gita/data/chapters.json'

</script>

<template>
  <main>
    <ol>
      <li v-for="chapter of chapters">
        <RouterLink :to="`/chapter-${chapter.chapter_number}`">
          {{ chapter.name }} / {{ chapter.name_transliterated }} / {{ chapter.name_meaning }}
        </RouterLink>
      </li>
    </ol>
  </main>
</template>

<style>
  main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  ol {
    margin: 2rem 0;
  }
</style>
