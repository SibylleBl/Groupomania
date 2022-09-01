<template>
  <!DOCTYPE html>
  <html lang="fr">
    <section class="index">
      <nav>
        <h1>Bienvenue {{ name }}</h1>
        <NuxtLink to="/inscription">Je m'inscris</NuxtLink>
        <NuxtLink to="/connection">Je me connecte</NuxtLink>
      </nav>

      <article class="main">
        <div class="column-1">
          <NuxtLink to="/profil">Mon profil</NuxtLink>
        </div>
        <div class="publication">
          <div v-if="publications.length > 0" class="posts">
            <div
              v-for="publication in publications"
              :key="publication.title"
              class="post"
            >
              <post :title="publication.title" :content="publication.content" />
            </div>
          </div>
        </div>
        <div class="column-2">
          <p>Mes contacts</p>
        </div>
      </article>
    </section>
  </html>
</template>

<script>
export default {
  // components: {
  //   post,
  // },
  data() {
    return {
      name: "Sibylle",
      publications: [],
    };
  },
  async fetch() {
    this.publications = await this.$axios.$get(
      "http://localhost:6666/api/publications/devtoutemespub"
    );
  },

  methods: {
    changeName() {
      this.name = "toto";
    },
  },
};
</script>
