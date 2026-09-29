# Conway's Game of Life · 康威生命游戏

一个基于浏览器的[康威生命游戏（Conway's Game of Life）](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)交互式实现 —— 1970 年由数学家 John Conway 发明的零玩家细胞自动机。在极简的局部规则下，你能观察到滑翔机、脉冲星、繁殖器等令人惊叹的涌现结构。

> An interactive, web-based implementation of Conway's Game of Life with custom drawing, 13+ preset patterns, dual themes, and 60 FPS Canvas rendering.

## ✨ 功能特性 / Features

- **核心模拟**：60×60 网格（可调整），环面（toroidal）边界，按康威规则逐代演进
- **模拟控制**：开始/暂停、单步、速度调节（1–60 Hz）、清空、随机填充（默认 30% 密度）
- **13+ 预设图案**：静物（Block / Beehive / Loaf）、振荡子（Blinker / Toad / Pulsar / Pentadecathlon）、飞船（Glider / LWSS）、枪（Gosper Glider Gun）、长寿图案（R-pentomino / Acorn / Diehard）
- **画布交互**：点击切换细胞、拖拽连续绘制、悬停时图案幽灵预览
- **双主题**：明亮主题（渐变动画标题）/ Matrix 终端赛博主题（绿色磷光、等宽字体）
- **统计面板**：代数、存活细胞数、密度、增长率
- **响应式**：自适应桌面与移动端（≥768px 宽度优化）
- **双语 UI**：中英文界面文案随主题切换

## 🧬 康威规则 / The Rules

每个细胞的下一代由其 8 邻居决定：

1. **孤独死**：存活细胞邻居 < 2 → 死亡
2. **存活**：存活细胞邻居 = 2 或 3 → 存活
3. **拥挤死**：存活细胞邻居 > 3 → 死亡
4. **繁殖**：死亡细胞邻居 = 3 → 复活

## 🛠 技术栈 / Tech Stack

| 层 | 技术 |
|---|---|
| 框架 | Vue 3（Composition API + `<script setup>`） |
| 语言 | TypeScript（strict，`vue-tsc` 校验） |
| 构建 | Vite 6 |
| 渲染 | HTML5 Canvas API |
| 样式 | CSS3 + CSS 变量（双主题） |
| 字体 | `@fontsource/orbitron`、`@fontsource/michroma` |

## 🚀 快速开始 / Getting Started

要求 Node.js 18+。

```bash
npm install      # 安装依赖
npm run dev      # 启动开发服务器（Vite，默认 http://localhost:5173）
npm run build    # 类型检查 + 生产构建 → dist/
npm run preview  # 本地预览构建产物
```

构建脚本 `npm run build` 等价于 `vue-tsc --noEmit && vite build`，提交前必须通过。

## 📁 项目结构 / Project Structure

```
src/
├── components/                # Vue 组件
│   ├── ControlBar.vue         # 开始/暂停/随机/清空/主题等控制条
│   ├── GameCanvas.vue         # Canvas 渲染 + 鼠标交互
│   ├── StatsPanel.vue         # 统计信息（代数/存活/密度/增长）
│   ├── SpeedControl.vue       # 速度滑块（1–60 Hz）
│   ├── GridSizeControl.vue    # 网格尺寸调整
│   └── PatternSelector.vue    # 预设图案下拉选择
├── composables/               # 可复用逻辑（模块级单例状态）
│   ├── useGameState.ts        # 全局游戏状态 + 所有动作（step/start/clear/placePattern…）
│   └── useCanvasRenderer.ts   # Canvas 绘制逻辑
├── engine/                    # 纯函数仿真内核（不依赖 Vue）
│   ├── types.ts               # 类型定义：GridDimensions / Pattern / CellPosition
│   ├── grid.ts                # 网格操作：createGrid / toggleCell / randomFill / setCells
│   ├── simulation.ts          # 康威规则：countNeighbors / nextGeneration（环面边界）
│   └── patterns.ts            # 13+ 预设图案数据 PATTERNS
├── App.vue                    # 根组件（主题切换、侧边说明面板）
├── main.ts                    # 入口
├── style.css                  # 全局样式 + CSS 变量
└── vite-env.d.ts
doc/
├── game-of-life-PRD.md        # 产品需求文档（中文）
└── game-of-life-PRD-zh.md     # （同上，历史归档）
```

## 🎨 预设图案一览 / Pattern Catalog

| 类别 | 图案 |
|---|---|
| Still Lifes（静物） | Block · Beehive · Loaf |
| Oscillators（振荡子） | Blinker · Toad · Pulsar · Pentadecathlon |
| Spaceships（飞船） | Glider · LWSS |
| Guns（枪） | Gosper Glider Gun |
| Methuselahs（长寿） | R-pentomino · Acorn · Diehard |

## 📜 License

[MIT](./LICENSE) © 2026 game-of-life contributors
