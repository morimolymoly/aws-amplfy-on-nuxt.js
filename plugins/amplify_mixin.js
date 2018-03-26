import Vue from 'vue'
import { mapGetters } from 'vuex'
Vue.mixin({
  computed: {
    ...mapGetters({
      $_AuthUsername: 'AuthStore/loggedinusername',
      $_isAuthenticated: 'AuthStore/isAuthenticated',
      $_userVerification: 'AuthStore/userVerification'
    })
  },
  methods: {
    fireAuthNotify (msg) {
      this.$notify({
        group: 'auth',
        title: 'Authentication',
        text: msg || ''
      })
    }
  }
})
