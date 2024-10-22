<template lang="">
    <v-container style="margin-top:30px; ">
        <v-row justify="center">
            <h1>SignUp Page Welcome</h1>
        </v-row>
        <v-row>
            <SignUpForm />
        </v-row>
    </v-container>
</template>

<script>
import SignUpForm from '@/components/Auth/SignUpForm.vue';

export default {
    name:"SignUpPage",

    components: {
        SignUpForm,
    }
};
</script>