<template>
  <section class="index">
    <div v-if="publications.length > 0" class="posts">
      <div
        v-for="publication in publications"
        :key="publication.title"
        class="post"
      >
        <div class="user_pub">
          <!-- ici le nom de la personne qui à créé la pub et sa photo -->
          <p>photo</p>
          <h2>{{ publication.username }}</h2>
        </div>

        <post
          :title="publication.title"
          :message="publication.message"
          :imageUrl="publication.imageUrl"
          :_id="publication._id"
          class="pub"
        />
        <button @click="deletePost(publication._id)">
          <font-awesome-icon icon="fa-solid fa-trash" />
        </button>
        <NuxtLink class="link" :to="`/modifyPublication/${publication._id}`">
          <font-awesome-icon icon="fa-solid fa-pen" />
        </NuxtLink>
        <div class="like_dislike">
          <button class="like" @click="likePost(publication._id)">
            <font-awesome-icon icon="fa-solid fa-thumbs-up" />
          </button>
        </div>
      </div>
    </div>

    <div class="column">
      <div class="welcome">
        <h1 v-if="$auth.loggedIn">Bienvenue {{ $auth.$state.user.name }}</h1>
        <h1 v-else>Bienvenue inconnu</h1>
        <NuxtLink class="link" v-if="$auth.loggedIn" to="profil">
          <font-awesome-icon icon="fa-solid fa-user" /> Mon profil
        </NuxtLink>
      </div>
      <div class="contact">
        <p>Vous connaissez peut-être:</p>

        <div class="users">
          <div v-for="user in users" :key="user.name" class="user">
            <userList :name="user.name"></userList>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  auth: false,
  data() {
    return {
      publications: [],
      users: [],
      likes: Number,
      dislikes: Number,
    };
  },

  async fetch() {
    this.publications = await this.$axios.$get(
      "http://localhost:3001/api/publications/"
    );
    this.users = await this.$axios.$get("http://localhost:3001/api/auth/");
    // console.log(
    //   "🚀 ~ file: index.vue ~ line 77 ~ fetch ~  this.users",
    //   this.users
    // );
    // console.log($auth.$state.user.name);
  },

  methods: {
    async deletePost(value) {
      // console.log(value);
      try {
        const succes = await this.$axios.$delete(
          "http://localhost:3001/api/publications/" + value
        );
        console.log(
          "🚀 ~ file: index.vue ~ line 87 ~ deletePost ~ succes",
          succes
        );
        // supprimer publication dans le tableau publications:
        this.publications = this.publications.filter(
          (publication) => value !== publication._id
        );
      } catch ({ response }) {
        console.log(response);
      }
    },

    async likePost(value) {
      try {
        await this.$axios.$post(
          `http://localhost:3001/api/publications/${value}/like/`
        );
      } catch ({ response }) {
        console.log(response);
      }
    },
  },
};
</script>
