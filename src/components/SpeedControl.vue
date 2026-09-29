<script setup lang="ts">
import { useGameState } from '../composables/useGameState'

const { speed } = useGameState()
</script>

<template>
  <div class="speed-control">
    <label>Speed: {{ speed }} gen/s</label>
    <input
      type="range"
      min="1"
      max="60"
      :value="speed"
      @input="speed = Number(($event.target as HTMLInputElement).value)"
    />
  </div>
</template>

<style scoped>
.speed-control {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
</style>
