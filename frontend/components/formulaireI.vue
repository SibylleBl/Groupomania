<template>
  <form>
    <h3>Inscription</h3>
    <div>
      <label for="name">Name:</label>
      <input id="name" v-model="name" />
    </div>
    <div>
      <label for="pseudo">Pseudo:</label>
      <input id="pseudo" v-model="name" />
    </div>
    <div>
      <label for="email">Adresse mail:</label>
      <input id="email" v-model="email" />
    </div>
    <div>
      <label for="password">Mot de passe:</label>
      <input id="password" v-model="password" />
    </div>

    <input class="button" type="submit" value="Submit" />
  </form>
</template>
