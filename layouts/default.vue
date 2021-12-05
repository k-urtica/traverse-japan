<template>
  <v-app>
    <app-bar />

    <v-main class="app-container">
      <v-container class="pt-6 pb-8 mb-10 px-xl-10">
        <Nuxt />
      </v-container>
    </v-main>

    <app-footer />
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import AppBar from '@/components/AppBar.vue';
import AppFooter from '@/components/AppFooter.vue';

export default Vue.extend({
  components: {
    AppBar,
    AppFooter,
  },
});
</script>

<style lang="scss" scoped>
.app-container {
  background-attachment: fixed;

  background-image: linear-gradient(
    45deg,
    rgb(164, 210, 185) 0%,
    rgb(164, 210, 185) 13%,
    rgb(140, 185, 176) 13%,
    rgb(140, 185, 176) 18%,
    rgb(116, 160, 167) 18%,
    rgb(116, 160, 167) 22%,
    rgb(92, 135, 158) 22%,
    rgb(92, 135, 158) 23%,
    rgb(67, 109, 148) 23%,
    rgb(67, 109, 148) 26%,
    rgb(43, 84, 139) 26%,
    rgb(43, 84, 139) 31%,
    rgb(19, 59, 130) 31%,
    rgb(19, 59, 130) 100%
  );
}
</style>
