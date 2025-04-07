<template>
  <div>
    <PageHeader></PageHeader>
    <HeroBanner></HeroBanner>
    <Upcoming/>
    <button class="floating-btn">
      <img src="@/assets/icons/chat-icon.svg" alt="Chat" />
    </button>
    <DonateBannerVue/>
    <BrandSectionVue/>
    <FooterSectionVue/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
// import EventCard from '@/components/EventCard.vue'
import PageHeader from '@/components/PageHeader.vue'
import HeroBanner from '@/components/HeroBanner.vue'
import Upcoming from '@/components/UpcomingEventFilters.vue'
import DonateBannerVue from '@/components/DonateBanner.vue'
import BrandSectionVue from '../components/BrandSection.vue'
import FooterSectionVue from '../components/FooterSection.vue'

export default {
  name: 'HomePage',
  components: {
    PageHeader,
    HeroBanner,
    Upcoming,
    DonateBannerVue,
    BrandSectionVue,
    FooterSectionVue
  },
  data() {
    return {
      searchQuery: '',
      selectedCategory: ''
    }
  },
  computed: {
    ...mapGetters('events', ['featuredEvents', 'eventCategories']),
    categories() {
      return this.eventCategories || []
    }
  },
  async created() {
    await this.fetchFeaturedEvents()
    await this.fetchCategories()
  },
  methods: {
    ...mapActions('events', ['fetchFeaturedEvents', 'fetchCategories']),
    searchEvents() {
      this.$router.push({
        path: '/events',
        query: {
          search: this.searchQuery,
          category: this.selectedCategory
        }
      })
    }
  }
}
</script>

<style scoped>
.home {
  padding: 2rem 0;
}

.floating-btn {
  position: fixed;
  bottom: 24px;
  right: 0px;
  background-color: #f25c94;
  color: white;
  width: 56px;
  height: 56px;
  border: none;
  border-radius: 12px 0 0 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.floating-btn img {
  width: 24px;
  height: 24px;
}


.hero {
  text-align: center;
  padding: 4rem 0;
  background-color: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 3rem;
}

.hero h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.hero p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: #666;
}

.featured-events {
  margin-bottom: 3rem;
}

.featured-events h2 {
  text-align: center;
  margin-bottom: 2rem;
}

.events-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.search-box {
  display: flex;
  gap: 1rem;
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.search-box input {
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.search-box select {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-width: 200px;
}

.btn-primary {
  padding: 0.75rem 1.5rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.2s;
}

.btn-primary:hover {
  background-color: #3aa876;
}
</style>
