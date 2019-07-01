<template>
  <v-layout row wrap>
    <v-toolbar flat>
      <v-toolbar-title class="title-2">Business Location</v-toolbar-title>
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
              <v-text-field count:80 label="Address" outline></v-text-field>
            </v-flex>
          </v-layout>

          <v-layout row wrap>
            <v-flex xs6 md6 sm6>
              <v-select
                label="How you accept Payment?"
                outline
              ></v-select>
            </v-flex>
            <v-flex xs6 sm6 md6>
              <v-text-field count:80 label="Phone No" outline></v-text-field>
            </v-flex>
          </v-layout>

          <v-layout row wrap>
            <v-flex xs6 md6 sm6>
              <v-text-field count:80 label="Business Email" outline></v-text-field>
            </v-flex>
            <v-flex xs6 sm6 md6>
              <v-text-field count:80 label="Toll Free" outline></v-text-field>
            </v-flex>
          </v-layout>



          <v-layout row wrap>
            <v-flex>
              <v-checkbox label="I hereby declare all the information is correct" required></v-checkbox>
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

