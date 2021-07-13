<template>
  <div>
      <authenticator />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Authenticator from "../components/Authenticator.vue";

export default defineComponent({
  name: "Login",

  components: {
      Authenticator,
  },
});
</script>