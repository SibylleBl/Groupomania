<template>
  <div>
    <header>
      <img src="../assets/logo/icon-left-font-monochrome-black.svg" />
    </header>

    <div v-if="$auth.loggedIn">
      {{ $auth.state.user.name }}
      <button type="submit" @click="logout">Se déconnecter</button>
    </div>

    <div v-else>
      <NuxtLink to="/login">Se connecter</NuxtLink>
      <NuxtLink to="/register">S'inscrire</NuxtLink>
    </div>
    <Nuxt />
    <footer>
      <h2>Mon footer</h2>
    </footer>
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
