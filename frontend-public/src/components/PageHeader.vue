<template>
  <header class="header">
    <router-link to="/" class="logo">
      <img class="logo" src="@/assets/images/fringe.png" alt="Adelaide Fringe" />
    </router-link>
    <!-- <img class="logo" src="@/assets/images/fringe.png" alt="Adelaide Fringe" /> -->
    <nav class="header-right">
      <a href="#">Accessibility</a>
      <a href="#">Login</a>
      <button class="signup-btn">Signup</button>
    </nav>
  </header>
</template>



<style scoped>
.header {
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: white;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-left: auto; /* This pushes it to the right */
}

.header-right a {
  color: inherit;            /* Match parent text color */
  text-decoration: none;     /* Remove underline */
  cursor: pointer;
  user-select: none;

}

.signup-btn {
  background-color: #f25c94; /* or use your pink */
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  width: 130px;
  height: 50px;
  cursor: pointer;
  font-size: 16px;
  user-select: none;
}

.signup-btn:hover {
  background-color: #e14a82;
}

.logo {
  height: 100%;
}

.partner-logo {
  height: 24px;
}

</style>
