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

        <div class="row items-center q-gutter-x-sm">
          <q-input class="self-end" v-model="filter" filled dense clearable>
          </q-input>
          <q-btn
            class="self-start q-mt-xs"
            icon="svguse:icons.svg#trash"
            round
            flat
            color="red-10"
            size="sm"
            @click="clearTable"
          >
            <q-tooltip style="background: rgba(0, 0, 5, 0.5)">
              Clear
            </q-tooltip>
          </q-btn>
        </div>
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

    <q-footer reveal> <Footer /> </q-footer>
  </q-layout>
</template>

<script>
import Links from '../components/LeftMenu.vue'
import Footer from '../components/Footer.vue'

import { parsing } from '../api/parsing'

import { defineComponent, ref, computed, onMounted } from 'vue'
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

    const filter = computed({
      get() {
        return state.message.filter
      },
      set(v) {
        return commit('message/updateFilter', v)
      }
    })

    function clearTable() {
      commit('message/clearMessage')
    }

    onMounted(() => {
      window.API.onResponse((args) => {
        parsing(args)
        // switch (args.command) {
        //   case 'serialports':
        //     commit('serial/updateSerialPorts', args.list)
        //     break
        // }
      })
    })
    return {
      leftDrawerOpen,
      leftDrawerMini,
      filter,
      clearTable,
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
