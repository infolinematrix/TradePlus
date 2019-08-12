<template>
  <v-layout align-start justify-center row fill-height>
    <v-flex md10 xs12>
      <v-alert
        v-model="infobox"
        dismissible
        color="default"
        class="grey--text mt-5 hidden-xs-only"
      >
      {{ product.meta_description }}
      </v-alert>

      <v-card flat>
        <v-layout row wrap>
          <v-flex md7 xs12>
            <v-img class="white--text" :src="product.image"></v-img>
            <v-card-title primary-title>
              <div class="font-weight-medium title lh1">
                {{ product.title }}
                <div class="text-muted caption mt-2"  v-html="product.meta_description"></div>
              </div>
            </v-card-title>

            <v-divider></v-divider>
            <v-card-text>
              {{ product.description }}
            </v-card-text>
         <v-card-text>
              <review-ratting :node_id="product.id"></review-ratting>
               </v-card-text>
             </v-flex>

          <v-flex md5 xs12 class="bg-white">
            <v-sheet class="pa-2 pb-0">
              <v-list two-line>
                <v-subheader>Supplier information</v-subheader>
                <template>
                  <v-list-tile avatar>
                   <nuxt-link :to="'/browse/company/'+ product.company_slug">
                    <v-list-tile-avatar>
                      <v-img :src="product.company_logo"></v-img>
                    </v-list-tile-avatar>
                    </nuxt-link>
                   
                    <v-list-tile-content>
                      <v-list-tile-title class>
                        <nuxt-link :to="'/browse/company/'+ product.company_slug" class="black--text"> 
                        {{ product.company }}
                        </nuxt-link>
                        </v-list-tile-title>
                      <v-list-tile-sub-title>{{ product.company_location }}</v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-list-tile>

                  <v-card-text class="pt-0">
                    <v-card-actions class="px-0">

                   <v-rating :value="product.company_rating" 
                      readonly dense color="red accent-3" 
                      class="pa-0">
                      </v-rating>
                      <span ml-3>{{ product.company_reviews }} reviews</span>
                      <v-spacer></v-spacer>

                      <v-avatar tile size="40" class="ml-2">
                        <img src="icons/premium.svg" alt="Verified Business" />
                      </v-avatar>

                      <v-avatar tile size="40" class="ml-2">
                        <img src="icons/verified.svg" alt="Verified Business" />
                      </v-avatar>
                    </v-card-actions>
                  </v-card-text>
                  <v-divider></v-divider>
                </template>
              </v-list>
            </v-sheet>

            <v-sheet class="pa-2">
              <v-list>
                <template>
                  <v-list-tile class="height-30" v-if="product.show_price == 'true'">
                    <v-list-tile-content>
                      <v-list-tile-title class="body-2 font-weight-regular">Price</v-list-tile-title>
                    </v-list-tile-content>
                    <strong>{{ product.price }}/-</strong>
                  </v-list-tile>

                  <v-list-tile class="height-30" v-if="product.unit != null">
                    <v-list-tile-content>
                      <v-list-tile-title class="body-2 font-weight-regular">Minimum Order Quantity</v-list-tile-title>
                    </v-list-tile-content>
                    <strong>{{ product.moq }}</strong>/{{ product.unit }}
                  </v-list-tile>

                  <v-list-tile class="height-30">
                    <v-list-tile-content>
                      <v-list-tile-title class="body-2 font-weight-regular">International Shipping</v-list-tile-title>
                    </v-list-tile-content>
                    <strong>{{ product.international_shipping }}</strong>
                  </v-list-tile>
                  
                
                </template>
              </v-list>
            </v-sheet>

            <v-sheet class="pa-2">
              <v-divider></v-divider>
              <v-list subheader>
                <v-subheader>Payment accept</v-subheader>
                <v-list-tile avatar>
                  <v-list-tile-content>
                    <v-list-tile-sub-title>
                      <v-layout row wrap>

                        
                        <v-avatar tile size="45" class="mr-4" v-if="product.payment_accept[0] == '1'">
                          <img src="/icons/cash.svg" alt="Cash On Delivery" />
                        </v-avatar>

                        <v-avatar tile size="45" class="mr-4" v-if="product.payment_accept[1] == '2'">
                          <img src="/icons/banktransfer.svg" alt="Bank Transfer (NEFT)" />
                        </v-avatar>

                        <v-avatar tile size="45" class="mr-4" v-if="product.payment_accept[2] == '3'">
                          <img src="/icons/creditcard.svg" alt="Credit Card" />
                        </v-avatar>

                        <v-avatar tile size="45" class="mr-4" v-if="product.payment_accept[3] == '4'">
                          <img src="/icons/paypal.svg" alt="Paypal" />
                        </v-avatar>
                      </v-layout>
                    </v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-sheet>

            <v-sheet class="pl-3">
              <v-form @submit.prevent="quotation" ref="form">
              <v-container grid-list-lg class="bg-light-blue">
                <v-subheader class="black--text title-2 pl-0">Get Quote from Supplier</v-subheader>

                <v-layout row wrap>
                  <v-flex md6>
                    <v-text-field 
                    :counter="25"
                    v-model="form.first_name" 
                    label="First Name" 
                    :rules="firstnameRules"
                    required>
                    </v-text-field>
                  </v-flex>
                  <v-flex md6>
                    <v-text-field 
                    :counter="25" 
                    v-model="form.last_name"
                    label="Last Name" 
                    :rules="lastnameRules"
                    required
                    >
                    </v-text-field>
                  </v-flex>
                </v-layout>

                <v-text-field  
                label="Email" 
                v-model="form.email"
                :rules="emailRules"
                required
                >
                </v-text-field>

                <v-layout row wrap>
                  <v-flex md6>
                    <v-text-field 
                    label="Contact no" 
                    v-model="form.contact_no"
                    :rules="contactRules"
                    required>
                    </v-text-field>
                  </v-flex>

                  <v-flex md6>
                    <v-text-field 
                    type="number"
                    label="Quantity"
                    v-model="form.quantity"
                    :rules="quantityRules" 
                    required>
                    </v-text-field>
                  </v-flex>
                
                <v-flex md12>
               <v-textarea
                outlined
                label="Message"
                v-model="form.message"
                :rules="messageRules"
               ></v-textarea>
               </v-flex>


              <v-btn 
              depressed 
              color="primary"
              @click="loader = 'loading'"
              :loading="loading"
              :disabled="loading" 
              type="submit" >Send
              </v-btn>

                </v-layout>
              </v-container>
              </v-form>
            </v-sheet>
          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>
  </v-layout>
