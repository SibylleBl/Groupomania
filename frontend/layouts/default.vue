<template>
  <div>
    <nav>
      <div class="nav_bar" v-if="$auth.loggedIn">
        <button type="submit" @click="logout">Se déconnecter</button>
      </div>
      <div class="nav_bar" v-else>
        <NuxtLink to="/login">Se connecter</NuxtLink>
        <NuxtLink to="/register">S'inscrire</NuxtLink>
      </div>
    </nav>
    <div class="box_site">
      <header>
        <img src="../assets/logo/icon-left-font-monochrome-black.svg" />
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
