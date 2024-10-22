<template lang="">
    <v-col>
        <v-form>
            <label >Enter Your FirstName</label>
            <v-text-field
                v-model="formData.firstName"
                name="email"
                required
                :disabled="loadingVal"
            ></v-text-field>
            <br/>
            <label >Enter Your lastName</label>
            <v-text-field
                v-model="formData.lastName"
                required
                :disabled="loadingVal"
            ></v-text-field>
            <br/>                   
            <label >Enter Your Email</label>
            <v-text-field
                v-model="formData.email"
                name="email"
                required
                :disabled="loadingVal"
            ></v-text-field>
            <br/>
            <label >Enter Your password</label>
            <v-text-field
                v-model="formData.password"
                required
                :disabled="loadingVal"
            ></v-text-field>
            <br/>
            <v-btn v-if="!updateForm" @click="HandleSignUp" :loading="loadingVal">
                Submit
            </v-btn>
            <v-btn v-if="updateForm" @click="HandleUpdateDetails" :loading="loadingVal">
                Update Details
            </v-btn>
        </v-form>
    </v-col>
</template>

<script>
import axios from 'axios';

export default {
    name: "SignUpForm",

    data() {
        return {
            loadingVal: false,
            formData: {
                firstname: "",
                lastname: "",
                email: "",
                password: ""
            },
            id: null,
            UserData: {},
        }
    },

    props: {
        updateForm:{
            type: Boolean,
        },
    },

    mounted() { 
        if(this.updateForm){
            this.id = this.$route.params.id;
            if(this.id){
                this.fetchUser(this.id);
            }
        }
    },

    methods: {
        async HandleSignUp() {
            this.loadingVal = true;

            try{
                const response = await axios.post("http://localhost:8081/login/signin",this.formData);
                console.log(response);
                this.$router.push("/login");
                alert("User Created Successfully!");
            } catch(error){
                console.log(error);
                alert("Signup Failure!");
            }

            this.formData.firstName = "";
            this.formData.lastName = "";
            this.formData.email = "";
            this.formData.password = "";
            this.loadingVal = false;
        },

        async HandleUpdateDetails() {
            this.loadingVal = true;
            try{    
                let data = new FormData();
                data.append("id",this.id);
                if(this.formData.firstName !== this.UserData.firstName){
                    data.append("firstName",this.formData.firstName);
                }
                if(this.formData.lastName !== this.UserData.lastName){
                    data.append("lastName",this.formData.lastName);
                }
                if(this.formData.email !== this.UserData.email){
                    data.append("email",this.formData.email);
                }
                if(this.formData.password !== this.UserData.password){
                    data.append("password",this.formData.password);
                }

                console.log("Data: ");
                console.log(data);

                if(data.length > 0){
                    const response = await axios.put("http://localhost:8081/login/updateUserDetails",{
                        data
                    });
                    if(response.data.success){
                        alert("User Details Updated Successfully");
                        this.$router.push("/dashboard");
                    }
                }
                else{
                    alert("Form Data Not Chnaged");
                }
            } catch(error){
                console.log(error);
                alert("User Details Updation Failure");
            }
            this.loadingVal = false;
        },

        async fetchUser(id) {
            try{
                const response = await axios.post("http://localhost:8081/LoginController/signin",{
                    id: id
                });
                const values = response.data.fetchedDetails;
                this.UserData = values;
                this.formData.firstName = values.firstName;
                this.formData.lastName = values.lastName;
                this.formData.email = values.email;
                this.formData.password = values.password;
            } catch(error){
                console.log(error);
                alert("User Details Fetching Failure");
            }
        }
    }
};
</script>