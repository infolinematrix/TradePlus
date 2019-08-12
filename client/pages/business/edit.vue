<template>
  <v-layout row>
    <v-card flat>
      <v-card-title>
        <div>
          <h3 class="title-2">My Business</h3>
          <div
            class="text-muted mb-1"
          >The business profile is designed to be an overview of your business and the business plan. It should provide readers with a quick overview of your business, including your values and objectives, so they can get an immediate feel for what you’re doing and where you’re going.</div>
        </div>

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
      </v-card-title>

      <v-img :src="coverimageUrl" aspect-ratio="2.75">
        <v-layout column fill-height>
          <v-card-title>
            <v-form @submit.prevent="update_image()" enctype="multipart/form-data">
              <v-btn dark icon>
                <span>
                  <input type="file" ref="cover_file" style="display: none" @change="onCoverFile" />
                  <v-icon dark @click="coverFile" v-model="coverName">camera_alt</v-icon>
                </span>
              </v-btn>

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
            </v-form>
          </v-card-title>
        </v-layout>
      </v-img>

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
                      <v-layout row wrap>
                        <v-flex xs12 md4>
                          <v-card flat>
                            <v-form @submit.prevent="update_image()" enctype="multipart/form-data">
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
                                          color="grey"
                                          dark
                                          @click="profileFile"
                                          v-model="form.profileName"
                                        >camera_alt</v-icon>
                                      </span>
                                    </v-btn>
                                  </v-card-title>
                                </v-layout>
                              </v-img>
                            </v-form>
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

                      <v-subheader class="pl-0">Others Information</v-subheader>
                      <v-form @submit.prevent="business" enctype="multipart/form-data">
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

                        <v-subheader class="pl-0">Delete My Profile</v-subheader>
                        <v-btn icon @click="delete_business()">
                          <v-icon>delete</v-icon>
                        </v-btn>
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
                        <v-subheader class="pl-0">Social Links</v-subheader>
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

                        <v-subheader class="pl-0">Working Hours</v-subheader>
                        <v-card-text>
                          <v-layout row wrap align-center>
                            <v-flex>
                              <v-switch class="pt-0" v-model="form3.monday.status" color="primary"></v-switch>
                            </v-flex>
                            <v-flex text-md-left>Monday</v-flex>
                            <v-flex md3>
                              <v-menu
                                lazy
                                :close-on-content-click="false"
                                v-model="form3.monday.open.menu"
                                transition="scale-transition"
                                offset-y
                                :disabled="!form3.monday.status"
                              >
                                <v-text-field
                                  v-if="form3.monday.status"
                                  slot="activator"
                                  label="Open at"
                                  v-model="form3.monday.open.time"
                                  :disabled="!form3.monday.status"
                                  v-validate="'required'"
                                  :error-messages="errors.collect('form-3.Monday Open')"
                                  data-vv-name="Monday Open"
                                  required
                                  prepend-icon="access_time"
                                  readonly
                                ></v-text-field>
                                <v-time-picker
                                  v-model="form3.monday.open.time"
                                  format="24hr"
                                  autosave
                                ></v-time-picker>
                              </v-menu>
                            </v-flex>

                            <v-flex md3>
                              <v-menu
                                lazy
                                :close-on-content-click="false"
                                v-model="form3.monday.close.menu"
                                transition="scale-transition"
                                offset-y
                                :disabled="!form3.monday.status"
                              >
                                <v-text-field
                                  v-if="form3.monday.status"
                                  slot="activator"
                                  label="Close at"
                                  v-model="form3.monday.close.time"
                                  :disabled="!form3.monday.status"
                                  v-validate="'required'"
                                  :error-messages="errors.collect('form-3.Monday Close')"
                                  data-vv-name="Monday Close"
                                  required
                                  prepend-icon="access_time"
                                  readonly
                                ></v-text-field>
                                <v-time-picker
                                  v-model="form3.monday.close.time"
                                  format="24hr"
                                  autosave
                                ></v-time-picker>
                              </v-menu>
                            </v-flex>
                          </v-layout>
                          <v-layout row wrap align-center>
                            <v-flex>
                              <v-switch class="pt-0" v-model="form3.tuesday.status" color="primary"></v-switch>
                            </v-flex>
                            <v-flex text-md-left>Tuesday</v-flex>
                            <v-flex md3>
                              <v-menu
                                lazy
                                :close-on-content-click="false"
                                v-model="form3.tuesday.open.menu"
                                transition="scale-transition"
                                offset-y
                                :disabled="!form3.tuesday.status"
                              >
                                <v-text-field
                                  v-if="form3.tuesday.status"
                                  slot="activator"
                                  label="Open at"
                                  v-model="form3.tuesday.open.time"
                                  :disabled="!form3.tuesday.status"
                                  v-validate="'required'"
                                  :error-messages="errors.collect('form-3.Tuesday Open')"
                                  data-vv-name="Tuesday Open"
                                  required
                                  prepend-icon="access_time"
                                  readonly
                                ></v-text-field>
                                <v-time-picker
                                  v-model="form3.tuesday.open.time"
                                  format="24hr"
                                  autosave
                                ></v-time-picker>
                              </v-menu>
                            </v-flex>

                            <v-flex md3>
                              <v-menu
                                lazy
                                :close-on-content-click="false"
                                v-model="form3.tuesday.close.menu"
                                transition="scale-transition"
                                offset-y
                                :disabled="!form3.tuesday.status"
                              >
                                <v-text-field
                                  v-if="form3.tuesday.status"
                                  slot="activator"
                                  label="Close at"
                                  v-model="form3.tuesday.close.time"
                                  :disabled="!form3.tuesday.status"
                                  v-validate="'required'"
                                  :error-messages="errors.collect('form-3.Tuesday Close')"
                                  data-vv-name="Tuesday Close"
                                  required
                                  prepend-icon="access_time"
                                  readonly
                                ></v-text-field>
                                <v-time-picker
                                  v-model="form3.tuesday.close.time"
                                  format="24hr"
                                  autosave
                                ></v-time-picker>
                              </v-menu>
                            </v-flex>
                          </v-layout>
                          <v-layout row wrap align-center>
                            <v-flex>
                              <v-switch
                                class="pt-0"
                                v-model="form3.wednesday.status"
                                color="primary"
                              ></v-switch>
                            </v-flex>
                            <v-flex text-md-left>Wednesday</v-flex>
                            <v-flex md3>
                              <v-menu
                                lazy
                                :close-on-content-click="false"
                                v-model="form3.wednesday.open.menu"
                                transition="scale-transition"
                                offset-y
                                :disabled="!form3.wednesday.status"
                              >
                                <v-text-field
                                  v-if="form3.wednesday.status"
                                  slot="activator"
                                  label="Open at"
                                  v-model="form3.wednesday.open.time"
                                  :disabled="!form3.wednesday.status"
                                  v-validate="'required'"
                                  :error-messages="errors.collect('form-3.Wednesday Open')"
                                  data-vv-name="Wednesday Open"
                                  required
                                  prepend-icon="access_time"
                                  readonly
                                ></v-text-field>
                                <v-time-picker
                                  v-model="form3.wednesday.open.time"
                                  format="24hr"
                                  autosave
                                ></v-time-picker>
                              </v-menu>
                            </v-flex>

                            <v-flex md3>
                              <v-menu
                                lazy
                                :close-on-content-click="false"
                                v-model="form3.wednesday.close.menu"
                                transition="scale-transition"
                                offset-y
                                :disabled="!form3.wednesday.status"
                              >
                                <v-text-field
                                  v-if="form3.wednesday.status"
                                  slot="activator"
                                  label="Close at"
                                  v-model="form3.wednesday.close.time"
                                  :disabled="!form3.wednesday.status"
                                  v-validate="'required'"
                                  :error-messages="errors.collect('form-3.Wednesday Close')"
                                  data-vv-name="Wednesday Close"
                                  required
                                  prepend-icon="access_time"
                                  readonly
                                ></v-text-field>
                                <v-time-picker
                                  v-model="form3.wednesday.close.time"
                                  format="24hr"
                                  autosave
                                ></v-time-picker>
                              </v-menu>
                            </v-flex>
                          </v-layout>
                          <v-layout row wrap align-center>
                            <v-flex>
                              <v-switch
                                class="pt-0"
                                v-model="form3.thursday.status"
                                color="primary"
                              ></v-switch>
                            </v-flex>
                            <v-flex text-md-left>Thursday</v-flex>
                            <v-flex md3>
                              <v-menu
                                lazy
                                :close-on-content-click="false"
                                v-model="form3.thursday.open.menu"
                                transition="scale-transition"
                                offset-y
                                :disabled="!form3.thursday.status"
                              >
                                <v-text-field
                                  v-if="form3.thursday.status"
                                  slot="activator"
                                  label="Open at"
                                  v-model="form3.thursday.open.time"
                                  :disabled="!form3.thursday.status"
                                  v-validate="'required'"
                                  :error-messages="errors.collect('form-3.Thursday Open')"
                                  data-vv-name="Thursday Open"
                                  required
                                  prepend-icon="access_time"
                                  readonly
                                ></v-text-field>
                                <v-time-picker
                                  v-model="form3.thursday.open.time"
                                  format="24hr"
                                  autosave
                                ></v-time-picker>
                              </v-menu>
                            </v-flex>

                            <v-flex md3>
                              <v-menu
                                lazy
                                :close-on-content-click="false"
                                v-model="form3.thursday.close.menu"
                                transition="scale-transition"
                                offset-y
                                :disabled="!form3.thursday.status"
                              >
                                <v-text-field
                                  v-if="form3.thursday.status"
                                  slot="activator"
                                  label="Close at"
                                  v-model="form3.thursday.close.time"
                                  :disabled="!form3.thursday.status"
                                  v-validate="'required'"
                                  :error-messages="errors.collect('form-3.Thursday Close')"
                                  data-vv-name="Thursday Close"
                                  required
                                  prepend-icon="access_time"
                                  readonly
                                ></v-text-field>
                                <v-time-picker
                                  v-model="form3.thursday.close.time"
                                  format="24hr"
                                  autosave
                                ></v-time-picker>
                              </v-menu>
                            </v-flex>
                          </v-layout>
                          <v-layout row wrap align-center>
                            <v-flex>
                              <v-switch class="pt-0" v-model="form3.friday.status" color="primary"></v-switch>
                            </v-flex>
                            <v-flex text-md-left>Friday</v-flex>
                            <v-flex md3>
                              <v-menu
                                lazy
                                :close-on-content-click="false"
                                v-model="form3.friday.open.menu"
                                transition="scale-transition"
                                offset-y
                                :disabled="!form3.friday.status"
                              >
                                <v-text-field
                                  v-if="form3.friday.status"
                                  slot="activator"
                                  label="Open at"
                                  v-model="form3.friday.open.time"
                                  :disabled="!form3.friday.status"
                                  v-validate="'required'"
                                  :error-messages="errors.collect('form-3.Friday Open')"
                                  data-vv-name="Friday Open"
                                  required
                                  prepend-icon="access_time"
                                  readonly
                                ></v-text-field>
                                <v-time-picker
                                  v-model="form3.friday.open.time"
                                  format="24hr"
                                  autosave
                                ></v-time-picker>
                              </v-menu>
                            </v-flex>

                            <v-flex md3>
                              <v-menu
                                lazy
                                :close-on-content-click="false"
                                v-model="form3.friday.close.menu"
                                transition="scale-transition"
                                offset-y
                                :disabled="!form3.friday.status"
                              >
                                <v-text-field
                                  v-if="form3.friday.status"
                                  slot="activator"
                                  label="Close at"
                                  v-model="form3.friday.close.time"
                                  :disabled="!form3.friday.status"
                                  v-validate="'required'"
                                  :error-messages="errors.collect('form-3.Friday Close')"
                                  data-vv-name="Friday Close"
                                  required
                                  prepend-icon="access_time"
                                  readonly
                                ></v-text-field>
                                <v-time-picker
                                  v-model="form3.friday.close.time"
                                  format="24hr"
                                  autosave
                                ></v-time-picker>
                              </v-menu>
                            </v-flex>
                          </v-layout>

                          <v-layout row wrap align-center>
                            <v-flex>
                              <v-switch
                                class="pt-0"
                                v-model="form3.saturday.status"
                                color="primary"
                              ></v-switch>
                            </v-flex>
                            <v-flex text-md-left>Saturday</v-flex>
                            <v-flex md3>
                              <v-menu
                                lazy
                                :close-on-content-click="false"
                                v-model="form3.saturday.open.menu"
                                transition="scale-transition"
                                offset-y
                                :disabled="!form3.saturday.status"
                              >
                                <v-text-field
                                  v-if="form3.saturday.status"
                                  slot="activator"
                                  label="Open at"
                                  v-model="form3.saturday.open.time"
                                  :disabled="!form3.saturday.status"
                                  v-validate="'required'"
                                  :error-messages="errors.collect('form-3.Saturday Open')"
                                  data-vv-name="Saturday Open"
                                  required
                                  prepend-icon="access_time"
                                  readonly
                                ></v-text-field>
                                <v-time-picker
                                  v-model="form3.saturday.open.time"
                                  format="24hr"
                                  autosave
                                ></v-time-picker>
                              </v-menu>
                            </v-flex>

                            <v-flex md3>
                              <v-menu
                                lazy
                                :close-on-content-click="false"
                                v-model="form3.saturday.close.menu"
                                transition="scale-transition"
                                offset-y
                                :disabled="!form3.saturday.status"
                              >
                                <v-text-field
                                  v-if="form3.saturday.status"
                                  slot="activator"
                                  label="Close at"
                                  v-model="form3.saturday.close.time"
                                  :disabled="!form3.saturday.status"
                                  v-validate="'required'"
                                  :error-messages="errors.collect('form-3.Saturday Close')"
                                  data-vv-name="Saturday Close"
                                  required
                                  prepend-icon="access_time"
                                  readonly
                                ></v-text-field>
                                <v-time-picker
                                  v-model="form3.saturday.close.time"
                                  format="24hr"
                                  autosave
                                ></v-time-picker>
                              </v-menu>
                            </v-flex>
                          </v-layout>

                          <v-layout row wrap align-center>
                            <v-flex>
                              <v-switch class="pt-0" v-model="form3.sunday.status" color="primary"></v-switch>
                            </v-flex>
                            <v-flex text-md-left>Sunday</v-flex>
                            <v-flex md3>
                              <v-menu
                                lazy
                                :close-on-content-click="false"
                                v-model="form3.sunday.open.menu"
                                transition="scale-transition"
                                offset-y
                                :disabled="!form3.sunday.status"
                              >
                                <v-text-field
                                  v-if="form3.sunday.status"
                                  slot="activator"
                                  label="Open at"
                                  v-model="form3.sunday.open.time"
                                  :disabled="!form3.sunday.status"
                                  v-validate="'required'"
                                  :error-messages="errors.collect('form-3.Sunday Open')"
                                  data-vv-name="Sunday Open"
                                  required
                                  prepend-icon="access_time"
                                  readonly
                                ></v-text-field>
                                <v-time-picker
                                  v-model="form3.sunday.open.time"
                                  format="24hr"
                                  autosave
                                ></v-time-picker>
                              </v-menu>
                            </v-flex>

                            <v-flex md3>
                              <v-menu
                                lazy
                                :close-on-content-click="false"
                                v-model="form3.sunday.close.menu"
                                transition="scale-transition"
                                offset-y
                                :disabled="!form3.sunday.status"
                              >
                                <v-text-field
                                  v-if="form3.sunday.status"
                                  slot="activator"
                                  label="Close at"
                                  v-model="form3.sunday.close.time"
                                  :disabled="!form3.sunday.status"
                                  v-validate="'required'"
                                  :error-messages="errors.collect('form-3.Sunday Close')"
                                  data-vv-name="Sunday Close"
                                  required
                                  prepend-icon="access_time"
                                  readonly
                                ></v-text-field>
                                <v-time-picker
                                  v-model="form3.sunday.close.time"
                                  format="24hr"
                                  autosave
                                ></v-time-picker>
                              </v-menu>
                            </v-flex>
                          </v-layout>
                        </v-card-text>

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
              <v-form @submit.prevent="settings('form-4')" data-vv-scope="form-4">
                <v-list subheader>
                  <v-subheader class>General Settings</v-subheader>

                  <v-list-tile avatar>
                    <v-list-tile-content>
                      <v-list-tile-title>Profile</v-list-tile-title>
                      <v-list-tile-sub-title>People can't find inactive profile</v-list-tile-sub-title>
                    </v-list-tile-content>

                    <v-list-tile-action>
                      <v-switch v-model="status"></v-switch>
                    </v-list-tile-action>
                  </v-list-tile>

                  <v-list-tile avatar>
                    <v-list-tile-content>
                      <v-list-tile-title>Email</v-list-tile-title>
                      <v-list-tile-sub-title>Allow email enquiry</v-list-tile-sub-title>
                    </v-list-tile-content>

                    <v-list-tile-action>
                      <v-switch v-model="enquiry"></v-switch>
                    </v-list-tile-action>
                  </v-list-tile>

                  <v-list-tile avatar>
                    <v-list-tile-content>
                      <v-list-tile-title>Phone/SMS</v-list-tile-title>
                      <v-list-tile-sub-title>Allow mobile message</v-list-tile-sub-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                      <v-switch v-model="message"></v-switch>
                    </v-list-tile-action>
                  </v-list-tile>
                </v-list>

                <v-divider></v-divider>

                <v-subheader class>Accept Payment</v-subheader>
                <v-flex class="pl-3">
                  <v-layout row wrap>
                    <v-flex xs12 sm4 md2>
                      <v-checkbox v-model="cash" label="Cash" hide-details></v-checkbox>
                    </v-flex>
                    <v-flex xs12 sm4 md4>
                      <v-checkbox v-model="transfer" label="Transfer (NEFT/RTGS)" hide-details></v-checkbox>
                    </v-flex>
                    <v-flex xs12 sm4 md3>
                      <v-checkbox v-model="credit_card" label="Credit/Debit Card" hide-details></v-checkbox>
                    </v-flex>
                    <v-flex xs12 sm4 md3>
                      <v-checkbox v-model="cheque" label="Cheque" hide-details></v-checkbox>
                    </v-flex>
                  </v-layout>
                </v-flex>

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
              </v-form>
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
      if (res.data.node != null) {
        return {
          profilemageUrl: res.data.node.profileImage,
          coverimageUrl: res.data.node.coverImage
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
      dialog: true,
      active: true,
      title: 'Choose Location',
      id: null,
      scales: [],
      entities: [],

      coverName: '',
      coverimageFile: '',

      status: false,
      enquiry: false,
      message: false,

      cash: false,
      cheque: false,
      credit_card: false,
      transfer: false,

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
        google: '',

        monday: {
          open: {
            menu: false,
            time: null
          },
          close: {
            menu: false,
            time: null
          },
          status: false
        },

        tuesday: {
          open: {
            menu: false,
            time: null
          },
          close: {
            menu: false,
            time: null
          },
          status: false
        },

        wednesday: {
          open: {
            menu: false,
            time: null
          },
          close: {
            menu: false,
            time: null
          },
          status: false
        },

        thursday: {
          open: {
            menu: false,
            time: null
          },
          close: {
            menu: false,
            time: null
          },
          status: false
        },

        friday: {
          open: {
            menu: false,
            time: null
          },
          close: {
            menu: false,
            time: null
          },
          status: false
        },

        saturday: {
          open: {
            menu: false,
            time: null
          },
          close: {
            menu: false,
            time: null
          },
          status: false
        },

        sunday: {
          open: {
            menu: false,
            time: null
          },
          close: {
            menu: false,
            time: null
          },
          status: false
        }
      }),

      text:
        'Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure nec cu, alienum argumentum ius ad. Pri eu justo aeque torquatos.',
      text_short:
        'Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea.'
    }
  },

  methods: {
    //Cover Image
    coverFile() {
      this.$refs.cover_file.click()
    },
    onCoverFile(e) {
      const files = e.target.files
      if (files[0] !== undefined) {
        this.coverName = files[0].name
        if (this.coverName.lastIndexOf('.') <= 0) {
          return
        }
        const fr = new FileReader()
        fr.readAsDataURL(files[0])
        fr.addEventListener('load', () => {
          this.coverimageUrl = fr.result
          this.coverimageFile = files[0]
          this.update_image(this.coverimageFile)
        })
      } else {
        this.coverName = ''
        this.coverimageFile = ''
        this.coverimageUrl = ''
      }
    },

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
          this.update_image(this.form.profileimageFile)
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

    async update_image(e) {
      this.dialog = true
      let formData = new FormData()
      if (this.coverName.length != 0) {
        formData.append('coverimage', e)
      }
      if (this.form.profileName.length != 0) {
        formData.append('profileimage', e)
      }

      this.$axios.post(`business/update`, formData).then(response => {
        this.dialog = false
        swal.fire({
          title: 'Profile image updated successfully',
          type: 'success',
          animation: true,
          showCloseButton: true
        })
      })
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
      formData.append('day', 'none')

      this.$validator.validateAll().then(result => {
        if (result) {
          if (this.id == null) {
            this.dialog = false
            swal.fire({
              title: 'Choose Location!',
              type: 'warning',
              animation: true,
              showCloseButton: true
            })
          } else {
            this.$axios.post(`business/update`, formData).then(response => {
              this.dialog = false
              swal.fire({
                title: 'Business Updated Successfully',
                type: 'success',
                animation: true,
                showCloseButton: true
              })
            })
          }
        } else {
          this.dialog = false
        }
      })
    },

    /*About*/
    async about(scope) {
      let formData = new FormData()
      formData.append('description', this.form2.description)
      formData.append('day', 'none')

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

      formData.append('day[]', 'monday')
      formData.append('hourstatus[]', this.form3.monday.status)
      formData.append('open[]', this.form3.monday.open.time)
      formData.append('close[]', this.form3.monday.close.time)

      formData.append('day[]', 'tuesday')
      formData.append('hourstatus[]', this.form3.tuesday.status)
      formData.append('open[]', this.form3.tuesday.open.time)
      formData.append('close[]', this.form3.tuesday.close.time)

      formData.append('day[]', 'wednesday')
      formData.append('hourstatus[]', this.form3.wednesday.status)
      formData.append('open[]', this.form3.wednesday.open.time)
      formData.append('close[]', this.form3.wednesday.close.time)

      formData.append('day[]', 'thursday')
      formData.append('hourstatus[]', this.form3.thursday.status)
      formData.append('open[]', this.form3.thursday.open.time)
      formData.append('close[]', this.form3.thursday.close.time)

      formData.append('day[]', 'friday')
      formData.append('hourstatus[]', this.form3.friday.status)
      formData.append('open[]', this.form3.friday.open.time)
      formData.append('close[]', this.form3.friday.close.time)

      formData.append('day[]', 'saturday')
      formData.append('hourstatus[]', this.form3.saturday.status)
      formData.append('open[]', this.form3.saturday.open.time)
      formData.append('close[]', this.form3.saturday.close.time)

      formData.append('day[]', 'sunday')
      formData.append('hourstatus[]', this.form3.sunday.status)
      formData.append('open[]', this.form3.sunday.open.time)
      formData.append('close[]', this.form3.sunday.close.time)

      this.$validator.validateAll(scope).then(result => {
        if (result) {
          this.snackbar = true
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

    /*Settings*/

    async settings(scope) {
      //this.dialog = true;

      let formData = new FormData()
      if (this.status == false) {
        formData.append('status', 'unpublish')
      } else {
        formData.append('status', 'publish')
      }

      formData.append('emailenquiry', this.enquiry)
      formData.append('phonemessage', this.message)
      formData.append('day', 'none')

      formData.append('accept_payment', true)
      if (this.cash == true) {
        formData.append('payment[]', 1)
      }
      if (this.transfer == true) {
        formData.append('payment[]', 2)
      }
      if (this.credit_card == true) {
        formData.append('payment[]', 3)
      }
      if (this.cheque == true) {
        formData.append('payment[]', 4)
      }
      this.$validator.validateAll(scope).then(result => {
        if (result) {
          this.$axios.post(`business/update`, formData).then(response => {
            this.dialog = false
            swal.fire({
              title: 'Settings Updated Successfully',
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

    async delete_business() {
      swal
        .fire({
          title: 'Are You Sure',
          type: 'warning',
          animation: true,
          showCloseButton: true,
          showCancelButton: true
        })
        .then(result => {
          if (result.value) {
            this.$axios.post(`delete-business`).then(response => {
              this.dialog = true
              this.$root.$router.push({ path: '/business/create' })
            })
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

      /*Monday*/
      if (response.data.working_hours != null) {
        if (response.data.working_hours[0].status == 'true') {
          this.form3.monday.status = response.data.working_hours[0].status
          this.form3.monday.open.time = response.data.working_hours[0].open
          this.form3.monday.close.time = response.data.working_hours[0].close
        }
        /*Tuesday*/
        if (response.data.working_hours[1].status == 'true') {
          this.form3.tuesday.status = response.data.working_hours[1].status
          this.form3.tuesday.open.time = response.data.working_hours[1].open
          this.form3.tuesday.close.time = response.data.working_hours[1].close
        }
        /*Wednesday*/
        if (response.data.working_hours[2].status == 'true') {
          this.form3.wednesday.status = response.data.working_hours[2].status
          this.form3.wednesday.open.time = response.data.working_hours[2].open
          this.form3.wednesday.close.time = response.data.working_hours[2].close
        }
        /*Thursday*/
        if (response.data.working_hours[3].status == 'true') {
          this.form3.thursday.status = response.data.working_hours[3].status
          this.form3.thursday.open.time = response.data.working_hours[3].open
          this.form3.thursday.close.time = response.data.working_hours[3].close
        }
        /*Friday*/
        if (response.data.working_hours[4].status == 'true') {
          this.form3.friday.status = response.data.working_hours[4].status
          this.form3.friday.open.time = response.data.working_hours[4].open
          this.form3.friday.close.time = response.data.working_hours[4].close
        }
        /*Saturday*/
        if (response.data.working_hours[5].status == 'true') {
          this.form3.saturday.status = response.data.working_hours[5].status
          this.form3.saturday.open.time = response.data.working_hours[5].open
          this.form3.saturday.close.time = response.data.working_hours[5].close
        }
        /*Sunday*/
        if (response.data.working_hours[6].status == 'true') {
          this.form3.sunday.status = response.data.working_hours[6].status
          this.form3.sunday.open.time = response.data.working_hours[6].open
          this.form3.sunday.close.time = response.data.working_hours[6].close
        }
      }

      /*Settings*/

      if (response.data.node.status == 'publish') {
        this.status = true
      } else {
        this.status = false
      }

      if (response.data.node.email_enquiry == 'false') {
        this.enquiry = false
      }
      if (response.data.node.email_enquiry == 'true') {
        this.enquiry = true
      }

      if (response.data.node.phone_message == 'false') {
        this.message = false
      }
      if (response.data.node.phone_message == 'true') {
        this.message = true
      }

      if (response.data.payment_accept[0] == true) {
        this.cash = true
      }
      if (response.data.payment_accept[1] == true) {
        this.transfer = true
      }
      if (response.data.payment_accept[2] == true) {
        this.credit_card = true
      }
      if (response.data.payment_accept[3] == true) {
        this.cheque = true
      }

      this.dialog = false
    })
  }
}
</script>
