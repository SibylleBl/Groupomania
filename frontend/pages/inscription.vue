<template>
  <!DOCTYPE html>
  <html lang="fr">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </head>

    <body>
      <h1>Je m'inscris</h1>
      <NuxtLink to="/">Page d'accueil</NuxtLink>

      <form class="inscription">
        <h3>Inscription</h3>
        <label for="name">Name:</label>
        <input id="name" v-model="name" />
        <label for="pseudo">Pseudo:</label>
        <input id="name" v-model="name" />
        <label for="email">Adresse mail:</label>
        <input id="email" v-model="email" />

        <input class="button" type="submit" value="Submit" />
      </form>
    </body>
  </html>
</template>
