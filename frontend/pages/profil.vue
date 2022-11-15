<template>
  <section class="profil">
    <h1 class="profil-title">Mon profil</h1>

    <div class="profil-user">
      <profil
        :name="$auth.$state.user.name"
        :email="$auth.$state.user.email"
        :imageUrl="$auth.$state.user.imageUrl"
      ></profil>
    </div>
    <NuxtLink class="profil-modify" to="./modifyProfil"> Modifier </NuxtLink>
  </section>
</template>

<script>
export default {
  data() {
    return {
      publications: [],
      user: [],
    };
  },

  async fetch() {
    this.user = await this.$axios.$get("http://localhost:3001/api/auth/me");
    console.log(this.user);
    this.publications = await this.$axios.$get(
      "http://localhost:3001/api/publications"
    );
  },

  methods: {},
};
</script>
