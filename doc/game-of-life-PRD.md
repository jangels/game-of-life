# Game of Life - Product Requirements Document (PRD)

## 1. Product Overview

### 1.1 Product Name
康威生命游戏 (Conway's Game of Life)

### 1.2 Product Description
An interactive web-based implementation of Conway's Game of Life, a cellular automaton devised by mathematician John Conway in 1970. The application provides a visual simulation environment where users can observe emergent patterns from simple rules, with support for custom pattern drawing, preset pattern loading, and dual theme modes.

### 1.3 Target Users
- Mathematics and computer science enthusiasts
- Educational users learning about cellular automata
- Developers interested in emergent behavior and simulation
- General users interested in zero-player games and visual patterns

---

## 2. Functional Requirements

### 2.1 Core Simulation Features

#### 2.1.1 Grid System
- **Grid Size**: 60x60 cells (configurable through code)
- **Cell States**: Binary (alive/dead)
- **Boundary Condition**: Toroidal (wrap-around edges)
- **Data Structure**: Uint8Array for performance optimization

#### 2.1.2 Conway's Rules Implementation
1. **Underpopulation**: Live cell with < 2 neighbors dies
2. **Survival**: Live cell with 2-3 neighbors survives
3. **Overpopulation**: Live cell with > 3 neighbors dies
4. **Reproduction**: Dead cell with exactly 3 neighbors becomes alive

#### 2.1.3 Simulation Control
| Feature | Description |
|---------|-------------|
| Start/Pause | Toggle simulation running state |
| Step | Advance one generation manually |
| Speed Control | 1-60 Hz adjustable simulation speed |
| Clear | Reset grid to empty state |
| Randomize | Fill grid with random cells (30% density default) |

### 2.2 Pattern System

#### 2.2.1 Preset Pattern Categories

**Still Lifes (Static Patterns)**
- Block: 4-cell square
- Beehive: 6-cell pattern
- Loaf: 7-cell pattern

**Oscillators (Periodic Patterns)**
- Blinker: Period-2 oscillator
- Toad: Period-2 oscillator
- Pulsar: Period-3 oscillator with 4-fold symmetry
- Pentadecathlon: Period-15 oscillator

**Spaceships (Moving Patterns)**
- Glider: Diagonal movement
- LWSS (Lightweight Spaceship): Horizontal movement

**Guns (Pattern Generators)**
- Gosper Glider Gun: Emits gliders every 30 generations

**Methuselahs (Long-lived Patterns)**
- R-pentomino: Stabilizes after 1103 generations
- Acorn: Stabilizes after 5206 generations
- Diehard: Vanishes after 130 generations

#### 2.2.2 Pattern Placement
- Centered placement at cursor position
- Ghost preview before placement
- Automatic bounds checking

### 2.3 Interactive Features

#### 2.3.1 Canvas Interaction
| Action | Behavior |
|--------|----------|
| Click | Toggle cell state |
| Drag | Paint multiple cells |
| Hover (with pattern) | Show ghost preview |
| Hover (without pattern) | Highlight cell |

#### 2.3.2 Display Information
- Generation counter
- Live cell count
- Current simulation speed

### 2.4 Theme System

#### 2.4.1 Light Theme
- Clean, modern UI design
- Gradient animated title
- Soft shadows and rounded corners
- Color scheme: White/gray with blue accents

#### 2.4.2 Matrix Theme
- Terminal/cyberpunk aesthetic
- Monospace fonts
- Green phosphor glow effects
- Color scheme: Black with green (#00ff41) accents

#### 2.4.3 Theme-Specific Elements
Both themes adapt:
- Button styles and labels
- Canvas colors (grid, cells, background)
- Typography
- Panel styling

---

## 3. Technical Requirements

### 3.1 Technology Stack
| Layer | Technology |
|-------|------------|
| Framework | Vue 3 (Composition API) |
| Language | TypeScript |
| Build Tool | Vite |
| Styling | CSS3 with CSS Variables |
| Rendering | HTML5 Canvas API |

### 3.2 Architecture

```
src/
├── components/          # Vue components
│   ├── ControlBar.vue   # Simulation controls
│   └── GameCanvas.vue   # Canvas rendering
├── composables/         # Reusable logic
│   ├── useGameState.ts  # Game state management
│   └── useCanvasRenderer.ts  # Canvas rendering logic
├── engine/              # Core simulation engine
│   ├── types.ts         # TypeScript interfaces
│   ├── grid.ts          # Grid operations
│   ├── simulation.ts    # Conway's rules
│   └── patterns.ts      # Pattern definitions
├── App.vue              # Root component
├── main.ts              # Entry point
└── style.css            # Global styles
```

### 3.3 Performance Requirements
- Target: 60 FPS at maximum simulation speed
- Efficient rendering using Canvas API
- Optimized grid operations with TypedArrays
- ResizeObserver for responsive canvas

### 3.4 Browser Compatibility
- Modern browsers with ES6+ support
- Chrome, Firefox, Safari, Edge (latest 2 versions)

---

## 4. User Interface Requirements

### 4.1 Layout Structure
```
┌─────────────────────────────────────────┐
│  [Theme Toggle]                         │
│                                         │
│     ┌─────────────────────┐  ┌─────┐   │
│     │   [Title Header]    │  │     │   │
│     ├─────────────────────┤  │Side │   │
│     │  [Control Bar]      │  │Info │   │
│     ├─────────────────────┤  │Panel│   │
│     │                     │  │     │   │
│     │    [Game Canvas]    │  │(hover│  │
│     │    (60x60 Grid)     │  │reveal)│ │
│     │                     │  │     │   │
│     ├─────────────────────┤  └─────┘   │
│     │  [Footer Hint]      │            │
│     └─────────────────────┘            │
│                                         │
└─────────────────────────────────────────┘
```

### 4.2 Control Bar Elements
- **Primary Button**: Start/Pause simulation
- **Secondary Buttons**: Randomize, Clear
- **Pattern Selector**: Dropdown with categorized patterns
- **Speed Control**: Range slider (1-60 Hz)

### 4.3 Canvas Specifications
- **Size**: Responsive, max 65vh or 640px
- **Aspect Ratio**: 1:1 (square)
- **Grid Lines**: Subtle gray lines
- **Cell Rendering**: Filled squares with small padding

### 4.4 Side Information Panel
- **Trigger**: Hover on right edge
- **Content**: Educational information about Game of Life
- **Topics**: Rules explanation, emergence concept
- **Language**: Bilingual (Chinese/English based on theme)

---

## 5. Non-Functional Requirements

### 5.1 Accessibility
- Keyboard operable controls
- Clear visual feedback
- Sufficient color contrast

### 5.2 Responsive Design
- Adaptable to different screen sizes
- Minimum supported resolution: 768px width
- Touch-friendly controls for mobile devices

### 5.3 Localization
- Bilingual UI (Chinese and English)
- Theme-based language switching

---

## 6. Future Enhancements

### 6.1 Potential Features
- [ ] Grid size customization UI
- [ ] Pattern import/export (RLE format)
- [ ] Simulation recording and playback
- [ ] Multi-grid comparison view
- [ ] Rule customization (explore variants)
- [ ] Statistics dashboard (population graphs)
- [ ] Multiplayer/ collaborative mode

### 6.2 Technical Improvements
- [ ] Web Workers for simulation computation
- [ ] WebGL rendering for larger grids
- [ ] Pattern sharing community feature

---

## 7. Success Metrics

| Metric | Target |
|--------|--------|
| Simulation Performance | 60 FPS at 60 Hz |
| Time to Interactive | < 2 seconds |
| Pattern Library | 13+ preset patterns |
| Browser Compatibility | 95%+ modern browser support |

---

## 8. Appendix

### 8.1 Glossary
- **Cellular Automaton**: A discrete model consisting of a grid of cells that evolve according to rules
- **Emergence**: Complex patterns arising from simple local rules
- **Generation**: One complete iteration of the simulation rules
- **Methuselah**: A small initial pattern that takes many generations to stabilize
- **Still Life**: A pattern that remains unchanged between generations
- **Oscillator**: A pattern that returns to its initial state after a fixed number of generations
- **Spaceship**: A pattern that moves across the grid

### 8.2 References
- Conway, J. (1970). The Game of Life
- Gardner, M. (1970). Mathematical Games, Scientific American

---

*Document Version: 1.0*
*Last Updated: April 2026*
