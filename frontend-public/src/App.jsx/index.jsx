import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import './index.css'

export default defineComponent({
  name: 'App',
  setup() {
    return () => (
      <div id="app" style="margin: 0 60px">
        <RouterView />
      </div>
    )
  }
})
