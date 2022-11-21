<template>
  <form class="modifyProfil" method="put">
    <div class="blocks">
      <div class="block">
        <label for="imageUrl">Photo de profil:</label>
        <img :src="data.user.imageUrl" />
        <input id="imageUrl" type="file" ref="file" @change="uploadImg" />
      </div>
      <div class="block">
        <label for="name">Nom:</label>
        <input
          id="name"
          v-model="data.user.name"
          ref="name"
          @change="uploadName"
        />
      </div>

      <div class="block">
        <label for="email">Adresse mail:</label>
        <input
          id="email"
          v-model="data.user.email"
          ref="email"
          @change="uploadEmail"
        />
      </div>
    </div>
    <button type="submit" @click="modifyUser()">Enregistrer</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      data: {
        user: {
          name: "mon nom",
          email: "mon email",
          imageUrl: null,
        },
      },
    };
  },

  async fetch() {
    try {
      const data = await this.$axios.$get(`http://localhost:3001/api/auth/me`);

      this.data = { ...data };
      console.log(
        "🚀 ~ file: modifyProfil.vue ~ line 48 ~ fetch ~ data",
        this.data
      );
    } catch ({ res }) {
      console.log(res);
    }
  },

  methods: {
    uploadImg() {
      this.imageUrl = this.$refs.file.files[0];
    },

    uploadName() {
      this.name = this.$refs.name.value;
    },

    uploadEmail() {
      this.email = this.$refs.email.value;
    },

    async modifyUser() {
      const headers = {
        "Content-Type": "multipart/form-data",
      };
      const formData = new FormData();
      formData.append("image", this.imageUrl);
      formData.append("name", this.name);
      formData.append("email", this.email);

      const res = await this.$axios.$put(
        "http://localhost:3001/api/auth/modifyUser",
        formData,
        {
          headers,
        }
      );
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss">
@import "../assets/sass/utils/mixins";
@import "../assets/sass/utils/variables";

.modifyProfil {
  display: flex;
  flex-direction: column;
  margin: 30px auto;
  align-items: center;
  width: 40%;
  background-color: $medium;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.2);

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
</style>
