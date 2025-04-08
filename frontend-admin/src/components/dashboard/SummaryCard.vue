<template>
  <div class="progress-card">
    <div class="progress-ring">
      <svg viewBox="0 0 36 36" class="circular-chart">
        <path
          class="circle-bg"
          d="M18 2.0845
             a 15.9155 15.9155 0 0 1 0 31.831
             a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <path
          class="circle"
          :stroke="color"
          :stroke-dasharray="`${percentage}, 100`"
          d="M18 2.0845
             a 15.9155 15.9155 0 0 1 0 31.831
             a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <text x="18" y="20.35" class="arrow-icon" :transform="isUp? `rotate(45 18 18)` : `rotate(135 18 18)`" text-anchor="middle">
          ↑
        </text>
      </svg>
    </div>

    <div class="details">
      <div class="label">{{ label }}</div>
      <div class="value">{{ value }}</div>
      <div class="change">
        {{ change }}% <span :class="isUp?`icon-up`: `icon-up down`">▲</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
name: 'SummaryCard',
props: {
  iconClass: { type: String, default: 'fas fa-chart-line' },
  label: { type: String, required: true },
  color: { type: String, required: false, default: '#3c6ff0'},
  value: { type: String, required: true },
  percentage: { type: String, default: '0.00' },
  isUp: { type: Boolean, default: true },
  change: {type: String, default: '0.00'}
  }
}

</script>

<style scoped>
.progress-card {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 36px;
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  height: 135px;
  user-select: none;
}

.progress-ring {
  width: 100px;
  height: 100px;
}

.circular-chart {
  width: 100%;
  height: 100%;
}

.circle-bg {
  fill: none;
  stroke: #eee;
  stroke-width: 2;
}

.circle {
  fill: none;
  stroke-width: 2;
  stroke-linecap: round;
  transition: stroke-dasharray 0.3s ease;
  /* transform: rotate(-90deg); */
}

.arrow-icon {
  font-size: 16px;
  fill: #999;
}

.details {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 28px;
}

.label {
  font-size: 14px;
  color: #8890a0;
}

.value {
  font-size: 20px;
  font-weight: bold;
  color: #1a1a1a;
}

.change {
  font-size: 14px;
  color: #0a2540;
  display: flex;
  align-items: center;
}

.icon-up {
  color: #16c2b8;
  font-size: 14px;
  margin-left: 4px;
}

.icon-up.down {
  rotate: 180deg;
  color: brown;
}
</style>
