<template>
  <section>
    <div>
      <h1>Mon profil</h1>
      <NuxtLink to="/">Page d'accueil</NuxtLink>

      <div class="user">
        <div class="user">
          <profil
            :name="$auth.$state.user.name"
            :email="$auth.$state.user.email"
            :imageUrl="$auth.$state.user.imageUrl"
          ></profil>
        </div>
        <NuxtLink to="./modifyProfil"> Modifier </NuxtLink>
      </div>
    </div>

    <div class="myPub"></div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      // name: "Sibylle",
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
