<template>
  <div class="chart-card">
    <div class="title-wrapper">
      <h3 class="title">Weekly Revenue</h3>
      <img src="@/assets/icons/bar_chart.svg" alt="Chart Icon" class="icon" />
    </div>

    <div class="chart-wrapper">
      <Bar :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script setup>
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

const chartData = {
  labels: ['17', '18', '19', '20', '21', '22', '23', '24', '25'],
  datasets: [
    {
      label: 'Level 1',
      data: [30, 28, 25, 32, 26, 27, 25, 24, 31],
      backgroundColor: '#7D41E1',
      borderRadius: 6,
      barThickness: 10,
      stack: 'stack1'
    },
    {
      label: 'Level 2',
      data: [25, 27, 24, 30, 23, 24, 25, 22, 28],
      backgroundColor: '#5EDBFF',
      barThickness: 10,
      borderRadius: 6,
      stack: 'stack1'
    },
    {
      label: 'Level 3',
      data: [20, 22, 23, 25, 20, 22, 20, 21, 23],
      backgroundColor: '#EAEFFF',
      borderRadius: 6,
      barThickness: 10,
      stack: 'stack1'
    }
  ]
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: { enabled: false }
  },
  scales: {
    x: {
      stacked: true,
      grid: { display: false }
    },
    y: {
      display: false,
      stacked: true,
      ticks: { display: false },
      grid: { display: false }
    }
  }
}
</script>
<style scoped>
.chart-card {
  background-color: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  height: 297px;
}
.chart-wrapper {
  height: 250px;
  width: 100%;
  position: relative;
}

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

</style>
