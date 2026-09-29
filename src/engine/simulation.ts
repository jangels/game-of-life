import type { GridDimensions } from './types'

export function countNeighbors(grid: Uint8Array, dims: GridDimensions, row: number, col: number): number {
  const { rows, cols } = dims
  let count = 0

  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue
      const r = (row + dr + rows) % rows
      const c = (col + dc + cols) % cols
      count += grid[r * cols + c]
    }
  }

  return count
}

export function nextGeneration(current: Uint8Array, dims: GridDimensions): Uint8Array {
  const { rows, cols } = dims
  const next = new Uint8Array(rows * cols)

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const idx = row * cols + col
      const neighbors = countNeighbors(current, dims, row, col)
      const alive = current[idx]

      if (alive) {
        next[idx] = (neighbors === 2 || neighbors === 3) ? 1 : 0
      } else {
        next[idx] = neighbors === 3 ? 1 : 0
      }
    }
  }

  return next
}
