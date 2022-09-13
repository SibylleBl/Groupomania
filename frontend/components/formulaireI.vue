<template>
  <form method="post" @submit.prevent="registerUser">
    <h3>Inscription</h3>
    <div>
      <label for="name">Name:</label>
      <input id="name" v-model="register.name" />
      <p id="nameError"></p>
    </div>
    <div>
      <label for="email">Adresse mail:</label>
      <input id="email" v-model="register.email" />
      <p id="emailError"></p>
    </div>
    <div>
      <label for="password">Mot de passe:</label>
      <input id="password" v-model="register.password" />
      <p id="passwordError"></p>
    </div>

    <input class="button" type="submit" value="Submit" />
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
      },
    };
  },

  methods: {
    async registerUser() {
      try {
        await this.$axios.$post("http://localhost:3001/api/auth/signup", {
          name: this.register.name,
          email: this.register.email,
          password: this.register.password,
        });

        this.$router.push("/");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
