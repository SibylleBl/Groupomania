<template>
  <!DOCTYPE html>
  <html lang="fr">
    <body>
      <div id="app">
        <h1>Bienvenue</h1>
        <NuxtLink to="/inscription">Je m'inscris</NuxtLink>
        <NuxtLink to="/profil">Mon profil</NuxtLink>
      </div>

      <publication title="ma publication" content="bonjour vous" />
    </body>
  </html>
</template>

<script>
import publication from "~/components/publication";

export default {
  components: {
    publication,
  },
};
</script>
