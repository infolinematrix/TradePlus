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
                v-model="email"
                label="Email" 
                placeholder="Email" 
                v-validate="'required'"
                :error-messages="errors.collect('Email')"
                data-vv-name="Email"
                required
                outline
                ></v-text-field>
              </v-flex>
            </v-layout>

            <v-layout row wrap>
              <v-flex xs12 md6>
                <v-text-field 
                v-model="phone"
                label="Phone" 
                placeholder="Phone" 
                v-validate="'required'"
                :error-messages="errors.collect('Phone')"
                data-vv-name="Phone"
                required
                outline>
                </v-text-field>
              </v-flex>
              <v-flex xs12 md6>
                <v-text-field 
                v-model="website"
                label="Website" 
                placeholder="Website" 
                outline>
                </v-text-field>
              </v-flex>
              
            </v-layout>

            <v-layout row wrap>
              <v-flex xs12>
                <v-text-field 
                textarea
                rows="10"
                v-model="description"
                label="Description" 
                placeholder="Description" 
                v-validate="'required'"
                :error-messages="errors.collect('Description')"
                data-vv-name="Description"
                required
                outline
                ></v-text-field>
              </v-flex>
            </v-layout>
           


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

layout: 'user',
  data() {
    
    return {
    dialog: false,
      agree: true,
      email: null,
      phone: null,
      webiste: null,
      description: null,
      employee: null,
      scale: null,
      entity: null,
      established: null
    }
  },

  methods: {
      async business() {

        let formData = new FormData();
        formData.append("business_email", this.email);
        formData.append("business_phone", this.phone);
        formData.append("business_website", this.website);
        formData.append("business_description", this.description);

        this.$validator.validateAll().then(result => {
        if (result) {
         this.$axios
            .post(`business/update`, formData)
            .then(response => {
            this.dialog = false;
            if(this.employee != null || this.scale != null || this.entity != null || this.established != null){
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
              this.$root.$router.push({path: '/business/credential'})
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
       
      
      this.$axios.get('edit-business')
       .then(response => {
         this.email = response.data.node.translations[0].business_email;
         this.phone = response.data.node.translations[0].business_phone;
         this.website = response.data.node.translations[0].business_website;
         this.description = response.data.node.translations[0].business_description;
         
         this.employee = response.data.node.translations[0].business_employee;
         this.scale = response.data.node.translations[0].business_scale;
         this.entity = response.data.node.translations[0].business_entity;
         this.established = response.data.node.translations[0].business_established;

      })

      
  }

}
</script>
