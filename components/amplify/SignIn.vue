/*
 * Modifications copyright (C) 2018 morimolymoly
 *
 * Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with
 * the License. A copy of the License is located at
 *
 *     http://aws.amazon.com/apache2.0/
 *
 * or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions
 * and limitations under the License.
 */

<template>
  <div :style="theme.form">
    <h1 :style="theme.header" v-if="!confirmView">Sign In</h1>
    <h1 :style="theme.header" v-if="confirmView">Confirm Sign In</h1>
    <div v-if="!confirmView">
      <div :style="theme.inputRow">
        <input :style="theme.input" v-model="username" placeholder="Username" autofocus v-on:keyup.enter="signIn" />
      </div>
      <div :style="theme.inputRow">
        <input :style="theme.input" v-model="password" type="password" placeholder="Password" v-on:keyup.enter="signIn" />
      </div>
      <div :style="theme.actionRow">
        <button :style="theme.action" v-on:click="signIn" :disabled="!username || !password">Sign In</button>
      </div>
    </div>
    <div v-if="confirmView">
      <div :style="theme.inputRow">
        <input :style="theme.input" v-model="code" placeholder="Code" v-on:keyup.enter="confirm" />
      </div>
      <div :style="theme.actionRow">
        <button :style="theme.action" v-on:click="confirm" :disabled="!code">Confirm</button>
      </div>
    </div>
    <div :style="theme.footer">
      <span :style="theme.footerLeft">
        <a :style="theme.link" v-on:click="forgot">Forgot Password</a>
      </span>
      &nbsp;
      <span :style="theme.footerRight">
        <a :style="theme.link" v-on:click="signUp">Sign Up</a>
      </span>
    </div>
  </div>
</template>

<script>
import { Auth, JS } from 'aws-amplify'
import AmplifyTheme from './AmplifyTheme'

export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: '',
      error: '',
      user: null,
      confirmView: false,
      code: '',
      theme: AmplifyTheme
    }
  },
  methods: {
    async signIn (event) {
      try {
        const user = await Auth.signIn(this.username, this.password)
        this.$store.dispatch('AuthStore/setUser', user)
        this.$router.push('/')
        if (user.challengeName === 'SMS_MFA') {
          this.confirmView = true
          return
        }
        await this.checkUser()
      } catch (err) {
        this.setError(err)
        this.fireAuthNotify(this.error)
      }
    },
    async checkUser () {
      const user = this.user
      if (user) return
      try {
        const data = await Auth.verifiedContact(user)
        this.$store.dispatch('AuthStore/setVerification', data)
        if (!JS.isEmpty(data.verified)) {
          this.$router.push('/')
        } else {
          this.$router.push('/Auth/VerifyContact')
        }
      } catch (err) {
        console.log(err)
      }
    },
    async confirm () {
      try {
        await Auth.confirmSignIn(this.user, this.code)
        this.$router.push('/')
      } catch (err) {
        this.setError(err)
        this.fireAuthNotify(this.error)
      }
    },
    forgot () {
      this.$router.push('/Auth/forgotPassword')
    },
    signUp () {
      this.$router.push('/Auth/SignUp')
    },
    setError (err) {
      this.error = err.message || err
    }
  }
}
</script>
