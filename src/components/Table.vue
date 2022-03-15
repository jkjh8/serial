<template>
  <q-table
    :columns="[
      {
        name: 'time',
        label: 'Time',
        field: 'time',
        align: 'center',
        sortable: true
      },
      {
        name: 'protocol',
        label: 'Protocol',
        field: 'protocol',
        align: 'center',
        sortable: true
      },
      {
        name: 'from',
        label: 'From',
        field: 'from',
        align: 'center',
        sortable: true
      },
      {
        name: 'message',
        label: 'Message',
        field: 'message',
        align: 'center',
        style: 'max-width: 1200px',
        headerStyle: 'max-width: 1200px'
      }
    ]"
    :rows="rows"
    row-key="time"
    flat
    :pagination="{ rowsPerPage: 20 }"
  >
    <template #body-cell-time="props">
      <q-td auto-width>
        {{ moment(props.row.time).format('YYYY-MM-DD hh:mm:ss') }}
      </q-td>
    </template>

    <template #body-cell-message="props">
      <q-td class="row justify-start">
        <div v-if="showHex" class="message">
          {{ stringToHex(props.row.message) }}
        </div>

        <div v-else class="message">
          {{ props.row.message }}
        </div>
      </q-td>
    </template>
  </q-table>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import moment from 'moment'

export default {
  setup() {
    const { state } = useStore()
    const rows = computed(() => state.message.message)
    const showHex = computed(() => state.message.showHex)

    moment.locale('ko')

    function stringToHex(str) {
      console.log(str)
      console.log(typeof str)
      let bufStr = Buffer.from(str)

      //with buffer, you can convert it into hex with following code
      console.log(bufStr.toString('hex'))
      return bufStr.toString('hex')
    }

    return {
      rows,
      showHex,
      moment,
      stringToHex
    }
  }
}
</script>

<style scoped>
.message {
  width: 100%;
  max-width: 1200px;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
