<template>
  <section class="index">
    <nav>
      <h1>Bienvenue {{ $auth.state.user.name }}</h1>
      <NuxtLink to="/inscription">Je m'inscris</NuxtLink>
      <NuxtLink to="/login">Je me connecte</NuxtLink>
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
            <post :title="publication.title" :content="publication.message" />
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
  name: "home page",
  // components: { userList },
  // components: {
  //   post,
  // },
  data() {
    return {
      publications: [],
      users: [],
    };
  },

  async fetch() {
    this.publications = await this.$axios.$get(
      "http://localhost:3001/api/publications/"
    );
  },

  methods: {
    changeName() {
      this.name = "toto";
    },
  },
};
</script>
