<script setup lang="ts">
import { computed } from 'vue'
import ControlBar from './components/ControlBar.vue'
import GameCanvas from './components/GameCanvas.vue'
import StatsPanel from './components/StatsPanel.vue'
import { useGameState } from './composables/useGameState'

const { theme, toggleTheme, showStats, toggleShowStats } = useGameState()
const isMatrix = computed(() => theme.value === 'matrix')
</script>

<template>
  <div class="app" :class="{ matrix: isMatrix }">
    <div class="panel-wrapper">
      <div class="panel">
        <header class="header">
          <div class="title-row" v-if="!isMatrix">
            <svg class="glider-icon" viewBox="0 0 4 4" xmlns="http://www.w3.org/2000/svg">
              <!-- 3x3 grid background (white cells) -->
              <rect x="0.5" y="0.5" width="1" height="1" fill="#fff" stroke="#ddd" stroke-width="0.08" />
              <rect x="1.5" y="0.5" width="1" height="1" fill="#333" stroke="#ddd" stroke-width="0.08" />
              <rect x="2.5" y="0.5" width="1" height="1" fill="#fff" stroke="#ddd" stroke-width="0.08" />
              <rect x="0.5" y="1.5" width="1" height="1" fill="#fff" stroke="#ddd" stroke-width="0.08" />
              <rect x="1.5" y="1.5" width="1" height="1" fill="#fff" stroke="#ddd" stroke-width="0.08" />
              <rect x="2.5" y="1.5" width="1" height="1" fill="#333" stroke="#ddd" stroke-width="0.08" />
              <rect x="0.5" y="2.5" width="1" height="1" fill="#333" stroke="#ddd" stroke-width="0.08" />
              <rect x="1.5" y="2.5" width="1" height="1" fill="#333" stroke="#ddd" stroke-width="0.08" />
              <rect x="2.5" y="2.5" width="1" height="1" fill="#333" stroke="#ddd" stroke-width="0.08" />
            </svg>
            <h1>
              <span class="title-main">Conway's Game of Life</span>
              <span class="title-sub">康威生命游戏</span>
            </h1>
          </div>
          <div class="title-row matrix-title-row" v-else>
            <svg class="glider-icon glider-icon-matrix" viewBox="0 0 4 4" xmlns="http://www.w3.org/2000/svg">
              <!-- 3x3 grid background -->
              <rect x="0.5" y="0.5" width="1" height="1" fill="#0d1117" stroke="#1a3a1a" stroke-width="0.08" />
              <rect x="1.5" y="0.5" width="1" height="1" fill="#00ff41" stroke="#1a3a1a" stroke-width="0.08" />
              <rect x="2.5" y="0.5" width="1" height="1" fill="#0d1117" stroke="#1a3a1a" stroke-width="0.08" />
              <rect x="0.5" y="1.5" width="1" height="1" fill="#0d1117" stroke="#1a3a1a" stroke-width="0.08" />
              <rect x="1.5" y="1.5" width="1" height="1" fill="#0d1117" stroke="#1a3a1a" stroke-width="0.08" />
              <rect x="2.5" y="1.5" width="1" height="1" fill="#00ff41" stroke="#1a3a1a" stroke-width="0.08" />
              <rect x="0.5" y="2.5" width="1" height="1" fill="#00ff41" stroke="#1a3a1a" stroke-width="0.08" />
              <rect x="1.5" y="2.5" width="1" height="1" fill="#00ff41" stroke="#1a3a1a" stroke-width="0.08" />
              <rect x="2.5" y="2.5" width="1" height="1" fill="#00ff41" stroke="#1a3a1a" stroke-width="0.08" />
            </svg>
            <h1 class="matrix-title">
              >> Conway's Game of Life::EVOLUTION_ENGINE
            </h1>
          </div>
        </header>
        <div class="toolbar-section">
          <ControlBar />
        </div>
        <div class="stats-section" v-if="showStats">
          <StatsPanel />
        </div>
        <div class="canvas-section">
          <GameCanvas />
        </div>
        <footer class="footer">
          <span class="hint">
            {{ isMatrix
              ? '>> GUIDE: LOAD_PATTERN -> RUN -> OBSERVE'
              : '操作提示：先「清空」然后「选择图案」或「点击画布」绘制，最后点击「开始运行」'
            }}
          </span>
        </footer>
      </div>
      <div class="side-info" :class="{ 'side-info-matrix': isMatrix }">
        <div class="side-info-content" v-if="!isMatrix">
          <p class="si-title">关于生命游戏</p>
          <p>生命游戏是数学家约翰·康威于 1970 年发明的零玩家游戏。整个世界仅由三条规则驱动：任何活细胞在邻居少于两个时因孤独而死亡，邻居超过三个时因拥挤而死亡，恰好两到三个邻居时存活；任何死细胞在恰好有三个活邻居时诞生新生命。</p>
          <p class="si-title">涌现：从简单到复杂</p>
          <p>这三条极简的局部规则，却能催生出滑翔机、脉冲星、繁殖器等令人惊叹的宏观结构——这正是「涌现」的力量。复杂性无需设计者，秩序可以自发生成，整体远大于部分之和。生命游戏深刻地揭示了一个哲学命题：宇宙中的智慧与秩序，或许并不需要一个全知的造物主，而只需简单规则在时间中反复迭代。比如大模型规模定律 Scaling Laws.</p>
        </div>
        <div class="side-info-content" v-else>
          <p class="si-title">> ABOUT::GAME_OF_LIFE</p>
          <p>A zero-player automaton created by mathematician John Conway in 1970. The entire universe is governed by three deterministic rules: a living cell with fewer than two neighbors dies of isolation; with more than three, it dies of overcrowding; with exactly two or three, it survives. A dead cell with exactly three living neighbors is born.</p>
          <p class="si-title">> EMERGENCE::COMPLEXITY_FROM_SIMPLICITY</p>
          <p>Three trivial local rules generate gliders, pulsars, breeders — astonishing macro-structures that no single rule "intended." This is emergence: complexity needs no designer, order arises spontaneously, and the whole far exceeds the sum of its parts. The Game of Life reveals a profound philosophical truth — intelligence and order in our universe may require no omniscient creator, only simple rules iterating through time. Like LLM Scaling laws.</p>
        </div>
      </div>
    </div>
    <div class="corner-buttons">
      <button class="corner-btn" :class="{ 'matrix-btn': isMatrix, 'active': showStats }" @click="toggleShowStats">
        {{ isMatrix ? (showStats ? '[ ✓ STATS ]' : '[ STATS ]') : (showStats ? '✓ 统计' : '📊 统计') }}
      </button>
      <button class="corner-btn" :class="{ 'matrix-btn': isMatrix }" @click="toggleTheme">
        {{ isMatrix ? '☀ LIGHT' : '🖥 MATRIX' }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.app {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  position: relative;
  transition: background-color 0.3s;
}

.app.matrix {
  background-color: #0d1117;
}

.panel {
  background: var(--bg-surface);
  border-radius: 16px;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 28px 36px 20px;
  gap: 16px;
  max-height: 100%;
  overflow: auto;
  transition: background-color 0.3s, box-shadow 0.3s;
}

.app.matrix .panel {
  background: #0d1117;
  box-shadow: none;
  border: none;
}

/* Mobile responsive styles */
@media (max-width: 768px) {
  .app {
    padding: 8px;
    align-items: flex-start;
    overflow-y: auto;
  }

  .panel {
    padding: 40px 12px 12px;
    gap: 12px;
    border-radius: 12px;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
  }

  .title-row {
    flex-direction: column;
    gap: 8px;
  }

  .matrix-title-row {
    flex-direction: column;
    gap: 8px;
  }

  .glider-icon {
    width: 28px;
    height: 28px;
  }

  .title-main {
    font-size: 20px;
    letter-spacing: 1px;
  }

  .title-sub {
    font-size: 11px;
    letter-spacing: 1px;
  }

  .matrix-title {
    font-size: 14px;
    letter-spacing: 1px;
  }

  .matrix-title-row {
    padding-bottom: 4px;
  }

  .toolbar-section {
    padding: 10px 8px;
  }

  .canvas-section {
    width: 100%;
    max-width: min(80vw, 400px);
  }

  .footer {
    padding: 4px 0 0;
  }

  .hint {
    font-size: 10px;
    text-align: center;
    display: block;
    padding: 0 8px;
  }

  .corner-buttons {
    position: fixed;
    top: 8px;
    right: 8px;
    gap: 6px;
  }

  .corner-btn {
    padding: 4px 8px;
    font-size: 10px;
    border-radius: 4px;
    min-height: 24px;
    line-height: 1;
  }

  .side-info {
    display: none;
  }

  /* Stats section mobile optimization */
  .stats-section {
    order: -1;
    margin-bottom: 4px;
  }
}

@media (max-width: 480px) {
  .app {
    padding: 4px;
  }

  .panel {
    padding: 36px 8px 10px;
    gap: 10px;
    border-radius: 10px;
    box-sizing: border-box;
  }

  .title-main {
    font-size: 18px;
    letter-spacing: 1px;
  }

  .canvas-section {
    max-width: 95vw;
  }

  .corner-buttons {
    gap: 4px;
  }

  .corner-btn {
    padding: 3px 6px;
    font-size: 9px;
    min-height: 20px;
    border-radius: 3px;
  }
}

/* Light title */
.header h1 {
  text-align: center;
  line-height: 1;
  margin: 0;
}

.title-row {
  display: flex;
  align-items: center;
  gap: 20px;
}

.matrix-title-row {
  display: flex;
  align-items: center;
  gap: 20px;
}

.glider-icon {
  width: 32px;
  height: 32px;
  flex-shrink: 0;
}

.glider-icon-matrix {
  filter: drop-shadow(0 0 4px rgba(0, 255, 65, 0.6));
}

.title-main {
  display: block;
  font-family: 'Orbitron', system-ui, sans-serif;
  font-size: 32px;
  font-weight: 800;
  letter-spacing: 2px;
  text-transform: uppercase;
  background: linear-gradient(90deg, #f43f5e, #ec4899, #a855f7, #6366f1, #2563eb);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradient-shift 4s ease infinite;
}

@keyframes gradient-shift {
  0% { background-position: 0% center; }
  50% { background-position: 100% center; }
  100% { background-position: 0% center; }
}

.title-sub {
  display: block;
  margin-top: 4px;
  font-size: 13px;
  font-weight: 400;
  letter-spacing: 2px;
  color: var(--text-muted);
  text-transform: uppercase;
}

/* Matrix title */
.matrix-title {
  font-family: 'Courier New', Courier, monospace;
  font-size: 22px;
  font-weight: 700;
  color: #00ff41;
  letter-spacing: 3px;
  text-align: center;
  text-transform: uppercase;
  margin: 0;
  text-shadow: 0 0 10px rgba(0, 255, 65, 0.4);
}

.matrix-title-row {
  border-bottom: 2px solid #00ff41;
  padding-bottom: 8px;
}

/* Toolbar */
.toolbar-section {
  width: 100%;
  padding: 12px 16px;
  background: #f5f5f7;
  border-radius: 10px;
  transition: background-color 0.3s;
}

.app.matrix .toolbar-section {
  background: #0d1117;
  border: 1px solid #1a3a1a;
  border-radius: 4px;
}

/* Stats section */
.stats-section {
  width: 100%;
  display: flex;
  justify-content: center;
}

/* Matrix button overrides */
.app.matrix :deep(button) {
  font-family: 'Courier New', Courier, monospace;
  background: transparent;
  color: #00ff41;
  border: 1px solid #00ff41;
  border-radius: 2px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.app.matrix :deep(button:hover:not(:disabled)) {
  background: rgba(0, 255, 65, 0.1);
  border-color: #00ff41;
}

.app.matrix :deep(button.primary) {
  background: rgba(0, 255, 65, 0.15);
  color: #00ff41;
  border-color: #00ff41;
}

.app.matrix :deep(button.primary:hover:not(:disabled)) {
  background: rgba(0, 255, 65, 0.25);
}

.app.matrix :deep(button.danger) {
  background: transparent;
  color: #ff4444;
  border-color: #ff4444;
}

.app.matrix :deep(button.danger:hover:not(:disabled)) {
  background: rgba(255, 68, 68, 0.1);
}

/* Matrix select */
.app.matrix :deep(select) {
  font-family: 'Courier New', Courier, monospace;
  background: #0d1117;
  color: #00ff41;
  border: 1px solid #1a3a1a;
  border-radius: 2px;
}

/* Matrix slider thumb */
.app.matrix :deep(input[type="range"]::-webkit-slider-thumb) {
  background: #00ff41;
  box-shadow: 0 0 6px rgba(0, 255, 65, 0.5);
}

/* Matrix labels and text */
.app.matrix :deep(label) {
  font-family: 'Courier New', Courier, monospace;
  color: #4a8a4a;
  text-transform: uppercase;
}

.app.matrix :deep(.speed-value) {
  color: #00ff41;
  font-family: 'Courier New', Courier, monospace;
}

.app.matrix :deep(.divider) {
  background: #1a3a1a;
}

/* Canvas section */
.canvas-section {
  width: min(65vh, 640px);
  aspect-ratio: 1;
  display: flex;
  border: 1.5px solid #d8d8d8;
  border-radius: 0;
  overflow: hidden;
  transition: border-color 0.3s;
}

.app.matrix .canvas-section {
  border: 0.5px solid rgba(102, 204, 136, 0.5);
  box-shadow: 0 0 12px rgba(0, 255, 65, 0.21), 0 0 36px rgba(0, 255, 65, 0.09), 0 0 60px rgba(0, 255, 65, 0.03);
}

/* Footer */
.footer {
  padding: 2px 0 0;
}

/* Panel wrapper */
.panel-wrapper {
  position: relative;
  max-height: 100%;
}

/* Side info (hover reveal, right of panel) */
.side-info {
  position: absolute;
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 60%;
  z-index: 50;
}

.side-info-content {
  position: absolute;
  left: 0;
  top: 0;
  width: 280px;
  max-height: 70vh;
  overflow-y: auto;
  padding: 16px 18px;
  font-size: 12.5px;
  line-height: 1.85;
  color: #888;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 0 10px 10px 0;
  border: 1px solid #e0e0e0;
  backdrop-filter: blur(8px);
  opacity: 0;
  pointer-events: none;
  transform: translateX(-8px);
  transition: opacity 0.25s ease, transform 0.25s ease;
  text-align: justify;
}

.side-info:hover .side-info-content {
  opacity: 1;
  pointer-events: auto;
  transform: translateX(0);
}

.side-info-content p {
  margin: 0 0 8px;
}

.si-title {
  font-weight: 600;
  color: #666;
  margin-bottom: 2px !important;
}

/* Matrix side info */
.side-info-matrix .side-info-content {
  font-family: 'Courier New', Courier, monospace;
  background: rgba(13, 17, 23, 0.95);
  color: #6fbf6f;
  border-color: #1a3a1a;
  letter-spacing: 0.3px;
  max-height: 90vh;
  width: 320px;
  font-size: 11.5px;
  line-height: 1.7;
}

.side-info-matrix .si-title {
  color: #88dd88;
  text-transform: uppercase;
}

.hint {
  font-size: 12px;
  color: var(--text-muted);
  transition: color 0.3s;
}

.app.matrix .hint {
  font-family: 'Courier New', Courier, monospace;
  color: #3a6a3a;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Corner buttons */
.corner-buttons {
  position: fixed;
  top: 16px;
  right: 16px;
  display: flex;
  gap: 8px;
  z-index: 100;
}

.corner-btn {
  padding: 8px 16px;
  font-size: 13px;
  font-weight: 600;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--bg-surface);
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.3s;
}

.corner-btn:hover {
  background: #f0f0f0;
}

.corner-btn.active {
  background: #e8f5e9;
  border-color: #4caf50;
  color: #2e7d32;
}

.matrix-btn {
  font-family: 'Courier New', Courier, monospace;
  background: #151b23;
  color: #00ff41;
  border-color: #00ff41;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-shadow: 0 0 6px rgba(0, 255, 65, 0.4);
}

.matrix-btn:hover {
  background: rgba(0, 255, 65, 0.1) !important;
}

.matrix-btn.active {
  background: rgba(0, 255, 65, 0.2);
  box-shadow: 0 0 8px rgba(0, 255, 65, 0.3);
}
</style>
