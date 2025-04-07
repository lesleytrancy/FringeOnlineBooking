<template>
  <section class="hero-section">
    <img class="banner" src="@/assets/images/banner.png">
    <SearchPanel></SearchPanel>
  </section>
</template>

<script>
import SearchPanel from '@/components/SearchPanel.vue'

export default {
  name: 'HeroBanner',
  components: {
    SearchPanel
  },
  data() {
    return {
      searchQuery: '',
      selectedCategory: ''
    }
  },
  computed: {
   
  },
  async created() {
    
  },
  methods: {
   
  }
}
</script>

<style scoped>
.hero-section {
  position: relative;
  text-align: center;
  margin-bottom: 50px;
}

.banner {
  width: 100%;
  height: auto;
  margin: 0 auto;
  display: block;
  border-radius: 10px;
}

</style>
