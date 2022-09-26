<template>
  <div>
    <h2>{{ name }}</h2>
    <p>{{ email }}</p>
    <img :src="`${imageUrl}`" />
  </div>
</template>

<script>
export default {
  name: "profil",
  props: ["name", "email", "imageUrl"],
};
</script>
