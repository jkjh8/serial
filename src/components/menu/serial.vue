<template>
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
        v-model="path"
        :options="serialComms"
        filled
        dense
        label="Com Port"
        :rules="rules.required"
        :disable="serialOn"
      >
        <template #append>
          <q-btn
            icon="svguse:icons.svg#refresh"
            round
            flat
            size="sm"
            @click.prevent.stop="refreshSerialPort"
          ></q-btn>
        </template>
      </q-select>
      <q-select
        v-model="baudRate"
        :options="[
          110, 300, 600, 1200, 2400, 4800, 9600, 14400, 19200, 28800, 38400,
          56000, 57600, 115200
        ]"
        filled
        dense
        label="Baud Rate"
        :disable="serialOn"
      />
      <!-- <q-select
        v-model="dataBits"
        :options="[5, 6, 7, 8]"
        filled
        dense
        label="Data Bit"
        :disable="serialOn"
      />
      <q-select
        v-model="stopBits"
        :options="[1, 1.5, 2]"
        filled
        dense
        label="Stop Bit"
        :disable="serialOn"
      />
      <q-select
        v-model="parity"
        :options="['none', 'even', 'odd', 'mark', 'space']"
        filled
        dense
        label="Parity"
        :disable="serialOn"
      />
      <q-select
        v-model="rtsMode"
        :options="['handshake', 'enable', 'toggle']"
        filled
        dense
        label="RtsMode"
        :disable="serialOn"
      />
      <div class="row justify-between items-center">
        <div class="q-ml-sm connect">RtsCts</div>
        <q-toggle
          v-model="rtscts"
          checked-icon="check"
          unchecked-icon="clear"
          :disable="serialOn"
        />
      </div>
      <div class="row justify-between items-center">
        <div class="q-ml-sm connect">xon</div>
        <q-toggle
          v-model="xon"
          checked-icon="check"
          unchecked-icon="clear"
          :disable="serialOn"
        />
      </div>
      <div class="row justify-between items-center">
        <div class="q-ml-sm connect">xoff</div>
        <q-toggle
          v-model="xoff"
          checked-icon="check"
          unchecked-icon="clear"
          :disable="serialOn"
        />
      </div>
      <div class="row justify-between items-center">
        <div class="q-ml-sm connect">xany</div>
        <q-toggle
          v-model="xany"
          checked-icon="check"
          unchecked-icon="clear"
          :disable="serialOn"
        />
      </div>
      <div class="row justify-between items-center">
        <div class="q-ml-sm connect">hupcl</div>
        <q-toggle
          v-model="hupcl"
          checked-icon="check"
          unchecked-icon="clear"
          :disable="serialOn"
        />
      </div> -->
      <q-separator />
      <div class="row justify-between items-center">
        <div class="q-ml-sm connect">Connect</div>
        <q-toggle
          v-model="serialOn"
          checked-icon="check"
          unchecked-icon="clear"
          @update:model-value="fnSerialOn"
        />
      </div>
    </div>
  </q-expansion-item>
</template>

<script>
import { ref, reactive, toRefs, computed } from 'vue'
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
    const { commit, getters } = useStore()
    const serialOn = ref(false)
    const serialComms = computed(() => getters['serial/getPath'])

    const serialOptions = reactive({
      path: null,
      baudRate: 9600
      // dataBits: 8,
      // stopBits: 1,
      // parity: 'none',
      // rtsMode: 'handshake',
      // rtscts: false,
      // xon: false,
      // xoff: false,
      // xany: false,
      // hupcl: false
    })

    function refreshSerialPort() {
      window.API.onRequest({ command: 'serialport' })
    }

    function fnSerialOn(value) {
      if (value) {
        if (!serialOptions.path) {
          return (serialOn.value = false)
        }
        window.API.onRequest({
          command: 'serialportopen',
          serial: { ...serialOptions }
        })
      }
    }

    const openDrawer = () => {
      commit('menu/changeDrawer', true)
    }

    return {
      rules,
      ...toRefs(serialOptions),
      serialComms,
      serialOn,
      refreshSerialPort,
      openDrawer,
      fnSerialOn
    }
  }
}
</script>
