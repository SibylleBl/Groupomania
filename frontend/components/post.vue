<template>
  <div class="user_pub">
    <!-- ici le nom de la personne qui à créé la pub et sa photo -->
    <div class="user-info">
      <img class="profil-picture" :src="`${userImg}`" />
      <h2>{{ username }}</h2>
    </div>
    <div class="publication-info">
      <img :src="`${imageUrl}`" />
      <h2>{{ title }}</h2>
      <p>{{ message }}</p>
    </div>

    <div class="buttons">
      <button
        v-if="$auth.$state.user._id == userId || isAdmin"
        type="submit"
        @click="$emit('delete-my-post', deletePost(_id))"
      >
        <font-awesome-icon icon="fa-solid fa-trash" />
      </button>
      <div class="like_dislike">
        <button
          @click="likePost"
          :class="[{ 'button-red': usersLiked.includes(userId) }]"
          type="submit"
        >
          <font-awesome-icon icon="fa-solid fa-thumbs-up" />
        </button>

        <div class="counterLike">{{ likes }}</div>
      </div>
      <NuxtLink
        v-if="$auth.$state.user._id == userId || isAdmin"
        class="link"
        :to="`/modifyPublication/${_id}`"
      >
        <font-awesome-icon icon="fa-solid fa-pen" />
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  name: "post",
  props: [
    "title",
    "message",
    "imageUrl",
    "_id",
    "likes",
    "username",
    "userId",
    "userImg",
    "usersLiked",
    "isAdmin",
  ],

  methods: {
    async deletePost(value) {
      try {
        await this.$axios.$delete(
          "http://localhost:3001/api/publications/" + value
        );
      } catch ({ response }) {
        console.log(response);
      }
    },

    async likePost() {
      try {
        const post = await this.$axios.$post(
          `http://localhost:3001/api/publications/${this._id}/like/`
        );
        console.log("🚀 ~ file: post.vue ~ line 67 ~ likePost ~ post", post);

        this.$emit("update-post", post);
      } catch ({ response }) {
        console.log(response);
      }
    },
  },
};
</script>
