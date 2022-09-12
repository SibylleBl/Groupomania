<template>
  <div>
    <h1>Mon profil</h1>
    <NuxtLink to="/">Page d'accueil</NuxtLink>

    <div class="user">
      <div v-for="user in users" :key="user.name" class="user">
        <userList :name="user.name" :email="user.email"></userList>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "Sibylle",
      publications: [],
      users: [],
    };
  },

  methods: {
    async fetch() {
      this.user = await this.$axios.$get("http://localhost:3001/api/auth/:id");
    },
  },
};
</script>
