<script setup lang="ts">
import { defineProps, toRefs } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  chapterId: Number,
  lastChapterId: Number
})

const { chapterId = 0, lastChapterId = 0 } = toRefs(props)
</script>

<template>
  <nav>
    <RouterLink :to="`/chapter-${chapterId - 1}`" v-if="chapterId > 1">
      ← Chapter {{ chapterId - 1 }}
    </RouterLink>

    <RouterLink to="/">All chapters</RouterLink>

    <RouterLink :to="`/chapter-${chapterId + 1}`" v-if="chapterId < lastChapterId">
      Chapter {{ chapterId + 1 }} →
    </RouterLink>
  </nav>
</template>

<style>
nav {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}
</style>
