<script setup lang="ts">
import { ref, computed } from 'vue'
import Fuse from 'fuse.js'
import throttle from 'lodash/throttle'

const props = defineProps({
  transliteration: String,
  meanings: String
})

const tooltip = ref('')
const tooltipPosition = ref([ 0, 0 ])

const dictionary = computed(() => {
  const meanings = (props.meanings || '').split(';')
  return new Fuse(meanings)
})

const onHover = throttle((event: MouseEvent) => {
  const target = event.target as HTMLElement
  const word = target.innerText.trim()

  const meaning = dictionary.value.search(word)
  if (meaning) {
    const bbox = target.getBoundingClientRect()

    tooltip.value = meaning[0].item
    tooltipPosition.value = [bbox.left, bbox.bottom]
  }
}, 200);

const onLeave = () => {
  tooltip.value = ''
}

const lines = computed(() => (props.transliteration || '').split('\n').slice(0, -1).map(line => line.split(' ')))
</script>

<template>
  <p v-for="line in lines">
    <span v-for="word in line" @mouseenter="onHover" @mouseleave="onLeave" @click="onHover">
      {{ word + ' ' }}
    </span>
  </p>

  <div className="tooltip" v-if="tooltip" :style="`left: ${tooltipPosition[0]}px; top: ${tooltipPosition[1]}px`">
   {{ tooltip }}
  </div>
</template>

<style>
@keyframes fade-in {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

.tooltip {
  border: 2px double #333;
  border-radius: 4px;
  padding: 1rem;
  display: inline-block;
  position: absolute;
  background: #fff;
  animation: fade-in 200ms;
}

span:hover {
  background: yellow;
}
</style>