<template>
  <div class="acces-card">
    <h1>Se connecter</h1>
    <form class="connexion" @submit.prevent="userLogin">
      <div class="block">
        <label>E-mail:</label>
        <input type="text" v-model="login.email" />
      </div>
      <div class="block">
        <label>Mot de passe:</label>
        <input type="text" v-model="login.password" />
      </div>
      <div class="block">
        <button type="submit" @click="userLogin">Connexion</button>
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
        await this.$auth.loginWith(
          "local",
          {
            data: this.login,
          },
          this.$router.push("/")
        );
      } catch (err) {
        console.log(err);
      }
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

  .connexion {
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
  }
}
</style>
