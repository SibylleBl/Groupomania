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
          @like-my-post="
            likePost(
              publication.usersLiked,
              publication.likes,
              $auth.$state.user._id
            )
          "
        />

        <NuxtLink class="link" :to="`/modifyPublication/${publication._id}`">
          <font-awesome-icon icon="fa-solid fa-pen" />
        </NuxtLink>
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

    likePost(array, counter, userId) {
      console.log(array, counter, userId);
      if (array.includes(userId)) {
        array.push(userId);
        counter + 1;
      }
    },
  },
};
</script>
