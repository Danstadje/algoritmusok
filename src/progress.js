import { reactive } from 'vue'

// Which parts the learner has finished (all checkpoint tasks solved).
// It lives for the whole session, so progress survives page changes (but not a reload).
export const progress = reactive({})
export const markDone = (page, i) => { progress[page + ':' + i] = true }
export const isDone = (page, i) => !!progress[page + ':' + i]
