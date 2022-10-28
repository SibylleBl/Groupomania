<template>
  <form method="post">
    <div>
      <label for="imageUrl">Image:</label>
      <input id="imageUrl" type="file" ref="file" @change="uploadImg" />
    </div>
    <div>
      <label for="title">Titre:</label>
      <input
        id="title"
        v-model="modify.title"
        ref="title"
        @change="uploadTitle"
      />
    </div>

    <div>
      <label for="message">Message:</label>
      <textarea
        id="message"
        v-model="modify.message"
        ref="message"
        @change="uploadMessage"
      />
    </div>
    <button type="submit" @click="modifyPost()">Enregistrer</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      modify: {
        imageUrl: null,
        message: "Mon message",
        title: "Mon titre",
      },
    };
  },

  methods: {
    async fetch() {
      try {
        const modify = await this.$axios.$get(
          `http://localhost:3001/api/publications/${this._id}`
        );
        return modify;
      } catch ({ res }) {
        console.log(res);
      }
    },

    uploadImg() {
      this.imageUrl = this.$refs.file.files[0];
    },
    uploadTitle() {
      this.title = this.$refs.title.value;
    },
    uploadMessage() {
      this.message = this.$refs.message.value;
    },
    async modifyPost() {
      const headers = {
        "Content-Type": "multipart/form-data",
      };

      const formData = new FormData();
      formData.append("image", this.imageUrl);
      formData.append("title", this.title);
      formData.append("message", this.message);
      await this.$axios
        .$put(
          "http://localhost:3001/api/publications/" + this.$route.params.id,
          formData,
          {
            headers,
          }
        )
        .then((res) => {
          console.log(res);
        });
      this.$router.push("/");
    },
  },
};
</script>
