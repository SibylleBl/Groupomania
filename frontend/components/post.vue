<template>
  <div>
    <h2>{{ title }}</h2>
    <p>{{ message }}</p>
    <p>{{ imageUrl }}</p>
  </div>
</template>

<script>
export default {
  name: "post",
  props: ["title", "message", "imageUrl"],
};
</script>
