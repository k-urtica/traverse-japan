<template>
  <v-app-bar app flat color="rgba(20,20,20,0.15)" dark>
    <v-toolbar-title tag="h1" class="font-weight-bold text-h5">
      <button @click="backToHome()">日本踏破図<span class="emoji">🗾</span></button>
    </v-toolbar-title>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue';
import { MapModule } from '@/store';

export default Vue.extend({
  methods: {
    backToHome() {
      MapModule.resetMap();
      this.$router.push('/');
    },
  },
});
</script>
