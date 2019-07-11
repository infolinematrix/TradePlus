<template>
  <v-layout align-center justify-center row fill-height>
    <v-flex xs12 md6>
      <v-card flat>
        <v-card-title>
          <div>
            <h3 class="headline">Create your service</h3>
            <div class="text-muted">{{ text_short }}</div>
          </div>
        </v-card-title>

        <v-container grid-list-md class="pa-3">
          <form action>
            <v-layout row wrap>
              <v-flex xs12>
                <v-text-field label="Title" placeholder="What service you provide?" outline></v-text-field>
              </v-flex>
            </v-layout>

<v-layout row wrap>
              <v-flex xs12>
                <v-select
                  v-model="select"
                  :items="categories"
                  label="Select category"
                  outline
                  item-text="state"
                  item-value="abbr"
                ></v-select>
              </v-flex>
            </v-layout>

            <v-flex xs12>
              <v-checkbox v-model="chkbox" label="I agree"></v-checkbox>
            </v-flex>

            <v-card-actions class="pa-0">
              <v-btn large depressed color="primary">Validate</v-btn>
            </v-card-actions>
          </form>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      chkbox:true,
      select: { state: 'Florida', abbr: 'FL' },
      categories: [
        { state: 'Florida', abbr: 'FL' },
        { state: 'Georgia', abbr: 'GA' },
        { state: 'Nebraska', abbr: 'NE' },
        { state: 'California', abbr: 'CA' },
        { state: 'New York', abbr: 'NY' }
      ],
      text:
        'Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure nec cu, alienum argumentum ius ad. Pri eu justo aeque torquatos.',
      text_short:
        'Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea.'
    }
  }
}
</script>
