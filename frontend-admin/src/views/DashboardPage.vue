<template>
  <div class="dashboard-page">
    <!-- Summary Cards -->
    <div class="summary-cards">
      <SummaryCard label="Total Users" value="560K" change="14.5" percentage="85.6" :isUp="true" iconClass="fas fa-users" />
      <SummaryCard label="Total Events" value="320" change="14.5" percentage="53.6" :isUp="true" :color="`#16c2b8`"  iconClass="fas fa-calendar-alt" />
      <SummaryCard label="New Booking" value="1.2K" change="14.5" percentage="23.9" :isUp="false" iconClass="fas fa-ticket-alt" />
    </div>

    <!-- Weekly Revenue Chart -->
    <WeeklyRevenueChart />

    <!-- Lower Charts -->
    <div class="chart-grid">
      <div class="panel">
        <PieChart />
      </div>
      <div class="panel">
        <TrafficBarChart />
      </div>
    </div>
  </div>
</template>

<script setup>
import SummaryCard from '@/components/dashboard/SummaryCard.vue'
import WeeklyRevenueChart from '@/components/dashboard/WeeklyRevenueChart.vue'
import PieChart from '@/components/dashboard/PieChart.vue'
import TrafficBarChart from '@/components/dashboard/TrafficBarChart.vue'
</script>

<style scoped>
.dashboard-page {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.summary-cards {
  flex: 1;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: space-between;
}

.panel {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.chart-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}
</style>
