<template>
  <div id="app" data-app>
    <AllstuffPage />
  </div>
</template>

<script>


import AllstuffPage from './views/allstuff.vue';

export default {
  name: "App",

  data: () => ({
    token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
    interviewFormats: null
  }),
  // methods:{
  //   fetchFormats() {
  //     axios.get('http://localhost:8080/InterviewExperience/getInterviewFormats')
  //       .then(response => {
  //         this.interviewFormats = response.data;
  //         this.fetchFormats();
  //       })
  //       .catch(error => {
  //         console.error('Error fetching the interview formats!', error);
  //       });
  //   },
  // },

  components:{
    AllstuffPage
  }
};
</script>
