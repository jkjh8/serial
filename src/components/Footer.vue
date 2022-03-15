<template>
  <div class="bk-gr-blue">
    <div class="q-py-md q-pr-md q-gutter-x-sm row justify-end items-center">
      <span class="funcName">Send CRLF</span>
      <q-toggle
        v-model="sendLF"
        dense
        checked-icon="check"
        unchecked-icon="clear"
      />
      <span class="funcName">Show Bytes</span>
      <q-toggle
        v-model="showHex"
        dense
        checked-icon="check"
        unchecked-icon="clear"
        @update:model-value="setShowHex"
      />
      <span class="funcName">Send Bytes</span>
      <q-toggle
        v-model="sendHex"
        dense
        checked-icon="check"
        unchecked-icon="clear"
      />
    </div>
    <div class="q-mx-md">
      <q-input
        v-model="text"
        bg-color="blue-grey-9"
        input-class="text-grey-1"
        filled
        dense
        label="Message"
        label-color="grey-4"
        @keyup.enter="send"
      >
        <template #after>
          <q-btn icon="send" round flat color="grey-2" @click="send"></q-btn>
        </template>
      </q-input>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    const { commit } = useStore()
    const sendLF = ref(false)
    const showHex = ref(false)
    const sendHex = ref(false)
    const text = ref('')

    function setShowHex(value) {
      commit('message/changeShowHex', value)
    }

    function send() {
      window.API.onRequest({
        command: 'send',
        sendLF: sendLF.value,
        sendHex: sendHex.value,
        message: text.value
      })
    }

    return {
      sendLF,
      showHex,
      sendHex,
      text,
      setShowHex,
      send
    }
  }
}
</script>

<style>
.bk-gr-blue {
  background: linear-gradient(to bottom right, rgb(110, 110, 190), #001e3c);
}
.funcName {
  font-size: 10px;
}
</style>
