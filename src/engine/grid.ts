import type { CellPosition, CellState, GridDimensions } from './types'

export function createGrid(dims: GridDimensions): Uint8Array {
  return new Uint8Array(dims.rows * dims.cols)
}

export function getCell(grid: Uint8Array, dims: GridDimensions, row: number, col: number): CellState {
  if (row < 0 || row >= dims.rows || col < 0 || col >= dims.cols) return 0
  return grid[row * dims.cols + col] as CellState
}

export function toggleCell(grid: Uint8Array, dims: GridDimensions, row: number, col: number): Uint8Array {
  const next = new Uint8Array(grid)
  const idx = row * dims.cols + col
  next[idx] = next[idx] ? 0 : 1
  return next
}

export function setCell(grid: Uint8Array, dims: GridDimensions, row: number, col: number, value: CellState): Uint8Array {
  const next = new Uint8Array(grid)
  next[row * dims.cols + col] = value
  return next
}

export function clearGrid(dims: GridDimensions): Uint8Array {
  return createGrid(dims)
}

export function randomFill(dims: GridDimensions, density = 0.3): Uint8Array {
  const grid = new Uint8Array(dims.rows * dims.cols)
  for (let i = 0; i < grid.length; i++) {
    grid[i] = Math.random() < density ? 1 : 0
  }
  return grid
}

export function setCells(grid: Uint8Array, dims: GridDimensions, positions: CellPosition[], alive: CellState): Uint8Array {
  const next = new Uint8Array(grid)
  for (const pos of positions) {
    if (pos.row >= 0 && pos.row < dims.rows && pos.col >= 0 && pos.col < dims.cols) {
      next[pos.row * dims.cols + pos.col] = alive
    }
  }
  return next
}
