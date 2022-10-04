<template>
  <form method="post">
    <div>
      <label for="imageUrl">Image:</label>
      <input id="imageUrl" type="file" />
    </div>
    <div>
      <label for="title">Titre:</label>
      <input id="title" />
    </div>
    <div>
      <label for="message">Message:</label>
      <input id="message" />
    </div>

    <button type="submit" @click="modifyPost()">Enregistrer</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      modify: {
        imageUrl: "",
        message: "",
        title: "",
      },
    };
  },

  methods: {
    async modifyPost() {
      await this.$axios.$put(
        "http://localhost:3001/api/publications/" + this.$route.params.id,
        {
          title: this.modify.title,
          message: this.modify.message,
          imageUrl: this.modify.imageUrl,
        }
      );
    },
  },
};
</script>
