import { shallowRef, ref, computed, watch } from 'vue'
import type { GridDimensions, Pattern, CellPosition } from '../engine/types'
import { createGrid, toggleCell, randomFill, setCells } from '../engine/grid'
import { nextGeneration } from '../engine/simulation'

// Glider pattern cells relative positions
const GLIDER_CELLS: CellPosition[] = [
  { row: 0, col: 1 },
  { row: 1, col: 2 },
  { row: 2, col: 0 },
  { row: 2, col: 1 },
  { row: 2, col: 2 },
]

function createGridWithGlider(dims: GridDimensions): Uint8Array {
  const grid = createGrid(dims)
  const centerRow = Math.floor(dims.rows / 2)
  const centerCol = Math.floor(dims.cols / 2)

  // Place glider centered at grid center, shifted 2 cells up and left
  const positions: CellPosition[] = GLIDER_CELLS.map(c => ({
    row: c.row + centerRow - 3,
    col: c.col + centerCol - 3,
  }))

  return setCells(grid, dims, positions, 1)
}

const dimensions = ref<GridDimensions>({ rows: 60, cols: 60 })
const grid = shallowRef<Uint8Array>(createGridWithGlider(dimensions.value))
const generation = ref(0)
const isRunning = ref(false)
const speed = ref(30)
const selectedPattern = ref<Pattern | null>(null)
const theme = ref<'light' | 'matrix'>('light')
const prevAliveCount = ref(0)
const showStats = ref(false)

let timerHandle: ReturnType<typeof setInterval> | null = null

function clearTimer() {
  if (timerHandle !== null) {
    clearInterval(timerHandle)
    timerHandle = null
  }
}

function startTimer() {
  clearTimer()
  timerHandle = setInterval(() => {
    step()
  }, 1000 / speed.value)
}

const aliveCount = computed(() => {
  const g = grid.value
  let count = 0
  for (let i = 0; i < g.length; i++) {
    count += g[i]
  }
  return count
})

const density = computed(() => {
  const total = dimensions.value.rows * dimensions.value.cols
  return total > 0 ? aliveCount.value / total : 0
})

const growthRate = computed(() => {
  if (prevAliveCount.value === 0) return 0
  return ((aliveCount.value - prevAliveCount.value) / prevAliveCount.value) * 100
})

function step() {
  prevAliveCount.value = aliveCount.value
  grid.value = nextGeneration(grid.value, dimensions.value)
  generation.value++
}

function start() {
  if (isRunning.value) return
  isRunning.value = true
  startTimer()
}

function stop() {
  isRunning.value = false
  clearTimer()
}

function clear() {
  stop()
  grid.value = createGrid(dimensions.value)
  generation.value = 0
  prevAliveCount.value = 0
}

function randomize(density = 0.3) {
  stop()
  grid.value = randomFill(dimensions.value, density)
  generation.value = 0
  prevAliveCount.value = 0
}

function resize(newDims: GridDimensions) {
  stop()
  dimensions.value = { ...newDims }
  grid.value = createGrid(newDims)
  generation.value = 0
}

function toggle(row: number, col: number) {
  grid.value = toggleCell(grid.value, dimensions.value, row, col)
}

function paintCell(row: number, col: number, alive: 0 | 1) {
  const dims = dimensions.value
  const idx = row * dims.cols + col
  if (grid.value[idx] !== alive) {
    const next = new Uint8Array(grid.value)
    next[idx] = alive
    grid.value = next
  }
}

function placePattern(pattern: Pattern, centerRow: number, centerCol: number) {
  const minRow = Math.min(...pattern.cells.map(c => c.row))
  const maxRow = Math.max(...pattern.cells.map(c => c.row))
  const minCol = Math.min(...pattern.cells.map(c => c.col))
  const maxCol = Math.max(...pattern.cells.map(c => c.col))

  const offsetRow = centerRow - Math.floor((maxRow - minRow) / 2)
  const offsetCol = centerCol - Math.floor((maxCol - minCol) / 2)

  const positions: CellPosition[] = pattern.cells.map(c => ({
    row: c.row + offsetRow - minRow,
    col: c.col + offsetCol - minCol,
  }))

  grid.value = setCells(grid.value, dimensions.value, positions, 1)
  selectedPattern.value = null
}

watch(speed, () => {
  if (isRunning.value) {
    startTimer()
  }
})

function toggleTheme() {
  theme.value = theme.value === 'light' ? 'matrix' : 'light'
}

function toggleShowStats() {
  showStats.value = !showStats.value
}

export function useGameState() {
  return {
    grid,
    dimensions,
    generation,
    isRunning,
    speed,
    selectedPattern,
    aliveCount,
    density,
    growthRate,
    theme,
    showStats,
    step,
    start,
    stop,
    clear,
    randomize,
    resize,
    toggle,
    paintCell,
    placePattern,
    toggleTheme,
    toggleShowStats,
  }
}
