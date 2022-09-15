<template>
  <section class="index">
    <article class="main">
      <div class="column-1">
        <profil
          :name="$auth.$state.user.name"
          :email="$auth.$state.user.email"
        />
      </div>
      <div class="publications">
        <div v-if="publications.length > 0" class="posts">
          <div
            v-for="publication in publications"
            :key="publication.title"
            class="post"
          >
            <post
              :title="publication.title"
              :message="publication.message"
              :imageUrl="publication.imageUrl"
            />
          </div>
        </div>
      </div>
      <div class="column-2">
        <div class="contact">
          <p>Vous connaissez peut-être:</p>

          <div class="users">
            <div v-for="user in users" :key="user.name" class="user">
              <userList :name="user.name"></userList>
            </div>
          </div>
        </div>
      </div>
    </article>
  </section>
</template>

<script>
export default {
  data() {
    return {
      publications: [],
      users: [],
    };
  },

  async fetch() {
    this.publications = await this.$axios.$get(
      "http://localhost:3001/api/publications/"
    );
    this.users = await this.$axios.$get("http://localhost:3001/api/auth/");
  },
};
</script>
