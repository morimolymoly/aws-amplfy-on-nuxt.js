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
    <div>Are you sure?</div>
    <div :style="theme.actionRow">
        <button :style="theme.action" v-on:click="signOut">Sign Out</button>
    </div>
  </div>
</template>

<script>
import { Auth, Logger, JS } from 'aws-amplify'
import AmplifyTheme from './AmplifyTheme'

export default {
    name: 'Logout',
    data() {
        return {
            error: '',
            theme: AmplifyTheme
        }
    },
    methods: {
        signOut(event){
            Auth.signOut()
                .then(data => console.log(data))
                .catch(err => {
                    this.setError(err)
                    this.fireAuthNotify(this.error)
                });
            this.$store.dispatch('AuthStore/setUser', null)
            this.$router.replace('/');
        },
        setError(err) {
            this.error = err.message || err;
        }
    }
}
</script>
