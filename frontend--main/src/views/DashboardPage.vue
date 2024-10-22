<template lang="">
    <v-simple-table style="margin-top:50px;">
        <h1 style="text-align:center;">Registered Students</h1>
        <table v-if="!loading" style="margin: 0 auto; margin-top:20px; width:1080px; gap:20px;">
            <thead style="margin-top:30px; border:1px solid black">
                <th style="text-align:center;"><h2>ID</h2></th>
                <th style="text-align:center;"><h2>FirstName</h2></th>
                <th style="text-align:center;"><h2>LastName</h2></th>
                <th style="text-align:center;"><h2>Email</h2></th>
                <th style="text-align:center;"><h2>Password</h2></th>
                <th style="text-align:center;"><h2>Update</h2></th>
                <th style="text-align:center;"><h2>Delete</h2></th>
            </thead>
            <br/>
            <tbody style="margin-top:50px;border:1px solid black;" v-for="(item,index) in users" :key="index">
                <td style="text-align:center;">{{item.id}}</td>
                <td style="text-align:center;">{{item.firstName}}</td>
                <td style="text-align:center;">{{item.lastName}}</td>
                <td style="text-align:center;">{{item.email}}</td>
                <td style="text-align:center;">{{item.password}}</td>
                <td style="text-align:center;"><router-link :to="`/updatedetails/${item.id}`"><v-btn>update</v-btn></router-link></td>
                <td style="text-align:center;" @click="HandleDeleteUser(item)"><v-btn>Delete</v-btn></td>
            </tbody>
        </table>
        <div v-if="loading == true" style="text-align:center; font-size:28px; margin-top:180px;">
            <h4>Loading...</h4>
        </div>
    </v-simple-table>
</template>

<script>
import axios from 'axios';

export default {
    name: "DashboardPage",

    data() {
        return {
            users:{},
            loading: false,
            token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
        }
    },

    props: {
        verifyUserToken: Function,
    },

    mounted() {
        if(this.verifyUserToken){
            this.verifyUserToken();
        }
        this.getAllUsers();
    },
    

    methods: {
        async getAllUsers() {
            try{
                const response = await axios.get("http://localhost:8080/login/AllUsers");
                // console.log("Response of All Users: ");
                // console.log(response?.data?.users);
                this.users = response?.data?.users;
            } catch(error){
                console.log(error);
                alert("Users Feteching Failure!");
            }
        },

        async HandleDeleteUser(item) {
            this.loading = true;
            try{
                await axios.delete("http://localhost:8080/login/deleteUser",{
                    data:{
                        email:item.email,
                        token:this.token,
                    }
                });
                // console.log(response);
                alert("User Deleted Successfully!");
                this.getAllUsers();
            }
            catch(error){
                console.log(error);
                alert(error.response.data);
            }
            this.loading = false;
        },

        async handleUpdateDetails(id) {
            this.$router.push(`/updatedetails/${id}`);
        }
    }
}
</script>