<template>
  <form method="post">
    <div>
      <label for="image">Image:</label>
      <input id="image" />
    </div>
    <div>
      <label for="title">Titre:</label>
      <input id="title" />
    </div>
    <div>
      <label for="description">Description:</label>
      <input id="description" />
    </div>

    <input class="button" type="submit" value="Modifier" />
  </form>
</template>

<script>
export default {
  data() {
    return {
      modify: {
        image: "",
        description: "",
        title: "",
      },
    };
  },
};
</script>
