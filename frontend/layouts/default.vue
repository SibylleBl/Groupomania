<template>
  <div>
    <div class="box_site">
      <header>
        <img src="../assets/logo/icon-left-font-monochrome-white.svg" />

        <nav>
          <div class="nav_bar" v-if="$auth.loggedIn">
            <button onclick="window.location.href = './newPost'">
              Poster une publication
            </button>
            <button type="submit" @click="logout">
              <font-awesome-icon icon="fa-solid fa-right-from-bracket" /> Se
              déconnecter
            </button>
          </div>
          <div class="nav_bar" v-else>
            <button onclick="window.location.href = '/login'">
              <font-awesome-icon icon="fa-solid fa-right-to-bracket" /> Se
              connecter
            </button>
            <button onclick="window.location.href = '/register'">
              <font-awesome-icon icon="fa-solid fa-hands" /> S'inscrire
            </button>
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
