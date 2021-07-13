<template>
  <v-app>
    <v-app-bar app>
      <v-app-bar-title>Vue Chat</v-app-bar-title>
      <v-spacer></v-spacer>
      <current-user />
      <v-divider inset vertical></v-divider>
      <v-btn icon>
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CurrentUser from "./components/CurrentUser.vue"

export default defineComponent({
  name: "App",
  components:{
    CurrentUser
  },
  data() {
    return {
      //
    };
  },
});
</script>
