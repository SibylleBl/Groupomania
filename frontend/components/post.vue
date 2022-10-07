<template>
  <div>
    <h2>{{ title }}</h2>
    <img :src="`${imageUrl}`" />
    <p>{{ message }}</p>

    <p style="display: none">{{ _id }}</p>
  </div>
</template>

<script>
export default {
  name: "post",
  props: ["title", "message", "imageUrl", "_id"],
};
</script>
