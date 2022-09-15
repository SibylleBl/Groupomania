<template>
  <div>
    <div class="box_site">
      <header>
        <img src="../assets/logo/icon-left-font-monochrome-black.svg" />
        <div class="welcome">
          <h1 v-if="$auth.loggedIn">Bienvenue {{ $auth.$state.user.name }}</h1>
          <h1 v-else>Bienvenue inconnu</h1>
        </div>
        <nav>
          <div class="nav_bar" v-if="$auth.loggedIn">
            <button onclick="window.location.href = '/profil'">
              Mon profil
            </button>
            <button type="submit" @click="logout">Se déconnecter</button>
          </div>
          <div class="nav_bar" v-else>
            <button onclick="window.location.href = '/login'">
              Se connecter
            </button>
            <button onclick="window.location.href = '/register'">
              S'inscrire
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
