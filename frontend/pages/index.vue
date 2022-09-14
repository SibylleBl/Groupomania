<template>
  <section class="index">
    <nav>
      <h1 v-if="$auth.loggedIn">Bienvenue {{ $auth.$state.user.name }}</h1>
      <h1 v-else>Bienvenue inconnu</h1>
      <NuxtLink to="/register">Je m'inscris</NuxtLink>
      <NuxtLink to="/login">Je me connecte</NuxtLink>
    </nav>

    <article class="main">
      <div class="column-1">
        <NuxtLink to="/profil">Mon profil</NuxtLink>
        <profil :name="profil.name" :email="profil.email" />
      </div>
      <div class="publications">
        <div v-if="publications.length > 0" class="posts">
          <div
            v-for="publication in publications"
            :key="publication.title"
            class="post"
          >
            <post
              :title="publication.title"
              :message="publication.message"
              :imageUrl="publication.imageUrl"
            />
          </div>
        </div>
      </div>
      <div class="column-2">
        <div class="contact">
          <p>Mes contacts</p>

          <div class="users">
            <div v-for="user in users" :key="user.name" class="user">
              <userList :name="user.name" :email="user.email"></userList>
            </div>
          </div>
        </div>
      </div>
    </article>
  </section>
</template>

<script>
export default {
  data() {
    return {
      publications: [],
      users: [],
      profil: {},
    };
  },

  async fetch() {
    this.publications = await this.$axios.$get(
      "http://localhost:3001/api/publications/"
    );
  },
  async fetch() {
    this.users = await this.$axios.$get("http://localhost:3001/api/auth/");
  },
  async fetch() {
    this.profil = await this.$axios.$get("http://localhost:3001/api/auth/me");
  },
};
</script>