</template>


<script>
import ReviewRatting from '~/components/ReviewRatting.vue'
import Form from "vform";
import swal from "sweetalert2";

export default {
  components: {
    ReviewRatting
  },

  async asyncData({ $axios, params }) {
    let prodata = await $axios.get('browse/single/' + params.single)
    return {
      product: prodata.data
    }
  },
  data() {
    return {
      infobox: true,
       /*Rules*/
       firstnameRules: [
        v => !!v || 'First Name is required',
      ],
      lastnameRules: [
        v => !!v || 'Last Name is required',
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      contactRules: [
        v => !!v || 'Contact is required',
      ],
      quantityRules: [
        v => !!v || 'Quantity is required',
      ],
      messageRules: [
        v => !!v || 'Message is required',
      ],
    loader: null,
    loading: false,
    node_name: this.$route.params.single,
     form: new Form({
      first_name: null,
      last_name: null,
      email: null,
      contact_no: null,
      quantity: null,
      message: null
     }),
    }
  },

  methods: {

    async quotation() {
      
      const l = this.loader
      this[l] = !this[l]
      
      this.dialog = true;
      let formData = new FormData();
      formData.append('node_name', this.node_name)
      formData.append('first_name', this.form.first_name)
      formData.append('last_name', this.form.last_name)
      formData.append('email', this.form.email)
      formData.append('contact_no', this.form.contact_no)
      formData.append('quantity', this.form.quantity)
      formData.append('message', this.form.message)
        
        if (this.$refs.form.validate()) {
          this.snackbar = true
         this.$axios
            .post(`post-quote`, formData)
            .then(response => {
            setTimeout(() => (
            this[l] = false,
            swal.fire({
            title: "Successfully Send....",
            type: "info",
            animation: true,
            showCloseButton: true
            })
        ), 1500),
        this.reset();
          })
         }else{

      setTimeout(() => (
            this[l] = false,
            swal.fire({
            title: "Invalid Input!",
            type: "warning",
            animation: true,
            showCloseButton: true
            })
        ), 500)
      }
     // });
      
      },

      reset () {
        this.$refs.form.reset()
      },

  }
}
</script>

