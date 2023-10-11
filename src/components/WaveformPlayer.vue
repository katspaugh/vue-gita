<script setup lang="ts">
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import WaveSurfer from 'wavesurfer.js'

const props = defineProps({
  chapterNumber: Number,
  verseNumber: Number
})

const container = ref(null)
const isVisible = ref(false)
const isPlaying = ref(false)
let wavesurfer: WaveSurfer

const { stop } = useIntersectionObserver(container, ([{ isIntersecting }]) => {
  if (container.value && isIntersecting && !isVisible.value) {
    isVisible.value = true
    stop()

    const isDark = matchMedia('(prefers-color-scheme: dark)').matches

    wavesurfer = WaveSurfer.create({
      url: '/gita/data/verse_recitation/' + props.chapterNumber + '/' + props.verseNumber + '.mp3',
      container: container.value,
      height: 30,
      waveColor: isDark ? '#eee' : '#333',
      progressColor: isDark ? '#555' : '#333',
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
      }
    })

    wavesurfer.on('play', () => {
      isPlaying.value = true
    })
    wavesurfer.on('pause', () => {
      isPlaying.value = false
    })
  }
})

const onClick = () => {
  wavesurfer?.playPause()
}
</script>

<template>
  <div className="player">
    <button @click="onClick">
      {{ isPlaying ? '⏸' : '▸' }}
    </button>
    <div ref="container"></div>
  </div>
</template>

<style>
.player {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 3.5rem;
  gap: 1rem;
}

.player div {
  flex: 1;
}

.player button {
  border-radius: 100%;
  border: none;
  padding: 1rem;
  text-align: center;
  width: 50px;
  height: 50px;
  font-size: 30px;
  line-height: 20px;
  font-family: sans-serif;
}

.player button:hover {
  background-color: #ddd;
}

.player button:active {
  background-color: #ccc;
}
</style>
