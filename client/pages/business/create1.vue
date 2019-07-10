<template>
  <v-layout align-center justify-center row fill-height>
    <v-flex xs12 md6>
      <v-card flat>
        <v-card-title>
          <div>
            <h3 class="headline">Regiaster you Business</h3>
            <div class="text-muted">{{ text_short }}</div>
          </div>
        </v-card-title>

        <v-container grid-list-md class="pa-3">
          <v-flex xs12>
            <v-radio-group v-model="type" row>
              <v-radio label="Yes, I have physical products" value="product"></v-radio>
              <v-radio label="I provide professional service" value="service"></v-radio>
            </v-radio-group>
          </v-flex>

          <v-card-actions class="pa-0">
            <v-btn large depressed color="primary" @click="goNext()">Next</v-btn>
          </v-card-actions>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      type: 'product',

      agree: true,
      text:
        'Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure nec cu, alienum argumentum ius ad. Pri eu justo aeque torquatos.',
      text_short:
        'Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea.'
    }
  },

  methods: {
    goNext() {
      if (this.type == 'product') {
        this.$router.push('/business/create');
      } else {
        this.$router.push('/business/service');
      }
    }
  }
}
</script>
