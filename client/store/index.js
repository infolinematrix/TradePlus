

// state
export const state = () => ({
  settings: null,
})

export const getters = {
  settings: state => state.settings,

  setting: (state) => (str_variable) => {
    console.log(state.settings)
    const s = state.settings.find(s => s.variable === str_variable)
    return s.value
  }
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

      commit('FETCH_SETTINGS', data)
    } catch (e) {
      console.log("Settings Error! Check State")
    }
  }
}

