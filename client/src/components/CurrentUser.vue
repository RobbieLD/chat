<template>
  <v-btn text>{{ name }}</v-btn>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from 'vuex'

export default defineComponent({
    name: 'CurrentUser',
    setup() {
        const store = useStore();

        const name = computed(() => {
            const user = store.state.auth.user;

            if (user) {
                return user.name;
            } else {
                return 'Login';
            }
        });

        return { name }
    }
});
</script>

<style>

</style>