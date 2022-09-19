<template>
  <div>
    <p>imageUrl</p>
    <h2>{{ name }}</h2>
    <p>{{ email }}</p>
  </div>
</template>

<script>
export default {
  name: "userList",
  props: ["name", "email"],
};
</script>
