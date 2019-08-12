import axios from 'axios'
import Cookies from 'js-cookie'

// state
export const state = () => ({
  loggedin: false,
  role: null,
  user: null,
  token: null
})

// getters
export const getters = {
  user: state => state.user,
  loggedin: state => state.loggedin,
  user_role: state => state.role,
  token: state => state.token,
  check: state => state.user !== null
}

// mutations
export const mutations = {
  SET_TOKEN (state, token) {
    state.token = token
  },

  

  FETCH_USER_SUCCESS (state, user) {
    state.user = user.user
    state.role = user.role
    state.loggedin = true
  },

  FETCH_USER_FAILURE (state) {
    state.token = null
  },

  LOGOUT (state) {
    state.user = null
    state.token = null
  },

  UPDATE_USER (state, { user }) {
    state.user = user
  }
}

// actions
export const actions = {
  saveToken ({ commit, dispatch }, { token, remember }) {
    commit('SET_TOKEN', token)
    Cookies.set('token', token, { expires: remember ? 365 : null })
  },
  

  async fetchUser ({ commit }) {
    try {
      const { data } = await this.$axios.get('auth/user')
      commit('FETCH_USER_SUCCESS', data)
    } catch (e) {
      Cookies.remove('token')
      commit('FETCH_USER_FAILURE')
    }
  },


  
  updateUser ({ commit }, payload) {
    commit('UPDATE_USER', payload)
  },

  async logout ({ commit }) {
    try {
      await this.$axios.post('auth/logout')
    } catch (e) { }

    Cookies.remove('token')
    commit('LOGOUT')
  },

  async fetchOauthUrl (ctx, { provider }) {
    const { data } = await axios.post(`/oauth/${provider}`)

    return data.url
  }
}
