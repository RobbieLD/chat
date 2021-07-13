<template>
  <v-card elevation="2">
    <v-card-header>
      <v-card-header-text>
        <v-card-title>Authenticator</v-card-title>
      </v-card-header-text>
    </v-card-header>
    <v-card-text>
      <input
        type="text"
        v-model="username"
        placeholder="username"
        class="input"
      />
      <input
        type="password"
        v-model="password"
        placeholder="password"
        class="input"
      />
    </v-card-text>
    <v-card-actions>
      <v-btn color="success" class="mr-4" @click="authenticate">Login</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import AuthRequest from "../models/auth-request";

export default defineComponent({
  name: "Authenticator",
  data() {
    return {
      username: "admin",
      password: "password",
    };
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    return {
      goToChat: () => {
          router.push({
              name: 'Chat'
          })
      },
      login: async (request: AuthRequest) => {
        return await store.dispatch("auth/login", request);
      },
    };
  },
  methods: {
    authenticate() {
      const request: AuthRequest = {
        username: this.username,
        password: this.password,
      };

      this.login(request)
        .then(() => {
          // Login succeeded so we can go to the chat page
          this.goToChat();
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
});
</script>

<style scoped>
/* vuetify doesn't have forms yet */
.input {
  border-radius: 0.5em;
  border: 1px solid lightgray;
  padding: 0.5em;
  background-color: aliceblue;
  display: block;
  margin-bottom: 1em;
}
</style>