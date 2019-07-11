<template>
  <v-layout align-start justify-left row fill-height>
    <v-flex xs12 md6>
      <v-card flat>
        <v-card-title>
          <div>
            <h3 class="headline">Business Social</h3>
            <div class="text-muted">Update your Business</div>
          </div>
        </v-card-title>

        <v-container grid-list-lg>
                          <v-form @submit.prevent="business">
            <v-layout row wrap>
              <v-flex xs12 md6>
                 <v-text-field 
                    type="text"
                    v-model="facebook"
                    label="Facebook" 
                    placeholder="Facebook" 
                    outline
                 >
              </v-text-field>
              </v-flex>
              <v-flex xs12 md6>
                <v-text-field 
                    type="text"
                    v-model="twitter"
                    label="Twitter" 
                    placeholder="Twitter" 
                    outline
                 >
              </v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs12 md6>
                  <v-text-field 
                    type="text"
                    v-model="linkedin"
                    label="Linkedin" 
                    placeholder="Linkedin" 
                    outline
                 >
              </v-text-field>
              </v-flex>

              <v-flex xs12 md6>
                  <v-text-field 
                    type="text"
                    v-model="youtube"
                    label="Youtube" 
                    placeholder="Youtube" 
                    outline
                 >
              </v-text-field>
              </v-flex>

              <v-flex xs12 md6>
                  <v-text-field 
                    type="text"
                    v-model="google"
                    label="Google" 
                    placeholder="Google" 
                    outline
                 >
              </v-text-field>
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
      facebook: null,
      twitter: null,
      linkedin: null,
      youtube: null,
      google: null,
      
    }

  },

  methods: {
      async business() {

       //this.dialog = true;

        let formData = new FormData();
        formData.append("business_facebook", this.facebook);
        formData.append("business_twitter", this.twitter);
        formData.append("business_linkedin", this.linkedin);
        formData.append("business_youtube", this.youtube);
        formData.append("business_google", this.google);


        this.$validator.validateAll().then(result => {
        if (result) {
         this.$axios
            .post(`business/update`,formData)
            .then(response => {
            this.dialog = false;
            swal.fire({
            title: "Business Updated Successfully",
            type: "success",
            animation: true,
            showCloseButton: true
            })
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
        if(response.data.node.translations[0].business_facebook != null){
         this.facebook = response.data.node.translations[0].business_facebook;
         }
         if(response.data.node.translations[0].business_twitter != null){
         this.twitter = response.data.node.translations[0].business_twitter;
         }
         
         if(response.data.node.translations[0].business_linkedin != null){
         this.linkedin = response.data.node.translations[0].business_linkedin;
         }
         if(response.data.node.translations[0].business_youtube != null){
         this.youtube = response.data.node.translations[0].business_youtube;
         }
         if(response.data.node.translations[0].business_google != null){
         this.google = response.data.node.translations[0].business_google;
         }
      })

     

      
  }

}
</script>
