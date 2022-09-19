<template>
  <div>
    <form>
      <div>
        <label>Titre:</label>
        <input id="title" type="text" v-model="newPub.title" />
      </div>
      <div>
        <label>Message:</label>
        <input id="message" type="text" v-model="newPub.message" />
      </div>
      <div>
        <label>Image:</label>
        <!-- v-model ne supporte pas le type "file" -->
        <input id="imageUrl" type="file" />
      </div>
      <div>
        <button type="submit" @click="createPost()">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  layout: "LayConnexion",
  data() {
    return {
      newPub: {
        title: "",
        message: "",
        imageUrl: "",
      },
    };
  },

  methods: {
    async createPost() {
      try {
        await this.$axios.$post("http://localhost:3001/api/publications/", {
          title: this.newPub.title,
          message: this.newPub.message,
          imageUrl: this.newPub.imageUrl,
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
