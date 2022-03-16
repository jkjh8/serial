<template>
  <q-expansion-item expand-separator>
    <template #header>
      <q-item-section avatar>
        <q-avatar :color="udpOn ? 'blue-1' : 'grey-2'" size="md">
          <q-icon
            name="svguse:icons.svg#ethernet"
            @click.prevent.stop="openDrawer"
          />
          <q-badge
            v-if="udpOn"
            floating
            transparent
            rounded
            color="transparent"
          >
            <q-spinner-radio color="primary"></q-spinner-radio>
          </q-badge>
        </q-avatar>
      </q-item-section>
      <q-item-section>
        <q-item-label class="name"> UDP {{ mode }}</q-item-label>
      </q-item-section>
    </template>
    <div class="q-ma-sm">
      <q-input
        v-model="ipaddr"
        label="IP Address"
        filled
        dense
        :rules="rules.ipaddress"
        lazy-rules
        :disable="udpOn"
      />
      <q-input
        v-model="port"
        label="Port"
        filled
        dense
        type="Number"
        :disable="udpOn"
      />
      <div class="row justify-between items-center">
        <div class="q-ml-sm connect">Multicast</div>
        <q-toggle
          v-model="multicast"
          checked-icon="check"
          unchecked-icon="clear"
          :disable="udpOn"
        />
      </div>
      <div class="row justify-between items-center">
        <div class="q-ml-sm connect">Connect</div>
        <q-toggle
          v-model="udpOn"
          checked-icon="check"
          unchecked-icon="clear"
          @update:model-value="fnUdpOn"
        />
      </div>
    </div>
  </q-expansion-item>
</template>

<script>
import { ref, reactive, toRefs } from 'vue'
import { useStore } from 'vuex'

const rules = {
  required: [(value) => !!value || '필수 항목 입니다'],
  ipaddress: [
    (value) => !!value || 'IP Address를 입력하세요',
    (value) =>
      /^(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}$/gm.test(
        value
      ) || 'IPv4 형식이 아닙니다'
  ]
}

export default {
  props: { mode: String },
  setup(props) {
    const { commit } = useStore()
    const proMode = props.mode.toLowerCase()
    const udpOn = ref(false)
    const udp = reactive({
      ipaddr: '',
      port: 3000,
      multicast: false
    })

    function fnUdpOn(value) {
      if (!udp.ipaddr) {
        return (udpOn.value = false)
      }

      if (value) {
        let ipaddr = udp.ipaddr.split('.')
        ipaddr = Number(ipaddr[0])
        if (udp.multicast) {
          if (ipaddr < 224 || ipaddr > 239) {
            return (udpOn.value = false)
          }
        } else {
          if (ipaddr >= 224) {
            return (udpOn.value = false)
          }
        }
        window.API.onRequest({
          command: `udp${proMode}open`,
          port: udp.port,
          host: udp.ipaddr,
          multicast: udp.multicast
        })
      } else {
        window.API.onRequest({
          command: `udp${proMode}close`
        })
      }
    }

    function openDrawer() {
      commit('menu/changeDrawer', true)
    }
    return {
      ...toRefs(udp),
      rules,
      udpOn,
      fnUdpOn,
      openDrawer
    }
  }
}
</script>

<style></style>
