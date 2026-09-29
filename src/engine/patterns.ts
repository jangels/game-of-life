import type { Pattern } from './types'

export const PATTERNS: Pattern[] = [
  // Still Lifes
  {
    name: 'Block',
    category: 'Still Lifes',
    description: 'The simplest still life (period 1)',
    cells: [
      { row: 0, col: 0 }, { row: 0, col: 1 },
      { row: 1, col: 0 }, { row: 1, col: 1 },
    ],
  },
  {
    name: 'Beehive',
    category: 'Still Lifes',
    description: 'A common 6-cell still life',
    cells: [
      { row: 0, col: 1 }, { row: 0, col: 2 },
      { row: 1, col: 0 }, { row: 1, col: 3 },
      { row: 2, col: 1 }, { row: 2, col: 2 },
    ],
  },
  {
    name: 'Loaf',
    category: 'Still Lifes',
    description: 'A 7-cell still life',
    cells: [
      { row: 0, col: 1 }, { row: 0, col: 2 },
      { row: 1, col: 0 }, { row: 1, col: 3 },
      { row: 2, col: 1 }, { row: 2, col: 3 },
      { row: 3, col: 2 },
    ],
  },

  // Oscillators
  {
    name: 'Blinker',
    category: 'Oscillators',
    description: 'The simplest oscillator (period 2)',
    cells: [
      { row: 0, col: 0 }, { row: 0, col: 1 }, { row: 0, col: 2 },
    ],
  },
  {
    name: 'Toad',
    category: 'Oscillators',
    description: 'A period-2 oscillator',
    cells: [
      { row: 0, col: 1 }, { row: 0, col: 2 }, { row: 0, col: 3 },
      { row: 1, col: 0 }, { row: 1, col: 1 }, { row: 1, col: 2 },
    ],
  },
  {
    name: 'Pulsar',
    category: 'Oscillators',
    description: 'A period-3 oscillator with 4-fold symmetry',
    cells: [
      // Top-left quadrant (and mirrored)
      { row: 0, col: 2 }, { row: 0, col: 3 }, { row: 0, col: 4 },
      { row: 0, col: 8 }, { row: 0, col: 9 }, { row: 0, col: 10 },
      { row: 2, col: 0 }, { row: 2, col: 5 }, { row: 2, col: 7 }, { row: 2, col: 12 },
      { row: 3, col: 0 }, { row: 3, col: 5 }, { row: 3, col: 7 }, { row: 3, col: 12 },
      { row: 4, col: 0 }, { row: 4, col: 5 }, { row: 4, col: 7 }, { row: 4, col: 12 },
      { row: 5, col: 2 }, { row: 5, col: 3 }, { row: 5, col: 4 },
      { row: 5, col: 8 }, { row: 5, col: 9 }, { row: 5, col: 10 },
      { row: 7, col: 2 }, { row: 7, col: 3 }, { row: 7, col: 4 },
      { row: 7, col: 8 }, { row: 7, col: 9 }, { row: 7, col: 10 },
      { row: 8, col: 0 }, { row: 8, col: 5 }, { row: 8, col: 7 }, { row: 8, col: 12 },
      { row: 9, col: 0 }, { row: 9, col: 5 }, { row: 9, col: 7 }, { row: 9, col: 12 },
      { row: 10, col: 0 }, { row: 10, col: 5 }, { row: 10, col: 7 }, { row: 10, col: 12 },
      { row: 12, col: 2 }, { row: 12, col: 3 }, { row: 12, col: 4 },
      { row: 12, col: 8 }, { row: 12, col: 9 }, { row: 12, col: 10 },
    ],
  },
  {
    name: 'Pentadecathlon',
    category: 'Oscillators',
    description: 'A period-15 oscillator',
    cells: [
      { row: 0, col: 1 },
      { row: 1, col: 1 },
      { row: 2, col: 0 }, { row: 2, col: 2 },
      { row: 3, col: 1 },
      { row: 4, col: 1 },
      { row: 5, col: 1 },
      { row: 6, col: 1 },
      { row: 7, col: 0 }, { row: 7, col: 2 },
      { row: 8, col: 1 },
      { row: 9, col: 1 },
    ],
  },

  // Spaceships
  {
    name: 'Glider',
    category: 'Spaceships',
    description: 'The smallest spaceship, moves diagonally',
    cells: [
      { row: 0, col: 1 },
      { row: 1, col: 2 },
      { row: 2, col: 0 }, { row: 2, col: 1 }, { row: 2, col: 2 },
    ],
  },
  {
    name: 'LWSS',
    category: 'Spaceships',
    description: 'Lightweight spaceship, moves horizontally',
    cells: [
      { row: 0, col: 1 }, { row: 0, col: 4 },
      { row: 1, col: 0 },
      { row: 2, col: 0 }, { row: 2, col: 4 },
      { row: 3, col: 0 }, { row: 3, col: 1 }, { row: 3, col: 2 }, { row: 3, col: 3 },
    ],
  },

  // Guns
  {
    name: 'Gosper Glider Gun',
    category: 'Guns',
    description: 'The first known gun, emits a glider every 30 generations',
    cells: [
      // Left block
      { row: 4, col: 0 }, { row: 4, col: 1 },
      { row: 5, col: 0 }, { row: 5, col: 1 },
      // Left structure
      { row: 2, col: 12 }, { row: 2, col: 13 },
      { row: 3, col: 11 }, { row: 3, col: 15 },
      { row: 4, col: 10 }, { row: 4, col: 16 },
      { row: 5, col: 10 }, { row: 5, col: 14 }, { row: 5, col: 16 }, { row: 5, col: 17 },
      { row: 6, col: 10 }, { row: 6, col: 16 },
      { row: 7, col: 11 }, { row: 7, col: 15 },
      { row: 8, col: 12 }, { row: 8, col: 13 },
      // Right structure
      { row: 0, col: 24 },
      { row: 1, col: 22 }, { row: 1, col: 24 },
      { row: 2, col: 20 }, { row: 2, col: 21 },
      { row: 3, col: 20 }, { row: 3, col: 21 },
      { row: 4, col: 20 }, { row: 4, col: 21 },
      { row: 5, col: 22 }, { row: 5, col: 24 },
      { row: 6, col: 24 },
      // Right block
      { row: 2, col: 34 }, { row: 2, col: 35 },
      { row: 3, col: 34 }, { row: 3, col: 35 },
    ],
  },

  // Methuselahs
  {
    name: 'R-pentomino',
    category: 'Methuselahs',
    description: 'A 5-cell methuselah that stabilizes after 1103 generations',
    cells: [
      { row: 0, col: 1 }, { row: 0, col: 2 },
      { row: 1, col: 0 }, { row: 1, col: 1 },
      { row: 2, col: 1 },
    ],
  },
  {
    name: 'Acorn',
    category: 'Methuselahs',
    description: 'A 7-cell methuselah that takes 5206 generations to stabilize',
    cells: [
      { row: 0, col: 1 },
      { row: 1, col: 3 },
      { row: 2, col: 0 }, { row: 2, col: 1 },
      { row: 2, col: 4 }, { row: 2, col: 5 }, { row: 2, col: 6 },
    ],
  },
  {
    name: 'Diehard',
    category: 'Methuselahs',
    description: 'A 7-cell pattern that vanishes after 130 generations',
    cells: [
      { row: 0, col: 6 },
      { row: 1, col: 0 }, { row: 1, col: 1 },
      { row: 2, col: 1 }, { row: 2, col: 5 }, { row: 2, col: 6 }, { row: 2, col: 7 },
    ],
  },
]
