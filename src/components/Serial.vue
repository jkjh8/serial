<template>
  <v-container fluid>
    <v-card>
    <v-toolbar dense flat color="primary" dark>
      <v-toolbar-title>Serial</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon v-if="online" color="green">mdi-wifi</v-icon>
        <v-icon v-else color="red">mdi-wifi-off</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
      <v-btn icon @click="commPopup()">
        <v-icon >mdi-dots-horizontal-circle-outline</v-icon>
      </v-btn>
    </v-toolbar>
    <v-card-text>
      <v-data-table :headers="headers" :items="items">
      </v-data-table>
    </v-card-text>
    </v-card>
    <v-card>
      <v-card-text>
        <v-text-field label="문자열을 입력하세요."></v-text-field>
      </v-card-text>
    </v-card>

    <v-dialog v-model="setComm">
    <v-card>
      <v-card-title>
        <strong>통신 설정</strong>
        <v-spacer></v-spacer>
        <v-btn icon @click="commPopup()">
          <v-icon color="orange">mdi-close-circle</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-expansion-panels popout dense>
          <v-expansion-panel :key=0 hide-actions dense>
            <v-expansion-panel-header dense>
              <strong>Serial</strong>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-divider></v-divider>
              <v-list dense>
                <v-list-item dense>
                  <v-select></v-select>
                </v-list-item>
                <v-list-item dense>
                  <v-select></v-select>
                </v-list-item>
                <v-list-item densedense>
                  <v-select></v-select>
                </v-list-item>
                <v-list-item dense>
                  <v-select></v-select>
                </v-list-item>
                <v-list-item dense>
                  <v-select></v-select>
                </v-list-item>
                <v-list-item dense>
                  <v-select></v-select>
                </v-list-item>
                <v-list-item dense>
                  <v-spacer></v-spacer>
                  <v-switch></v-switch>
                </v-list-item>
              </v-list>
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel :key=1 hide-actions>
            <v-expansion-panel-header><strong>TCP Server</strong></v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-divider></v-divider>
              <v-card-text>
                <v-list dense>
                  <v-list-item dense>
                    <v-text-field label="TCP Port"></v-text-field>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel :key=2 hide-actions>
            <v-expansion-panel-header><strong>TCP Client</strong></v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-divider></v-divider>
              <v-card-text>
                <v-list dense>
                  <v-list-item dense>
                    <v-text-field label="IP"></v-text-field>
                  </v-list-item>
                  <v-list-item dense>
                    <v-text-field label="Port"></v-text-field>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card-text>
    </v-card>
  </v-dialog>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      online: false,
      setComm: false,
      headers: [],
      items: []
    }
  },
  methods: {
    commPopup () {
      if (this.setComm === true) {
        this.setComm = false
      } else {
        this.setComm = true
      }
    }
  }
}
</script>
