import { ref, watch, onMounted, onUnmounted, type Ref } from 'vue'
import { useGameState } from './useGameState'
import { getCell } from '../engine/grid'

const THEME_COLORS = {
  light: {
    bg: '#ffffff',
    gridLine: '#e0e0e0',
    cell: '#000000',
    ghostCell: 'rgba(0, 0, 0, 0.3)',
    hover: 'rgba(0, 0, 0, 0.4)',
  },
  matrix: {
    bg: '#000000',
    gridLine: '#333333',
    cell: '#00ff00',
    ghostCell: 'rgba(0, 255, 0, 0.3)',
    hover: 'rgba(0, 255, 0, 0.4)',
  },
}

export function useCanvasRenderer(canvasRef: Ref<HTMLCanvasElement | null>) {
  const { grid, dimensions, selectedPattern, toggle, paintCell, placePattern, theme } = useGameState()
  const hoveredCell = ref<{ row: number; col: number } | null>(null)

  let ctx: CanvasRenderingContext2D | null = null
  let cellSize = 0
  let offsetX = 0
  let offsetY = 0
  let resizeObserver: ResizeObserver | null = null

  // Drawing state
  let isDrawing = false
  let drawValue: 0 | 1 = 1

  function calcLayout() {
    const canvas = canvasRef.value
    if (!canvas) return

    const parent = canvas.parentElement
    if (!parent) return

    const dpr = window.devicePixelRatio || 1
    const w = parent.clientWidth
    const h = parent.clientHeight

    canvas.width = w * dpr
    canvas.height = h * dpr
    canvas.style.width = `${w}px`
    canvas.style.height = `${h}px`

    ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.scale(dpr, dpr)

    const { rows, cols } = dimensions.value
    cellSize = Math.min(w / cols, h / rows)
    // Center the grid
    offsetX = (w - cellSize * cols) / 2
    offsetY = (h - cellSize * rows) / 2

    draw()
  }

  function draw() {
    const canvas = canvasRef.value
    if (!canvas || !ctx) return

    const dpr = window.devicePixelRatio || 1
    const w = canvas.width / dpr
    const h = canvas.height / dpr
    const { rows, cols } = dimensions.value
    const g = grid.value
    const colors = THEME_COLORS[theme.value]

    // Clear
    ctx.fillStyle = colors.bg
    ctx.fillRect(0, 0, w, h)

    if (cellSize <= 0) return

    // Grid lines
    ctx.strokeStyle = colors.gridLine
    ctx.lineWidth = 0.5

    for (let r = 0; r <= rows; r++) {
      const y = offsetY + r * cellSize
      ctx.beginPath()
      ctx.moveTo(offsetX, y)
      ctx.lineTo(offsetX + cols * cellSize, y)
      ctx.stroke()
    }
    for (let c = 0; c <= cols; c++) {
      const x = offsetX + c * cellSize
      ctx.beginPath()
      ctx.moveTo(x, offsetY)
      ctx.lineTo(x, offsetY + rows * cellSize)
      ctx.stroke()
    }

    // Alive cells
    const pad = Math.max(0.5, cellSize * 0.05)
    ctx.fillStyle = colors.cell
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (g[r * cols + c]) {
          ctx.fillRect(
            offsetX + c * cellSize + pad,
            offsetY + r * cellSize + pad,
            cellSize - pad * 2,
            cellSize - pad * 2,
          )
        }
      }
    }

    // Pattern ghost preview
    if (selectedPattern.value && hoveredCell.value) {
      const pat = selectedPattern.value
      const { row: cr, col: cc } = hoveredCell.value
      const minRow = Math.min(...pat.cells.map(c => c.row))
      const maxRow = Math.max(...pat.cells.map(c => c.row))
      const minCol = Math.min(...pat.cells.map(c => c.col))
      const maxCol = Math.max(...pat.cells.map(c => c.col))

      const offR = cr - Math.floor((maxRow - minRow) / 2) - minRow
      const offC = cc - Math.floor((maxCol - minCol) / 2) - minCol

      ctx.fillStyle = colors.ghostCell
      for (const cell of pat.cells) {
        const pr = cell.row + offR
        const pc = cell.col + offC
        if (pr >= 0 && pr < rows && pc >= 0 && pc < cols) {
          ctx.fillRect(
            offsetX + pc * cellSize + pad,
            offsetY + pr * cellSize + pad,
            cellSize - pad * 2,
            cellSize - pad * 2,
          )
        }
      }
    }

    // Hover highlight (only when not in pattern mode)
    if (!selectedPattern.value && hoveredCell.value) {
      const { row, col } = hoveredCell.value
      ctx.strokeStyle = colors.hover
      ctx.lineWidth = 1.5
      ctx.strokeRect(
        offsetX + col * cellSize,
        offsetY + row * cellSize,
        cellSize,
        cellSize,
      )
    }
  }

  function pixelToCell(e: MouseEvent): { row: number; col: number } | null {
    const canvas = canvasRef.value
    if (!canvas || cellSize <= 0) return null

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left - offsetX
    const y = e.clientY - rect.top - offsetY

    const col = Math.floor(x / cellSize)
    const row = Math.floor(y / cellSize)

    const { rows, cols } = dimensions.value
    if (row < 0 || row >= rows || col < 0 || col >= cols) return null

    return { row, col }
  }

  function touchToCell(touch: Touch): { row: number; col: number } | null {
    const canvas = canvasRef.value
    if (!canvas || cellSize <= 0) return null

    const rect = canvas.getBoundingClientRect()
    const x = touch.clientX - rect.left - offsetX
    const y = touch.clientY - rect.top - offsetY

    const col = Math.floor(x / cellSize)
    const row = Math.floor(y / cellSize)

    const { rows, cols } = dimensions.value
    if (row < 0 || row >= rows || col < 0 || col >= cols) return null

    return { row, col }
  }

  function handleMouseDown(e: MouseEvent) {
    const cell = pixelToCell(e)
    if (!cell) return

    if (selectedPattern.value) {
      placePattern(selectedPattern.value, cell.row, cell.col)
      return
    }

    isDrawing = true
    const current = getCell(grid.value, dimensions.value, cell.row, cell.col)
    drawValue = current ? 0 : 1
    toggle(cell.row, cell.col)
  }

  function handleMouseMove(e: MouseEvent) {
    const cell = pixelToCell(e)
    hoveredCell.value = cell

    if (isDrawing && cell) {
      paintCell(cell.row, cell.col, drawValue)
    }

    draw()
  }

  function handleMouseUp() {
    isDrawing = false
  }

  function handleMouseLeave() {
    isDrawing = false
    hoveredCell.value = null
    draw()
  }

  // Touch event handlers for mobile
  function handleTouchStart(e: TouchEvent) {
    e.preventDefault()
    const touch = e.touches[0]
    const cell = touchToCell(touch)
    if (!cell) return

    if (selectedPattern.value) {
      placePattern(selectedPattern.value, cell.row, cell.col)
      return
    }

    isDrawing = true
    const current = getCell(grid.value, dimensions.value, cell.row, cell.col)
    drawValue = current ? 0 : 1
    toggle(cell.row, cell.col)
  }

  function handleTouchMove(e: TouchEvent) {
    e.preventDefault()
    const touch = e.touches[0]
    const cell = touchToCell(touch)
    hoveredCell.value = cell

    if (isDrawing && cell) {
      paintCell(cell.row, cell.col, drawValue)
    }

    draw()
  }

  function handleTouchEnd(e: TouchEvent) {
    e.preventDefault()
    isDrawing = false
    hoveredCell.value = null
    draw()
  }

  onMounted(() => {
    calcLayout()

    const canvas = canvasRef.value
    if (canvas?.parentElement) {
      resizeObserver = new ResizeObserver(() => calcLayout())
      resizeObserver.observe(canvas.parentElement)
    }
  })

  onUnmounted(() => {
    resizeObserver?.disconnect()
  })

  // Redraw when grid or theme changes
  watch(grid, () => draw())
  watch(theme, () => calcLayout())
  // Recalculate layout when dimensions change
  watch(dimensions, () => calcLayout())

  return {
    hoveredCell,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseLeave,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  }
}
