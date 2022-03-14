<template>
  <q-table
    :columns="[
      {
        name: 'time',
        label: 'Time',
        field: 'time',
        align: 'center',
        style: 'max-width: 80px',
        headerStyle: 'max-width: 80px',
        sortable: true
      },
      {
        name: 'protocol',
        label: 'Protocol',
        field: 'protocol',
        align: 'center',
        style: 'max-width: 50px',
        headerStyle: 'max-width: 50px',
        sortable: true
      },
      {
        name: 'from',
        label: 'from',
        field: 'from',
        align: 'center',
        style: 'max-width: 50px',
        headerStyle: 'max-width: 50px',
        sortable: true
      },
      {
        name: 'message',
        label: 'Message',
        field: 'message',
        align: 'center',
        classes: 'ellipsis',
        style: 'min-width: 200px',
        headerStyle: 'min-width: 200px'
      }
    ]"
    :rows="rows"
    row-key="time"
    flat
    :pagination="{ rowsPerPage: 20 }"
  >
  </q-table>
</template>

<script>
import { ref } from 'vue'
export default {
  setup() {
    const rows = ref([])

    return {
      rows
    }
  }
}
</script>
