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
              <p>{{ $auth.$state.user._id }}</p>
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
      <footer>
        <h2>Mon footer</h2>
      </footer>
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
