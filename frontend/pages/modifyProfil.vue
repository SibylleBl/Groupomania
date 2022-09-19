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

    <button onclick="window.location.href = './modifyPassword'">
      Changer mon mot de passe
    </button>

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
