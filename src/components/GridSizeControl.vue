<script setup lang="ts">
import { ref, watch } from 'vue'
import { useGameState } from '../composables/useGameState'

const { dimensions, resize } = useGameState()

const rows = ref(dimensions.value.rows)
const cols = ref(dimensions.value.cols)

watch(dimensions, (d) => {
  rows.value = d.rows
  cols.value = d.cols
})

function applyResize() {
  const r = Math.max(5, Math.min(200, rows.value))
  const c = Math.max(5, Math.min(200, cols.value))
  rows.value = r
  cols.value = c
  resize({ rows: r, cols: c })
}
</script>

<template>
  <div class="grid-size-control">
    <label>Grid Size</label>
    <div class="inputs">
      <input
        type="number"
        v-model.number="rows"
        min="5"
        max="200"
        @keyup.enter="applyResize"
      />
      <span class="separator">×</span>
      <input
        type="number"
        v-model.number="cols"
        min="5"
        max="200"
        @keyup.enter="applyResize"
      />
    </div>
    <button @click="applyResize">Resize</button>
  </div>
</template>

<style scoped>
.grid-size-control {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.inputs {
  display: flex;
  align-items: center;
  gap: 4px;
}

.separator {
  color: var(--text-muted);
  font-size: 14px;
}

input[type="number"] {
  width: 52px;
}

button {
  width: 100%;
}
</style>
