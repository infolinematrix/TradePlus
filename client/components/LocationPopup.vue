<template>
  <v-layout row wrap>
    

    <v-flex xs12 class="pl-2">
      <v-text-field
        @click.stop="dialog = true"
        label="Location"
        placeholder="Choose location"
        outline
        v-model="title"
        v-validate="'required'"
        :error-messages="errors.collect('Location')"
        data-vv-name="Location"
        required
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
          <v-toolbar-title class="title-2">Select Location: <span class="text-muted caption">{{ this.node_title }}</span></v-toolbar-title>
          <v-spacer></v-spacer>

          <v-btn flat icon @click="dialog = false">
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
                    @click="selectLocation(props.item.id, props.item.title)"
                    href="#"
                    :class="[props.item.disabled && 'disabled']"
                  >{{ props.item.title }}</a>
                </template>
              </v-breadcrumbs>
            </v-flex>
          </v-layout>

          <v-layout row wrap>
            
            <v-flex xs4 sm3 md3 v-for="location in this.locations" :key="location">
              <a href="#" @click="getLocations(location.id, location.title)">{{ location.title}}</a>
              
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
import VeeValidate from "vee-validate";

export default {
  props: ['title'],
	

  data() {
    return {
      limit: 0,
      dialog: false,
      node_title: null,
      node_id: null,
      location: null,
      breadcrumb: [],
      locations: null,
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
    
    selectLocation(cid, ctitle) {
      this.getLocations(cid)

      //this.node_title = ctitle
      // this.node_id = cid

      //this.parent = this.categories[0].parent_id
      //this.breadcrumb = this.categories[0].breadcrumb
    },

    getLocations(parent, ctitle) {
      this.parent = parent

      this.node_title = ctitle
      this.node_id = this.parent

      this.$axios.get('locations/' + this.parent + '/'+ this.limit).then(response => {
        this.locations = response.data
        this.breadcrumb = this.locations[0].breadcrumb
      })
      this.$emit('eTitle', this.title)
    },

    setLocation(cid, ctitle) {
      this.$emit('eTitle', ctitle)
      this.$emit('eId', cid)
      this.dialog = false
    },
    
  },
  mounted() {
    this.message = false;
    this.getLocations();
    
    
  }
}
</script>
