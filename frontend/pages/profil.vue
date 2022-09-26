<template>
  <div>
    <h1>Mon profil</h1>
    <NuxtLink to="/">Page d'accueil</NuxtLink>

    <div class="user">
      <div class="user">
        <userList
          :name="$auth.$state.user.name"
          :email="$auth.$state.user.email"
          :imageUrl="$auth.$state.user.imageUrl"
        ></userList>
      </div>
      <NuxtLink to="./modifyProfil"> Modifier </NuxtLink>
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

  methods: {},
};
</script>
