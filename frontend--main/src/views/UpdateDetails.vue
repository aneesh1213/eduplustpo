<template lang="">
    <div style="margin:0 auto; width:1080px;">
        <SignUpForm :updateForm="updateForm" />
    </div>
</template>

<script>
import SignUpForm from '@/components/Auth/SignUpForm.vue';

export default {
    name: "updateDetails",

    data() {
        return {
            updateForm: true,
        }
    },

    components: {
        SignUpForm
    }
}
</script>