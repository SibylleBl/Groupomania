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
        <input type="file" ref="file" @change="uploadImg" />
      </div>
      <div>
        <button type="submit" @click="createPost">Submit</button>
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
        imageUrl: null,
      },
    };
  },

  methods: {
    uploadImg() {
      this.imageUrl = this.$refs.file.files[0];
      console.log(
        "🚀 ~ file: newPost.vue ~ line 40 ~ uploadImg ~ this.imageUrl",
        this.imageUrl
      );
    },

    createPost() {
      const headers = {
        "Content-Type": "multipart/form-data",
      };
      const formData = new FormData();
      formData.append("file", this.imageUrl);

      this.$axios.$post("http://localhost:3001/api/publications/", formData, {
        headers,
      });
      // .then((res) => {
      //   res.data.files;
      //   res.status;
      // });
    },
  },
};
</script>
