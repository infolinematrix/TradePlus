<template>
  <v-layout align-start justify-left row fill-height>
    <v-flex xs12 md6>
      <v-card flat>
        <v-card-title>
          <div>
            <h3 class="headline">Update your Business</h3>
            <div class="text-muted">{{ text_short }}</div>
          </div>
        </v-card-title>

        <v-container grid-list-lg>
                          <v-form @submit.prevent="business">
            <v-layout row wrap>
              <v-flex xs12>
                <v-text-field 
                v-model="title"
                label="Title" 
                placeholder="Business title" 
                v-validate="'required'"
                :error-messages="errors.collect('Business Title')"
                data-vv-name="Business Title"
                required
                outline
                ></v-text-field>
              </v-flex>
            </v-layout>

            <v-layout row wrap>
              <v-flex xs12>
                <v-text-field 
                v-model="address"
                label="Address" 
                placeholder="Street, locality" 
                v-validate="'required'"
                :error-messages="errors.collect('Address')"
                data-vv-name="Address"
                required
                outline>
                </v-text-field>
              </v-flex>
              <v-flex xs12 md8>
                <v-text-field 
                v-model="area"
                label="Locality" 
                placeholder="Area" 
                outline>
                </v-text-field>
              </v-flex>
              <v-flex xs12 md4>
                <v-text-field 
                v-model="zipcode"
                label="Zip" 
                placeholder="Zip" 
                v-validate="'required'"
                :error-messages="errors.collect('Zip')"
                data-vv-name="Zip"
                required
                outline>
                </v-text-field>
              </v-flex>
            </v-layout>
            <Location :parent_locations='parent_locations' @clicked="onClickChild"></Location>

<div class="text-xs-center">
        <v-dialog
          v-model="dialog"
          hide-overlay
          persistent
          width="300"
        >
      <v-card
        color="primary"
        dark
      >
      <v-card-text>
          Please stand by
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
            <v-card-actions class="pa-0">
              <v-btn type="submit" large depressed color="orange">Update</v-btn>
            </v-card-actions>
            </v-form>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import Form from "vform";
import swal from "sweetalert2";
import VeeValidate from "vee-validate";
import Location from "~/components/Location.vue";
export default {
   async asyncData({redirect, $axios }) {
    return await $axios.get(`add-business`).then(res => {
      if (res) {
      if(res.data.node == null) {
          swal.fire({
            title: "Please add business first",
            type: "warning",
            animation: true,
            showCloseButton: true
            }).then(result => {
              if (result.value) {
              redirect("/business/create")
              }
            });  
            redirect("/business/create")
        }
      }
    });
  },
  components: {
    Location
  },
layout: 'user',
  data() {
    
    return {
    dialog: false,
    parent_locations: [],
    locations: [],
      agree: true,
      title: null,
      address: null,
      area: null,
      zipcode: null,
      email: null
    }
  },

  methods: {

      onClickChild (value) {
      this.locations = value;
      },
    async business() {
        let formData = new FormData();
        formData.append("title", this.title);
        formData.append("location", this.locations);
        formData.append("business_address", this.address);
        formData.append("area", this.area);
        formData.append("business_zipcode", this.zipcode);


        this.$validator.validateAll().then(result => {
        if (result) {
         this.$axios
            .post(`business/update`, formData)
            .then(response => {
            this.dialog = false;
            if(this.email != null){
            swal.fire({
            title: "Business Updated Successfully",
            type: "success",
            animation: true,
            showCloseButton: true
            })
             }else{
            swal.fire({
            title: "Business Updated Successfully",
            type: "success",
            animation: true,
            showCloseButton: true
            }).then(result => {
              if (result.value) {
              this.$root.$router.push({path: '/business/about'})
              }
            })
             }
         })
        }else{
          this.dialog = false;
        }
      });
      }
  },

  mounted() {
    /*Parent Categories*/
      this.$axios.get('locations/'+this.selectedParent)
       .then(response => {
         this.parent_locations = response.data;
        })

        this.$axios.get('edit-business')
       .then(response => {
         this.title = response.data.node.title;
         this.address = response.data.node.translations[0].business_address;
         this.area = response.data.node.translations[0].area;
         this.zipcode = response.data.node.translations[0].business_zipcode;
         this.email =  response.data.node.translations[0].business_email;

        /*Location*/

        })

      
  }

}
</script>
