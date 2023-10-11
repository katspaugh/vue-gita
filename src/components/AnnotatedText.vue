<script setup lang="ts">
import { ref, computed } from 'vue'
import { vOnClickOutside } from '@vueuse/components'
import Fuse from 'fuse.js'
import Sanscript from '@indic-transliteration/sanscript'
import { splitLineWords } from '../utils/text'

const props = defineProps({
  text: String,
  meanings: String
})

const tooltip = ref('')
const tooltipPosition = ref([0, 0])

const dictionary = computed(() => {
  const meanings = (props.meanings || '').split('; ')
  return new Fuse(meanings)
})

const textLines = computed(() => splitLineWords(props.text || ''))

const onWordClick = (event: Event) => {
  const word = (event.target as HTMLElement).innerText.trim()
  const transliteratedWord = word && Sanscript.t(word, 'devanagari', 'iast')
  const meaning = transliteratedWord ? dictionary.value.search(transliteratedWord) : null

  if (meaning) {
    const target = event.target as HTMLElement
    const bbox = target.getBoundingClientRect()
    tooltip.value = meaning[0].item
    tooltipPosition.value = [bbox.left, bbox.bottom]
  } else {
    tooltip.value = ''
  }
}

const onClear = () => {
  tooltip.value = ''
}
</script>

<template>
  <div v-on-click-outside="onClear" className="container">
    <p v-for="(line, lineIndex) in textLines" v-bind:key="lineIndex">
      <span
        v-for="word in line"
        v-bind:key="word"
        @click="onWordClick"
        @focus="onWordClick"
        className="word"
        :tabIndex="/[^।\s0-9.]/.test(word) ? 1 : undefined"
      >
        {{ word }}
      </span>
    </p>

    <div
      className="tooltip"
      v-if="tooltip"
      :style="`left: ${tooltipPosition[0]}px; top: ${tooltipPosition[1]}px`"
    >
      {{ tooltip }}
    </div>
  </div>
</template>

<style>
.container {
  position: relative;
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.tooltip {
  border: 2px double #333;
  border-radius: 4px;
  padding: 1rem;
  display: inline-block;
  position: fixed;
  background: #fff;
  animation: fade-in 200ms;
  z-index: 10;
}

.word:focus {
  color: initial;
  background: yellow;
  border: 4px solid yellow;
  border-radius: 4px;
  margin: -4px;
}
</style>
