<template>
    <div>
    <SignUp></SignUp>
    </div>
</template>

<script>
import SignUp from '../../components/amplify/SignUp.vue'
export default {
    middleware: 'guest',
    components: {
        SignUp
    }
}
</script>
