<template>
  <v-layout align-center justify-center row fill-height>
    <v-flex xs12 md6>
      <v-card flat>
        <v-card-title>
          <div>
            <h3 class="headline">Update service</h3>
            <div class="text-muted">{{ text_short }}</div>
          </div>
        </v-card-title>

        <v-container grid-list-md class="pa-3">
          <v-tabs height="60" v-model="active" color="grey lighten-3" slider-color="yellow">
            <v-tab ripple>Basic</v-tab>
            <v-tab ripple>Image</v-tab>
            <v-tab ripple>Settings</v-tab>

            <v-tab-item class="pl-0 pr-0 bg-light">
              <v-img
                :aspect-ratio="16/9"
                src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
              >
                <v-layout pa-2 column fill-height class="lightbox white--text">
                  <v-spacer></v-spacer>
                  <v-flex shrink>
                    <v-btn icon>
                      <v-icon color="primary">camera_enhance</v-icon>
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-img>
              <v-card flat>
                <v-card-text>
                  <div class="text-muted">{{ text_short }}</div>
                </v-card-text>
                <v-card-text>
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

                    <v-layout row wrap>
                      <v-flex xs12>
                        <v-textarea
                          outline
                          name="input-7-4"
                          label="Outline textarea"
                          value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
                        ></v-textarea>
                      </v-flex>
                    </v-layout>
                    <v-flex xs12>
                      <v-checkbox v-model="chkbox" label="I agree"></v-checkbox>
                    </v-flex>

                    <v-card-actions class="pa-0">
                      <v-btn large depressed color="primary">Update</v-btn>
                    </v-card-actions>
                  </form>
                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item class="pl-0 pr-0">
              <v-card flat>
                <v-card-text>{{ text_short }}</v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs>
        </v-container>
      </v-card>
    </v-flex>
    <v-flex xs12 md4 offset-md1>
<v-layout align-start row fill-height>
  sdsfd
</v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  layout:'user',
  data() {
    return {
      chkbox: true,
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
