import createPersistedState from 'vuex-persistedstate'
export default ({ store }) => {
  createPersistedState({
    key: 'AuthStoreData',
    paths: ['AuthStore']
  })(store)
}
