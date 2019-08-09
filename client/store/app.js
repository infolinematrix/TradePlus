// state
const state = () => ({

  location: {
    "id": 101,
    "title": "India",
    "slug": "india"
  },

  category: {
    "id": 101,
    "title": "Clothing",
    "slug": "clothing"
  },
  settings: [],
})

// getters
const getters = {
  settings: state => state.settings,
  location: state => state.location,
  category: state => state.category,
}

// mutation
const mutations = {
  set_settings(state, payload) {
    state.settings = payload
  },

  SET_LOCATION (state, payload) {
    state.location = payload
  },

  SET_CATEGORY (state, payload) {
    state.category = payload
  },
}

// actions
const actions = {
  updateSettings(context) {
    this.$axios.get("settings").then(response => {
      context.commit('set_settings', response.data)
    });

  },

  set_location (context, params) {

    this.$axios.get("location/"+params).then(response => {
      console.log(response.data);
      context.commit('SET_LOCATION', response.data)
    });
  },

  set_category (context, params) {
    this.$axios.get("category/"+params).then(response => {
      context.commit('SET_CATEGORY', response.data)
    });
  },

  addToCart(context, params) {
    context.commit('append', params)
  },

}



export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
