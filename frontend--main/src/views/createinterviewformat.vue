<!-- CreateInterviewFormat.vue -->
<template>
    <div>
      <h1>Create Interview Format</h1>
      <form @submit.prevent="createInterviewFormat">
        <input v-model="name" placeholder="Name" required />
        <input type="checkbox" v-model="isactive" /> Active
        <v-btn @click="createInterviewFormat" >create </v-btn>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'CreateInterviewFormat',
    data() {
      return {
        name: '',
        isactive: true,
      }
    },

    props:{
      fetchformat:Function,
      interviewFormats: Object
    },
    methods: {
      createInterviewFormat() {
        axios.post('http://localhost:8080/InterviewExperience/createNew', {
          name: this.name,
          isactive: this.isactive,
          creation_username:'randomname',
          updation_username:'dadasaheb',
          creation_date: new Date(),
          updation_date: new Date(),
          creation_ip_address: '213456',
          updation_ip_address: '8765444',
          tpo_id:1
        })
        .then(() => {
          alert("done!");
          this.fetchformat()
        })
        .catch(error => {
          console.error("error is :", error.resonse.data);
        });
      }
    }
  }
  </script>
  