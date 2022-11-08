<template>
  <div class="user-card">
    <img class="user-img" :src="`${imageUrl}`" />
    <h2>{{ name }}</h2>
    <p>{{ email }}</p>
  </div>
</template>

<script>
export default {
  name: "userList",
  props: ["name", "email", "imageUrl"],
};
</script>
