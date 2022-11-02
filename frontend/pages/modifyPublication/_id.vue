<template>
  <createAndModifyPost mode="modify" />
</template>

<script>
export default {
  // data() {
  //   return {
  //     modify: {
  //       imageUrl: null,
  //       message: "Mon message",
  //       title: "Mon titre",
  //     },
  //   };
  // },
  // async fetch() {
  //   try {
  //     const modify = await this.$axios.$get(
  //       `http://localhost:3001/api/publications/${this.$route.params.id}`
  //     );
  //     console.log("🚀 ~ file: _id.vue ~ line 48 ~ fetch ~ modify", modify);
  //     this.modify = { ...modify };
  //   } catch ({ res }) {
  //     console.log(res);
  //   }
  // },
  // methods: {
  //   uploadImg() {
  //     this.imageUrl = this.$refs.file.files[0];
  //   },
  //   uploadTitle() {
  //     this.title = this.$refs.title.value;
  //     console.log(
  //       "🚀 ~ file: _id.vue ~ line 84 ~ modifyPost ~ this.$router",
  //       this.$router
  //     );
  //   },
  //   uploadMessage() {
  //     this.message = this.$refs.message.value;
  //   },
  //   async modifyPost() {
  //     const headers = {
  //       "Content-Type": "multipart/form-data",
  //     };
  //     const formData = new FormData();
  //     formData.append("image", this.imageUrl);
  //     formData.append("title", this.title);
  //     formData.append("message", this.message);
  //     await this.$axios
  //       .$put(
  //         "http://localhost:3001/api/publications/" + this.$route.params.id,
  //         formData,
  //         {
  //           headers,
  //         }
  //       )
  //       .then((res) => {
  //         console.log(res);
  //       });
  //     this.$router.push("/");
  //   },
  // },
};
</script>
