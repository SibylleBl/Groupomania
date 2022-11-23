<template>
  <form class="modifyProfil" method="put">
    <div class="blocks">
      <div class="block">
        <label for="imageUrl">Photo de profil:</label>
        <img :src="form.user.imageUrl" />
        <input id="imageUrl" type="file" ref="file" @change="uploadImg" />
      </div>
      <div class="block">
        <label for="name">Nom:</label>
        <input id="name" v-model="form.user.name" ref="name" />
      </div>

      <div class="block">
        <label for="email">Adresse mail:</label>
        <input id="email" v-model="form.user.email" ref="email" />
      </div>
    </div>
    <button type="submit" @click="modifyUser()">Enregistrer</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      form: {
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
      this.form = { ...data };
    } catch ({ res }) {
      console.log(res);
    }
  },

  methods: {
    uploadImg() {
      this.form.imageUrl = this.$refs.file.files[0];
    },

    async modifyUser() {
      const headers = {
        "Content-Type": "multipart/form-data",
      };
      const formData = new FormData();
      formData.append("image", this.form.user.imageUrl);
      formData.append("name", this.form.user.name);
      formData.append("email", this.form.user.email);

      const res = await this.$axios.$put(
        "http://localhost:3001/api/auth/modifyUser",
        formData,
        {
          headers,
        }
      );

      const userToUpdate = { ...this.$auth.user };
      userToUpdate.name = this.form.user.name;
      userToUpdate.email = this.form.user.email;
      userToUpdate.imageUrl = this.form.user.imageUrl;

      this.$auth.setUser(
        userToUpdate.name,
        userToUpdate.email,
        userToUpdate.imageUrl
      );

      this.$router.push({ path: "/" });
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
