<template>
  <!-- <div class="q-mx-md">Communication</div> -->
  <div>
    <q-list>
      <Serial />
      <TCP />
      <UDP mode="Server" />
      <UDP mode="Sender" />
    </q-list>
  </div>
</template>

<script>
import Serial from './menu/serial.vue'
import TCP from './menu/tcp.vue'
import UDP from './menu/udp.vue'

export default {
  components: { Serial, TCP, UDP },
  setup() {
    return {}
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
