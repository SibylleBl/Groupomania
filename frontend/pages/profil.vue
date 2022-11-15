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

<style lang="scss">
@import "../assets/sass/utils/mixins";
@import "../assets/sass/utils/variables";

.profil {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .profil-title {
    color: $dark;
  }
  .profil-user {
    width: 50%;
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.2);
    .user-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: white;
      padding: 10px;

      img {
        width: 200px;
        border-radius: 50%;
      }
    }
  }
  .profil-modify {
    @include buttonandNL;
  }
}
</style>
