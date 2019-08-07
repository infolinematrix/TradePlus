<template>
  <div>
    <v-card>
      <v-card-title primary-title>
        <h3 class="title2 mb-0">Message</h3>
      </v-card-title>

      <v-card-text>Payment successfull..
        <div> Transaction ID : {{ this.txn_id }} </div>
      </v-card-text>
      <v-card-text>
        <nuxt-link to="/business/post">Go Back</nuxt-link>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { getData, setData } from "nuxt-storage/local-storage";
export default {
  layout: "user",

  data:() => ({
    txn_id: null
  }),
  methods: {
    getTxn(){
      return   getData("txn_id")
    }
  },
  mounted(){

    this.txn_id = getData("txn_id")
  }
};
</script>
