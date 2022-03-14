<template>
  <q-layout view="hHh lpr fff">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Quasar App </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      behavior="desktop"
      :mini="leftDrawerMini"
      bordered
    >
      <EssentialLink />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer> footer </q-footer>
  </q-layout>
</template>

<script>
import EssentialLink from '../components/leftLink.vue'

import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',
  components: {
    EssentialLink
  },
  setup() {
    const leftDrawerOpen = ref(true)
    const leftDrawerMini = ref(false)

    return {
      leftDrawerOpen,
      leftDrawerMini,
      toggleLeftDrawer() {
        leftDrawerMini.value = !leftDrawerMini.value
      }
    }
  }
})
</script>
