<template>
  <v-layout row wrap>
    <v-btn depressed color="primary" class="text-capitalize" @click.stop="dialog = true">Post Requirement</v-btn>

    <v-dialog v-model="dialog" persistent max-width="550" >

        <v-card flat >
          <v-toolbar flat>
            <v-toolbar-title>What are you looking for?</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn icon @click="dialog = false">
              <v-icon>close</v-icon>
            </v-btn>
          </v-toolbar>



<v-container grid-list-md class="pa-2" >
          <v-card-text>

<small
              class="caption lh1 grey--text"
            >Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</small>

            <v-layout wrap>
              <v-flex xs12 sm12 md12>
                <v-text-field label="Type your requirement*" required :counter="100"></v-text-field>
              </v-flex>

              <v-flex xs12 sm12 md12>
                <v-textarea
                  name="input-7-1"
                  label="Default style"
                  value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
                  hint="Hint text"
                  :counter="250"
                ></v-textarea>
              </v-flex>
            </v-layout>
          </v-card-text>

          <v-card-text class="bg-light">
            <h3>Your information</h3>
            <v-layout row wrap>
              <v-flex xs12 sm6 md6>
                <v-text-field label="First name*"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-text-field
                  label="Last name*"
                  hint="example of persistent helper text"
                  persistent-hint
                  required
                ></v-text-field>
              </v-flex>

              <v-flex xs12 sm6 md6>
                <v-text-field label="Email*" required></v-text-field>
              </v-flex>

              <v-flex xs12 sm6 md6>
                <v-text-field label="Phone no*" required></v-text-field>
              </v-flex>
            </v-layout>
          </v-card-text>
</v-container>
          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn depressed text @click="dialog = false">Cancel</v-btn>

            <v-btn depressed color="green darken-1" dark text @click="dialog = false">Agree</v-btn>
          </v-card-actions>
        </v-card>

    </v-dialog>
  </v-layout>
</template>
<script>
export default {
  data() {
    return {
      dialog: false
    }
  }
}
</script>
