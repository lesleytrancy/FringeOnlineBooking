<template>
  <div class="circle-progress">
    <svg viewBox="0 0 36 36" class="circular-chart">
      <!-- Background circle -->
      <path
        class="circle-bg"
        d="M18 2.0845
           a 15.9155 15.9155 0 0 1 0 31.831
           a 15.9155 15.9155 0 0 1 0 -31.831"
      />
      <!-- Progress circle -->
      <path
        class="circle"
        :stroke="color"
        :stroke-dasharray="`${progress}, 100`"
        d="M18 2.0845
           a 15.9155 15.9155 0 0 1 0 31.831
           a 15.9155 15.9155 0 0 1 0 -31.831"
      />
      <!-- Center icon -->
      <text x="18" y="21" class="trend-icon" text-anchor="middle">
        {{ trend === 'up' ? '↑' : trend === 'down' ? '↓' : '' }}
      </text>
    </svg>

    <!-- Bottom label -->
    <div class="label">
      <span class="label-text">{{ label }}</span>
      <span class="label-value">{{ value }}</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  progress: {
    type: Number,
    default: 75 // value from 0–100
  },
  trend: {
    type: String,
    default: 'up' // 'up', 'down', or ''
  },
  color: {
    type: String,
    default: '#4f46e5' // e.g. #3c6ff0 or any hex
  },
  label: String,
  value: String
})
</script>

<style scoped>
.circle-progress {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100px;
}

.circular-chart {
  width: 100%;
  height: auto;
  transform: rotate(-90deg); /* start from top */
}

.circle-bg {
  fill: none;
  stroke: #eee;
  stroke-width: 3.8;
}

.circle {
  fill: none;
  stroke-width: 3.8;
  stroke-linecap: round;
  transition: stroke-dasharray 0.4s ease;
}

.trend-icon {
  font-size: 14px;
  fill: #666;
  transform: rotate(90deg);
}

.label {
  margin-top: 8px;
  text-align: center;
}

.label-text {
  font-size: 12px;
  color: #888;
  display: block;
}

.label-value {
  font-size: 16px;
  font-weight: bold;
  color: #111;
}
</style>
