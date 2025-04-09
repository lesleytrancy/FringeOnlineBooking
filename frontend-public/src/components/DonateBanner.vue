<template>
  <section class="donate-banner">
    <div class="donate-image">
      <img src="@/assets/images/donate banner.jpg" alt="Donate to Arts Unlimited" />
    </div>
    <div class="donate-content">
      <h2>Donate to Arts Unlimited</h2>
      <p>
        Arts Unlimited is Adelaide Fringe's Foundation that removes barriers to
        participation for artists, venues and audiences, ensuring everyone, no
        matter their background, is able to access the arts.
      </p>
      <button class="donate-button">Donate Now</button>
    </div>
  </section>
</template>

<script>
export default {
  name: 'DonateBanner'
}
</script>

<style scoped>
.donate-banner {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 240px;
  background-color: #f29f05; /* orange background */
}

.donate-image {
  flex: 1;
}

.donate-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.donate-content {
  flex: 1;
  padding: 32px;
  background-color: #f29f05;
  color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.donate-content h2 {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 16px;
}

.donate-content p {
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 24px;
}

.donate-button {
  background-color: #f25c94;
  color: white;
  font-size: 16px;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  align-self: flex-start;
  transition: background-color 0.2s ease;
}

.donate-button:hover {
  background-color: #e14a82;
}
</style>
