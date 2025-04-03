<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <router-link to="/" class="logo-link">
        <img src="@/assets/images/logo.png" alt="Fringe Online Booking" class="logo">
      </router-link>
    </div>
    <div class="navbar-menu">
      <router-link to="/" class="nav-link">Home</router-link>
      <router-link to="/events" class="nav-link">Events</router-link>
      <router-link v-if="isAuthenticated" to="/profile" class="nav-link">Profile</router-link>
      <router-link v-if="!isAuthenticated" to="/login" class="nav-link">Login</router-link>
      <router-link v-if="!isAuthenticated" to="/register" class="nav-link">Register</router-link>
      <button v-if="isAuthenticated" @click="logout" class="nav-button">Logout</button>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Navbar',
  computed: {
    ...mapGetters('user', ['isAuthenticated'])
  },
  methods: {
    logout() {
      this.$store.dispatch('user/logout')
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #eee;
  margin-bottom: 2rem;
}

.logo {
  height: 50px;
}

.navbar-menu {
  display: flex;
  gap: 1.5rem;
}

.nav-link {
  text-decoration: none;
  color: #2c3e50;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.nav-link:hover {
  background-color: #f5f5f5;
}

.nav-link.router-link-exact-active {
  color: #42b983;
}

.nav-button {
  background: none;
  border: none;
  cursor: pointer;
  font: inherit;
  color: #2c3e50;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.nav-button:hover {
  background-color: #f5f5f5;
}
</style>
