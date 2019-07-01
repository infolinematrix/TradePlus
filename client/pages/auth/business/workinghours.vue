<template>
  <v-layout row wrap>
    <v-toolbar flat>
      <v-toolbar-title class="title-2">About your business</v-toolbar-title>
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
              <v-textarea
          outline
          counter="2500"
          name="input-7-4"
          height="400"
          label="Tel us something about your business"
          value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
        ></v-textarea>
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

