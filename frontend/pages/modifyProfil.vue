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
      <input id="imageUrl" type="file" />
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

  methods: {
    uploadImg() {
      this.imageUrl = this.$refs.file.files[0];
      console.log(
        "🚀 ~ file: newPost.vue ~ line 40 ~ uploadImg ~  this.imageUrl",
        this.imageUrl
      );
    },

    uploadTitle() {
      this.title = this.$refs.title.value;
    },

    uploadMessage() {
      this.message = this.$refs.message.value;
    },

    createPost() {
      const headers = {
        "Content-Type": "multipart/form-data",
      };
      const formData = new FormData();
      formData.append("image", this.imageUrl);
      formData.append("title", this.title);
      formData.append("message", this.message);

      this.$axios
        .$post("http://localhost:3001/api/publications/", formData, {
          headers,
        })
        .then((res) => {
          res.data.files;
          res.status;
        });

      this.$router.push("/");
    },
  },
};
</script>
