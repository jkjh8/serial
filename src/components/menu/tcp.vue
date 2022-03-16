<template>
  <q-expansion-item expand-separator>
    <template #header>
      <q-item-section avatar>
        <q-avatar :color="tcpOn ? 'blue-1' : 'grey-2'" size="md">
          <q-icon
            name="svguse:icons.svg#ethernet"
            @click.prevent.stop="openDrawer"
          />
          <q-badge
            v-if="tcpOn"
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
        <q-item-label class="name"> TCP </q-item-label>
      </q-item-section>
    </template>

    <div class="q-ma-sm">
      <q-select
        v-model="mode"
        :options="['Server', 'Client']"
        label="Mode"
        filled
        dense
        :disable="tcpOn"
      />
      <q-input
        v-model="ipaddr"
        label="IP Address"
        filled
        dense
        :disable="tcpOn"
        :rules="rules.ipaddress"
        lazy-rules
      />
      <q-input
        v-model="port"
        label="Port"
        filled
        dense
        type="Number"
        :disable="tcpOn"
      />
      <q-separator />
      <div class="row justify-between items-center">
        <div class="q-ml-sm connect">Connect</div>
        <q-toggle
          v-model="tcpOn"
          checked-icon="check"
          unchecked-icon="clear"
          @update:model-value="fnTcpOn"
        />
      </div>
    </div>
  </q-expansion-item>
</template>

<script>
import { ref, reactive, toRefs, onMounted } from 'vue'
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
  setup() {
    const { commit } = useStore()
    const tcp = reactive({
      mode: 'Server',
      ipaddr: '0.0.0.0',
      port: 3000
    })
    const tcpOn = ref(false)

    function fnTcpOn(value) {
      if (tcp.mode === 'Server') {
        if (value) {
          window.API.onRequest({
            command: 'tcpserveropen',
            port: tcp.port,
            host: tcp.ipaddr
          })
        }
      }
    }

    function openDrawer() {
      commit('menu/changeDrawer', true)
    }

    onMounted(() => {
      window.API.onResponse((args) => {
        switch (args.command) {
          case 'tcperror':
          case 'tcpclose':
            console.log('tcp close')
            tcpOn.value = false
            break
        }
      })
    })

    return { ...toRefs(tcp), rules, tcpOn, fnTcpOn, openDrawer }
  }
}
</script>
