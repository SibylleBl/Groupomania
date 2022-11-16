<template>
  <div class="user-card">
    <img class="user-img" :src="`${imageUrl}`" />
    <div class="user-text">
      <h2>{{ name }}</h2>
      <p>{{ email }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "userList",
  props: ["name", "email", "imageUrl"],
};
</script>
