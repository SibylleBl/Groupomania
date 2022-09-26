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
          <h2>Name</h2>
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
          <button class="dislike" @click="dislikePost(publication._id)">
            <font-awesome-icon icon="fa-solid fa-thumbs-down" />
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
    console.log(
      "🚀 ~ file: index.vue ~ line 77 ~ fetch ~  this.users",
      this.users
    );
  },

  methods: {
    deletePost(value) {
      console.log(value);
      this.$axios.$delete("http://localhost:3001/api/publications/" + value);

      // supprimer publication dans le tableau publications:

      for (let i = 0; i < this.publications.length; i++) {
        if (this.publications[i]._id === value) {
          this.publications.splice(i, 1);
        }
      }
    },

    likePost(value) {
      this.$axios.$post(
        `"http://localhost:3001/api/publications/${value}/like"`
      );
    },

    dislikePost(value) {
      this.$axios.$post(
        `"http://localhost:3001/api/publications/${value}/like"`
      );
      console.log(value);
    },
  },
};
</script>
