<template>
  <v-layout align-center justify-center row fill-height>
    <v-flex xs12 sm7 md7>
      <v-container grid-list-lg class="pa-5">
        <v-card class="elevation-1">
          <v-toolbar flat >
            <v-toolbar-title>Business</v-toolbar-title>

          </v-toolbar>
          <v-flex class="font-weight-bold grey--text">
          Create Business

          </v-flex>
          <v-layout row wrap>
            <v-flex>
              <v-card-text>
                <v-form @submit.prevent="business">
                  <v-layout row wrap>
                    <v-flex md12 sm12 xs12>
                      <v-text-field id="password" label="Business Title" type="text"></v-text-field>
                    </v-flex>
                </v-layout>
              <v-layout row wrap>
            <v-flex xs12 md12>
             <v-select
                v-model="selectedParent"
                item-text = title
                item-value = id
                :items="parent_categories"
                label="Select Category"
                v-validate="'required'"
                :error-messages="errors.collect('Category')"
                data-vv-name="Category"
                required
                @change="selectParent"
                
             ></v-select>
           
             <v-select
              v-model="selectedChild" v-if="this.hasChild != 'not_found' " 
              item-text = title
              item-value = id
              :items="child_categories"
              @change="selectChild"
              
            ></v-select>

            <v-select
              v-model="selectedChildren" v-if="selectedChild != '' && this.hasChildren != 'not_found'" 
              item-text = title
              item-value = id
              :items="children_categories"
              
            ></v-select>
            </v-flex>
           </v-layout>
                 <v-layout row wrap>
                    <v-flex md6 sm6 xs12>
                      <v-btn depressed large color="secondary">Create</v-btn>
                    </v-flex>
                   
                  </v-layout>
                </v-form>
              </v-card-text>


            </v-flex>
          </v-layout>
        </v-card>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
import Form from "vform";
import swal from "sweetalert2";
import VeeValidate from "vee-validate";
export default {
   data: () => ({
    selectedParent: 0,
    selectedChild:'',
    selectedChildren:'',
    hasChild: 'not_found',
    hasChildren: 'not_found',
    parent_categories: [],
    child_categories: [],
    children_categories: [],
    dialog: false,
    alert: false,
    form: new Form({
      title: null,
      description: null

  }),
    remember: true,
  }),
computed: {
    getCategories() {
    
    },
    getChild(){
    },
    getChildren(){
    }
    

  },
  created: function() {
            this.$axios
                    .get("add-business", {})
                    .then(response => {
                if (response) {
                     if(response.data.node != null) {
                     let business = response.data.node;
                     this.$root.$router.push({path: '/auth/business'})
                }
            }
          })
        },
  methods: {

   selectParent:function() {
       this.selectedChild = '';
       this.$axios.get('categories/'+this.selectedParent)
       .then(response => {
       if(response.data != 'not_found'){  
       this.hasChild = 'has_child';
       this.child_categories = response.data;
       }else{
         this.hasChild = 'not_found';
       }

      })   
    },

       selectChild:function() {
        this.selectedChildren = '';
        this.hasChildren = 'not_found'
        this.$axios.get('categories/'+this.selectedChild)
          .then(response => {
         if(response.data != 'not_found'){  
          this.hasChildren = 'has_child';
          this.children_categories = response.data;
         }
        })
       },
      async business() {

       this.dialog = true;

        let formData = new FormData();
        formData.append("title", this.form.title);
        formData.append("category[]", this.selectedParent);
        if(this.selectedChild != ''){
        formData.append("category[]", this.selectedChild);
        formData.append("category[]", this.selectedChildren);
        }
        formData.append("business_description", this.form.description);


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
            this.$root.$router.push({path: '/auth/business/' + node_id + '/edit/' + source_id})
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

      this.$axios.get('categories/'+this.selectedParent)
       .then(response => {
         this.parent_categories = response.data;
        })

    
  }


};
</script>
