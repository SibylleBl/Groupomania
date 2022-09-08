<template>
  <div>
    <header>
      <img src="../assets/logo/icon-left-font-monochrome-black.svg" />
    </header>
    <!-- <div v-if="$auth.loggedIn">
      {{ $auth.user.email }}
      <label for="logout">Se déconnecter</label>
      <input id="logout" type="submit" value="Submit" /> -->

    <!-- <v-btn> ? -->
    <!-- </div> -->
    <!-- <div v-else>
      <NuxtLink to="/connexion">Se connecter</NuxtLink>
      <NuxtLink to="/inscription">S'inscrire</NuxtLink>
    </div> -->
    <Nuxt />
    <footer>
      <h2>Mon footer</h2>
    </footer>
  </div>
</template>
