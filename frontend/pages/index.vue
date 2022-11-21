<template>
  <section class="index">
    <div v-if="publications.length > 0" class="posts">
      <div
        v-for="publication in publications"
        :key="publication._id"
        class="post"
      >
        <post
          :isAdmin="$auth.$state.user.isAdmin"
          :userImg="publication.userImg"
          :username="publication.username"
          :userId="publication.userId"
          :title="publication.title"
          :message="publication.message"
          :imageUrl="publication.imageUrl"
          :_id="publication._id"
          :likes="publication.likes"
          :usersLiked="publication.usersLiked"
          class="pub"
          @delete-my-post="deletePost(publication._id)"
          @update-post="updatePost"
        />
      </div>
    </div>

    <div class="column">
      <div class="welcome">
        <h1 v-if="$auth.loggedIn">Bienvenue {{ $auth.$state.user.name }}</h1>
        <h1 v-else>Bienvenue inconnu</h1>
        <NuxtLink class="link" v-if="$auth.loggedIn" to="profil">
          <font-awesome-icon icon="fa-solid fa-user" /> Mon profil
        </NuxtLink>
      </div>
      <div class="contact" v-if="$auth.loggedIn">
        <p>Vous connaissez peut-être:</p>

        <div class="users">
          <div
            v-for="user in users.filter(
              (user) => user._id !== this.$auth.$state.user._id
            )"
            :key="user.name"
            class="user"
          >
            <userList
              :name="user.name"
              :email="user.email"
              :imageUrl="user.imageUrl"
            ></userList>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  auth: false,
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

  methods: {
    deletePost(id) {
      this.publications = this.publications.filter(
        (publication) => id !== publication._id
      );
    },

    updatePost(post) {
      this.publications = this.publications.map((publication) => {
        if (publication._id === post._id) {
          return post;
        }
        return publication;
      });
    },
  },
};
</script>

<style lang="scss">
@import "../assets/sass/utils/mixins";
@import "../assets/sass/utils/variables";

.index {
  display: flex;
  max-width: 1440px;
  margin-top: 5em;
  justify-content: space-between;

  .posts {
    @include posts;
  }

  .user-card {
    @include user-card;
  }

  .column {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: $light;

    color: $dark;
    width: auto;

    .contact {
      margin-top: 30px;
    }
    .users {
      display: block;
      flex-wrap: wrap;

      .user {
        margin: 1em;
        border-radius: 10px;
        background-color: white;
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.2);
        .user-text {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
      }
    }
  }
}

button,
.link {
  @include buttonandNL;
  text-decoration: none;
}
.button-red {
  background-color: $orange;
}

//responsive
@media only screen and (max-width: 1020px) {
  .index {
    flex-direction: column-reverse;
    margin-top: 1em;

    .posts {
      display: flex;
      .post {
        width: auto;
      }
    }

    .column {
      width: auto;
      margin: auto;

      .contact {
        margin-top: 20px;
      }

      .users {
        display: flex;
        margin: auto;
        width: auto;
        flex-direction: row;
        flex-wrap: wrap;

        .user {
          width: 40%;
          .user-card {
            flex-direction: row;
            .user-text {
              align-items: flex-start;
              margin-left: 2px;
            }
          }
        }
      }
    }
  }
}

@media only screen and (max-width: 800px) {
  .index {
    .posts {
      display: flex;
      .post {
        width: auto;
      }
    }

    .column {
      .users {
        flex-direction: column;
        .user {
          width: 100%;
          margin: 2px;
        }
      }
    }
  }
}
</style>
