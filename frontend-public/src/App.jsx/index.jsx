import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'

export default defineComponent({
  name: 'App',
  setup() {
    return () => (
      <div id="app">
        <RouterView />
      </div>
    )
  }
})
