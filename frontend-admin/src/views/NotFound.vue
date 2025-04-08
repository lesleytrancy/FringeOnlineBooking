<template>
  <div class="not-found-wrapper">
    <div class="not-found">
    <img src="@/assets/icons/404.svg" alt="404 Not Found" class="not-found-image" />

    <h2>Oops!</h2>
    <p>We can’t seem to find the page you are looking for</p>

  </div>
  </div>
</template>

<script>


export default {
  name: 'NotFound',
  data() {
    return {
     
    }
  }
}
</script>

<style scoped>
.home {
  padding: 2rem 0;
}

.not-found-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Full screen height */
}

.not-found {
  text-align: center;
  padding: 60px 20px;
  font-family: 'ABeeZee', sans-serif;
  user-select: none;
}

.not-found-image {
  width: 320px;
  max-width: 80%;
  margin-bottom: 24px;
}

h2 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 8px;
}

p {
  font-size: 14px;
  color: #666;
  margin-bottom: 24px;
}

.home-btn {
  background-color: #f25c94;
  border: none;
  color: white;
  padding: 10px 20px;
  font-size: 14px;
  border-radius: 999px;
  cursor: pointer;
  margin-bottom: 40px;
}

.social p {
  font-size: 13px;
  margin-bottom: 8px;
}

.icons {
  display: flex;
  justify-content: center;
  gap: 16px;
}

.icons i {
  width: 36px;
  height: 36px;
  background-color: #fce4ec;
  color: #f25c94;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
}
</style>
