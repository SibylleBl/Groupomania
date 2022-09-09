<template>
  <div>
    <h2>{{ name }}</h2>
    <p>{{ email }}</p>
  </div>
</template>

<script>
export default {
  name: "post",
  props: ["name", "email"],
};
</script>
