 <template>
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
              v-model="selectedChild" 
              v-if="this.hasChild != 'not_found' " 
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
              @change="selectChildren"
              outline
            ></v-select>

              </v-flex>
            </v-layout>
</template>


<script>
export default {
  props: {
    parent_locations: Array
  },

  data() {
    return {
    selectedParent: '',
    selectedChild:'',
    selectedChildren:'',
    hasChild: null,
    hasChildren: null,
    parent_locations: [],
    child_locations: [],
    children_locations: [],
    };
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
       this.$emit("clicked", this.selectedParent);
       
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
        this.$emit('clicked', Array(this.selectedParent,this.selectedChild))
       },

        selectChildren:function() {
        this.$emit('clicked', Array(this.selectedParent,this.selectedChild,this.selectedChildren))
        },
  },

  mounted() {

     this.$axios.get('edit-business')
       .then(response => {
        /*Parent*/
        if(response.data.locations != undefined){
        this.selectedParent = Number(response.data.locations[0]);
        }else{
          this.hasChild = 'not_found';  
         }
        /*Child*/
        if(response.data.locations[1] != undefined){
          this.selectedChild = Number(response.data.locations[1]);

          this.$axios.get('locations/'+this.selectedParent).then(response => {
           if(response.data != 'not_found'){  
            this.hasChild = 'has_child';
            this.child_locations = response.data;
          }else{
            this.hasChild = 'not_found';
        }
      })   
        }else{
          this.hasChild = 'not_found';
        }
        /*Children*/
        if(response.data.locations[2] != undefined){
        this.selectedChildren = Number(response.data.locations[2]);
        this.$axios.get('locations/'+this.selectedChild).then(response => {
           if(response.data != 'not_found'){  
            this.hasChildren = 'has_child';
            this.children_locations = response.data;
          }else{
            this.hasChildren = 'not_found';
        }
        })  

        }else{
          this.hasChildren = 'not_found';
        }
        })

      
  
  }

}
</script>

            