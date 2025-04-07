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
  min-height: 100vh;
  background-color: #f9f9fb;
}

.main-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.main-content {
  padding: 24px;
  flex: 1;
  overflow-y: auto;
}
</style>@/components/layout/TopBar.vue
