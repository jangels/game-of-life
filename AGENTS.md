# AGENTS.md — game-of-life AI 协作指引

> **本文件是本仓库对 AI coding agent 的 canonical 指令文件**（Claude Code、Codex、Cursor、Gemini CLI、WorkBuddy 及其他 AGENTS-aware harness 通用）。人类入门读 `README.md`。
> 工作流：**先读「Cross-cutting invariants」→ 改代码 → 跑「Build and test commands」→ 确认无回归**。
> 当前能力：Vue 3 + TypeScript + Vite 的纯前端静态 SPA，无后端、无网络请求、无环境变量。

---

## Project overview

浏览器端的**康威生命游戏**交互式模拟器：60×60 网格、环面边界、Canvas 渲染、13+ 预设图案、双主题（明亮 / Matrix）、统计面板、响应式。零玩家游戏，纯前端静态站点，构建产物 `dist/` 可直接托管任意静态服务器 / GitHub Pages。

**非目标**：不引入后端、不做多人协作、不接数据库、不做在线存储。保持「打开即用的纯静态 SPA」定位。

---

## Technology stack

| 层 | 技术 | 职责 |
|---|---|---|
| 框架 | Vue 3（`@vue/3.5`，Composition API + `<script setup>`） | 组件、响应式状态、模板 |
| 语言 | TypeScript（strict，`vue-tsc` 类型检查） | 类型安全 |
| 构建 | Vite 6（`@vitejs/plugin-vue`） | dev server / 生产构建 |
| 渲染 | HTML5 Canvas API | 网格绘制、鼠标交互 |
| 样式 | CSS3 + CSS 变量 | 双主题（`.matrix` 类切换） |
| 字体 | `@fontsource/orbitron` / `@fontsource/michroma` | 标题字体 |

依赖管理：npm（`package-lock.json` 锁版本）。**不要在系统 Python / 全局装任何东西**，前端只需要 `npm install`。

---

## Repository layout

| 路径 | 职责 | 改它时的注意 |
|---|---|---|
| `src/engine/types.ts` | 类型定义：`GridDimensions` / `Pattern` / `CellPosition` | 改字段要同步 `grid.ts` / `simulation.ts` / `patterns.ts` / `useGameState.ts` 的对应引用 |
| `src/engine/grid.ts` | 纯网格操作：`createGrid` / `toggleCell` / `randomFill` / `setCells` | 全部基于 `Uint8Array` 一维索引；保持纯函数、不引入 Vue 依赖 |
| `src/engine/simulation.ts` | 康威规则：`countNeighbors` / `nextGeneration` | **边界是环面（toroidal）**，见 invariant 2；这是有意设计，别改成有界 |
| `src/engine/patterns.ts` | 预设图案数组 `PATTERNS`（13 个） | 新增图案只在这里加数据；`cells` 用相对坐标 |
| `src/composables/useGameState.ts` | **模块级单例**状态 + 所有动作 | 见 invariant 3；`start/stop/step/clear/randomize/resize/toggle/paintCell/placePattern/toggleTheme` 都在这里 |
| `src/composables/useCanvasRenderer.ts` | Canvas 绘制逻辑 | 与 `GameCanvas.vue` 配合；响应式尺寸走 `ResizeObserver` |
| `src/components/*.vue` | 6 个 UI 组件 | 状态一律从 `useGameState()` 取，不要在组件内自建状态副本 |
| `src/App.vue` | 根组件 + 主题 class + 侧边说明面板 | 主题切换只切 `theme` ref + `.app.matrix` class；新增主题要同步 CSS |
| `src/main.ts` / `src/style.css` / `src/vite-env.d.ts` | 入口 / 全局样式 + CSS 变量 / 类型声明 | CSS 变量是双主题的基础，改色先动 `style.css` 的 `:root` 与 `.app.matrix` |
| `index.html` | Vite 入口 HTML | 标题已是「康威生命游戏」；favicon 在 `public/favicon.svg` |
| `doc/game-of-life-PRD.md` | PRD（中文，权威需求来源） | 功能需求以它为准；改完功能同步更新它 |

