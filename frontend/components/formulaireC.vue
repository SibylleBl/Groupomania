<template>
  <div>
    <h1>Se connecter</h1>
    <form @submit.prevent="userLogin">
      <div>
        <label>E-mail:</label>
        <input type="text" v-model="login.email" />
      </div>
      <div>
        <label>Password</label>
        <input type="text" v-model="login.password" />
      </div>
      <div>
        <button type="submit" @click="userLogin">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      login: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async userLogin() {
      console.log(this.login);
      try {
        await this.$auth.loginWith("local", {
          data: this.login,
        });
      } catch (err) {
        console.log(err);
      }
      this.$router.push("/");
    },
  },
};
</script>
