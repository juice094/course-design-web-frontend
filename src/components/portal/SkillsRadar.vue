<template>
  <div class="section">
    <div class="section-header">
      <div class="section-icon emerald-bg">
        <svg
          class="icon-svg emerald"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      </div>
      <h2 class="section-title">
        技能雷达
      </h2>
    </div>

    <div class="radar-card">
      <div
        ref="chartRef"
        class="radar-chart"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import * as echarts from 'echarts/core'
import { RadarChart } from 'echarts/charts'
import { RadarComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import { useThemeStore } from '@/stores/theme'

echarts.use([RadarChart, RadarComponent, TooltipComponent, LegendComponent, CanvasRenderer])

const chartRef = ref<HTMLDivElement>()
const themeStore = useThemeStore()
let chart: echarts.ECharts | null = null

const getOption = () => {
  const isDark = themeStore.isDark
  const textColor = isDark ? '#cbd5e1' : '#475569'
  const lineColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)'
  const splitColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.03)'

  return {
    color: ['#6366f1'],
    tooltip: { trigger: 'item' },
    radar: {
      indicator: [
        { name: '前端开发', max: 100 },
        { name: '后端工程', max: 100 },
        { name: '算法设计', max: 100 },
        { name: '游戏策略', max: 100 },
        { name: '学术研究', max: 100 },
        { name: 'UI 设计', max: 100 },
      ],
      shape: 'polygon',
      splitNumber: 4,
      axisName: {
        color: textColor,
        fontWeight: 'bold',
        fontSize: 12,
      },
      splitLine: { lineStyle: { color: splitColor } },
      splitArea: {
        show: true,
        areaStyle: {
          color: [isDark ? 'rgba(99,102,241,0.05)' : 'rgba(99,102,241,0.02)', isDark ? 'rgba(99,102,241,0.1)' : 'rgba(99,102,241,0.05)'],
        },
      },
      axisLine: { lineStyle: { color: lineColor } },
    },
    series: [
      {
        name: '能力值',
        type: 'radar',
        data: [
          {
            value: [88, 72, 65, 82, 58, 70],
            name: '当前水平',
            areaStyle: { color: 'rgba(99, 102, 241, 0.25)' },
            lineStyle: { color: '#6366f1', width: 2 },
            itemStyle: { color: '#6366f1' },
          },
        ],
      },
    ],
  }
}

onMounted(() => {
  if (!chartRef.value) return
  chart = echarts.init(chartRef.value)
  chart.setOption(getOption())

  const resize = () => chart?.resize()
  window.addEventListener('resize', resize)
})

watch(() => themeStore.isDark, () => {
  chart?.setOption(getOption(), true)
})
</script>

<style scoped>
.section {
  width: 100%;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
}

.section-icon {
  width: 2rem;
  height: 2rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.emerald-bg {
  background: rgba(16, 185, 129, 0.2);
}

.icon-svg {
  width: 1rem;
  height: 1rem;
}

.emerald {
  color: #059669;
}

.dark .emerald {
  color: #34d399;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #0f172a;
  font-family: 'Noto Serif SC', serif;
  margin: 0;
  transition: color 1s;
}

.dark .section-title {
  color: #fff;
}

.radar-card {
  border-radius: 1.5rem;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  padding: 1.25rem;
}

.dark .radar-card {
  background: rgba(30, 41, 59, 0.5);
  border-color: rgba(255, 255, 255, 0.1);
}

.radar-chart {
  width: 100%;
  height: 360px;
}
</style>