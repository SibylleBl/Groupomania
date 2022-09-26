<template>
  <form method="post">
    <h3>Inscription</h3>
    <div>
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
    <div>
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
    <div>
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

    <div>
      <label for="image">image</label>
      <input id="image" type="file" ref="file" @change="uploadImg" />
    </div>

    <button type="submit" @click="registerUser">Submit</button>
  </form>
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

    registerUser() {
      const headers = {
        "Content-Type": "multipart/form-data",
      };
      const formData = new FormData();
      formData.append("image", this.imageUrl);
      formData.append("name", this.name);
      formData.append("email", this.email);
      formData.append("password", this.password);

      this.$axios
        .$post("http://localhost:3001/api/auth/signup", formData, {
          headers,
        })
        .then((res) => {
          res.data.files;
          res.status;
        });
    },
  },
};
</script>
