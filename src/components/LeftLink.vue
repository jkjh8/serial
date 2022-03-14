<template>
  <!-- <div class="q-mx-md">Communication</div> -->
  <div>
    <q-list>
      <q-expansion-item
        expand-separator
        icon="svguse:icons.svg#serial"
        label="Serial"
      >
        <div class="q-gutter-y-sm q-ma-sm">
          <div>
            <q-select
              v-model="comm"
              :options="serialComms"
              filled
              dense
              label="Com Port"
            />
          </div>
          <div>
            <q-select
              v-model="baud"
              :options="[
                110, 300, 600, 1200, 2400, 4800, 9600, 14400, 19200, 28800,
                38400, 56000, 57600, 115200
              ]"
              filled
              dense
              label="Baud Rate"
            />
          </div>
          <div>
            <q-select
              v-model="dataBit"
              :options="[5, 6, 7, 8]"
              filled
              dense
              label="Data Bit"
            />
          </div>
          <div>
            <q-select
              v-model="stopBit"
              :options="[1, 1.5, 2]"
              filled
              dense
              label="Stop Bit"
            />
          </div>
          <div>
            <q-select
              v-model="parity"
              :options="['None', 'Even', 'Odd']"
              filled
              dense
              label="Parity"
            />
          </div>
          <div>
            <span> ON </span>
            <span>
              <q-toggle></q-toggle>
            </span>
          </div>
        </div>
      </q-expansion-item>
      <q-expansion-item
        expand-separator
        icon="svguse:icons.svg#ethernet"
        label="TCP"
      >
        <div class="q-ma-sm">
          <div></div>
        </div>
      </q-expansion-item>
      <q-expansion-item
        expand-separator
        icon="svguse:icons.svg#ethernet"
        label="UDP"
      >
        1234
      </q-expansion-item>
    </q-list>
  </div>
</template>

<script>
import { ref, reactive, toRefs } from 'vue'
export default {
  setup() {
    const serial = reactive({
      comm: null,
      baud: 9600,
      dataBit: 8,
      stopBit: 1,
      parity: 'None'
    })
    const tcp = reactive({
      tcpMode: 'Server',
      tcpIpaddr: '',
      tcpPort: 1024
    })
    const udp = reactive({
      udpMode: 'Client',
      udpIpaddr: '',
      udpPort: 1024,
      multicast: false
    })
    const serialComms = ref([])

    return {
      ...toRefs(serial),
      ...toRefs(tcp),
      ...toRefs(udp),
      serialComms
    }
  }
}
</script>
