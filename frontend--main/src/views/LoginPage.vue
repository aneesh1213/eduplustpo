<template lang="">
    <v-container>
        <v-row justify="center">
            <h1>Login Page Welcome</h1>
        </v-row>
        <v-row>
            <v-col>
                <v-form>
                    <label >Enter Your Email</label>
                    <v-text-field
                        v-model="formData.email"
                        name="email"
                        required
                    ></v-text-field>
                    <label >Enter Your password</label>
                    <v-text-field
                        v-model="formData.password"
                        required
                    ></v-text-field>
                    <v-btn @click="HandleSubmit" :loading="loadingVal">
                        Submit
                    </v-btn>
                </v-form>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import axios from 'axios';

export default {
    name:"LoginPage",

    data() {
       return {
        formData:{
            email:"",
            password:"",
        },
        loadingVal: false,
       }
    },

    methods: {
        async HandleSubmit() {
            this.loadingVal = true;
            
            try{
                const response = await axios.post('http://localhost:8080/login/authenticate', {email:this.formData.email, password:this.formData.password });

                if(response){
                    console.log(response);
                    localStorage.setItem("token",this.formData.password);
                    
                    this.$route.params.authToken = this.formData.password;
                    alert("Login Success!");
                    this.$router.push("/dashboard");
                }
            }
            catch(error){
                console.log(error);
                alert("User Not Found!");
            }

            this.formData.email = "";
            this.formData.password = "";
            this.loadingVal = false;
        }
    }
}
</script>