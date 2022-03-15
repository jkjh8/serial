<template>
  <!-- <div class="q-mx-md">Communication</div> -->
  <div>
    <q-list>
      <!-- Serial -->
      <q-expansion-item expand-separator>
        <template #header>
          <q-item-section avatar>
            <q-avatar :color="serialOn ? 'blue-1' : 'grey-2'" size="md">
              <q-icon
                name="svguse:icons.svg#serial"
                @click.prevent.stop="openDrawer"
              />
              <q-badge
                v-if="serialOn"
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
            <q-item-label class="name"> Serial </q-item-label>
          </q-item-section>
        </template>
        <div class="q-ma-sm">
          <q-select
            v-model="comm"
            :options="serialComms"
            filled
            dense
            label="Com Port"
            :rules="rules.required"
          />
          <q-select
            v-model="baud"
            :options="[
              110, 300, 600, 1200, 2400, 4800, 9600, 14400, 19200, 28800, 38400,
              56000, 57600, 115200
            ]"
            filled
            dense
            label="Baud Rate"
          />
          <q-select
            v-model="dataBit"
            :options="[5, 6, 7, 8]"
            filled
            dense
            label="Data Bit"
          />
          <q-select
            v-model="stopBit"
            :options="[1, 1.5, 2]"
            filled
            dense
            label="Stop Bit"
          />

          <q-select
            v-model="parity"
            :options="['None', 'Even', 'Odd']"
            filled
            dense
            label="Parity"
          />
          <div class="row justify-between items-center">
            <div class="q-ml-sm connect">Connect</div>
            <q-toggle
              v-model="serialOn"
              checked-icon="check"
              unchecked-icon="clear"
            />
          </div>
        </div>
      </q-expansion-item>
      <!-- TCP -->
      <q-expansion-item expand-separator>
        <template #header>
          <q-item-section avatar>
            <q-avatar :color="serialOn ? 'blue-1' : 'grey-2'" size="md">
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
            v-model="tcpMode"
            :options="['Server', 'Client']"
            label="Mode"
            filled
            dense
            :disable="tcpOn"
          />
          <q-input
            v-model="tcpIpaddr"
            label="IP Address"
            filled
            dense
            :rules="rules.ipaddress"
            lazy-rules
          />
          <q-input v-model="tcpPort" label="Port" filled dense type="Number" />
          <div class="row justify-between items-center">
            <div class="q-ml-sm connect">Connect</div>
            <q-toggle
              v-model="tcpOn"
              checked-icon="check"
              unchecked-icon="clear"
              @update:model-value="tcpOnSW"
            />
          </div>
        </div>
      </q-expansion-item>
      <!-- UDP Server -->
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
            <q-item-label class="name"> UDP Server</q-item-label>
          </q-item-section>
        </template>
        <div class="q-ma-sm">
          <q-input
            v-model="udpIpaddr"
            label="IP Address"
            filled
            dense
            :rules="rules.ipaddress"
            lazy-rules
          />
          <q-input v-model="udpPort" label="Port" filled dense type="Number" />
          <div class="row justify-between items-center">
            <div class="q-ml-sm connect">Multicast</div>
            <q-toggle
              v-model="udpMulticast"
              checked-icon="check"
              unchecked-icon="clear"
            />
          </div>
          <div class="row justify-between items-center">
            <div class="q-ml-sm connect">Connect</div>
            <q-toggle
              v-model="udpOn"
              checked-icon="check"
              unchecked-icon="clear"
            />
          </div>
        </div>
      </q-expansion-item>
      <!-- UDP Sender -->
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
            <q-item-label class="name"> UDP Sender</q-item-label>
          </q-item-section>
        </template>
        <div class="q-ma-sm">
          <q-input
            v-model="senderIpaddr"
            label="IP Address"
            filled
            dense
            :rules="rules.ipaddress"
            lazy-rules
          />
          <q-input
            v-model="senderPort"
            label="Port"
            filled
            dense
            type="Number"
          />
          <div class="row justify-between items-center">
            <div class="q-ml-sm connect">Multicast</div>
            <q-toggle
              v-model="senderMulticast"
              checked-icon="check"
              unchecked-icon="clear"
            />
          </div>
          <div class="row justify-between items-center">
            <div class="q-ml-sm connect">Connect</div>
            <q-toggle
              v-model="senderOn"
              checked-icon="check"
              unchecked-icon="clear"
            />
          </div>
        </div>
      </q-expansion-item>
    </q-list>
  </div>
</template>

<script>
import { ref, reactive, toRefs, computed, onMounted } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    const { commit, getters } = useStore()
    // start btns
    const serialOn = ref(false)
    const tcpOn = ref(false)
    const udpOn = ref(false)
    const senderOn = ref(false)
    // comm args
    const serial = reactive({
      comm: null,
      baud: 9600,
      dataBit: 8,
      stopBit: 1,
      parity: 'None'
    })
    const tcp = reactive({
      tcpMode: 'Server',
      tcpIpaddr: '0.0.0.0',
      tcpPort: 1024
    })
    const udpServer = reactive({
      udpIpaddr: '',
      udpPort: 1024,
      udpMulticast: false
    })
    const sender = reactive({
      senderIpaddr: '',
      senderPort: 1024,
      senderMulticast: false
    })
    // get Serialports
    const serialComms = computed(() => getters['serial/getPath'])

    const openDrawer = () => {
      commit('menu/changeDrawer', true)
    }

    function tcpOnSW(value) {
      if (tcp.tcpMode === 'Server') {
        if (value) {
          window.API.onRequest({
            command: 'tcpserveropen',
            port: tcp.tcpPort,
            host: tcp.tcpIpaddr
          })
        } else {
          console.log('else')
          window.API.onRequest({ command: 'tcpserverclose' })
        }
      } else {
        if (value) {
          window.API.onRequest({
            command: 'tcpclientconnect',
            host: tcp.tcpIpaddr,
            port: tcp.tcpPort
          })
        } else {
          window.API.onRequest({ command: 'tcpclientdisconnect' })
        }
      }
    }

    // rt request
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

    return {
      rules: {
        required: [(value) => !!value || '필수 항목 입니다'],
        ipaddress: [
          (value) => !!value || 'IP Address를 입력하세요',
          (value) =>
            /^(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}$/gm.test(
              value
            ) || 'IPv4 형식이 아닙니다'
        ]
      },
      ...toRefs(serial),
      ...toRefs(tcp),
      ...toRefs(udpServer),
      ...toRefs(sender),
      serialComms,
      serialOn,
      tcpOn,
      udpOn,
      senderOn,
      openDrawer,
      tcpOnSW
    }
  }
}
</script>

<style>
.connect {
  font-size: 12px;
  font-weight: normal;
  color: #383838;
}
.name {
  font-weight: 500;
}
.q-field__bottom {
  padding: 2px !important;
  margin: 0 !important;
  font-size: 8px;
  min-height: 8px;
}
.q-field {
  padding-bottom: 12px !important;
}
</style>
