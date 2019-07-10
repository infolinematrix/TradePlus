// state
const state = () => ({
  filter: {
    category: {"id":100,"parent_id":null,"source_id":200,"title":"Services","slug":"services"},
    location: {"id":101,"parent_id":null,"source_id":201,"title":"Siliguri","slug":"siliguri"},
  },
    settings: [],
})

// getters
const getters = {
    settings: state => state.settings,
    filter: state => state.filter,
}

// mutation
const mutations = {
    set_settings (state, payload) {
        state.settings = payload
    },
}

// actions
const actions = {
    updateSettings(context) {

        this.$axios.get("settings").then(response => {
            console.log(response.data)
            context.commit('set_settings', response.data)
        });

    },
    addToCart(context, params) {
        context.commit('append', params)
    },

    deleteFromCart(context, params) {
        context.commit('delete', params)
    }
}



export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
