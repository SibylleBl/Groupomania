<template>
  <div>
    <h1>test</h1>
    <FormulaireC></FormulaireC>
  </div>
</template>

<script>
export default {
  layout: "LayConnexion",
  auth: false,

  data() {
    return {
      login: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async userLogin() {
      try {
        let response = await this.$auth.loginWith("local", {
          data: this.login,
        });
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
