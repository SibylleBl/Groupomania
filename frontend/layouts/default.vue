<template>
  <div>
    <div class="box_site">
      <header>
        <NuxtLink to="/">
          <img src="../assets/logo/icon-left-font-monochrome-white.svg" />
        </NuxtLink>
        <nav>
          <div class="nav_bar" v-if="$auth.loggedIn">
            <NuxtLink class="link" to="./newPost">
              Poster une publication
            </NuxtLink>
            <button type="submit" @click="logout">
              <font-awesome-icon icon="fa-solid fa-right-from-bracket" /> Se
              déconnecter
            </button>
          </div>
          <div class="nav_bar" v-else>
            <NuxtLink class="link" to="/login">
              <font-awesome-icon icon="fa-solid fa-right-to-bracket" /> Se
              connecter
            </NuxtLink>
            <NuxtLink class="link" to="/register">
              <font-awesome-icon icon="fa-solid fa-hands" /> S'inscrire
            </NuxtLink>
          </div>
        </nav>
      </header>

      <Nuxt />
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    async logout() {
      await this.$auth.logout("local", {
        data: this.login,
      });
    },
  },
};
</script>

<style lang="scss">
@import "../assets/sass/utils/mixins";
@import "../assets/sass/utils/variables";

header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: $medium;
  img {
    width: 40%;
    margin-left: 1rem;
    color: $dark;
    padding: 1em;
  }

  .nav_bar {
    display: flex;
    align-items: center;
  }
}

//responsive

@media only screen and (max-width: 1020px) {
  header {
    .nav_bar {
      flex-direction: column;
    }
  }
}

@media only screen and (max-width: 800px) {
  header {
    flex-direction: column;
    a {
      display: flex;
      margin: auto;
      justify-content: center;
    }
  }
}
</style>
