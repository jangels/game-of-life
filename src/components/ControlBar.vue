<script setup lang="ts">
import { computed } from 'vue'
import { useGameState } from '../composables/useGameState'
import { PATTERNS } from '../engine/patterns'

const { isRunning, speed, selectedPattern, theme, start, stop, clear, randomize } = useGameState()

const PATTERN_LABELS: Record<string, Record<string, string>> = {
  light: {
    'Block': '方块(Block)',
    'Beehive': '蜂巢(Beehive)',
    'Loaf': '面包(Loaf)',
    'Blinker': '闪烁器(Blinker)',
    'Toad': '蟾蜍(Toad)',
    'Pulsar': '脉冲星(Pulsar)',
    'Pentadecathlon': '十五邻(Pentadecathlon)',
    'Glider': '滑翔机(Glider)',
    'LWSS': '轻量飞船(LWSS)',
    'Gosper Glider Gun': '高斯帕滑翔机枪(Gosper Glider Gun)',
    'R-pentomino': '混乱之源(R-pentomino)',
    'Acorn': '橡子(Acorn)',
    'Diehard': '顽强(Diehard)',
  },
  matrix: {
    'Block': 'STILL::BLOCK',
    'Beehive': 'STILL::BEEHIVE',
    'Loaf': 'STILL::LOAF',
    'Blinker': 'OSC::BLINKER',
    'Toad': 'OSC::TOAD',
    'Pulsar': 'OSC::PULSAR',
    'Pentadecathlon': 'OSC::PENTADECATHLON',
    'Glider': 'SPACESHIP::GLIDER',
    'LWSS': 'SPACESHIP::LWSS',
    'Gosper Glider Gun': 'GUN::GOSPER_GLIDER',
    'R-pentomino': 'META::R_PENTOMINO',
    'Acorn': 'META::ACORN',
    'Diehard': 'META::DIEHARD',
  },
}

const CATEGORY_LABELS: Record<string, Record<string, string>> = {
  light: {
    'Still Lifes': '静物(Still Lifes)',
    'Oscillators': '振荡器(Oscillators)',
    'Spaceships': '飞船(Spaceships)',
    'Guns': '枪(Guns)',
    'Methuselahs': '玛土撒拉(Methuselahs)',
  },
  matrix: {
    'Still Lifes': 'STATIC_FORMS',
    'Oscillators': 'OSCILLATORS',
    'Spaceships': 'SPACESHIPS',
    'Guns': 'GUNS',
    'Methuselahs': 'METHUSELAHS',
  },
}

const isMatrix = computed(() => theme.value === 'matrix')

const categories = computed(() => {
  const map = new Map<string, typeof PATTERNS>()
  for (const p of PATTERNS) {
    if (!map.has(p.category)) map.set(p.category, [])
    map.get(p.category)!.push(p)
  }
  return map
})

function toggleRun() {
  if (isRunning.value) {
    stop()
  } else {
    start()
  }
}

function onPatternChange(e: Event) {
  const name = (e.target as HTMLSelectElement).value
  if (!name) {
    selectedPattern.value = null
    return
  }
  const pat = PATTERNS.find(p => p.name === name)
  if (pat) {
    selectedPattern.value = pat
  }
}

function patternLabel(name: string) {
  return PATTERN_LABELS[theme.value]?.[name] ?? name
}

function categoryLabel(cat: string) {
  return CATEGORY_LABELS[theme.value]?.[cat] ?? cat
}

const sliderColor = computed(() => isMatrix.value ? '#00ff41' : '#2563eb')
const sliderBg = computed(() => {
  const pct = ((speed.value - 1) / 59) * 100
  const color = sliderColor.value
  const track = isMatrix.value ? '#1a3a1a' : '#ddd'
  return `linear-gradient(to right, ${color} ${pct}%, ${track} ${pct}%)`
})
</script>

<template>
  <div class="control-bar">
    <div class="controls">
      <button class="primary run-btn" @click="toggleRun">
        {{ isMatrix
          ? (isRunning ? '[ ⏸ HALT ]' : '[ ⏵ EXEC ]')
          : (isRunning ? '⏸ 暂停' : '▶ 开始运行')
        }}
      </button>
      <button @click="randomize()">
        {{ isMatrix ? '[ ↻ RANDOM ]' : '🎲 随机生成' }}
      </button>
      <button class="danger" @click="clear">
        {{ isMatrix ? '[ × PURGE ]' : '🗑 清空画布' }}
      </button>
      <select class="pattern-select" :value="selectedPattern?.name ?? ''" @change="onPatternChange">
        <option value="">{{ isMatrix ? '-- SELECT_PATTERN --' : '-- 选择预设图案 --' }}</option>
        <optgroup v-for="[category, patterns] in categories" :key="category" :label="categoryLabel(category)">
          <option v-for="p in patterns" :key="p.name" :value="p.name">
            {{ patternLabel(p.name) }}
          </option>
        </optgroup>
      </select>
    </div>
    <div class="divider" />
    <div class="speed-group">
      <label>{{ isMatrix ? 'CLOCK::' : '速度:' }}</label>
      <input
        type="range"
        min="1"
        max="60"
        :value="speed"
        :style="{ background: sliderBg }"
        @input="speed = Number(($event.target as HTMLInputElement).value)"
      />
      <span class="speed-value">{{ speed }} Hz</span>
    </div>
  </div>
</template>

<style scoped>
.control-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
  width: 100%;
}

.controls {
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
}

.run-btn {
  min-width: 140px;
  text-align: center;
}

.pattern-select {
  min-width: 200px;
}

.divider {
  width: 1px;
  height: 24px;
  background: var(--border);
}

.speed-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.speed-value {
  font-size: 14px;
  color: var(--text-secondary);
  min-width: 42px;
  font-variant-numeric: tabular-nums;
}

/* Mobile responsive styles */
@media (max-width: 768px) {
  .control-bar {
    flex-direction: column;
    gap: 12px;
  }

  .controls {
    gap: 8px;
    width: 100%;
  }

  .controls button {
    padding: 10px 12px;
    font-size: 13px;
    flex: 1;
    min-width: 0;
  }

  .run-btn {
    min-width: 0;
    flex: 1.5;
  }

  .pattern-select {
    min-width: 0;
    width: 100%;
    font-size: 13px;
    padding: 10px 8px;
  }

  .divider {
    width: 80%;
    height: 1px;
  }

  .speed-group {
    width: 100%;
    justify-content: center;
    gap: 12px;
  }

  .speed-group input[type="range"] {
    flex: 1;
    max-width: 200px;
  }

  .speed-value {
    font-size: 13px;
    min-width: 50px;
  }
}

@media (max-width: 480px) {
  .controls {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }

  .controls button {
    padding: 8px 10px;
    font-size: 12px;
  }

  .run-btn {
    grid-column: span 2;
  }

  .pattern-select {
    grid-column: span 2;
    font-size: 12px;
  }

  .speed-group label {
    font-size: 12px;
  }

  .speed-value {
    font-size: 12px;
    min-width: 45px;
  }
}
</style>
