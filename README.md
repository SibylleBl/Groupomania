# GROUPOMANIA - Réseau social d'entreprise

Technologies utilisées pour ce projet:

- NodeJS
- MongoDB
- Nuxt.js
- Sass

# Installation et lancement:

# BACKEND

## Pour installer le serveur

Ouvrez le terminal puis positionnez-vous dans le dossier "backend" afin de tapez la commande suivante:
`npm install node server`

Ensuite, installez MongoDB:
https://www.mongodb.com/docs/manual/installation/

Dirigez-vous dans le fichier .env et remplissez le champs suivant de votre identifiant mongoDB:

"MONGO_ID= ici votre identifiant"

## Lancer le backend:

Positionnez-vous dans le dossier backend puis rentrez la commande suivante dans le terminal:
`npm run dev`

# FRONTEND

## Installation du framework Nuxt.js:

Positionnez-vous dans le dossier frontend afin d'installer Nuxt.js:
https://nuxtjs.org/docs/get-started/installation/

Puis, lancez Nuxt toujours dans le dossier frontend avec la commande suivante:
`npm run dev`

## Installation et lancement de SASS:

Dans un premier temps, suivre les indications d'installations de Sass:
https://sass-lang.com/install

Puis, ajoutez la ligne suivante dans votre fichier "nuxt.config.js":

css: [
"@/assets/sass/style.scss"
]

Enfin, pour lancer Sass, positionnez-vous dans le dossier frontend et tapez la commande suivante:
`npm run sass`
