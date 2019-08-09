<template>
  <v-layout row wrap>
    <v-dialog v-model="this.isActive" origin persistent max-width="600px" hide-overlay>
      <v-card>
        <v-toolbar dense flat>
          <v-toolbar-title class="title-2">
            Select Category:
            <span class="text-muted caption">{{ this.node_title }}</span>
          </v-toolbar-title>
          <v-spacer></v-spacer>

          <v-btn flat icon @click="hide">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-container grid-list-md class="pt-1">
          <v-layout row wrap class="mb-2">
            <v-flex xs12 v-if="this.parent != null">
              <v-breadcrumbs :items="this.breadcrumb" class="pa-0">
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
              <a href="#" @click="getCategories(category.id, category.title)">{{ category.title}}</a>
            </v-flex>
          </v-layout>
        </v-container>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn depressed color="grey lighten-2" text @click="hide">Cancel</v-btn>

          <v-btn depressed color="green lighten-1" text @click="setCategory">Go</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  props: {
    isActive: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  data() {
    return {
      categories: null,
      parent: null,
      node_title: null,
      node_id: null,
      breadcrumb: []
    }
  },
  methods: {
    setCategory() {

      this.$store.dispatch('app/set_category',this.node_id)
      this.$emit('category', false)
      this.isActive = false
      let cat_slug = this.node_title
      var slug = /\s+/g;
      cat_slug = cat_slug.toLowerCase().replace(slug,'-');
      this.$root.$router.push({path: '/browse/'+cat_slug})
    },
    hide() {
      this.$emit('category', false)
      this.isActive = false
    },
    getCategories(parent, ctitle) {
      this.parent = parent

      this.node_title = ctitle
      this.node_id = this.parent

      this.$axios
        .get('categories/' + this.parent + '/' + this.limit)
        .then(response => {
          this.categories = response.data
          this.breadcrumb = this.categories[0].breadcrumb
        })
      this.$emit('eTitle', this.title)
    }
  },
  mounted() {
    this.getCategories()
  }
}
</script>

