<template>
  <v-layout row wrap>
    <v-card flat v-for="item in this.products" :key="item" class="mb-3">
      <v-layout row wrap>
        <v-flex xs5>
           <nuxt-link :to="'/browse/product/'+ item.slug">
          <v-img :src="item.image" contain></v-img>
           </nuxt-link>
        </v-flex>
        <v-flex xs7>
          <v-card-actions class="text-muted caption">Before 3 min ago</v-card-actions>

          <v-card-text class="pa-2">
            <nuxt-link  class="subheading font-weight-medium" :to="{path: '/browse/product/'+item.slug}">
              {{ item.title }}</nuxt-link>
            <div
              class="text-muted"
            >{{ item.description }}</div>
          </v-card-text>
        </v-flex>
      </v-layout>
      <v-divider light></v-divider>
    </v-card>
  </v-layout>
</template>
<script>
export default {
  props: {
    limit: Number
  },

  data() {
    return {
      products: []
    }
  },

  mounted() {
    this.$axios.get('get-recent-products/' + this.$props.limit).then(response => {
      this.products = response.data
    })
  }
}
</script>
