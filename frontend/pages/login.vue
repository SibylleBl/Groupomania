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
  methods: {},
};
</script>
