<template>
  <v-layout row wrap>
    <v-flex xs12 class="pl-2">
      <v-text-field
        @click.stop="dialog = true"
        label="Category"
        placeholder="Choose category"
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
          <v-toolbar-title class="title-2">Select Category</v-toolbar-title>
          <v-spacer></v-spacer>

          <v-btn flat icon @click="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs4 sm3 md3 v-for="category in this.categories" :key="category">
              <div
                ref="dataInfo"
                @click="selectCategory(category.id, category.title)"
              >{{ category.title}}</div>
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" depressed @click="setCategory(node_id, node_title)">Set</v-btn>
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
      categories: null,
      parent: null

    }
  },

  methods: {
    selectCategory(cid, ctitle) {
      this.getCategories(cid)
      this.node_title = ctitle
      this.node_id = cid
    },

    getCategories(parent) {
      this.parent = parent
      this.$axios.get('categories/' + this.parent).then(response => {
        this.categories = response.data
      })
    },

    setCategory(cid, ctitle) {
      this.$emit('eTitle', ctitle)
      this.$emit('eId', cid)
      this.dialog = false
    }
  },
  mounted() {
    this.getCategories()
  }
}
</script>
