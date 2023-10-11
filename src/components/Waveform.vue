<script setup lang="ts">
import { computed, onMounted } from 'vue'
import WaveSurfer from 'wavesurfer.js'

const props = defineProps({
  chapterNumber: Number,
  verseNumber: Number,
})

onMounted(() => {
  const wavesurfer = WaveSurfer.create({
    url: '/data/verse_recitation/' + props.chapterNumber + '/' + props.verseNumber + '.mp3',
    container: '#waveform-' + props.chapterNumber + '-' + props.verseNumber,
    height: 50,
    waveColor: '#555',
    progressColor: '#000',
    renderFunction: (channels, ctx) => {
      const { width, height } = ctx.canvas
      const scale = channels[0].length / width

      ctx.translate(0, height / 2)
      ctx.strokeStyle = ctx.fillStyle
      ctx.beginPath()

      for (let i = 0; i < width; i++) {
        const peak = channels[0][Math.floor(i * scale)]
        ctx.lineTo(i, peak * height)
      }

      ctx.stroke()
      ctx.closePath()
    },
  })

  wavesurfer.on('click', () => wavesurfer.playPause())
})
</script>

<template>
  <div :id="`waveform-${props.chapterNumber}-${props.verseNumber}`"></div>
</template>

<style>
div[id^="waveform-"] {
  margin-top: 3rem;
}
</style>
