<template>
  <div>
    <h1>Interview Formats</h1>
    <v-container>
      <ul v-for="format in interviewFormats" :key="format.id">
        <li>
          {{ format?.name }} ({{ format?.isactive ? 'Active' : 'Inactive' }})
        </li>
        <li>
          <v-btn @click="editInterviewFormat(format)">Edit</v-btn>
        </li>
        <li>
          <v-btn @click="handleDelete(format?.id)">Delete</v-btn>
        </li>
      </ul>

      <v-row>
        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-title class="headline">Edit Format</v-card-title>

            <v-card-text>
              <!-- Input field for editing -->
              <v-text-field 
                v-model="name"
                label="Enter new value" 
                outlined
              ></v-text-field>
              <v-checkbox 
                v-model="isactive"
                label="Is Active" 
              ></v-checkbox>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <!-- Cancel Button -->
              <v-btn 
                text 
                @click="dialog = false"
              >Cancel</v-btn>

              <!-- Save Button -->
              <v-btn  
                @click="updateInterviewFormat"
              >Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "AllstuffPage",

  data() {
    return {
      interviewFormats: [],
      dialog: false,
      name: '',
      isactive: true,
      isEditMode: false,  // Flag to check if we are editing or creating
      editId: null  // Holds the ID of the format being edited
    };
  },

  methods: {

    fetchFormats() {
      axios.get('http://localhost:8080/InterviewExperience/getInterviewFormats')
        .then(response => {
          this.interviewFormats = response.data;
        })
        .catch(error => {
          console.error('Error fetching the interview formats!', error);
        });
    },

    createInterviewFormat() {
      axios.post('http://localhost:8080/InterviewExperience/createNew', {
        name: this.name,
        isactive: this.isactive,
        creation_username: 'randomname',
        updation_username: 'dadasaheb',
        creation_date: new Date(),
        updation_date: new Date(),
        creation_ip_address: '213456',
        updation_ip_address: '8765444',
        tpo_id: 1
      })
      .then(() => {
        alert("Interview Format created!");
        this.fetchFormats();
        this.resetForm();
      })
      .catch(error => {
        console.error("Error creating the format:", error.response.data);
      });
    },

    editInterviewFormat(format) {
      this.isEditMode = true;
      this.editId = format.id;
      this.name = format.name;
      this.isactive = format.isactive;
      this.dialog = true;  // Open the dialog for editing
    },

    updateInterviewFormat() {
      axios.post(`http://localhost:8080/InterviewExperience/updateFormat`, {
        id: this.editId,
        name: this.name,
        isactive: this.isactive,
        updation_username: 'updatedUser',
        updation_date: new Date(),
        updation_ip_address: '8765444'
      })
      .then(() => {
        alert("Interview Format updated!");
        this.fetchFormats();
        this.resetForm();
      })
      .catch(error => {
        console.error("Error updating the format:", error.response.data);
      });
    },

    handleDelete(id) {
      axios.post(`http://localhost:8080/InterviewExperience/deleteNew`, { id : id })
        .then(() => {
          alert("Interview Format deleted!");
          this.fetchFormats();
        })
        .catch(error => {
          console.log("Error deleting the format:", error);
        });
    },

    resetForm() {
      this.name = '';
      this.isactive = true;
      this.isEditMode = false;
      this.editId = null;
      this.dialog = false;  // Close the dialog after the form is reset
    }
  },
  mounted(){
    this.fetchFormats()
  }
};
</script>