<template>
  <v-layout row>

    <v-card flat>

      <v-card-title>
        <div>
          <h3 class="headline">Create Product</h3>
          <div class="text-muted mb-1">{{ text_short }}</div>
        </div>


      </v-card-title>
      <v-img :src="coverimageUrl"
          aspect-ratio="2.75">
          <v-layout column fill-height>
            <v-card-title>
              <v-btn dark icon>
                <span>
                      <input
                        type="file"
                        ref="cover_file"
                        style="display: none"
                        @change="onCoverFile"
                      >
                      <v-icon dark @click="coverFile" v-model="coverName">camera_alt</v-icon>
                    </span>
              </v-btn>

              <div class="text-xs-center">
                <v-dialog
                  v-model="dialog"
                  hide-overlay
                  persistent
                  width="300"
                >
              <v-card
              color="primary"
              >
            <v-card-text>
                Please stand by
                <v-progress-linear
                  indeterminate
                  color="blue"
                  class="mb-0"
              ></v-progress-linear>
            </v-card-text>
            </v-card>
            </v-dialog>
            </div>
            </v-card-title>
          </v-layout>
        </v-img>

<v-layout row wrap>

<v-flex xs12>




      <v-tabs grow  icons-and-text show-arrows slider-color="primary">
        <v-tab ripple class="text-capitalize">Basic <v-icon color="primary">work_outline</v-icon> </v-tab>
        
        <v-tab-item class="pl-0 pr-0">
          <v-layout align-start justify-left row fill-height>
            <v-flex xs12 md12>
              <v-card flat>



                <v-container grid-list-lg>
                  <v-form @submit.prevent="product" enctype="multipart/form-data">
                    <v-layout row wrap>
                     
                      <v-flex xs12 md12>
                        <v-text-field 
                        v-model="form.product_title" 
                        label="Title" 
                        placeholder="What type of product you want to add?" 
                        v-validate="'required'"
                        :error-messages="errors.collect('Title')"
                        data-vv-name="Title"
                        required
                        outline>
                        </v-text-field>

                         <category-popup  :title="form.title" @eId="update_id" @eTitle="update_title"></category-popup>
                    </v-flex>
                    </v-layout>

                   <v-layout row wrap>
                      <v-flex xs12>
                        <v-textarea
                          v-model="form.description"
                          outline
                          name="input-7-4"
                          label="Description"
                          v-validate="'required'"
                          :error-messages="errors.collect('Descritpion')"
                          data-vv-name="Descritpion"
                          required
                        ></v-textarea>
                      </v-flex>
                    </v-layout>
 <v-layout row wrap>
                    <v-flex xs12>
                      <v-checkbox 
                      v-model="chkbox" 
                      label="I agree"
                      v-validate="'required'"
                      :error-messages="errors.collect('Agree')"
                      data-vv-name="Agree"
                      required
                      >
                      </v-checkbox>
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
import swal from "sweetalert2";
import VeeValidate from "vee-validate";
import CategoryPopup from "~/components/CategoryPopup.vue";


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
  layout:'user',
  components: {
    CategoryPopup
  },
  inject: {
    $validator: '$validator'
  },
  data() {
    return {
      active: true,
      category_dialog:false,
      chkbox: true,
      select: { state: 'Florida', abbr: 'FL' },
      categories: [],

      coverimageUrl: '/cover.jpg',
    coverName: "",
    coverimageFile: "",
     
      form: {
        product_title: null,
        description: null,
        title: null,
        id:null
      },
      text:
        'Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure nec cu, alienum argumentum ius ad. Pri eu justo aeque torquatos.',
      text_short:
        'Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea.'
    }
  },
  methods: {

    //Cover Image
    coverFile() {
      this.$refs.cover_file.click();
    },
    onCoverFile(e) {
      const files = e.target.files;
      if (files[0] !== undefined) {
        this.coverName = files[0].name;
        if (this.coverName.lastIndexOf(".") <= 0) {
          return;
        }
        const fr = new FileReader();
        fr.readAsDataURL(files[0]);
        fr.addEventListener("load", () => {
          this.coverimageUrl = fr.result;
          this.coverimageFile = files[0];
          

        });
      } else {
        this.coverName = "";
        this.coverimageFile = "";
        this.coverimageUrl = "";
      }
    },

    update_title(value){
      this.form.title = value
    },
    update_id(value){
      this.form.id = value
    },

     async product() {
       
        
        if(this.chkbox == false){
            this.chkbox = null;
        }


        let formData = new FormData();
        formData.append("title", this.form.product_title);
        formData.append("description", this.form.description);
        formData.append("category", this.form.id);
        if(this.coverName.length != 0){
        formData.append("coverimage", this.coverimageFile);
        }

        this.$validator.validateAll().then(result => {
        if (result) {

         if(this.form.id == null){
            this.dialog = false;
            swal.fire({
            title: "Choose Category!",
            type: "warning",
            animation: true,
            showCloseButton: true
            });

         }else{   

         this.$axios
            .post(`post-product`, formData)
            .then(response => {
          
            if(response.data == "exist") {
            this.dialog = false;
            swal.fire({
            title: "Already Exist!",
            type: "warning",
            animation: true,
            showCloseButton: true
            });
            } else {   
            let product = response.data;  
           
            this.$root.$router.push({path: '/business/post/product/'+product.node_id+'/edit/'+product.source_id})
            }
          })
        }
        }
      });
     }
        
  }
}
</script>
