<template>
  <v-layout align-start justify-left row fill-height>
    <v-flex xs12 md6>
      <v-card flat>
        <v-card-title>
          <div>
            <h3 class="headline">Regiaster you Business</h3>
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
            <v-layout row wrap>
              <v-flex xs12>
                <v-select

                v-model="selectedParent"
                item-text = title
                item-value = id
                :items="parent_locations"
                label="Select Location"
                v-validate="'required'"
                :error-messages="errors.collect('Location')"
                data-vv-name="Location"
                required
                @change="selectParent"
                outline
             ></v-select>
           
             <v-select
              v-model="selectedChild" v-if="this.hasChild != 'not_found' " 
              item-text = title
              item-value = id
              :items="child_locations"
              @change="selectChild"
              outline
            ></v-select>

            <v-select
              v-model="selectedChildren" v-if="selectedChild != '' && this.hasChildren != 'not_found'" 
              item-text = title
              item-value = id
              :items="children_locations"
              outline
            ></v-select>

              </v-flex>
            </v-layout>

            <v-layout row wrap>
              <v-flex xs12>
                <v-checkbox v-model="agree" label="Agree Terms &amp; Conditions"></v-checkbox>
              </v-flex>
            </v-layout>

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
export default {
  layout: 'user',
  data() {
    
    return {
 dialog: false,
    selectedParent: '',
    selectedChild:'',
    selectedChildren:'',
    hasChild: 'not_found',
    hasChildren: 'not_found',
    parent_locations: [],
    child_locations: [],
    children_locations: [],
      agree: true,
      title: null,
      address: null,
      area: null,
      zipcode: null
}
  },

  methods: {

   selectParent:function() {
       this.selectedChild = '';
       this.$axios.get('locations/'+this.selectedParent)
       .then(response => {
       if(response.data != 'not_found'){  
       this.hasChild = 'has_child';
       this.child_locations = response.data;
       }else{

         this.hasChild = 'not_found';
       }

      })   
    },

       selectChild:function() {
        this.selectedChildren = '';
        this.hasChildren = 'not_found'
        this.$axios.get('locations/'+this.selectedChild)
          .then(response => {
         if(response.data != 'not_found'){  
          this.hasChildren = 'has_child';
          this.children_locations = response.data;
         }
        })
       },
      async business() {

       //this.dialog = true;

        let formData = new FormData();
        formData.append("title", this.title);
        formData.append("location[]", this.selectedParent);
        if(this.selectedChild != ''){
        formData.append("location[]", this.selectedChild);
        formData.append("location[]", this.selectedChildren);
        }
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
            let node_id = response.data.node_id;
            let source_id = response.data.source_id;
            this.$root.$router.push({path: '/business/' + node_id + '/edit/' + source_id})
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
