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
    <h1 :style="theme.header">Confirm Sign Up</h1>
    <div :style="theme.inputRow">
      <input :style="theme.input" v-model="username" name="username" placeholder="Username" autofocus />
    </div>
    <div :style="theme.inputRow">
      <input :style="theme.input" v-model="code" name="code" placeholder="Code" />
    </div>
    <div :style="theme.actionRow">
      <button :style="theme.action" v-on:click="confirm" :disabled="!username || !code">Confirm</button>
      <button :style="theme.action" v-on:click="resend">Resend</button>
    </div>
    <div :style="theme.footer">
      <span :style="theme.footerLeft">
        <a :style="theme.link" v-on:click="signIn">Back to Sign In</a>
      </span>
      &nbsp;
    </div>
  </div>
</template>

<script>
import { Auth } from 'aws-amplify'
import AmplifyTheme from './AmplifyTheme'

export default {
  name: 'ConfirmSignUp',
  data () {
    return {
      username: '',
      code: '',
      error: '',
      theme: AmplifyTheme
    }
  },
  methods: {
    async confirm (event) {
      try {
        await Auth.confirmSignUp(this.username, this.code)
        this.$router.push('/')
      } catch (err) {
        this.setError(err)
        this.fireAuthNotify(this.error)
      }
    },
    async resend () {
      try {
        await Auth.resendSignUp(this.username)
        this.fireAuthNotify('code resent')
      } catch (err) {
        this.setError(err)
        this.fireAuthNotify(this.error)
      }
    },
    signIn () {
      this.$router.push('/Auth/SignIn')
    },
    setError (err) {
      this.error = err.message || err
    }
  }
}
</script>
