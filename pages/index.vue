<template>
  <section class="container">
    <div>
      <app-logo/>
      <h1 class="title">
        aws-amplify-test
      </h1>
      <h2 class="subtitle">
        AWS AMPLIFY ON Nuxt.js
      </h2>
      <div class="links">
        <no-ssr><router-link v-if="!$_isAuthenticated" to="Auth/SignIn" class="button--grey">SignIn</router-link></no-ssr>
        <no-ssr><router-link v-if="$_isAuthenticated" to="Auth/SignOut" class="button--grey">SignOut</router-link></no-ssr>
        <no-ssr><router-link v-if="$_isAuthenticated" to="secret" class="button--green">secret</router-link></no-ssr>
      </div>
      <no-ssr><p>{{ $_AuthUsername }}</p></no-ssr>
    </div>
  </section>
</template>

<script>
import AppLogo from '~/components/AppLogo.vue'
export default {
  components: {
    AppLogo
  }
}
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
