import Cookies from 'js-cookie'
import {
  cookieFromRequest
} from '~/utils'
// state
export const state = () => ({
  settings: null,
})

export const getters = {
  setting: (state) => (str_variable) => {
    console.log(state.settings)
    const s = state.settings.find(s => s.variable === str_variable)
    return s.value
  }
}

// mutations
export const mutations = {
  FETCH_SETTINGS(state, settings) {
    state.settings = settings
  }
}

// actions
export const actions = {
  nuxtServerInit({
    commit
  }, {
    req
  }) {
    const token = cookieFromRequest(req, 'token')
    if (token) {
      commit('auth/SET_TOKEN', token)
    }

    const locale = cookieFromRequest(req, 'locale')
    if (locale) {
      commit('lang/SET_LOCALE', {
        locale
      })
    }
  },

  nuxtClientInit({
    commit
  }) {
    const token = Cookies.get('token')
    if (token) {
      commit('auth/SET_TOKEN', token)
    }

    const locale = Cookies.get('locale')
    if (locale) {
      commit('lang/SET_LOCALE', {
        locale
      })
    }
  },

  async fetchSettings({
    commit
  }) {
    try {
      const {
        data
      } = await this.$axios.get('settings')

      commit('FETCH_SETTINGS', data)
    } catch (e) {
      console.log("Settings Error! Check State")
    }
  }
}
