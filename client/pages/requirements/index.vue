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
        <v-flex v-for="requirement in requirements" :key="requirement">
          <v-card class="elevation-0 mb-3">
            <v-card-text class="pb-0">

              <v-chip disabled outline small label >
                {{ requirement.category }}
              </v-chip>

              <h2 class="title-2 font-weight-medium">{{ requirement.title }}</h2>
              <h3 class="body-1 mt-2 font-weight-light">{{ requirement.description }}</h3>

            </v-card-text>
            <v-card-actions class="px-0">
              <v-list-tile class="grow">
                <v-list-tile-content class="hidden-xs text-truncate">
                  <v-list-tile-title class="caption">
                    <div>{{ requirement.name  }}</div>
                  </v-list-tile-title>
                  <div class="text-muted caption">{{ requirement.posted_on }}</div>
                </v-list-tile-content>
              </v-list-tile>

              <v-btn depressed @click.stop="show_dialog(requirement.id,requirement.title,requirement.description)">
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
       <v-form @submit.prevent="send_quote" ref="form">

      <v-card>
        <v-card-title class="headline">Send Quote</v-card-title>

        <v-card-text class="pt-0">
          <div class="body-1 font-weight-medium">{{ req_title }}</div>
          <div class="grey--text">{{ req_desc }}</div>
        </v-card-text>

        <v-card-text class="pt-0">
          <v-textarea
            name="input-7-1"
            label="Message"
            hint="Your message"
            v-model="form.description"
            :rules="messageRules"
            required
          ></v-textarea>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-alert v-model="alert" dismissible type="info">{{ message }}</v-alert>

          <v-btn color="green darken-1" flat="flat" @click="close_dialog">Cancel</v-btn>

          <v-btn
              depressed 
              color="primary"
              @click="loader = 'loading'"
              :loading="loading"
              :disabled="loading" 
              type="submit" >Send
              </v-btn>
        </v-card-actions>
      </v-card>
       </v-form>
    </v-dialog>
  </v-layout>
</template>
<script>
import RequirementPopup from '~/components/RequirementPopup.vue'
export default {
  layout: 'requirement',

  components: {
    'requirement-popup': RequirementPopup
  },

 async asyncData({ $axios, params }) {
    let post = await $axios.get('requirements')
    return {
      requirements: post.data,
    }
  },
  
  data: () => ({
    quote_dialog: false,

    req_id: 0,
    req_title: null,
    req_desc: null,
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
    ],

    /*Rules*/
      messageRules: [
        v => !!v || 'Required',
      ],

      loader: null,
      loading: false,
      alert: false,
      message: null,
      form: {
        description: null,
      },

  }),

  methods: {
    show_dialog(id, title, description) {

      this.req_id = id,
      this.req_title = title,
      this.req_desc = description,  
      this.quote_dialog = true
      this.alert = false
    },
    close_dialog() {
      this.quote_dialog = false
    },

    async send_quote() {
      
      
      const l = this.loader
      this[l] = !this[l]
      
      this.dialog = true;
      let formData = new FormData();
      formData.append('req_id', this.req_id)
      formData.append('description', this.form.description)
       
        if (this.$refs.form.validate()) {
             
          this.snackbar = true
         this.$axios
            .post(`sendquotation`, formData)
            .then(response => {
         
            setTimeout(() => (
            this[l] = false,
            this.alert = true,
            this.message = 'Successfully Send....'
        ), 3500),
            this.reset();
       })

         }else{

      setTimeout(() => (
            this[l] = false,
            swal.fire({
            title: "Invalid Input!",
            type: "warning",
            animation: true,
            showCloseButton: true
            })
        ), 500)
      }
     // });
      
      },

      reset () {
        this.$refs.form.reset()
      },
  }


}
</script>
