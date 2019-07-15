<template>
  <v-layout row>
    <v-card flat>
      <v-card-title>
        <div>
          <h3 class="headline">My Business</h3>
          <div class="text-muted mb-1">{{ text_short }}</div>
        </div>
      </v-card-title>
      <v-img src="https://cdn.vuetifyjs.com/images/cards/desert.jpg" aspect-ratio="2.75"></v-img>

      <v-layout row wrap>
        <v-flex xs12>
          <v-tabs grow icons-and-text show-arrows slider-color="primary">
            <v-tab ripple class="text-capitalize">
              Profile
              <v-icon color="primary">work_outline</v-icon>
            </v-tab>
            <v-tab ripple class="text-capitalize">
              About
              <v-icon color="green">filter_frames</v-icon>
            </v-tab>
            <v-tab ripple class="text-capitalize">
              Others
              <v-icon color="grey">toggle_off</v-icon>
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
                      <v-form @submit.prevent="business" enctype="multipart/form-data">
                        <v-layout row wrap>
                          <v-flex xs12 md4>
                            <v-card flat>
                              <v-img :src="profilemageUrl" height="170">
                                <v-layout column fill-height>
                                  <v-card-title>
                                    <v-btn dark icon>
                                      <span>
                                        <input
                                          type="file"
                                          ref="profile_file"
                                          style="display: none"
                                          @change="onProfileFile"
                                        />
                                        <v-icon
                                          color="blue"
                                          dark
                                          @click="profileFile"
                                          v-model="form.profileName"
                                        >camera_alt</v-icon>
                                      </span>
                                    </v-btn>
                                  </v-card-title>
                                </v-layout>
                              </v-img>
                            </v-card>
                          </v-flex>
                          <v-flex xs12 md8>
                            <v-text-field
                              v-model="form.business_title"
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
                        </v-layout>

                        <v-subheader class="pl-0">Other Information {{ business.title }}</v-subheader>

                        <v-layout row wrap>
                          <v-flex xs8>
                            <v-text-field
                              v-model="form.address"
                              label="Address"
                              placeholder="Street, locality"
                              v-validate="'required'"
                              :error-messages="errors.collect('Address')"
                              data-vv-name="Address"
                              required
                              outline
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs12 md4>
                            <v-text-field
                              v-model="form.zipcode"
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
                          <v-flex xs8>
                            <v-text-field
                              v-model="form.email"
                              label="Email"
                              placeholder="Email"
                              v-validate="'required'"
                              :error-messages="errors.collect('Email')"
                              data-vv-name="Email"
                              required
                              outline
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs12 md4>
                            <v-text-field
                              v-model="form.phone"
                              label="Phone"
                              placeholder="Phone"
                              v-validate="'required'"
                              :error-messages="errors.collect('Phone')"
                              data-vv-name="Phone"
                              required
                              outline
                            ></v-text-field>
                          </v-flex>
                        </v-layout>

                        <v-layout row wrap>
                          <v-flex xs12 md6>
                            <v-text-field
                              v-model="form.website"
                              label="Website (optional)"
                              placeholder="Website"
                              outline
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs12 md6>
                            <v-select
                              v-model="form.business_type"
                              item-text="name"
                              item-value="id"
                              :items="entities"
                              label="Business Type"
                              v-validate="'required'"
                              :error-messages="errors.collect('Business Type')"
                              data-vv-name="Business Type"
                              required
                              outline
                            ></v-select>
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
                      <v-form @submit.prevent="about('form-2')" data-vv-scope="form-2">
                        <v-layout row wrap>
                          <v-flex xs12>
                            <v-text-field
                              textarea
                              rows="10"
                              v-model="form2.description"
                              label="Description"
                              placeholder="Description"
                              v-validate="'required'"
                              :error-messages="errors.collect('form-2.Description')"
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
                      <v-form @submit.prevent="others('form-3')" data-vv-scope="form-3">
                        <v-layout row wrap>
                          <v-flex xs12 md6>
                            <v-text-field
                              type="number"
                              v-model="form3.employee"
                              label="Employee"
                              placeholder="No of employee"
                              outline
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs12 md6>
                            <v-select
                              v-model="form3.scale"
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
                                  v-model="form3.established"
                                  label="Established (year/month)"
                                  readonly
                                  outline
                                  v-on="on"
                                ></v-text-field>
                              </template>
                              <v-date-picker
                                v-model="form3.established"
                                type="month"
                                no-title
                                scrollable
                              >
                                <v-spacer></v-spacer>
                                <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                                <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                              </v-date-picker>
                            </v-menu>
                          </v-flex>
                        </v-layout>

                        <v-layout row wrap>
                          <v-flex xs12 md6>
                            <v-text-field
                              type="text"
                              v-model="form3.facebook"
                              label="Facebook"
                              placeholder="Facebook"
                              outline
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs12 md6>
                            <v-text-field
                              type="text"
                              v-model="form3.twitter"
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
                              v-model="form3.linkedin"
                              label="Linkedin"
                              placeholder="Linkedin"
                              outline
                            ></v-text-field>
                          </v-flex>

                          <v-flex xs12 md6>
                            <v-text-field
                              type="text"
                              v-model="form3.youtube"
                              label="Youtube"
                              placeholder="Youtube"
                              outline
                            ></v-text-field>
                          </v-flex>

                          <v-flex xs12 md6>
                            <v-text-field
                              type="text"
                              v-model="form3.google"
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

                  <v-list-tile-action>
                    <v-switch  input-value="true"></v-switch>
                  </v-list-tile-action>
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
      return {
        profilemageUrl: res.data.node.profileImage
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
      title: 'Choose Location',
      id: null,
      scales: [],
      entities: [],
      form: new Form({
        business_title: null,
        address: null,
        zipcode: null,
        email: null,
        phone: null,
        website: '',
        business_type: null,
        profileName: '',
        profileimageFile: ''
      }),
      agree: true,

      form2: new Form({
        description: null
      }),

      form3: new Form({
        employee: 0,
        scale: null,
        established: '',
        facebook: '',
        twitter: '',
        linkedin: '',
        youtube: '',
        google: ''
      }),

      text:
        'Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure nec cu, alienum argumentum ius ad. Pri eu justo aeque torquatos.',
      text_short:
        'Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea.'
    }
  },

  methods: {
    //Profile Image
    profileFile() {
      this.$refs.profile_file.click()
    },
    onProfileFile(e) {
      const files = e.target.files
      if (files[0] !== undefined) {
        this.form.profileName = files[0].name
        if (this.form.profileName.lastIndexOf('.') <= 0) {
          return
        }
        const fr = new FileReader()
        fr.readAsDataURL(files[0])
        fr.addEventListener('load', () => {
          this.profilemageUrl = fr.result
          this.form.profileimageFile = files[0]
        })
      } else {
        this.form.profileName = ''
        this.form.profileimageFile = ''
        this.profilemageUrl = ''
      }
    },

    update_title(value) {
      this.title = value
    },
    update_id(value) {
      this.id = value
    },
    async business() {
      this.dialog = true
      let formData = new FormData()
      formData.append('title', this.form.business_title)
      formData.append('location', this.id)
      formData.append('business_address', this.form.address)
      formData.append('business_zipcode', this.form.zipcode)
      formData.append('business_email', this.form.email)
      formData.append('business_phone', this.form.phone)
      formData.append('business_website', this.form.website)
      formData.append('business_entity', this.form.business_type)
      if (this.form.profileName.length != 0) {
        formData.append('profileimage', this.form.profileimageFile)
      }

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
    async about(scope) {
      let formData = new FormData()
      formData.append('business_description', this.form2.description)

      this.$validator.validateAll(scope).then(result => {
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

    async others(scope) {
      //this.dialog = true;

      let formData = new FormData()
      formData.append('business_employee', this.form3.employee)
      formData.append('business_scale', this.form3.scale)
      formData.append('business_established', this.form3.established)
      formData.append('business_facebook', this.form3.facebook)
      formData.append('business_twitter', this.form3.twitter)
      formData.append('business_linkedin', this.form3.linkedin)
      formData.append('business_youtube', this.form3.youtube)
      formData.append('business_google', this.form3.google)

      this.$validator.validateAll(scope).then(result => {
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
    }
  },

  mounted() {
    this.$axios.get('edit-business').then(response => {
      this.form.business_title = response.data.node.title
      this.form.address = response.data.node.address
      this.form.zipcode = response.data.node.zipcode
      this.title = response.data.location.title
      this.id = response.data.location.id
      this.form.website = response.data.node.website
      this.entities = response.data.entities
      if (response.data.node.business_type != null) {
        this.form.business_type = Number(response.data.node.business_type)
      }
      this.form.email = response.data.node.email
      this.form.phone = response.data.node.phone

      /*About*/
      this.form2.description = response.data.node.description

      /*Others*/

      this.scales = response.data.scales
      if (response.data.node.employee != null) {
        this.form3.employee = response.data.node.employee
      }
      if (response.data.node.scale != null) {
        this.form3.scale = Number(response.data.node.scale)
      }

      if (response.data.node.estabished != null) {
        this.form3.established = response.data.node.estabished
      }

      /*Social*/
      if (response.data.node.facebook != null) {
        this.form3.facebook = response.data.node.facebook
      }
      if (response.data.node.twitter != null) {
        this.form3.twitter = response.data.node.twitter
      }
      if (response.data.node.linkedin != null) {
        this.form3.linkedin = response.data.node.linkedin
      }
      if (response.data.node.youtube != null) {
        this.form3.youtube = response.data.node.youtube
      }
      if (response.data.node.google != null) {
        this.form3.google = response.data.node.google
      }
    })
  }
}
</script>
