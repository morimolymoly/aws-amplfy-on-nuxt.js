<template>
    <div>
    <SignOut></SignOut>
    </div>
</template>

<script>
import SignOut from '../../components/amplify/SignOut.vue'
export default {
  middleware: 'need_auth',
  components: {
    SignOut
  }
}
</script>
