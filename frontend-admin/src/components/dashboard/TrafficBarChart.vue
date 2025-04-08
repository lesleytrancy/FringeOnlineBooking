<template>
  <div class="chart-card">
    <div class="header">
      <div class="info">
        <span class="label">Daily Traffic</span>
        <div class="value">
          2.579 <span class="unit">Visitors</span>
        </div>
      </div>
      <div class="percentage">+2.45%</div>
    </div>
    <div class="bar-wrapper">
      <Bar :data="chartData" :options="chartOptions" class="bar" />
    </div>
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'TrafficBarChart',
  components: { Bar },
  data() {
    return {
      chartData: {
        labels: ['00', '04', '08', '12', '14', '16', '18'],
        datasets: [
          {
            label: 'Visitors',
            data: [8, 5, 12, 9, 11, 15, 4],
            backgroundColor: (ctx) => {
              const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 300)
              gradient.addColorStop(0, '#7d41e1')  // top: purple
              gradient.addColorStop(1, '#f25c94')  // bottom: pink
              return gradient
            },
            borderRadius: 6,
            barThickness: 24
          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: {
              color: '#888',
              font: { size: 12 }
            }
          },
          y: {
            display: false,
            grid: { display: false },
            ticks: { display: false }
          }
        }
      }
    }
  }
}
</script>

<style scoped>
.chart-card {
  background: white;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
}

.info {
  display: flex;
  flex-direction: column;
}

.label {
  font-size: 13px;
  color: #888;
  margin-bottom: 4px;
}

.value {
  font-size: 24px;
  font-weight: 600;
  color: #2d2d2d;
}

.unit {
  font-size: 14px;
  color: #888;
  margin-left: 6px;
}

.percentage {
  font-size: 13px;
  font-weight: 500;
  color: #18c964;
}

.bar {
  flex: 1;
}
</style>
