<template>
  <v-layout row>
    <v-card flat>
      <v-card-title>
        <div>
          <h3 class="headline">My Services</h3>
          <div class="text-muted mb-1">{{ text_short }}</div>
        </div>
      </v-card-title>

      <v-img :src="`https://picsum.photos/600/300?random=${Math.floor(Math.random() * 100) + r}`" />

      <v-layout row wrap>
        <v-flex xs12>
          <v-tabs grow icons-and-text show-arrows slider-color="primary">
            <v-tab ripple class="text-capitalize">
              Basic
              <v-icon color="primary">work_outline</v-icon>
            </v-tab>
            <v-tab ripple class="text-capitalize">
              About
              <v-icon color="green">filter_frames</v-icon>
            </v-tab>

            <v-tab ripple class="text-capitalize">
              Settings
              <v-icon color="megenta">toggle_off</v-icon>
            </v-tab>

            <v-tab-item class="pl-0 pr-0">
              <v-layout align-start justify-left row fill-height>
                <v-flex xs12 md12>
                  <v-card flat>
                    <v-container grid-list-lg>
                      <v-form @submit.prevent="business">
                        <v-layout row wrap>
                          <v-flex xs12>
                            <v-text-field
                              v-model="business_title"
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

                          <v-flex xs12>
                            <v-text-field
                              textarea
                              rows="10"
                              v-model="description"
                              label="Description"
                              placeholder="Description"
                              v-validate="'required'"
                              :error-messages="errors.collect('Description')"
                              data-vv-name="Description"
                              required
                              outline
                            ></v-text-field>
                          </v-flex>
                        </v-layout>

                        <v-subheader class="pl-0">Other Information</v-subheader>

                        <v-layout row wrap>
                          <v-flex xs12 md12>
                            <v-text-field
                              v-model="business_title"
                              label="Title"
                              placeholder="Business title"
                              v-validate="'required'"
                              :error-messages="errors.collect('Business Title')"
                              data-vv-name="Business Title"
                              required
                              outline
                              counter="80"
                            ></v-text-field>
                          </v-flex>
                        </v-layout>

                        <v-layout row wrap>
                          <v-flex xs12>
                            <v-text-field
                              v-model="address"
                              label="Address"
                              placeholder="Street, locality"
                              v-validate="'required'"
                              :error-messages="errors.collect('Address')"
                              data-vv-name="Address"
                              required
                              outline
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs12 md8>
                            <location-popup :title="title" @eId="update_id" @eTitle="update_title"></location-popup>
                          </v-flex>
                          <v-flex xs12 md4>
                            <v-text-field
                              v-model="zipcode"
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
                          <v-flex xs12 md6>
                            <v-text-field
                              v-model="website"
                              label="Website (optional)"
                              placeholder="Website"
                              outline
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs12 md6>
                            <v-select
                              v-model="entity"
                              item-text="name"
                              item-value="id"
                              :items="entities"
                              label="Business Type"
                              outline
                            ></v-select>
                          </v-flex>
                        </v-layout>

                        <div class="text-xs-center">
                          <v-dialog v-model="dialog" hide-overlay persistent width="300">
                            <v-card color="primary" dark>
                              <v-card-text>
                                Please stand by
                                <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
                              </v-card-text>
                            </v-card>
                          </v-dialog>
                        </div>
                        <v-card-actions class="pa-0">
                          <v-btn type="submit" large depressed color="orange">Update</v-btn>
                        </v-card-actions>
                      </v-form>
                    </v-container>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-tab-item>

            <v-tab-item class="pl-0 pr-0">
              <v-layout align-start justify-left row fill-height>
                <v-flex xs12 md12>
                  <v-card flat>
                    <v-container grid-list-lg>
                      <v-form @submit.prevent="about">
                        <v-layout row wrap>
                          <v-flex xs12>
                            <v-text-field
                              v-model="email"
                              label="Email"
                              placeholder="Email"
                              v-validate="'required'"
                              :error-messages="errors.collect('Email')"
                              data-vv-name="Email"
                              required
                              outline
                            ></v-text-field>
                          </v-flex>
                        </v-layout>

                        <v-layout row wrap>
                          <v-flex xs12 md6>
                            <v-text-field
                              v-model="phone"
                              label="Phone"
                              placeholder="Phone"
                              v-validate="'required'"
                              :error-messages="errors.collect('Phone')"
                              data-vv-name="Phone"
                              required
                              outline
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs12 md6></v-flex>
                        </v-layout>

                        <v-layout row wrap>
                          <v-flex xs12>
                            <v-text-field
                              textarea
                              rows="10"
                              v-model="description"
                              label="Description"
                              placeholder="Description"
                              v-validate="'required'"
                              :error-messages="errors.collect('Description')"
                              data-vv-name="Description"
                              required
                              outline
                            ></v-text-field>
                          </v-flex>
                        </v-layout>

                        <v-card-actions class="pa-0">
                          <v-btn type="submit" large depressed color="orange">Update</v-btn>
                        </v-card-actions>
                      </v-form>
                    </v-container>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-tab-item>

            <v-tab-item class="pl-0 pr-0">
              <v-layout align-start justify-left row fill-height>
                <v-flex xs12 md12>
                  <v-card flat>
                    <v-container grid-list-lg>
                      <v-form @submit.prevent="credential">
                        <v-layout row wrap>
                          <v-flex xs12 md6>
                            <v-text-field
                              type="number"
                              v-model="employee"
                              label="Employee"
                              placeholder="No of employee"
                              outline
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs12 md6>
                            <v-select
                              v-model="scale"
                              item-text="name"
                              item-value="id"
                              :items="scales"
                              label="Select Scale"
                              outline
                            ></v-select>
                          </v-flex>
                        </v-layout>
                        <v-layout row wrap>
                          <v-flex xs12 md6>
                            <v-select
                              v-model="entity"
                              item-text="name"
                              item-value="id"
                              :items="entities"
                              label="Select Entity"
                              outline
                            ></v-select>
                          </v-flex>

                          <v-flex xs12 md6>
                            <v-menu
                              ref="menu"
                              v-model="menu"
                              :close-on-content-click="false"
                              :nudge-right="40"
                              :return-value.sync="date"
                              lazy
                              transition="scale-transition"
                              offset-y
                              full-width
                            >
                              <template v-slot:activator="{ on }">
                                <v-text-field
                                  v-model="established"
                                  label="Established (year/month)"
                                  readonly
                                  outline
                                  v-on="on"
                                ></v-text-field>
                              </template>
                              <v-date-picker v-model="established" type="month" no-title scrollable>
                                <v-spacer></v-spacer>
                                <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                                <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                              </v-date-picker>
                            </v-menu>
                          </v-flex>
                        </v-layout>

                        <v-card-actions class="pa-0">
                          <v-btn type="submit" large depressed color="orange">Update</v-btn>
                        </v-card-actions>
                      </v-form>
                    </v-container>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-tab-item>

            <v-tab-item class="pl-0 pr-0">
              <v-layout align-start justify-left row fill-height>
                <v-flex xs12 md12>
                  <v-card flat>
                    <v-container grid-list-lg>
                      <v-form @submit.prevent="social">
                        <v-layout row wrap>
                          <v-flex xs12 md6>
                            <v-text-field
                              type="text"
                              v-model="facebook"
                              label="Facebook"
                              placeholder="Facebook"
                              outline
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs12 md6>
                            <v-text-field
                              type="text"
                              v-model="twitter"
                              label="Twitter"
                              placeholder="Twitter"
                              outline
                            ></v-text-field>
                          </v-flex>
                        </v-layout>
                        <v-layout row wrap>
                          <v-flex xs12 md6>
                            <v-text-field
                              type="text"
                              v-model="linkedin"
                              label="Linkedin"
                              placeholder="Linkedin"
                              outline
                            ></v-text-field>
                          </v-flex>

                          <v-flex xs12 md6>
                            <v-text-field
                              type="text"
                              v-model="youtube"
                              label="Youtube"
                              placeholder="Youtube"
                              outline
                            ></v-text-field>
                          </v-flex>

                          <v-flex xs12 md6>
                            <v-text-field
                              type="text"
                              v-model="google"
                              label="Google"
                              placeholder="Google"
                              outline
                            ></v-text-field>
                          </v-flex>
                        </v-layout>

                        <v-card-actions class="pa-0">
                          <v-btn type="submit" large depressed color="orange">Update</v-btn>
                        </v-card-actions>
                      </v-form>
                    </v-container>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-tab-item>

            <v-tab-item class="pl-0 pr-0">
              <v-list two-line subheader>
                <v-subheader>General</v-subheader>

                <v-list-tile avatar>
                  <v-list-tile-content>
                    <v-list-tile-title>Profile</v-list-tile-title>
                    <v-list-tile-sub-title>People can't find inactive profile</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>

                <v-list-tile avatar>
                  <v-list-tile-content>
                    <v-list-tile-title>Email</v-list-tile-title>
                    <v-list-tile-sub-title>Allow email enquiry</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>

                <v-list-tile avatar>
                  <v-list-tile-content>
                    <v-list-tile-title>Phone/SMS</v-list-tile-title>
                    <v-list-tile-sub-title>Allow mobile message</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>

              <v-divider></v-divider>

              <v-list subheader two-line>
                <v-subheader>Visibility</v-subheader>

                <v-list-tile>
                  <v-list-tile-action>
                    <v-checkbox v-model="show_email"></v-checkbox>
                  </v-list-tile-action>

                  <v-list-tile-content>
                    <v-list-tile-title>Show email</v-list-tile-title>
                    <v-list-tile-sub-title>Show my email publicly</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>

                <v-list-tile>
                  <v-list-tile-action>
                    <v-checkbox v-model="show_phone"></v-checkbox>
                  </v-list-tile-action>

                  <v-list-tile-content>
                    <v-list-tile-title>Show phone</v-list-tile-title>
                    <v-list-tile-sub-title>Show my phone publicly</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>

              <v-flex class="pl-2 mt-5">
                <v-btn type="submit" large depressed color="primary">Update</v-btn>
              </v-flex>
            </v-tab-item>
          </v-tabs>
        </v-flex>
      </v-layout>
    </v-card>
  </v-layout>
