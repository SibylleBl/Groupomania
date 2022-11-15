<template>
  <form class="modifyProfil" method="put">
    <div class="blocks">
      <div class="block">
        <label for="imageUrl">Photo de profil:</label>

        <input id="imageUrl" type="file" ref="file" @change="uploadImg" />
      </div>
      <div class="block">
        <label for="name">Nom:</label>
        <input
          id="name"
          v-model="modify.name"
          ref="name"
          @change="uploadName"
        />
      </div>

      <div class="block">
        <label for="email">Adresse mail:</label>
        <input
          id="email"
          v-model="modify.email"
          ref="email"
          @change="uploadEmail"
        />
      </div>
    </div>
    <button type="submit" @click="modifyUser()">Enregistrer</button>
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
    },

    uploadName() {
      this.name = this.$refs.name.value;
    },

    uploadEmail() {
      this.email = this.$refs.email.value;
    },

    modifyUser() {
      const headers = {
        "Content-Type": "multipart/form-data",
      };
      const formData = new FormData();
      formData.append("image", this.imageUrl);
      formData.append("name", this.name);
      formData.append("email", this.email);

      this.$axios
        .$put("http://localhost:3001/api/auth/modifyUser", formData, {
          headers,
        })
        .then((res) => {
          res.data.files;
          res.status;
        });

      // this.$router.push("/");
    },
  },
};
</script>
