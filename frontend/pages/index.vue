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
          <p>{{ publication.userId }}</p>
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
        <NuxtLink :to="`/modifyPublication/${publication._id}`">
          <font-awesome-icon icon="fa-solid fa-pen" />
        </NuxtLink>
        <div class="like_dislike">
          <div class="like">
            <font-awesome-icon icon="fa-solid fa-thumbs-up" />
          </div>
          <div class="dislike">
            <font-awesome-icon icon="fa-solid fa-thumbs-down" />
          </div>
        </div>
      </div>
    </div>

    <div class="column">
      <div class="welcome">
        <h1 v-if="$auth.loggedIn">
          Bienvenue {{ $auth.$state.user.name }} {{ $auth.$state.user._id }}
        </h1>
        <h1 v-else>Bienvenue inconnu</h1>
        <button
          v-if="$auth.loggedIn"
          onclick="window.location.href = '/profil'"
        >
          <font-awesome-icon icon="fa-solid fa-user" /> Mon profil
        </button>
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
    this.users = await this.$axios.$get("http://localhost:3001/api/auth/");
  },

  methods: {
    deletePost(value) {
      console.log(value);
      this.$axios.$delete("http://localhost:3001/api/publications/" + value);
      document.location.reload();
    },
  },
};
</script>