</template>

<script>
import Form from 'vform'
import swal from 'sweetalert2'
import VeeValidate from 'vee-validate'
import LocationPopup from '~/components/LocationPopup.vue'
export default {
  async asyncData({ redirect, $axios }) {
    return await $axios.get(`add-business`).then(res => {
      if (res) {
        if (res.data.node == null) {
          swal
            .fire({
              title: 'Please add business first',
              type: 'warning',
              animation: true,
              showCloseButton: true
            })
            .then(result => {
              if (result.value) {
                redirect('/business/create')
              }
            })
          redirect('/business/create')
        }
      }
    })
  },
  components: {
    LocationPopup
  },
  layout: 'user',
  data() {
    return {
      dialog: false,
      active: true,
      category_dialog: false,

      parent_locations: [],
      locations: [],
      agree: true,
      business_title: null,
      business_type: ['Foo', 'Bar', 'Fizz', 'Buzz'],
      address: null,
      zipcode: null,
      email: null,
      title: 'Location from Parent',
      id: null,

      email: null,
      phone: null,
      webiste: null,
      description: null,

      employee: 0,
      entity: null,
      scale: null,
      established: null,
      scales: [],
      entities: [],
      facebook: null,
      twitter: null,
      linkedin: null,
      youtube: null,
      google: null,

      text:
        'Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure nec cu, alienum argumentum ius ad. Pri eu justo aeque torquatos.',
      text_short:
        'Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea.'
    }
  },

  methods: {
    update_title(value) {
      this.title = value
    },
    update_id(value) {
      this.id = value
    },
    async business() {
      let formData = new FormData()
      formData.append('title', this.business_title)
      //formData.append("location", this.locations);
      formData.append('location', this.id)
      formData.append('business_address', this.address)
      formData.append('business_zipcode', this.zipcode)

      this.$validator.validateAll().then(result => {
        if (result) {
          this.$axios.post(`business/update`, formData).then(response => {
            this.dialog = false
            swal.fire({
              title: 'Business Updated Successfully',
              type: 'success',
              animation: true,
              showCloseButton: true
            })
          })
        } else {
          this.dialog = false
        }
      })
    },

    /*About*/
    async about() {
      let formData = new FormData()
      formData.append('business_email', this.email)
      formData.append('business_phone', this.phone)
      formData.append('business_website', this.website)
      formData.append('business_description', this.description)

      this.$validator.validateAll().then(result => {
        if (result) {
          this.$axios.post(`business/update`, formData).then(response => {
            this.dialog = false
            swal.fire({
              title: 'Business Updated Successfully',
              type: 'success',
              animation: true,
              showCloseButton: true
            })
          })
        } else {
          this.dialog = false
        }
      })
    },

    /*Credential*/

    async credential() {
      //this.dialog = true;

      let formData = new FormData()
      formData.append('business_employee', this.employee)
      formData.append('business_scale', this.scale)
      formData.append('business_entity', this.entity)
      formData.append('business_established', this.established)

      this.$validator.validateAll().then(result => {
        if (result) {
          this.$axios.post(`business/update`, formData).then(response => {
            this.dialog = false
            swal.fire({
              title: 'Credential Updated Successfully',
              type: 'success',
              animation: true,
              showCloseButton: true
            })
          })
        } else {
          this.dialog = false
        }
      })
    },

    /*Social*/

    async social() {
      let formData = new FormData()
      formData.append('business_facebook', this.facebook)
      formData.append('business_twitter', this.twitter)
      formData.append('business_linkedin', this.linkedin)
      formData.append('business_youtube', this.youtube)
      formData.append('business_google', this.google)

      this.$validator.validateAll().then(result => {
        if (result) {
          this.$axios.post(`business/update`, formData).then(response => {
            this.dialog = false
            swal.fire({
              title: 'Social Updated Successfully',
              type: 'success',
              animation: true,
              showCloseButton: true
            })
          })
        } else {
          this.dialog = false
        }
      })
    }
  },

  mounted() {
    this.$axios.get('edit-business').then(response => {
      this.business_title = response.data.node.title
      this.address = response.data.node.translations[0].business_address
      this.zipcode = response.data.node.translations[0].business_zipcode
      this.email = response.data.node.translations[0].business_email
      this.title = response.data.location.title
      this.id = response.data.location.id

      /*About*/
      this.email = response.data.node.translations[0].business_email
      this.phone = response.data.node.translations[0].business_phone
      this.website = response.data.node.translations[0].business_website
      this.description = response.data.node.translations[0].business_description

      /*Credential*/

      this.entities = response.data.entities
      this.scales = response.data.scales
      if (response.data.node.translations[0].business_employee != null) {
        this.employee = response.data.node.translations[0].business_employee
      }
      if (response.data.node.translations[0].business_employee != null) {
        this.scale = Number(response.data.node.translations[0].business_scale)
      }

      if (response.data.node.translations[0].business_entity != null) {
        this.entity = Number(response.data.node.translations[0].business_entity)
      }
      if (response.data.node.translations[0].business_established != null) {
        this.established =
          response.data.node.translations[0].business_established
      }

      /*Social*/

      if (response.data.node.translations[0].business_facebook != null) {
        this.facebook = response.data.node.translations[0].business_facebook
      }
      if (response.data.node.translations[0].business_twitter != null) {
        this.twitter = response.data.node.translations[0].business_twitter
      }

      if (response.data.node.translations[0].business_linkedin != null) {
        this.linkedin = response.data.node.translations[0].business_linkedin
      }
      if (response.data.node.translations[0].business_youtube != null) {
        this.youtube = response.data.node.translations[0].business_youtube
      }
      if (response.data.node.translations[0].business_google != null) {
        this.google = response.data.node.translations[0].business_google
      }
    })
  }
}
</script>
