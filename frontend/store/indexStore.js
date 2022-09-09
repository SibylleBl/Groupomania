// import Vue from "vue";
// import Vuex from "vuex";

// Vue.use(Vuex);

// export default new Vuex.Store({
//   state: {
//     users: [],
//   },

//   mutations: {
//     set_users(state, users) {
//       state.users = users;
//     },
//   },

//   methods: {
//     async loadUsers({ commit }) {
//       let response = await Api().get("/users");
//       let users = response.data.data;
//       commit(
//         "set_users",
//         users.map((u) => u.attributes)
//       );
//     },
//   },
// });
