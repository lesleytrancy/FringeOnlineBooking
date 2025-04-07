<template>
  <section class="brand-section">
    <h2 class="brand-title">
      Join these <span class="highlight">brands</span>
    </h2>
    <p class="brand-subtitle">
      We've had the pleasure of working with industry-defining brands. These are just some of them.
    </p>
    <div class="brand-logos">
      <img v-for="(brand, index) in brands" :key="index" :src="brand.logo" :alt="brand.name" />
    </div>
  </section>
</template>

<script>
export default {
  name: 'BrandSection',
  data() {
    return {
      brands: [
      { name: 'Spotify', logo: new URL('@/assets/logos/spotify.png', import.meta.url).href },
  { name: 'Google', logo: new URL('@/assets/logos/google.png', import.meta.url).href },
  { name: 'Stripe', logo: new URL('@/assets/logos/stripe.png', import.meta.url).href },
  { name: 'YouTube', logo: new URL('@/assets/logos/youtube.png', import.meta.url).href },
  { name: 'Microsoft', logo: new URL('@/assets/logos/microsoft.png', import.meta.url).href },
  { name: 'Medium', logo: new URL('@/assets/logos/medium.png', import.meta.url).href },
  { name: 'Zoom', logo: new URL('@/assets/logos/zoom.png', import.meta.url).href },
  { name: 'Uber', logo: new URL('@/assets/logos/uber.png', import.meta.url).href },
  { name: 'Grab', logo: new URL('@/assets/logos/grab.png', import.meta.url).href }
      ]
    }
  }
}
</script>

<style scoped>
.brand-section {
  text-align: center;
  padding: 60px 20px;
  background-color: #f9f9f9;
}

.brand-title {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 12px;
}

.brand-title .highlight {
  color: #f25c94;
}

.brand-subtitle {
  font-size: 16px;
  color: #333;
  max-width: 600px;
  margin: 0 auto 40px;
  line-height: 1.5;
}

.brand-logos {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 60px;
}

.brand-logos img {
  height: 40px;
  object-fit: contain;
}
</style>
