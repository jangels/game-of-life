<script setup lang="ts">
import { ref } from 'vue'
import { useCanvasRenderer } from '../composables/useCanvasRenderer'

const canvasRef = ref<HTMLCanvasElement | null>(null)
const {
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
  handleMouseLeave,
  handleTouchStart,
  handleTouchMove,
  handleTouchEnd,
} = useCanvasRenderer(canvasRef)
</script>

<template>
  <div class="canvas-container">
    <canvas
      ref="canvasRef"
      @mousedown="handleMouseDown"
      @mousemove="handleMouseMove"
      @mouseup="handleMouseUp"
      @mouseleave="handleMouseLeave"
      @touchstart.prevent="handleTouchStart"
      @touchmove.prevent="handleTouchMove"
      @touchend.prevent="handleTouchEnd"
      @touchcancel.prevent="handleTouchEnd"
    />
  </div>
</template>

<style scoped>
.canvas-container {
  flex: 1;
  width: 100%;
  overflow: hidden;
  position: relative;
}

canvas {
  display: block;
  cursor: crosshair;
}
</style>
