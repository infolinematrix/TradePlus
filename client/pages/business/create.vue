<template>
  <v-layout align-start justify-left row fill-height>
    <v-flex xs12 md6>
      <v-card flat>
        <v-card-title>
          <div>
            <h3 class="headline">Regiaster you Business</h3>
            <div class="text-muted">{{ text_short }}</div>
          </div>
        </v-card-title>

        <v-container grid-list-lg>
          <form>
            <v-layout row wrap>
              <v-flex xs12>
                <v-text-field label="Title" placeholder="Business title" outline></v-text-field>
              </v-flex>
            </v-layout>

            <v-layout row wrap>
              <v-flex xs12>
                <v-text-field label="Address" placeholder="Street, locality" outline></v-text-field>
              </v-flex>
              <v-flex xs12 md8>
                <v-text-field label="Locality" placeholder="Area" outline></v-text-field>
              </v-flex>
              <v-flex xs12 md4>
                <v-text-field label="Zip" placeholder="Zip" outline></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs12>
                <v-select
                  v-model="select"
                  :items="countries"
                  label="Country"
                  outline
                  item-text="state"
                  item-value="abbr"
                ></v-select>
              </v-flex>
            </v-layout>

            <v-layout row wrap>
              <v-flex xs12>
                <v-checkbox v-model="agree" label="Agree Terms &amp; Conditions"></v-checkbox>
              </v-flex>
            </v-layout>

            <v-card-actions class="pa-0">
              <v-btn large depressed color="orange">Create</v-btn>
            </v-card-actions>
          </form>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  layout: 'user',
  data() {
    return {
      agree: true,
      text:
        'Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure nec cu, alienum argumentum ius ad. Pri eu justo aeque torquatos.',
      text_short:
        'Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea.',
      countries: [
        { state: 'Florida', abbr: 'FL' },
        { state: 'Georgia', abbr: 'GA' },
        { state: 'Nebraska', abbr: 'NE' },
        { state: 'California', abbr: 'CA' },
        { state: 'New York', abbr: 'NY' }
      ],
      select: { state: 'Florida', abbr: 'FL' },
      type: { title: 'Manufacturing', id: 'FL' },
      types: [
        { title: 'Manufacturing', id: 'FL' },
        { title: 'Wholesale', id: 'FL' },
        { title: 'Retail', id: 'FL' },
        { title: 'Service provider', id: 'FL' },
        { title: 'Export/Import', id: 'FL' },
        { title: 'NGO', id: 'FL' }
      ]
    }
  }
}
</script>
