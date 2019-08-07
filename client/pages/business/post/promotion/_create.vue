<template>
  <v-layout row>

    <v-card flat>

      <v-card-title>
        <div>
          <h3 class="headline">{{ product.title }}</h3>
          <div class="text-muted mb-1"></div>
        </div>
      </v-card-title>
        <v-img :src="product.image"
          aspect-ratio="2.75">
        </v-img>

<v-layout row wrap>

<v-flex xs12>



          <v-layout align-start justify-left row fill-height>
            <v-flex xs12 md12>
              <v-card flat>



                <v-container grid-list-lg>
                 <v-form @submit.prevent="create_promotion()"> 

            <v-layout row wrap>
            <v-flex xs6 md6>
              <v-text-field
                label="CPC (Cost per click)"
                type="number"
                placeholder="Cost per click"
                outline
                v-model="cpc"
                :mask="number"
                @change="calculate_total"
              ></v-text-field>
            </v-flex>
            <v-flex xs6 md6>
              <v-text-field
                label="No of Clicks"
                type="number"
                placeholder="Total clicks"
                outline
                v-model="clicks"
                :mask="number"
                @change="calculate_total"
              ></v-text-field>
            </v-flex>
          </v-layout>

                    <v-layout row wrap>
            <v-flex xs7 md7>
              <div class="text-muted">Total Amount (USD)</div>
              <div class="title2">{{ total }} USD</div>
            </v-flex>
            <v-flex xs5 md5>
              <no-ssr>
                <paypal-checkout
                  env="sandbox"
                  :amount="this.total"
                  currency="USD"
                  locale="en_US"
                  :client="paypal"
                  :button-style="aStyle"
                  v-on:payment-authorized="paymentAuthorized"
                  v-on:payment-completed="paymentCompleted"
                  v-on:payment-cancelled="paymentCancelled"
                ></paypal-checkout>
              </no-ssr>
            </v-flex>
          </v-layout>
                   <v-dialog v-model="dialog" hide-overlay persistent width="300">
      <v-card>
        <v-card-text>
          Initiating Payment Gateway ..
          <v-progress-linear indeterminate color="info" class="mb-0"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
                  </v-form>
                </v-container>
              </v-card>
            </v-flex>
          </v-layout>
        
 
</v-flex>
      </v-layout>
    </v-card>
  </v-layout>
</template>

<script>
import swal from "sweetalert2";
import VeeValidate from "vee-validate";
import { getData, setData } from "nuxt-storage/local-storage";
export default {
  async asyncData({ params, $axios }) {
    return await $axios.get(`browse/single/${params.create}`).then(res => {
      return {
       product : res.data
       
      };
    });
  },
  layout:'user',

  head: {
    script: [
      {
        src:
          "https://unpkg.com/vue-paypal-checkout@2.0.0/dist/vue-paypal-checkout.min.js"
      }
    ]
  },
  data() {
    return {
      disabled: true,
      clicks: 40,
      cpc: 10,
      total: 0,
      node_name: this.$route.params.create,
      paypal: {
        sandbox:
          "AVjPggQRYje7OAIQB4u95fEv1JEVhlTrF1Ny0oAiF6A8i1PfsZRcLlD5kOO2bHbBTw2tLkP69La7qngq",
        production:
          "AVZhosFzrnZ5Mf3tiOxAD0M6NHv8pcB2IFNHAfp_h69mmbd-LElFYkJUSII3Y0FPbm7S7lxBuqWImLbl"
      }
      //braintreeSdk: window.braintree
    };
  },

  computed: {
    calculate_total() {
      this.total = this.cpc * this.clicks;

      if (this.total > 0) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    }
  },

   methods: {
    paymentCompleted: function(data) {},
    paymentCancelled: function(data) {
      swal.fire({
        title: "Payment fail",
        type: "success",
        animation: true,
        showCloseButton: true
      });
    },

    async paymentAuthorized(data) {
      var form = new FormData();
      form.append("cpc", this.cpc);
      form.append("clicks", this.clicks);
      form.append("total", this.total);
      form.append("node_name", this.node_name);
      form.append("txn_id", data.paymentID);

      const apiResponse = await this.$axios.post(`/checkout`, form);

      if (apiResponse) {
        setData("txn_id", data.paymentID);
        this.$root.$router.push({ path: "/business/post/promotion/message" });
      }

      return false;

      //console.log(apiResponse.data);
    }
  },
}
</script>