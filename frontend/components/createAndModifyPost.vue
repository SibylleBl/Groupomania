<template>
  <div class="card">
    <form class="createAndModify" method="post">
      <div class="blocks">
        <h1 @click="$router.push({ path: '/' })">Créer une publication</h1>

        <div class="block">
          <label for="title"></label>
          <input
            id="title"
            v-model="data.title"
            ref="title"
            @change="uploadTitle"
          />
        </div>

        <div class="block">
          <label for="message"></label>
          <textarea
            id="message"
            v-model="data.message"
            ref="message"
            @change="uploadMessage"
          />
        </div>
        <div class="block">
          <label for="imageUrl"></label>
          <img v-if="mode === 'modify'" :src="data.imageUrl" />
          <input id="imageUrl" type="file" ref="file" @change="uploadImg" />
        </div>
      </div>
      <button type="submit" v-if="mode === 'modify'" @click="modifyPost()">
        Enregistrer
      </button>
      <button type="submit" v-if="mode === 'create'" @click="createPost()">
        Enregistrer
      </button>
    </form>
  </div>
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
        },
        this.$router.push({ path: "/" })
      );
    },

    async createPost() {
      const headers = {
        "Content-Type": "multipart/form-data",
      };
      const formData = new FormData();
      formData.append("image", this.imageUrl);
      formData.append("title", this.title);
      formData.append("message", this.message);

      const res = await this.$axios.$post(
        "http://localhost:3001/api/publications/",
        formData,
        {
          headers,
        },
        this.$router.push({ path: "/" })
      );
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/sass/utils/mixins";
@import "../assets/sass/utils/variables";

.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: $dark;
  font-weight: bold;

  .createAndModify {
    display: flex;
    flex-direction: column;
    margin: 30px auto;
    align-items: center;
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.2);
    background-color: $medium;
    padding: 20px;
    margin: 20px;

    .blocks {
      display: flex;
      flex-direction: column;
      justify-content: center;

      .block {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: large;
        margin: 15px;
        #title,
        #message,
        #imageUrl,
        #email,
        #name {
          background-color: white;
          border: 1px solid;
          border-color: $dark;
          padding: 5px;
          cursor: pointer;
        }

        label {
          color: $dark;
          font-weight: bold;
        }

        img {
          width: 200px;
          margin-bottom: 10px;
        }
      }
    }
  }
}
</style>
