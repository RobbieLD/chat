<template>
  <div>
    <h1>Chat</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import io from "socket.io-client";
import User from "../models/user";

export default defineComponent({
  name: "Chat",
  components: {},
  mounted() {
      // TODO: Stringly type the store with a shim
    const user: User = (this as any).$store.state.auth.user;
    if (user) {
      const connector = io(process.env.VUE_APP_CHAT_URL, {
        withCredentials: true,
        extraHeaders: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      connector.on('connect', () => {
          console.log('Connected');
      })
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