**无运行时数据目录**：纯静态、状态全在内存，刷新即重置。

---

## Build and test commands

```bash
npm install          # 首次 / 改依赖后
npm run dev          # 开发服务器（手动验证 UI 闭环必须本机跑）
npm run build        # vue-tsc --noEmit && vite build —— 提交前必须 EXIT=0
npm run preview      # 本地预览 dist/
```

> 没有独立的 `typecheck` 脚本：`npm run build` 已经先跑 `vue-tsc --noEmit`。提交前以 `npm run build` 作为唯一门禁。

---

## Cross-cutting invariants (do not violate)

1. **网格表示是扁平 `Uint8Array`**：长度 `rows*cols`，索引 `idx = row*cols + col`。`engine/` 与 `composables/` 共用此约定；改任一处的读写必须同步另一处，否则索引错乱。
2. **边界是环面（toroidal）**：`countNeighbors` 用 `(row + dr + rows) % rows` 做环绕。这是**有意设计**（PRD 2.1.1），不要把边界「修正」成有界/消失——会改变所有图案行为。
3. **`useGameState` 是模块级单例**：状态（`grid` / `generation` / `theme` 等）声明在模块作用域，所有组件 import 到的是**同一份实例**。不要在组件里 `ref()` 自建副本，否则状态不同步。
4. **主题只有 `'light' | 'matrix'` 两态**：视觉差异由 `style.css` 的 CSS 变量 + `.app.matrix` 选择器驱动。新增主题要同时改 `useGameState.ts` 的类型、`.app` 的 class 注入、以及 `style.css` 的变量与覆盖。
5. **仿真内核保持纯函数、零 Vue 依赖**：`engine/` 不 import Vue；UI 与逻辑通过 `useGameState` 桥接。不要把响应式状态塞进 `engine/`。
6. **图案是纯数据**：`PATTERNS` 里每个 `cells` 用相对坐标（含负/非负均可，`placePattern` 负责居中）。加新图案只改 `patterns.ts`，不要硬编码到组件。
7. **纯静态、零网络、零密钥**：本应用不连任何后端、不发任何 fetch、不读任何 `.env`。保持这个边界——不要为了「增强」引入需要密钥或联网的能力。

---

## Code style guidelines

- **Vue 3 `<script setup>` + Composition API**：匹配现有组件写法，不混 Options API。
- **TypeScript strict**：所有 `engine/` 导出带显式类型；`vue-tsc` 不过不提交。
- **匹配周边惯例**：命名、注释密度、模块结构向现有文件看齐。注释解释 *why*，不复述 *what*。
- **小步、行为保持的改动**：不顺手重构、不做相邻功能夹带。
- **不引入新运行时依赖**：现有依赖只有 Vue + 两个 fontsource + Vite 工具链。新增依赖前先问「能不能用现有能力解决」。
- **UI 文案双语**：控件/提示同时有中英文（见 `App.vue` 的 `v-if="!isMatrix"` / `v-else`），新增可见文案保持双语。

---

## Security considerations

- **无密钥可泄露**：应用本身不处理任何密钥 / token。提交前自查 diff 即可。
- **`.gitignore` 已排除**：`node_modules/` `dist/` `.DS_Store` `.workbuddy/` `.qoder/` `doc/**/*.mov` `*.log`。确认 `git status` 里没有这些。
- **不要提交大二进制**：`doc/` 下的 `.mov` 录屏是本地产物，已 gitignore；PRD 的 `.md` 可以入库。
- **托管到 GitHub Pages 时**：`dist/` 是构建产物，通常由 CI 构建或发布时生成；不要把 `dist/` 直接 commit 进源码库（已被 gitignore）。

---

## Documentation map

| 文件 | 读者 | 写什么 |
|---|---|---|
| `README.md` | 人（首次接触） | 是什么、怎么装、怎么跑、功能、结构、图案表、License |
| `AGENTS.md`（本文） | AI agent | 改哪里、别改坏什么、契约与坑、验证清单 |
| `LICENSE` | 人 | MIT |
| `doc/game-of-life-PRD.md` | 人 + agent | 权威需求文档（功能/技术/UI/非功能） |
