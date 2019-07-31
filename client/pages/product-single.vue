<template>
  <v-layout align-start justify-center row fill-height>
    <v-flex md10 xs12>
      <v-alert
        v-model="infobox"
        dismissible
        color="default"
        class="grey--text mt-5 hidden-xs-only"
      >List of trusted professionals available to help with plumbing issues. An experienced plumber can help you with garbage disposal unblocking, bathroom repair and drain replacement to keep your project running smoothly.</v-alert>

      <v-card flat>
        <v-layout row wrap>
          <v-flex md7 xs12>
            <v-img class="white--text" src="/image-600x400.png">
              <v-card-title class="align-end fill-height black--text">I'm a title</v-card-title>
            </v-img>
            <v-card-title primary-title>
              <div class="font-weight-medium title lh1">
                My Little Joy Casual Short Sleeve Printed Girl's Top
                <div
                  class="text-muted caption mt-2"
                >We are a reputed manufacturer and supplier of a huge range of Water Softener. Based on the technology of ion exchange</div>
              </div>
            </v-card-title>

            <v-divider></v-divider>
            <v-card-actions class="pa-3">
              1245 reviews
              <v-spacer></v-spacer>
              <v-icon color="primary">star_border</v-icon>
              <v-icon color="primary">star_border</v-icon>
              <v-icon color="primary">star_border</v-icon>
              <v-icon>star_border</v-icon>
              <v-icon>star_border</v-icon>
            </v-card-actions>
            <v-card-text>We are a reputed manufacturer and supplier of a huge range of Water Softener. Based on the technology of ion exchange, these softeners can be attached with dishwashers, washing machines and geysers for eliminating various water hardening minerals including calcium and magnesium. Our Water Softener is processed using quality compounds and modern techniques at our state of the art machining facility. WE can also offer these softeners at a reasonable price.</v-card-text>
          </v-flex>
          <v-flex md5 xs12 class="bg-white">
            <v-sheet class="pa-2 pb-0">
              <v-list two-line>
                <v-subheader>Supplier information</v-subheader>
                <template>
                  <v-list-tile avatar>
                    <v-list-tile-avatar>
                      <img src="https://cdn.vuetifyjs.com/images/lists/ali.png" />
                    </v-list-tile-avatar>

                    <v-list-tile-content>
                      <v-list-tile-title class>Matrix Infoline Private Limited</v-list-tile-title>
                      <v-list-tile-sub-title>Siliguri, West Bengal</v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-list-tile>

                  <v-card-text class="pt-0">
                    <v-card-actions class="pa-0">
                      <v-icon color="red">stars</v-icon>
                      <v-icon color="red">stars</v-icon>
                      <v-icon color="red">stars</v-icon>
                      <v-icon>star_border</v-icon>
                      <v-icon>star_border</v-icon>
                      <span ml-3>136 reviews</span>
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
                  <v-list-tile class="height-30">
                    <v-list-tile-content>
                      <v-list-tile-title class="body-2 font-weight-regular">Unit</v-list-tile-title>
                    </v-list-tile-content>
                    <strong>12350</strong>/Box
                  </v-list-tile>
                  <v-list-tile class="height-30">
                    <v-list-tile-content>
                      <v-list-tile-title class="body-2 font-weight-regular">Price</v-list-tile-title>
                    </v-list-tile-content>
                    <strong>12350</strong>/Box
                  </v-list-tile>

                  <v-list-tile class="height-30">
                    <v-list-tile-content>
                      <v-list-tile-title class="body-2 font-weight-regular">Minimum Order Quantity</v-list-tile-title>
                    </v-list-tile-content>
                    <strong>12350</strong>/Box
                  </v-list-tile>

                  <v-list-tile class="height-30">
                    <v-list-tile-content>
                      <v-list-tile-title class="body-2 font-weight-regular">International Shipping</v-list-tile-title>
                    </v-list-tile-content>
                    <strong>12350</strong>/Box
                  </v-list-tile>
                  <v-list-tile class="height-30">
                    <v-list-tile-content>
                      <v-list-tile-title class="body-2 font-weight-regular">Cash on Delivery</v-list-tile-title>
                    </v-list-tile-content>
                    <strong>12350</strong>/Box
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
                        <v-avatar tile size="45" class="mr-4">
                          <img src="icons/cash.svg" alt="Facebbok" />
                        </v-avatar>

                        <v-avatar tile size="45" class="mr-4">
                          <img src="icons/banktransfer.svg" alt="Facebbok" />
                        </v-avatar>

                        <v-avatar tile size="45" class="mr-4">
                          <img src="icons/creditcard.svg" alt="Facebbok" />
                        </v-avatar>

                        <v-avatar tile size="45" class="mr-4">
                          <img src="icons/paypal.svg" alt="Facebbok" />
                        </v-avatar>
                      </v-layout>
                    </v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-sheet>
          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  data() {
    return {
      infobox: true
    }
  }
}
</script>
