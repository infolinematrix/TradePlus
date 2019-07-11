<template>
  <v-layout align-start justify-left row fill-height>
    <v-flex xs12 md6>
      <v-card flat>
        <v-card-title>
          <div>
            <h3 class="headline">Business Credential</h3>
            <div class="text-muted">Update your Business</div>
          </div>
        </v-card-title>

        <v-container grid-list-lg>
                          <v-form @submit.prevent="business">
            <v-layout row wrap>
              <v-flex xs12 md6>
                 <v-text-field 
                    type="number"
                    v-model="employee"
                    label="Employee" 
                    placeholder="No of employee" 
                    outline
                 >
              </v-text-field>
              </v-flex>
              <v-flex xs12 md6>
               <v-select 
                v-model="scale"
                item-text = name
                item-value = id 
                :items="scales"
                label="Select Scale"
                outline
             ></v-select>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs12 md6>
                 <v-select 
                v-model="entity"
                item-text = name
                item-value = id 
                :items="entities"
                label="Select Entity"
                outline
             ></v-select>
              </v-flex>

              <v-flex xs12 md6>
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="date"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="established"
                      label="Established (year/month)"
                      readonly
                      outline
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="established" type="month" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                    <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                  </v-date-picker>
                </v-menu>
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
      employee: 0,
      entity: null,
      scale: null,
      established: null,
      scales: [],
      entities : [],
      facebook: null,
      twitter: null,
      linkedin: null,
      youtube: null,
      google: null
    }

  },

  methods: {
      async business() {

       //this.dialog = true;

        let formData = new FormData();
        formData.append("business_employee", this.employee);
        formData.append("business_scale", this.scale);
        formData.append("business_entity", this.entity);
        formData.append("business_established", this.established);


        this.$validator.validateAll().then(result => {
        if (result) {
         this.$axios
            .post(`business/update`,formData)
            .then(response => {
            this.dialog = false;
           if(this.facebook != null || this.twitter != null || this.linkedin != null || this.youtube != null || this.google != null){
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
              this.$root.$router.push({path: '/business/social'})
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
        this.entities =  response.data.entities;  
        this.scales =  response.data.scales;
        if(response.data.node.translations[0].business_employee != null){
         this.employee = response.data.node.translations[0].business_employee;
         }
         if(response.data.node.translations[0].business_employee != null){
         this.scale = Number(response.data.node.translations[0].business_scale);
         }
         
         if(response.data.node.translations[0].business_entity != null){
         this.entity = Number(response.data.node.translations[0].business_entity);
         }
         if(response.data.node.translations[0].business_established != null){
         this.established = response.data.node.translations[0].business_established;
         }

         this.facebook = response.data.node.translations[0].business_facebook;
         this.twitter = response.data.node.translations[0].business_twitter;
         this.linkedin = response.data.node.translations[0].business_linkedin;
         this.youtube = response.data.node.translations[0].business_youtube;
         this.google = response.data.node.translations[0].business_google;
      })

     

      
  }

}
</script>
