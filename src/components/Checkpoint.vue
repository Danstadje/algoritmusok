<script setup>
import { reactive, computed, watch } from 'vue'
const props = defineProps({
  checks: { type: Array, default: () => [] },
  unlockMessage: { type: String, default: '' },
})
const emit = defineEmits(['complete', 'goto'])
const picked = reactive({})
const allDone = computed(() => props.checks.length > 0 && props.checks.every((c, i) => picked[i] === c.answer))
watch(allDone, (v) => { if (v) emit('complete') })
</script>

<template>
  <section v-if="checks.length" class="checkpoint">
    <h3>Ellenőrző pont</h3>
    <div v-for="(c, i) in checks" :key="i" class="check">
      <p class="q">{{ c.q }}</p>

      <div v-if="c.type === 'code'" class="codeblock">
        <pre>{{ c.before }}</pre>
        <pre class="slot" :class="{ empty: picked[i] === undefined }">{{ picked[i] === undefined ? '  // ??? válassz egy részletet az alábbiak közül' : c.options[picked[i]] }}</pre>
        <pre>{{ c.after }}</pre>
      </div>

      <button v-for="(o, j) in c.options" :key="j" class="opt" :class="{ mono: c.type === 'code', right: picked[i] === j && j === c.answer, wrong: picked[i] === j && j !== c.answer }"
        @click="picked[i] = j">{{ o }}</button>

      <p v-if="picked[i] === c.answer" class="fb ok">Helyes! {{ c.why || 'Ez a részlet teszi működővé a kódot.' }}</p>
      <p v-else-if="picked[i] !== undefined" class="fb bad">Nem egészen.{{ c.hint ? ' Tipp: ' + c.hint : ' Gondold át, és válassz újra.' }}</p>
    </div>
    <div v-if="allDone && unlockMessage" class="unlock">
      <p>{{ unlockMessage }}</p>
      <button class="go" @click="emit('goto')">Ugrás a bónusz részre</button>
    </div>
  </section>
</template>
