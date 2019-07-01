<template>
  <v-layout row wrap>
    <v-toolbar flat>
      <v-toolbar-title class="title-2">Profile</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-subheader>Create</v-subheader>
      <v-btn icon>
        <v-icon>apps</v-icon>
      </v-btn>
    </v-toolbar>

    <v-container grid-list-lg>
      <v-sheet height="auto" color="none">


        <v-flex xs12 md7 sm7>

          <v-layout row wrap>
            <v-flex xs12 sm12 md12>
              <v-subheader class="pl-0">Title of your Business</v-subheader>
              <v-text-field count:80 label="First Name" outline></v-text-field>
            </v-flex>
          </v-layout>

          <v-layout row wrap>
            <v-flex xs12 md12 sm12>
              <v-radio-group v-model="radios">
                <template v-slot:label>
                  <div>Your Business is based on</div>
                </template>
                <v-radio value="Google">
                  <template v-slot:label>
                    <div>
                      <strong class="primary--text">Product</strong>
                    </div>
                  </template>
                </v-radio>
                <v-radio value="Duckduckgo">
                  <template v-slot:label>
                    <div>
                      <strong class="primary--text">Services</strong>
                    </div>
                  </template>
                </v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs12 md6 sm6>
              <v-subheader class="pl-0">Title of your Business</v-subheader>
              <v-select :items="list" label="Type" outline></v-select>
            </v-flex>
          </v-layout>

          <v-layout row wrap>
            <v-flex xs12 md12 sm12>
              <v-select
                v-model="value"
                :items="payments"
                chips
                label="How you accept Payment?"
                multiple
                outline
              ></v-select>
            </v-flex>
          </v-layout>

          <v-layout row wrap>
            <v-flex>
              <v-checkbox label="Do you agree?" required></v-checkbox>
            </v-flex>
          </v-layout>

          <v-layout row wrap>
            <v-flex>
              <v-btn depressed large color="primary">Submit</v-btn>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-sheet>
    </v-container>
  </v-layout>
</template>

<script>
export default {
  layout: 'user',
  data: () => ({
    list: ['Private Limited', 'Public Limited', 'Propeitorship', 'Trust'],
    payments: ['Cash', 'Credit Card', 'Bank Transfer', 'Paypal', 'Google Pay']
  })
}
</script>

