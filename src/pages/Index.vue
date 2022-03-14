<template>
  <div>
    <Table />
  </div>
</template>

<script>
import { defineComponent, onMounted } from 'vue'
import Table from '../components/Table.vue'

export default defineComponent({
  name: 'PageIndex',
  components: { Table },
  setup() {
    onMounted(() => {
      console.log('app start')
      window.API.onRequest({ command: 'start' })
    })
  }
})
</script>
