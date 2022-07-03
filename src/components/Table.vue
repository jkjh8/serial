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
    :filter="filter"
    :pagination="{ rowsPerPage: 20 }"
  >
    <template #body="props">
      <q-tr
        :props="props"
        :class="props.row.from === 'Send' ? 'text-orange' : 'text-black'"
      >
        <q-td key="time" :props="props">
          {{ moment(props.row.time).format('YYYY-MM-DD hh:mm:ss') }}
        </q-td>
        <q-td key="protocol" :props="props">
          {{ props.row.protocol }}
        </q-td>
        <q-td key="from" :props="props">
          {{ props.row.from }}
        </q-td>
        <q-td
          key="message"
          :props="props"
          class="row no-wrap justify-start items-center"
        >
          <div v-if="showHex && props.row.type === 'byte'">
            {{ stringToHex(props.row.message) }}
            <q-btn
              round
              flat
              icon="svguse:icons.svg#copy"
              size="sm"
              color="primary"
              @click="clipboardCopy(stringToHex(props.row.message))"
            >
            </q-btn>
          </div>

          <div v-else-if="!showHex && props.row.type === 'byte'">
            {{ bufToString(props.row.message) }}
            <q-btn
              round
              flat
              icon="svguse:icons.svg#copy"
              size="sm"
              color="primary"
              @click="clipboardCopy(props.row.message)"
            >
            </q-btn>
          </div>
          <div v-else class="message">
            {{ props.row.message }}
            <q-btn
              round
              flat
              icon="svguse:icons.svg#copy"
              size="sm"
              color="primary"
              @click="clipboardCopy(props.row.message)"
            >
            </q-btn>
          </div>
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import moment from 'moment'
import { Buffer } from 'buffer'

export default {
  setup() {
    const { state } = useStore()
    const rows = computed(() => state.message.message)
    const showHex = computed(() => state.message.showHex)
    const filter = computed(() => state.message.filter)

    moment.locale('ko')

    function stringToHex(str) {
      console.log(typeof str)
      console.log(str)
      let output = ''
      let bufStr = str

      for (let i = 0; i < bufStr.length; i++) {
        output += (bufStr[i] + Math.pow(16, 2)).toString(16).substr(-2)
        if (i !== bufStr.length) {
          output += ' '
        }
      }
      return output
    }

    function bufToString(str) {
      const bufStr = Buffer.from(str)
      console.log('tostring = ', str.toString('hex'))
      return bufStr.toString('utf8')
    }

    function clipboardCopy(val) {
      const t = document.createElement('textarea')
      document.body.appendChild(t)
      t.value = val
      t.select()
      document.execCommand('copy')
      document.body.removeChild(t)
    }

    return {
      rows,
      showHex,
      moment,
      filter,
      stringToHex,
      bufToString,
      clipboardCopy
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
