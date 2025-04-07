<template>
  <div>
    <PageHeader></PageHeader>
    <div class="not-found">
    <img src="@/assets/icons/404.svg" alt="404 Not Found" class="not-found-image" />

    <h2>Oops!</h2>
    <p>We can’t seem to find the page you are looking for</p>

    <router-link to="/">
      <button class="home-btn" @click="goHome">Back to Homepage</button>
    </router-link>
    

    <div class="social">
      <p>Follow us on</p>
      <div class="icons">
        <i class="fab fa-instagram"></i>
        <i class="fab fa-facebook-f"></i>
        <i class="fab fa-linkedin-in"></i>
        <i class="fab fa-twitter"></i>
        <i class="fab fa-youtube"></i>
      </div>
    </div>
  </div>
    <div style="position: absolute; bottom: 0; right: 0; left: 0;">
      <FooterSectionVue/>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
// import EventCard from '@/components/EventCard.vue'
import PageHeader from '@/components/PageHeader.vue'
import FooterSectionVue from '../components/FooterSection.vue'

export default {
  name: 'HomePage',
  components: {
    PageHeader,
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

.not-found {
  text-align: center;
  padding: 60px 20px;
  font-family: 'ABeeZee', sans-serif;
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
