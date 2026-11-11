<script setup>
import { ref, computed, watch } from 'vue'
import Checkpoint from './Checkpoint.vue'
import { markDone, isDone } from '../progress.js'

const props = defineProps({ page: { type: Object, required: true } })
const active = ref(0)
watch(active, () => window.scrollTo({ top: 0, behavior: 'smooth' }))

// Coddy embedded editor, dark theme. The starter code travels in the URL as URL-safe base64 (UTF-8).
function toBase64Url(text) {
  let bin = ''
  new TextEncoder().encode(text).forEach((b) => (bin += String.fromCharCode(b)))
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}
const editorSrc = computed(() =>
  'https://coddy.tech/embed-editor?lang=javascript&theme=dark&layout=stacked&credit=0&code='
  + toBase64Url(props.page.parts[active.value].code))

// Coddy's iframe is cross-origin, so its content height cannot be measured from here.
// Instead the height is calculated from the number of code lines. Adjust these three numbers
// if the editor ever shows a scrollbar (raise LINE_PX) or too much empty space (lower them).
const LINE_PX = 22     // height of one code line
const CHROME_PX = 60   // toolbar and padding above the code
const OUTPUT_PX = 200  // output panel below the code (stacked layout)
const editorHeight = computed(() => {
  const lines = props.page.parts[active.value].code.split('\n').length
  return Math.max(420, CHROME_PX + lines * LINE_PX + OUTPUT_PX)
})

// Hidden parts show up only after the checkpoint of the part before them is solved.
const visible = computed(() => {
  let n = 0
  return props.page.parts
    .map((p, i) => ({ p, i, label: p.bonus ? '+' : ++n }))
    .filter(({ p, i }) => !p.hidden || isDone(props.page.title, i - 1))
})

const next = computed(() => props.page.parts[active.value + 1])
const unlockMessage = computed(() =>
  next.value && next.value.hidden ? 'Új bónusz rész nyílt meg: ' + next.value.name : '')
</script>

<template>
  <section class="intro">
    <h1>{{ page.title }}</h1>
    <p>{{ page.intro }}</p>
  </section>
  <div class="layout">
    <nav class="parts" aria-label="Az oldal algoritmusai">
      <button v-for="v in visible" :key="v.p.name" :class="{ on: v.i === active, bonus: v.p.bonus }" @click="active = v.i">
        <b>{{ v.label }}</b> {{ v.p.name }}
      </button>
    </nav>
    <article :key="active" class="part">
      <h2>{{ page.parts[active].name }}</h2>
      <p class="idea">{{ page.parts[active].idea }}</p>
      <h3>Hogyan működik</h3>
      <ol><li v-for="s in page.parts[active].steps" :key="s">{{ s }}</li></ol>
      <p class="takeaway"><b>Amit megtudtunk:</b> {{ page.parts[active].takeaway }}</p>
      <h3>Próbáld ki</h3>
      <p class="hint">Futtasd a kódot az alábbi szerkesztőben, és olvasd el a kimenetet. Szerkesztheted is, és kipróbálhatsz saját értékeket.</p>
      <div class="embed">
        <iframe title="Kódszerkesztő (Coddy)" :src="editorSrc" :style="{ height: editorHeight + 'px' }" allow="clipboard-write" loading="lazy"></iframe>
        <p class="credit">Powered by <a href="https://coddy.tech/embed" target="_blank" rel="noopener">Coddy</a></p>
      </div>
      <Checkpoint :key="active" :checks="page.parts[active].checks" :unlock-message="unlockMessage"
        @complete="markDone(page.title, active)" @goto="active = active + 1" />
      <section v-if="page.parts[active].conclusion" class="conclusion">
        <h3>Következtetés</h3>
        <p>{{ page.parts[active].conclusion }}</p>
      </section>
    </article>
  </div>
</template>
