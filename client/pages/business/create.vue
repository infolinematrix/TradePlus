<template>
  <v-layout row>

    <v-card flat>

      <v-card-title>
        <div>
          <h3 class="headline">My Business</h3>
          <div class="text-muted mb-1">{{ text_short }}</div>
        </div>


      </v-card-title>
      <v-img
          src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
          aspect-ratio="2.75"
        ></v-img>

<v-layout row wrap>

<v-flex xs12>




      <v-tabs grow  icons-and-text show-arrows slider-color="primary">
        <v-tab ripple class="text-capitalize">Profile <v-icon color="primary">work_outline</v-icon> </v-tab>
        
        <v-tab-item class="pl-0 pr-0">
          <v-layout align-start justify-left row fill-height>
            <v-flex xs12 md12>
              <v-card flat>



                <v-container grid-list-lg>
                  <v-form @submit.prevent="business" enctype="multipart/form-data">
                    <v-layout row wrap>
                      <v-flex xs12 md4>
                        <v-card flat>

                           <v-img :src="profilemageUrl" height="170">
                          <v-layout column fill-height>
                        <v-card-title>
              <v-btn dark icon>
                <span>
                      <input
                        type="file"
                        ref="profile_file"
                        style="display: none"
                        @change="onProfileFile"
                      >
                      <v-icon color="purple" dark @click="profileFile" v-model="form.profileName">camera_alt</v-icon>
                    </span>
              </v-btn>
            </v-card-title>


                  </v-layout>
                </v-img>  
                        </v-card>
                      </v-flex>
                      <v-flex xs12 md8>
                        <v-text-field
                          v-model="form.business_title"
                          label="Title"
                          placeholder="Business title"
                          v-validate="'required'"
                          :error-messages="errors.collect('Business Title')"
                          data-vv-name="Business Title"
                          required
                          outline
                          counter="80"
                        ></v-text-field>

                        <location-popup :title="title" @eId="update_id" @eTitle="update_title"></location-popup>
                      </v-flex>
                    </v-layout>

                    <v-subheader class="pl-0">Other Information {{ business.title }}</v-subheader>

                    <v-layout row wrap>
                      <v-flex xs8>
                        <v-text-field
                          v-model="form.address"
                          label="Address"
                          placeholder="Street, locality"
                          v-validate="'required'"
                          :error-messages="errors.collect('Address')"
                          data-vv-name="Address"
                          required
                          outline
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs12 md4>
                        <v-text-field
                          v-model="form.zipcode"
                          label="Zip"
                          placeholder="Zip"
                          v-validate="'required'"
                          :error-messages="errors.collect('Zip')"
                          data-vv-name="Zip"
                          required
                          outline
                        ></v-text-field>
                      </v-flex>
                    </v-layout>

                     <v-layout row wrap>
                      <v-flex xs8>
                        <v-text-field
                          v-model="form.email"
                          label="Email"
                          placeholder="Email"
                          v-validate="'required'"
                          :error-messages="errors.collect('Email')"
                          data-vv-name="Email"
                          required
                          outline
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs12 md4>
                        <v-text-field
                          v-model="form.phone"
                          label="Phone"
                          placeholder="Phone"
                          v-validate="'required'"
                          :error-messages="errors.collect('Phone')"
                          data-vv-name="Phone"
                          required
                          outline
                        ></v-text-field>
                      </v-flex>
                    </v-layout>

                    <v-layout row wrap>
                      <v-flex xs12 md6>
                        <v-text-field
                          v-model="form.website"
                          label="Website (optional)"
                          placeholder="Website"
                          outline
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs12 md6>
                        <v-select
                          v-model="form.business_type"
                          item-text="name"
                          item-value="id"
                          :items="entities"
                          label="Business Type"
                           v-validate="'required'"
                          :error-messages="errors.collect('Business Type')"
                          data-vv-name="Business Type"
                          required
                          outline
                        ></v-select>
                      </v-flex>
                    </v-layout>

                    <div class="text-xs-center">
                      <v-dialog v-model="dialog" hide-overlay persistent width="300">
                        <v-card color="primary">
                          <v-card-text>
                            Please stand by
                            <v-progress-linear indeterminate color="blue" class="mb-0"></v-progress-linear>
                          </v-card-text>
                        </v-card>
                      </v-dialog>
                    </div>
                    <v-card-actions class="pa-0">
                      <v-btn type="submit" large depressed color="orange">Submit</v-btn>
                    </v-card-actions>
                  </v-form>
                </v-container>
              </v-card>
            </v-flex>
          </v-layout>
        </v-tab-item>

        
        
      </v-tabs>
</v-flex>
      </v-layout>
    </v-card>
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
      return {
       entities: res.data.entities,
       
      };
    });
  },
  components: {
    LocationPopup
  },
layout: 'user',
  data() {
    
    return {
    dialog: false,
    active: true,
    title: null,
    id:null,
    profilemageUrl: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg',
    entities: [],
    form: new Form({
      business_title: null,
      address: null,
      zipcode: null,
      email: null,
      phone: null,
      website: null,
      business_type: null,
      profileName: "",
      profileimageFile: "",
      }),
     

      text:
        'Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure nec cu, alienum argumentum ius ad. Pri eu justo aeque torquatos.',
      text_short:
        'Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea.'
    }
  },

  methods: {

//Profile Image
    profileFile() {
      this.$refs.profile_file.click();
    },
    onProfileFile(e) {
      const files = e.target.files;
      if (files[0] !== undefined) {
        this.form.profileName = files[0].name;
        if (this.form.profileName.lastIndexOf(".") <= 0) {
          return;
        }
        const fr = new FileReader();
        fr.readAsDataURL(files[0]);
        fr.addEventListener("load", () => {
          this.profilemageUrl = fr.result;
          this.form.profileimageFile = files[0];
        });
      } else {
        this.form.profileName = "";
        this.form.profileimageFile = "";
        this.profilemageUrl = "";
      }


    },
    update_title(value){
      this.title = value
    },
    update_id(value){
      this.id = value
    },
    async business() {
      this.dialog = true;
      let formData = new FormData();
      formData.append('title', this.form.business_title)
      formData.append('location', this.id)
      formData.append('business_address', this.form.address)
      formData.append('business_zipcode', this.form.zipcode)
      formData.append('business_email', this.form.email)
      formData.append('business_phone', this.form.phone)
      formData.append('business_website', this.form.website)
      formData.append('business_entity', this.form.business_type)
      if(this.form.profileName.length != 0){
      formData.append("profileimage", this.form.profileimageFile);
      }
        
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
            this.$root.$router.push({path: '/business/edit'})
          }
          })
        }else{
          this.dialog = false;
        }
      });
      },


     
  },

  

}
</script>