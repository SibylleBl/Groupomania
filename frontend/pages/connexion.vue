<template>
  <FormulaireC></FormulaireC>
</template>

<script>
export default {
  layout: "LayConnexion",
  auth: false,

  data() {
    console.log(this);
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
