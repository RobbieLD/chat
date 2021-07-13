<template>
  <div>
    <v-card>
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title v-for="(m, i) in messages" :key="i">{{
              m
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <input
          type="text"
          v-model="message"
          placeholder="message"
          class="input"
        />
      <v-card-actions>
        <v-btn color="success" class="mr-4" @click="send">Send</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import io, { Socket } from "socket.io-client";
import User from "../models/user";

export default defineComponent({
  name: "Chat",
  components: {},
  data() {
    return {
      connected: false,
      messages: [] as string[],
      message: "",
      socket: {} as Socket,
      user: {} as User,
    };
  },
  methods: {
    send() {
      this.socket.emit("message", `${this.user.name}:${this.message}`);
      this.message = '';
    },
  },
  mounted() {
    // TODO: Strongly type the store with a shim
    this.user = (this as any).$store.state.auth.user;
    if (this.user) {
      const socket = io(process.env.VUE_APP_CHAT_URL, {
        withCredentials: true,
        extraHeaders: {
          Authorization: `Bearer ${this.user.token}`,
        },
      });

      socket.on("connect", () => {
        console.log(`${this.user.name} connected`);
      });

      socket.on("message", (message: string) => {
        this.messages.push(message);
      });

      this.socket = socket;
    }
  },

  beforeRouteEnter(to, from, next) {
    // This is the auth guard. I feel like there's probably a better way to get
    // the store by strongly typing it but I haven't looked into it yet.
    next((vm: any) => {
      const user = vm.$store.state.auth.user;
      if (user) {
        console.log(`User is: ${user.name}`);
      } else {
        console.log("User not authenticated, redirecting to login");
        vm.$router.push({ name: "Login" });
      }
    });
  },
});
</script>
<style scoped>
.input {
  border-radius: 0.5em;
  border: 1px solid lightgray;
  padding: 0.5em;
  background-color: aliceblue;
  display: block;
  margin-bottom: 1em;
}
</style>
