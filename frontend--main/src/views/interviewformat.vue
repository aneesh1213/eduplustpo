<template>
    <div>
      <h1>Interview Formats</h1>
      <v-container v-if="interviewFormats">
        <ul v-for="format in interviewFormats" :key="format.id">
          <li >
            {{ format?.name }} ({{ format?.isactive ? 'Active' : 'Inactive' }})
          </li>
          <li>
            <v-btn>edit </v-btn>
          </li>
          <li>
            <v-btn @click="handledelete(format?.id)">delete </v-btn>
          </li>
        </ul>
      </v-container>

    </div>
  </template>
  
  <script>
import axios from 'axios';


  export default {
    name: 'InterviewFormatList',
    

    props:{
      fetchformat: Function,
      interviewFormats: Object
    },
    methods:{
      handledelete(id){
        axios.post(`http://localhost:8080/InterviewExperience/deleteNew`, {id:id}).then((res) => {
          if(res.status == 200){
            this.fetchformat()
            alert("Success");
          }
        }
        ).catch(error => {
          console.error("error is :", error.resonse.data);
        });
        }
      },
    mounted() {
      // Fetch interview formats when the component is created
        this.fetchformat()
    }
  }
  </script>
  
  <style scoped>
  /* Add your styling here */
  </style>
  