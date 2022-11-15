<template>
  <div class="user-info">
    <img :src="`${imageUrl}`" />
    <h2>{{ name }}</h2>
    <p>{{ email }}</p>
  </div>
</template>

<script>
export default {
  name: "profil",
  props: ["name", "email", "imageUrl"],
};
</script>
