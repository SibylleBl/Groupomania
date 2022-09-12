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
        console.log(this.$auth.state);
      } catch (err) {
        console.log(err);
      }
    },

    // userLogin() {
    //   let path = "http://localhost:3001/api/auth/login";
    //   let body = this.login;

    //   axios
    //     .post(path, body)
    //     .then((res) => {
    //       let user = { userId: res.data.userId, token: res.data.token };
    //     })

    //     .catch((error) => console.log(error));
    // },

    // setItemsToLocalStorage(thing) {
    //   let send = localStorage.setItem("thing", JSON.stringify(thing));
    //   return send;
    // },
  },
};
</script>
