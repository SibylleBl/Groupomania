<template>
  <!DOCTYPE html>
  <html lang="fr">
    <body>
      <div id="app">
        <h1>Bienvenue{{ maVariable }}</h1>
        <NuxtLink to="/inscription">Je m'inscris</NuxtLink>
        <NuxtLink to="/profil">Mon profil</NuxtLink>
      </div>

      <post
        v-if="posts.length > 0"
        :title="maVariable"
        content="bonjour vous"
      />
    </body>
  </html>
</template>

<script>
import post from "~/components/post";

export default {
  components: {
    post,
  },
  data() {
    return { maVariable: "Sibylle", posts: [] };
  },
  methods: {
    changeMaVariable() {
      this.maVariable = "toto";
    },
  },
};
</script>
