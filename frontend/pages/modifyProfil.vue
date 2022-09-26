<template>
  <form method="post">
    <div>
      <label for="name">Nom:</label>
      <input id="name" />
    </div>
    <div>
      <label for="email">Adresse mail:</label>
      <input id="email" />
    </div>
    <div>
      <label for="imageUrl">Photo de profil:</label>
      <input id="imageUrl" />
    </div>

    <NuxtLink to="./modifyPassword"> Changer mon mot de passe </NuxtLink>

    <button>Enregistrer</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      modify: {
        name: "",
        email: "",
        imageUrl: "",
      },
    };
  },
};
</script>
