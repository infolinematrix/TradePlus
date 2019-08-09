<template>
  <v-layout row wrap>
    <v-flex>
      <v-toolbar flat dense class="transparent" style="height:40px">
        <v-toolbar-title class>
          <h1 class="body-1 font-weight-bold">Cardiology Specialist in Canada</h1>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <span class="text-right mt-4">
          <requirement-popup></requirement-popup>
        </span>
      </v-toolbar>

      <v-container fluid grid-list-sm class="pa-0 pl-3 border-bottom">
        <v-breadcrumbs :items="breadcrumbs" class="pl-0 pt-0 mt-0">
          <template v-slot:divider>
            <v-icon>chevron_right</v-icon>
          </template>
        </v-breadcrumbs>
      </v-container>

      <v-container fluid grid-list-sm class="pa-2">
        <v-layout row wrap>
          <v-flex md6 xs12 v-for="r in 2" :key="r">
            <v-img
              height="200px"
              :src="`https://picsum.photos/300/200?random=${Math.floor(Math.random() * 100) + i}`"
              alt="lorem"
              class="image"
            ></v-img>
            <v-card class="elevation-1">
              <v-card-title>
                <div>
                  <nuxt-link
                    to="#"
                    class="title-2 font-weight-medium 1red--text"
                  >Best Quality mobile tempered protector</nuxt-link>
                  <div class="text-muted caption mt-2">{{text}}</div>
                </div>
              </v-card-title>

              <v-card-actions class="px-0">
                <v-list-tile class="grow">
                  <v-list-tile-avatar color="grey darken-3">
                    <v-img
                      src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                    ></v-img>
                  </v-list-tile-avatar>

                  <v-list-tile-content class="hidden-xs text-truncate">
                    <v-list-tile-title class="text-muted caption">
                      <nuxt-link
                        to="company-profile#"
                      >{{ $helpers.text_truncate('Matrix Infoline Private Limited',25) }}</nuxt-link>
                    </v-list-tile-title>
                    <div
                      class="text-muted caption"
                    >{{ $helpers.text_truncate('Siliguri, West Bengal',25) }}</div>
                  </v-list-tile-content>
                </v-list-tile>

                <v-spacer></v-spacer>
                <v-btn icon>
                  <v-icon>phone</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon>mail_outline</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>

      <v-container fluid class="pa-2">
        <v-flex v-for="i in 20" :key="i">
          <v-card class="elevation-0 mb-3">
            <v-card-text class="pb-0">
              <h2 class="title-2 font-weight-medium">{{req_title}}</h2>
              <h3 class="body-1 mt-2 font-weight-light">{{ req_description}}</h3>
            </v-card-text>
            <v-card-actions class="px-0">
              <v-list-tile class="grow">
                <v-list-tile-content class="hidden-xs text-truncate">
                  <v-list-tile-title class="text-muted caption">
                    <nuxt-link
                      to="company-profile#"
                    >{{ $helpers.text_truncate('Matrix Infoline Private Limited',100) }}</nuxt-link>
                  </v-list-tile-title>
                  <div
                    class="text-muted caption"
                  >{{ $helpers.text_truncate('Siliguri, West Bengal',100) }}</div>
                </v-list-tile-content>
              </v-list-tile>

              <v-btn depressed @click.stop="show_dialog(req_id,req_title,req_description)">
                <v-icon class="mr-3">phone</v-icon>Send Quote
              </v-btn>
            </v-card-actions>
          </v-card>
          <v-divider></v-divider>
        </v-flex>
      </v-container>
    </v-flex>

    <!-- DIALOG -->
    <v-dialog v-model="quote_dialog" persistent max-width="490">
      <v-card>
        <v-card-title class="headline">Send Quote</v-card-title>

        <v-card-text class="pt-0">
          <div class="body-1 font-weight-medium">{{ req_title }}</div>
          <div class="grey--text">{{ req_description }}</div>
        </v-card-text>

        <v-card-text class="pt-0">
          <v-textarea
          name="input-7-1"
          label="Message"
          value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
          hint="Your message"
        ></v-textarea>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" flat="flat" @click=close_dialog>Cancel</v-btn>

          <v-btn color="green darken-1" flat="flat" @click=close_dialog>Post</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
import RequirementPopup from '~/components/RequirementPopup.vue'
export default {
  layout: 'explore',

  components: {
    'requirement-popup': RequirementPopup,
  },

  data: () => ({
    quote_dialog: false,

    req_id: 54,
    req_title: 'Plastic Bottle, Best price gurentee',
    req_description:
      'If for some reason you are unable to use the activator slot, be sure to add the .stop modifier to the event that triggers the dialog.',

    breadcrumbs: [
      {
        text: 'Home',
        disabled: false,
        href: '/'
      },
      {
        text: 'Link 1',
        disabled: false,
        href: 'breadcrumbs_link_1'
      },
      {
        text: 'Link 2',
        disabled: true,
        href: 'breadcrumbs_link_2'
      }
    ]
  }),

  methods: {
    show_dialog(id, title, description) {
      this.quote_dialog = true
    },
    close_dialog() {
      this.quote_dialog = false
    }
  }
}
</script>
