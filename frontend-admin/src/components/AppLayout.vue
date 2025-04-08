<template>
  <div class="layout">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Main Panel -->
    <div class="main-panel">
      <Topbar />
      <main class="main-content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import Sidebar from '@/components/layout/SideBar.vue'
import Topbar from '@/components/layout/TopBar.vue';


</script>

<style scoped>
.layout {
  display: flex;
  height: 100vh;
  overflow: hidden; /* prevent outer scroll */
}

.main-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.main-content {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
  background: #F8F8FA;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none;  /* IE and Edge */
}

.main-content::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}
</style>
