<template>
  <form method="post">
    <div>
      <label for="imageUrl">Image:</label>
      <img v-if="mode === 'modify'" :src="data.imageUrl" />
      <input id="imageUrl" type="file" ref="file" @change="uploadImg" />
    </div>
    <div>
      <label for="title">Titre:</label>
      <input
        id="title"
        v-model="data.title"
        ref="title"
        @change="uploadTitle"
      />
    </div>

    <div>
      <label for="message">Message:</label>
      <textarea
        id="message"
        v-model="data.message"
        ref="message"
        @change="uploadMessage"
      />
    </div>
    <button type="submit" v-if="mode === 'modify'" @click="modifyPost()">
      Enregistrer
    </button>
    <button type="submit" v-if="mode === 'create'" @click="createPost()">
      Enregistrer
    </button>
  </form>
</template>

<script>
export default {
  props: ["mode"],
  data() {
    return {
      data: {
        imageUrl: null,
        message: "Mon message",
        title: "Mon titre",
      },
    };
  },

  async fetch() {
    try {
      const data = await this.$axios.$get(
        `http://localhost:3001/api/publications/${this.$route.params.id}`
      );
      this.data = { ...data };
    } catch ({ res }) {
      console.log(res);
    }
  },

  methods: {
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
      const res = await this.$axios.$put(
        "http://localhost:3001/api/publications/" + this.$route.params.id,
        formData,
        {
          headers,
        }
      );
      console.log(
        "🚀 ~ file: createAndModifyPost.vue ~ line 86 ~ modifyPost ~ res",
        res
      );
      this.$router.push("/");
    },

    async createPost() {
      const headers = {
        "Content-Type": "multipart/form-data",
      };
      const formData = new FormData();
      formData.append("image", this.imageUrl);
      formData.append("title", this.title);
      formData.append("message", this.message);

      await this.$axios
        .$post("http://localhost:3001/api/publications/", formData, {
          headers,
        })
        .then((res) => {
          this.$router.push("/");
        });
    },
  },
};
</script>
