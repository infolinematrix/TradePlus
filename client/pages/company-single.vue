<template>
  <v-container grid-list-lg>
    <v-layout row wrap>
      <v-flex md8 xs12>
        <v-card flat>
          <v-img src="/cover.jpg" alt="Company Cover Photo">
            <v-layout column fill-height>
              <v-card-title>
                <v-btn dark icon>
                  <span>
                    <input type="file" ref="cover_file" style="display: none" />
                    <v-icon dark>camera_alt</v-icon>
                  </span>
                </v-btn>
              </v-card-title>
            </v-layout>
          </v-img>
        </v-card>

        <v-toolbar flat extended dense>
          <v-avatar size="125" tile="false">
            <v-img src="logo.png" alt="Company Logo"></v-img>
          </v-avatar>

          <v-sheet class="mt-5 ml-3">
            <h1 class="title font-weight-bold">Matrix Infoline Private Limited</h1>
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
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum maiores modi quidem veniam, expedita quis laboriosam, ullam facere adipisci, iusto, voluptate sapiente corrupti asperiores rem nemo numquam fuga ab at.</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum maiores modi quidem veniam, expedita quis laboriosam, ullam facere adipisci, iusto, voluptate sapiente corrupti asperiores rem nemo numquam fuga ab at.</p>
            </div>
          </template>
        </v-card-text>

        <v-card-text>
          <v-layout row wrap>
            <v-flex md6 xs12>
              <v-sheet class="bordered pa-3 mb-3 bg-white">
                <h4>Location</h4>One line message text string with two actions on tablet / Desktop
              </v-sheet>

              <v-sheet class="bordered pa-3 mb-3 bg-white">
                <h4>Credentials</h4>One line message text string with two actions on tablet / Desktop
              </v-sheet>

              <v-sheet class="bordered pa-3 bg-white">
                <h4>Payment methods</h4>One line message text string with two actions on tablet / Desktop
              </v-sheet>
            </v-flex>
            <v-flex md6 xs12>
              <v-sheet class="pa-3 mb-3 bg-white bordered">
                <h4>
                  <v-icon>home</v-icon>Working hours
                </h4>
                <v-layout>
                  <v-flex class="pb-0">Monday</v-flex>
                  <v-flex class="pb-0 text-right">8.00am to 8.00pm</v-flex>
                  <v-flex class="blue--text pb-0 text-right">Open</v-flex>
                </v-layout>
                <v-layout>
                  <v-flex class="pb-0">Tuesday</v-flex>
                  <v-flex class="pb-0 text-right">8.00am to 8.00pm</v-flex>
                  <v-flex class="blue--text pb-0 text-right">Open</v-flex>
                </v-layout>
                <v-layout>
                  <v-flex class="pb-0">Wednesday</v-flex>
                  <v-flex class="pb-0 text-right">8.00am to 8.00pm</v-flex>
                  <v-flex class="blue--text pb-0 text-right">Open</v-flex>
                </v-layout>
                <v-layout>
                  <v-flex class="pb-0">Thursday</v-flex>
                  <v-flex class="pb-0 text-right">8.00am to 8.00pm</v-flex>
                  <v-flex class="blue--text pb-0 text-right">Open</v-flex>
                </v-layout>
                <v-layout>
                  <v-flex class="pb-0">Friday</v-flex>
                  <v-flex class="pb-0 text-right">8.00am to 8.00pm</v-flex>
                  <v-flex class="blue--text pb-0 text-right">Open</v-flex>
                </v-layout>
                <v-layout>
                  <v-flex class="pb-0">Saturday</v-flex>
                  <v-flex class="pb-0 text-right">8.00am to 8.00pm</v-flex>
                  <v-flex class="blue--text pb-0 text-right">Open</v-flex>
                </v-layout>
                <v-layout>
                  <v-flex class="pb-0">Sunday</v-flex>
                  <v-flex class="pb-0 text-right">8.00am to 8.00pm</v-flex>
                  <v-flex class="blue--text pb-0 text-right">Open</v-flex>
                </v-layout>
              </v-sheet>
            </v-flex>
          </v-layout>
        </v-card-text>

        <v-card-text>
          <v-sheet class="bordered">
            <v-form @submit.prevent="quotation" ref="form">
              <v-container grid-list-lg class="bg-light-blue">
                <v-subheader class="black--text title-2 pl-0">Contact us</v-subheader>

                <v-layout row wrap>
                  <v-flex md6>
                    <v-text-field
                      :counter="25"
                      v-model="form.first_name"
                      label="First Name"
                      :rules="firstnameRules"
                      required
                    ></v-text-field>
                  </v-flex>
                  <v-flex md6>
                    <v-text-field
                      :counter="25"
                      v-model="form.last_name"
                      label="Last Name"
                      :rules="lastnameRules"
                      required
                    ></v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex md6>
                    <v-text-field
                      label="Contact no"
                      v-model="form.contact"
                      :rules="contactRules"
                      required
                    ></v-text-field>
                  </v-flex>

                  <v-flex md6>
                    <v-text-field label="Email" v-model="form.email" :rules="emailRules" required></v-text-field>
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
                    type="submit"
                  >Send</v-btn>
                </v-layout>
              </v-container>
            </v-form>
          </v-sheet>
        </v-card-text>
      </v-flex>
      <v-flex md4 xs12>
        <v-sheet class="bordered">
          <v-form @submit.prevent="quotation" ref="form">
            <v-container grid-list-lg class="bg-light-blue">
              <v-subheader class="black--text title-2 pl-0">Contact Supplier</v-subheader>

              <v-layout row wrap>
                <v-flex md6>
                  <v-text-field
                    :counter="25"
                    v-model="form.first_name"
                    label="First Name"
                    :rules="firstnameRules"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex md6>
                  <v-text-field
                    :counter="25"
                    v-model="form.last_name"
                    label="Last Name"
                    :rules="lastnameRules"
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>

              <v-text-field label="Email" v-model="form.email" :rules="emailRules" required></v-text-field>

              <v-layout row wrap>
                <v-flex md12>
                  <v-text-field
                    label="Contact no"
                    v-model="form.contact"
                    :rules="contactRules"
                    required
                  ></v-text-field>
                </v-flex>



                <v-flex md12>
                  <v-textarea outlined label="Message" v-model="form.message" :rules="messageRules"></v-textarea>
                </v-flex>

                <v-btn
                  depressed
                  color="primary"
                  @click="loader = 'loading'"
                  :loading="loading"
                  :disabled="loading"
                  type="submit"
                >Send</v-btn>
              </v-layout>
            </v-container>
          </v-form>
        </v-sheet>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import Form from 'vform'
export default {
  data() {
    return {
      infobox: true,
      /*Rules*/
      firstnameRules: [v => !!v || 'First Name is required'],
      lastnameRules: [v => !!v || 'Last Name is required'],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      contactRules: [v => !!v || 'Contact is required'],
      quantityRules: [v => !!v || 'Quantity is required'],
      messageRules: [v => !!v || 'Message is required'],
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
      })
    }
  }
}
</script>
