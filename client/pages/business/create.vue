<template>
  <v-layout align-start justify-left row fill-height>
    <v-flex xs12 md6>
      <v-card flat>
        <v-card-title>
          <div>
            <h3 class="headline">Register your Business</h3>
            <div class="text-muted">{{ text_short }}</div>
          </div>
        </v-card-title>

        <v-container grid-list-lg>
            <v-form @submit.prevent="business">
            <v-layout row wrap>
              <v-flex xs12>
                <v-text-field 
                v-model="business_title"
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
        
              <location-popup  :title="title" @eId="update_id" @eTitle="update_title"
              ></location-popup>
                    
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
              <v-btn type="submit" large depressed color="orange">Create</v-btn>
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
import LocationPopup from "~/components/LocationPopup.vue";

export default {
  async asyncData({redirect, $axios }) {
    return await $axios.get(`add-business`).then(res => {
      if (res) {
      if(res.data.node != null) {
           redirect("/business/edit");         
      }
      }
    });
  },
  components: {
    LocationPopup
  },
  layout: 'user',
  data() {
    
    return {
    dialog: false,
    parent_locations: [],
    active: true,
    category_dialog:false,
    locations: [],
      agree: true,
      business_title: null,
      address: null,
      area: null,
      zipcode: null,
      title: null,
      id:null
}
  },

  methods: {

     update_title(value){
      this.title = value
     },
     
     update_id(value){
      this.id = value
     },
      async business() {

       //this.dialog = true;

        let formData = new FormData();
        formData.append("title", this.business_title);
        //formData.append("location", this.locations);
        formData.append("location", this.id);
        formData.append("business_address", this.address);
        formData.append("area", this.area);
        formData.append("business_zipcode", this.zipcode);

        
        this.$validator.validateAll().then(result => {
        if (result) {
         this.$axios
            .post(`post-business`, formData)
            .then(response => {
            if (response.data == "exist") {
            this.dialog = false;
            swal.fire({
            title: "Already Exist!",
            type: "warning",
            animation: true,
            showCloseButton: true
            });
            } else {
            this.dialog = false;
            this.$root.$router.push({path: '/business/about'})
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
  }

}
</script>
