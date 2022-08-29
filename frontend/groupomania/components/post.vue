<template>
  <div>
    <h2>{{ title }}</h2>
    <p>{{ content }}</p>
  </div>
</template>

<script>
export default {
  name: "post",
  props: ["title", "content"],
  data() {
    return { maVariable: "coucou" };
  },
};
</script>
