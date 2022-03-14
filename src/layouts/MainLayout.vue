<template>
  <q-layout view="hHh lpr fff">
    <q-header class="bg-white text-grey-10" style="padding: 0 1%" bordered>
      <q-toolbar>
        <q-avatar class="mainMenuIcon">
          <q-icon
            style="cursor: pointer"
            name="svguse:icons.svg#ethernet-color"
            size="sm"
            @click="toggleLeftDrawer"
          ></q-icon>
        </q-avatar>
        <q-toolbar-title style="font-weight: 700">
          Serial Test App
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      :width="220"
      show-if-above
      behavior="desktop"
      :mini="leftDrawerMini"
      bordered
    >
      <Links />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer> <Footer /> </q-footer>
  </q-layout>
</template>

<script>
import Links from '../components/LeftMenu.vue'
import Footer from '../components/Footer.vue'

import { defineComponent, ref, computed } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'MainLayout',
  components: {
    Links,
    Footer
  },
  setup() {
    const { state, commit } = useStore()

    const leftDrawerOpen = ref(true)
    const leftDrawerMini = computed({
      get() {
        return state.menu.drawer
      },
      set() {
        return commit('menu/changeDrawer')
      }
    })
    return {
      leftDrawerOpen,
      leftDrawerMini,
      toggleLeftDrawer() {
        commit('menu/changeDrawer')
      }
    }
  }
})
</script>

<style scoped>
.mainMenuIcon {
  background: #fefefe;
}
.mainMenuIcon:hover {
  background: #eeeeee;
}
</style>
