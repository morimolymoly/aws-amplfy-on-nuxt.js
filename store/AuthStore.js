import Cookie from 'js-cookie'
import { getTokenFromUser } from '../utils/tokens'

export const state = () => ({
  user: null,
  userVerification: []
})

export const mutations = {
  SET_USER (state, user) {
    state.user = user
    let token = getTokenFromUser(user)
    Cookie.set('tokens', token)
  },
  SET_VERIFICATION (state, verification) {
    state.userVerification.push(verification)
  }
}

export const actions = {
  setUser (context, value) {
    context.commit('SET_USER', value)
  },
  setVerification (context, value) {
    context.commit('SET_VERIFICATION')
  }
}

export const getters = {
  loggedinUser (state) {
    return state.user
  },
  isAuthenticated (state) {
    return Boolean(state.user)
  },
  loggedinusername (state) {
    return (state.user) ? state.user.username : ''
  },
  userVerification (state) {
    return state.userVerification
  }
}
