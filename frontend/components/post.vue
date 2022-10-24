<template>
  <div class="user_pub">
    <!-- ici le nom de la personne qui à créé la pub et sa photo -->
    <img :src="`${userImg}`" />
    <h2>{{ username }}</h2>
    <h2>{{ title }}</h2>
    <img :src="`${imageUrl}`" />
    <p>{{ message }}</p>

    <button type="submit" @click="$emit('delete-my-post', deletePost(_id))">
      <font-awesome-icon icon="fa-solid fa-trash" />
    </button>
    <div class="like_dislike">
      <button class="like" type="submit" @click="likePost">
        <font-awesome-icon icon="fa-solid fa-thumbs-up" />
      </button>
      <div class="counterLike">{{ likes }}</div>
    </div>

    <NuxtLink class="link" :to="`/modifyPublication/${_id}`">
      <font-awesome-icon icon="fa-solid fa-pen" />
    </NuxtLink>
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
    "userImg",
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
        console.log("🚀 ~ file: post.vue ~ line 51 ~ likePost ~ post", post);
        this.$emit("update-post", post);
      } catch ({ response }) {
        console.log(response);
      }
    },
  },
};
</script>
