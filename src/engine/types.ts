export type CellState = 0 | 1

export interface GridDimensions {
  rows: number
  cols: number
}

export interface CellPosition {
  row: number
  col: number
}

export interface Pattern {
  name: string
  category: string
  cells: CellPosition[]
  description: string
}
