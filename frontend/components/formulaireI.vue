<template>
  <div class="acces-card">
    <h1>Inscription</h1>
    <form class="inscription" method="post">
      <div class="block">
        <label for="name">Name:</label>
        <input
          id="name"
          type="text"
          ref="name"
          v-model="register.name"
          @change="uploadName"
        />
        <p id="nameError"></p>
      </div>
      <div class="block">
        <label for="email">Adresse mail:</label>
        <input
          id="email"
          type="text"
          ref="email"
          v-model="register.email"
          @change="uploadEmail"
        />
        <p id="emailError"></p>
      </div>
      <div class="block">
        <label for="password">Mot de passe:</label>
        <input
          id="password"
          type="text"
          ref="password"
          v-model="register.password"
          @change="uploadPassword"
        />
        <p id="passwordError"></p>
      </div>

      <div class="block">
        <label for="image">Photo de profil:</label>
        <input id="image" type="file" ref="file" @change="uploadImg" />
      </div>

      <div class="block">
        <button type="submit" @click="registerUser">S'inscrire</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "register",
  data() {
    return {
      register: {
        name: "",
        email: "",
        password: "",
        imageUrl: null,
      },
    };
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

    uploadPassword() {
      this.password = this.$refs.password.value;
    },

    async registerUser() {
      const headers = {
        "Content-Type": "multipart/form-data",
      };
      const formData = new FormData();
      formData.append("image", this.imageUrl);
      formData.append("name", this.name);
      formData.append("email", this.email);
      formData.append("password", this.password);

      const res = await this.$axios.$post(
        "http://localhost:3001/api/auth/signup",
        formData,
        {
          headers,
        }
      );
      this.$router.push({ path: "/" });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../assets/sass/utils/mixins";
@import "../assets/sass/utils/variables";

.acces-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: $dark;
  font-weight: bold;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.2);
  background-color: $medium;
  padding: 20px;
  margin: 20px;

  .inscription {
    display: block;
    width: auto;
    align-items: center;
    .block {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 5px;
    }
    button {
      @include buttonandNL;
    }

    input {
      border: 1px solid $dark;
    }

    #image {
      background-color: white;
    }
  }
}
</style>
