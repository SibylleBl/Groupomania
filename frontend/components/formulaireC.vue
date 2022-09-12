<template>
  <div>
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
// import axios from "axios";

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
      try {
        let response = await this.$auth.loginWith("local", {
          data: this.login,
        });
        this.$router.push("/");
        console.log(this.$auth.state);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
