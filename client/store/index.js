

// state
export const state = () => ({
  settings: null,
})

export const getters = {
  settings: state => state.settings,
}

// mutations
export const mutations = {
  FETCH_SETTINGS (state, settings) {
    state.settings = settings
  }
}

// actions
export const actions = {
  async fetchSettings ({ commit }) {
    try {
      const { data } = await this.$axios.get('settings')
      console.log(data)
      commit('FETCH_SETTINGS', data)
    } catch (e) {
      console.log("Settings Error! Check State")
    }
  }
}

