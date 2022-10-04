<template>
  <div>
    <form>
      <div>
        <label>Titre:</label>
        <input
          id="title"
          type="text"
          ref="title"
          @change="uploadTitle"
          v-model="newPub.title"
        />
      </div>
      <div>
        <label>Message:</label>
        <input
          id="message"
          type="text"
          ref="message"
          @change="uploadMessage"
          v-model="newPub.message"
        />
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
        "🚀 ~ file: newPost.vue ~ line 40 ~ uploadImg ~  this.imageUrl",
        this.imageUrl
      );
    },

    uploadTitle() {
      this.title = this.$refs.title.value;
    },

    uploadMessage() {
      this.message = this.$refs.message.value;
    },

    createPost() {
      const headers = {
        "Content-Type": "multipart/form-data",
      };
      const formData = new FormData();
      formData.append("image", this.imageUrl);
      formData.append("title", this.title);
      formData.append("message", this.message);

      this.$axios
        .$post("http://localhost:3001/api/publications/", formData, {
          headers,
        })
        .then((res) => {
          res.data.files;
          res.status;
        });

      this.$router.push("/");
    },
  },
};
</script>
