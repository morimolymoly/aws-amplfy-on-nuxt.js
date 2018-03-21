module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'aws-amplify-test',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'AWS AMPLIFY ON Nuxt.js' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    vendor: [
      'aws-amplify',
      'js-cookie',
      'vue-notification'
    ]
  },
  plugins: [
    { src: '~plugins/amplify_init.js', ssr: false },
    { src: '~plugins/AuthStorePersist.js', ssr: false },
    { src: '~plugins/amplify_mixin.js', ssr: true },
    { src: '~plugins/vue-notification' }
  ]
}
