<template>
  <section class="index">
    <div v-if="publications.length > 0" class="posts">
      <div
        v-for="publication in publications"
        :key="publication.title"
        class="post"
      >
        <post
          :username="publication.username"
          :title="publication.title"
          :message="publication.message"
          :imageUrl="publication.imageUrl"
          :_id="publication._id"
          :likes="publication.likes"
          class="pub"
          @delete-my-post="deletePost(publication._id)"
          @update-post="updatePost"
        />
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
      this.publications = this.publications.filter(
        (publication) => value !== publication._id
      );
    },

    updatePost(post) {
      console.log(this.publications);
      console.log(post);
      const userId = this.$auth.$state.user._id;
      console.log(
        "🚀 ~ file: index.vue ~ line 74 ~ updatePost ~ userId",
        userId
      );
      this.publications = this.publications.map((publication) => {
        if (!post.usersLiked.includes(userId)) {
          return post.likes + 1;
        }
      });
    },
  },
};
</script>
