<template>
  <v-container grid-list-lg>
    <v-layout row wrap>
      <v-flex md8 xs12>
        <v-card flat>
          <v-img :src="company.coverimage" alt="Company Cover Photo">
          </v-img>
        </v-card>

        <v-toolbar flat extended dense>
          <v-avatar size="125" tile="false">
            <v-img :src="company.profileimage" alt="Company Logo"></v-img>
          </v-avatar>

          <v-sheet class="mt-5 ml-3">
            <h1 class="title font-weight-bold">{{ company.title }}</h1>
            <v-card-actions class="px-0">
              <v-icon color="red">star</v-icon>
              <v-icon color="red">star</v-icon>
              <v-icon color="red">star</v-icon>
              <v-icon>star_border</v-icon>
              <v-icon>star_border</v-icon>
              <span class="ml-2">136 reviews</span>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-sheet>

          <v-spacer></v-spacer>
          <v-sheet class="mt-5 ml-3">
            <v-avatar tile size="30" class="ml-2">
              <img src="icons/premium.svg" alt="Verified Business" />
            </v-avatar>

            <v-avatar tile size="30" class="ml-2">
              <img src="icons/verified.svg" alt="Verified Business" />
            </v-avatar>

            <v-menu bottom left>
              <template v-slot:activator="{ on }">
                <v-btn icon v-on="on">
                  <v-icon>menu</v-icon>
                </v-btn>
              </template>

              <v-list>
                <v-list-item>
                  <v-list-item-title>Report Incorrect</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-sheet>
        </v-toolbar>

        <v-card-text style="height: 200px;">
          <template>
            <h2 class="font-weight-regular">About</h2>
            <div>
            <p>
            {{ company.description }}   
            </p>
             
            </div>
          </template>
        </v-card-text>

       <v-card-text>
          <v-layout row wrap>
            <v-flex md6 xs12>
              <v-sheet class="bordered pa-3 mb-3 bg-white">
                <h4>Location</h4>
                {{ company.address }}, {{ company.location }} - {{ company.zipcode }}
                </v-sheet>

              <v-sheet class="bordered pa-3 mb-3 bg-white">
                <h4>Credentials</h4>
                <v-layout>
                  <v-flex class="pb-0">Company Type :</v-flex>
                  <v-flex class="pb-0 text-right">{{ company.type }}</v-flex>
                </v-layout>
                 <v-layout v-if="company.size != null">
                  <v-flex class="pb-0">Size :</v-flex>
                  <v-flex class="pb-0 text-right">{{ company.size }}</v-flex>
                </v-layout>
                <v-layout v-if="company.no_of_employee != null">
                  <v-flex class="pb-0">No of employee :</v-flex>
                  <v-flex class="pb-0 text-right">{{ company.no_of_employee }}</v-flex>
                </v-layout>
                <v-layout v-if="company.established != null">
                  <v-flex class="pb-0">Established :</v-flex>
                  <v-flex class="pb-0 text-right">{{ company.established }}</v-flex>
                </v-layout>
                </v-sheet>

                <v-sheet class="bordered pa-3 bg-white">
                <h4>Payment methods</h4>
                <v-list subheader>
               <v-list-tile avatar>
                  <v-list-tile-content>
                    <v-list-tile-sub-title>
                      <v-layout row wrap>

                        
                        <v-avatar tile size="45" class="mr-4" v-if="company.payment_accept[0] == '1'">
                          <img src="/icons/cash.svg" alt="Cash On Delivery" />
                        </v-avatar>

                        <v-avatar tile size="45" class="mr-4" v-if="company.payment_accept[1] == '2'">
                          <img src="/icons/banktransfer.svg" alt="Bank Transfer (NEFT)" />
                        </v-avatar>

                        <v-avatar tile size="45" class="mr-4" v-if="company.payment_accept[2] == '3'">
                          <img src="/icons/creditcard.svg" alt="Credit Card" />
                        </v-avatar>

                        <v-avatar tile size="45" class="mr-4" v-if="company.payment_accept[3] == '4'">
                          <img src="/icons/paypal.svg" alt="Paypal" />
                        </v-avatar>
                      </v-layout>
                    </v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
                </v-list>
                </v-sheet>

            </v-flex>
            <v-flex md6 xs12 v-if="company.working_hours">
              <v-sheet class="pa-3 mb-3 bg-white bordered " >
                <h4><v-icon>home</v-icon> Working hours</h4>
                <v-layout >
                  <v-flex class="pb-0">Monday</v-flex>
                  <v-flex class="pb-0 text-right" v-if="company.working_hours[0].status == 'true'">{{ company.working_hours[0].open }} to {{ company.working_hours[0].close }}</v-flex>
                  <v-flex class="blue--text pb-0 text-right" v-if="company.working_hours[0].status == 'true'">Open</v-flex>
                  <v-flex class="red--text pb-0 text-right" v-if="company.working_hours[0].status == 'false'">Close</v-flex>
                </v-layout>
                <v-layout>
                  <v-flex class="pb-0">Tuesday</v-flex>
                  <v-flex class="pb-0 text-right" v-if="company.working_hours[1].status == 'true'">{{ company.working_hours[1].open }} to {{ company.working_hours[1].close }}</v-flex>
                 <v-flex class="blue--text pb-0 text-right" v-if="company.working_hours[1].status == 'true'">Open</v-flex>
                  <v-flex class="red--text pb-0 text-right" v-if="company.working_hours[1].status == 'false'">Close</v-flex>

                </v-layout>
                <v-layout>
                  <v-flex class="pb-0">Wednesday</v-flex>
                  <v-flex class="pb-0 text-right" v-if="company.working_hours[2].status == 'true'">{{ company.working_hours[2].open }} to {{ company.working_hours[2].close }}</v-flex>
                  <v-flex class="blue--text pb-0 text-right" v-if="company.working_hours[2].status == 'true'">Open</v-flex>
                  <v-flex class="red--text pb-0 text-right" v-if="company.working_hours[2].status == 'false'">Close</v-flex>

                </v-layout>
                <v-layout>
                  <v-flex class="pb-0">Thursday</v-flex>
                  <v-flex class="pb-0 text-right" v-if="company.working_hours[3].status == 'true'">{{ company.working_hours[3].open }} to {{ company.working_hours[3].close }}</v-flex>
                  <v-flex class="blue--text pb-0 text-right" v-if="company.working_hours[3].status == 'true'">Open</v-flex>
                  <v-flex class="red--text pb-0 text-right" v-if="company.working_hours[3].status == 'false'">Close</v-flex>

                </v-layout>
                <v-layout>
                  <v-flex class="pb-0">Friday</v-flex>
                  <v-flex class="pb-0 text-right" v-if="company.working_hours[4].status == 'true'">{{ company.working_hours[4].open }} to {{ company.working_hours[4].close }}</v-flex>
                  <v-flex class="blue--text pb-0 text-right" v-if="company.working_hours[4].status == 'true'">Open</v-flex>
                  <v-flex class="red--text pb-0 text-right" v-if="company.working_hours[4].status == 'false'">Close</v-flex>

                </v-layout>
                <v-layout>
                  <v-flex class="pb-0">Saturday</v-flex>
                  <v-flex class="pb-0 text-right" v-if="company.working_hours[5].status == 'true'">{{ company.working_hours[5].open }} to {{ company.working_hours[5].close }}</v-flex>
                  <v-flex class="blue--text pb-0 text-right" v-if="company.working_hours[5].status == 'true'">Open</v-flex>
                  <v-flex class="red--text pb-0 text-right" v-if="company.working_hours[5].status == 'false'">Close</v-flex>

                </v-layout>
                <v-layout>
                  <v-flex class="pb-0">Sunday</v-flex>
                  <v-flex class="pb-0 text-right" v-if="company.working_hours[6].status == 'true'">{{ company.working_hours[6].open }} to {{ company.working_hours[6].close }}</v-flex>
                  <v-flex class="blue--text pb-0 text-right" v-if="company.working_hours[6].status == 'true'">Open</v-flex>
                  <v-flex class="red--text pb-0 text-right" v-if="company.working_hours[6].status == 'false'">Close</v-flex>

                </v-layout>
              </v-sheet>
            </v-flex>
          </v-layout>
        </v-card-text>

        <v-card-text>
              <review-ratting :node_id="company.id"></review-ratting>
               </v-card-text>

      </v-flex>
      <v-flex md4 xs12>Right Panel</v-flex>
    </v-layout>
  </v-container>
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
    let business = await $axios.get('company/single/' + params.single)
    return {
      company: business.data
    }
  },

}
</script>
