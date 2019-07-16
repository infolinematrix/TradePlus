<template>
  <v-layout  row >
    <v-flex xs12 md12>
      <v-card flat>
        <v-card-title>
          <div>
            <h3 class="headline">Create Post</h3>
            <div class="text-muted">{{ text_short }}</div>
          </div>
        </v-card-title>

        <v-container grid-list-md class="pa-3">
          <v-tabs height="60" v-model="active" color="grey lighten-3" slider-color="yellow">
            <v-tab ripple class="text-capitalize">Product</v-tab>
            <v-tab ripple class="text-capitalize">Service</v-tab>
            <v-tab ripple class="text-capitalize">Offer</v-tab>

            <v-tab-item class="pl-0 pr-0 bg-light">
                <v-img :src="coverimageUrl"
          aspect-ratio="2.75">
          <v-layout column fill-height>
            <v-card-title>
              <v-form @submit.prevent="update_image()" enctype="multipart/form-data">
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
            </v-form>
            </v-card-title>
          </v-layout>
        </v-img>

              <v-card flat>
                <v-card-text>
                  <div class="text-muted">{{ text_short }}</div>
                </v-card-text>
                <v-card-text>
                  <v-form @submit.prevent="services" enctype="multipart/form-data">
                    <v-layout row wrap>
                      <v-flex xs12>
                        <v-text-field 
                        v-model="form.service_title" 
                        label="Title" 
                        placeholder="What service you provide?" 
                        outline
                        v-validate="'required'"
                        :error-messages="errors.collect('Title')"
                        data-vv-name="Title"
                        required
                        >
                        </v-text-field>
                      </v-flex>
                    </v-layout>

                    <v-layout row wrap>
                      <category-popup  :title="form.title" @eId="update_id" @eTitle="update_title"></category-popup>
                    </v-layout>


                    <v-layout row wrap>
                      <v-flex xs12>
                        <v-textarea
                          v-model="form.description"
                          outline
                          name="input-7-4"
                          label="Outline textarea"
                          v-validate="'required'"
                          :error-messages="errors.collect('Descritpion')"
                          data-vv-name="Descritpion"
                          required
                        ></v-textarea>
                      </v-flex>
                    </v-layout>
                    <v-flex xs12>
                      <v-checkbox
                       v-model="chkbox" 
                       label="I agree"
                       v-validate="'required'"
                      :error-messages="errors.collect('Agree')"
                      data-vv-name="Agree"
                      required>
                       </v-checkbox>
                    </v-flex>

                    <v-card-actions class="pa-0">
                      <v-btn type="submit" large depressed color="primary">Update</v-btn>
                    </v-card-actions>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item class="pl-0 pr-0">
              <v-card flat>
                <v-card-text>{{ text_short }}</v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import swal from "sweetalert2";
import VeeValidate from "vee-validate";
import CategoryPopup from "~/components/CategoryPopup.vue";

export default {
  async asyncData({ params, $axios }) {
    return await $axios.get(`service/${params.node_id}/edit/${params.source_id}`).then(res => {
      return {
       coverimageUrl: res.data.coverimage
      };
    });
  },
  layout:'user',
  components: {
    CategoryPopup
  },
  data() {
    return {
      active: true,
      category_dialog:false,
      chkbox: true,
      select: { state: 'Florida', abbr: 'FL' },
      categories: [
        { state: 'Florida', abbr: 'FL' },
        { state: 'Georgia', abbr: 'GA' },
        { state: 'Nebraska', abbr: 'NE' },
        { state: 'California', abbr: 'CA' },
        { state: 'New York', abbr: 'NY' }
      ],
      form: {
        service_title: null,
        description: null,
        title:'Category from Parent',
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
          this.update_image(this.coverimageFile);

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


 async update_image() {

      this.dialog = true;
      let formData = new FormData();
      if(this.coverName.length != 0){
      formData.append("coverimage", this.coverimageFile);
      }
      
      this.$axios.post('service/'+this.$route.params.node_id+'/udpate/'+this.$route.params.source_id, formData)
            .then(response => {
            this.dialog = false
            swal.fire({
              title: 'Cover image updated successfully',
              type: 'success',
              animation: true,
              showCloseButton: true
            })
          })

          this.dialog = false
    },

     async services() {
      if(this.chkbox == false){
            this.chkbox = null;
        }
        let formData = new FormData();
        formData.append("title", this.form.service_title);
        formData.append("description", this.form.description);
        formData.append("category", this.form.id);
        
        this.$validator.validateAll().then(result => {
        if (result) {
         this.$axios
            .post('service/'+this.$route.params.node_id+'/udpate/'+this.$route.params.source_id, formData)
            .then(response => {
            
             swal.fire({
             title: "Successfully Updated",
             type: "success",
             animation: true,
             showCloseButton: true
            })
          })
           }
      });

     }
  },
  
  mounted() {

       this.$axios
            .get(`service/`+this.$route.params.node_id+'/edit/'+this.$route.params.source_id)
            .then(response => {
               this.form.service_title = response.data.node.title;
               this.form.description = response.data.node.translations[0].description;
               this.form.title = response.data.category.title;
               this.form.id = response.data.category.id;
            })

  }

}
</script>
