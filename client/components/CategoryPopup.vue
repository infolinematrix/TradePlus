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

        <v-container grid-list-md class="pt-1">
          <v-layout row wrap>
            <v-flex xs12>

              <v-breadcrumbs :items="this.breadcrumb" class="pa-0 mb-2">

                <template v-slot:divider>
                  <v-icon>forward</v-icon>
                </template>

                <template v-slot:item="props">

                  <a
                    @click="selectCategory(props.item.id, props.item.title)"
                    href="#"
                    :class="[props.item.disabled && 'disabled']"
                  >{{ props.item.title }}</a>
                </template>
              </v-breadcrumbs>
            </v-flex>
          </v-layout>

          <v-layout row wrap>


            <v-flex xs4 sm3 md3 v-for="category in this.categories" :key="category">
              <a href="#"
                @click="getCategories(category.id)"
              >{{ category.title}}</a>


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
      node_title: null,
      node_id: null,
      category: null,
      breadcrumb: [],
      categories: null,
      parent: null,

      items: [
        {
          text: 'India',
          href: 'breadcrumbs_dashboard'
        },
        {
          text: 'West Bengal',
          href: 'breadcrumbs_link_1'
        },
        {
          text: 'Siliguri',
          disabled: true,
          href: 'breadcrumbs_link_2'
        }
      ],
      heroes: [
        { name: 'Batman', franchise: 'DC' },
        { name: 'Ironman', franchise: 'Marvel' },
        { name: 'Thor', franchise: 'Marvel' },
        { name: 'Superman', franchise: 'DC' }
      ]
    }
  },

  methods: {

    selectCategory(cid, ctitle) {
      this.getCategories(cid)
      this.node_title = ctitle
      this.node_id = cid

      //this.parent = this.categories[0].parent_id
      //this.breadcrumb = this.categories[0].breadcrumb

    },

    getCategories(parent) {

      this.parent = parent
      this.$axios.get('categories/' + this.parent).then(response => {
        this.categories = response.data
        console.log(response.data)
        this.breadcrumb = this.categories[0].breadcrumb
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
