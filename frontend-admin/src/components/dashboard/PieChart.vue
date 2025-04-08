<template>
  <div class="chart-card">
    <!-- <div class="header">
      <h3 class="title">Your Pie Chart</h3>
      <span class="timeframe">Monthly ⌄</span>
    </div> -->
    <div class="title-wrapper">
      <h3 class="title">Weekly Revenue</h3>
      <span class="timeframe">Monthly ⌄</span>
    </div>
    <div class="pie-chart-wrapper">
      <Pie :data="chartData" :options="chartOptions" />
    </div>
    <div class="legend">
      <div class="legend-item">
        <span class="dot" style="background-color: #a95aa1;"></span> Your files
        <strong>63%</strong>
      </div>
      <div class="legend-item">
        <span class="dot" style="background-color: #62c0e1;"></span> System
        <strong>25%</strong>
      </div>
    </div>
  </div>
</template>

<script>
import { Pie } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement)

export default {
  name: 'PieChart',
  components: { Pie },
  data() {
    return {
      chartData: {
        labels: ['Your files', 'System', 'Other'],
        datasets: [
          {
            data: [63, 25, 12],
            backgroundColor: ['#a95aa1', '#62c0e1', '#f2f2f2'],
            borderWidth: 0
          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        }
      }
    }
  }
}
</script>

<style scoped>

.title-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: space-between;
  user-select: none;
}

.title {
  font-size: 18px;
  font-weight: 600;
  margin: 0;
}

.icon {
  width: 16px;
  height: 16px;
}
.chart-card {
  background-color: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  user-select: none;
}

.pie-chart-wrapper {
  height: 170px;
}

.header {
  display: flex;
  justify-content: space-between;
}

.title {
  font-size: 16px;
  font-weight: 600;
}

.timeframe {
  font-size: 14px;
  color: #888;
}

.pie {
  flex: 1;
  max-height: 160px;
  margin: 8px 0;
}

.legend {
  display: flex;
  justify-content: space-around;
  font-size: 13px;
  color: #555;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
</style>
