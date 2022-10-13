<template>
  <div class="user_pub">
    <!-- ici le nom de la personne qui à créé la pub et sa photo -->
    <!-- <p>photo</p> -->
    <h2>{{ username }}</h2>
    <h2>{{ title }}</h2>
    <img :src="`${imageUrl}`" />
    <p>{{ message }}</p>

    <button type="submit" @click="$emit('delete-my-post', deletePost(_id))">
      <font-awesome-icon icon="fa-solid fa-trash" />
    </button>
    <div class="like_dislike">
      <button
        class="like"
        type="submit"
        @click="$emit('like-my-post', likePost(_id))"
      >
        <font-awesome-icon icon="fa-solid fa-thumbs-up" />
      </button>
      <div class="counterLike">{{ likes }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "post",
  props: ["title", "message", "imageUrl", "_id", "username", "likes"],

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
