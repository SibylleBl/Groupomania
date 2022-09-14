<template>
  <div>
    <h2>{{ name }}</h2>
    <p>{{ email }}</p>
    <!-- <p>{{ imageUrl }}</p> -->
  </div>
</template>

<script>
export default {
  name: "profil",
  props: ["name", "email", "imageUrl"],
};
</script>
