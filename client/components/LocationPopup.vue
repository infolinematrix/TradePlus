<template>
  <v-layout row wrap>
    <v-flex xs12 class="pl-2">
      <v-text-field
        @click.stop="dialog = true"
        label="Location"
        placeholder="Choose location"
        outline
        v-model="title"
      ></v-text-field>
    </v-flex>

    <v-dialog
      v-model="dialog"
      origin
      persistent
      max-width="600px"
      hide-overlay
      class="inner-border"
    >
      <v-card>
        <v-toolbar dense flat>
          <v-toolbar-title class="title-2">Select Location</v-toolbar-title>
          <v-spacer></v-spacer>

          <v-btn flat icon @click="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs4 sm3 md3 v-for="location in this.locations" :key="location">
              <div
                ref="dataInfo"
                @click="selectLocation(location.id, location.title)"
              >{{ location.title}}</div>
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" depressed @click="setLocation(node_id, node_title)">Set</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  props: ['title'],

  data() {
    return {
      dialog: false,
      node_title:null,
      node_id:null,
      locations: null,
      parent: null

    }
  },

  methods: {
    selectLocation(cid, ctitle) {
      this.getLocations(cid)
      this.node_title = ctitle
      this.node_id = cid
    },

    getLocations(parent) {
      this.parent = parent
      this.$axios.get('locations/' + this.parent).then(response => {
        this.locations = response.data
      })
    },

    setLocation(cid, ctitle) {
      this.$emit('eTitle', ctitle)
      this.$emit('eId', cid)
      this.dialog = false
    },
  },
  mounted() {
    this.getLocations()
  }
}
</script>
