<template>
  <form method="post">
    <div>
      <label for="password">Mot de passe actuel:</label>
      <input id="password" />
    </div>

    <div>
      <label for="newPassword">nouveau mot de passe:</label>
      <input id="newPassword" />
    </div>

    <button>Enregistrer</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      modify: {
        image: "",
        description: "",
        title: "",
      },
    };
  },
};
</script>
