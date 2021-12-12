<template>
  <glass-button class="py-5 py-sm-6" block dark @click.native="resetMap()">
    <v-icon color="grey" class="mr-2">{{ mdiDelete }}</v-icon>
    <span class="font-weight-bold text-sm-subtitle-1 grey--text text--lighten-5">
      地図をリセットする
    </span>
  </glass-button>
</template>

<script lang="ts">
import Vue from 'vue';
import { mdiDelete } from '@mdi/js';
import { MapModule } from '@/store';
import GlassButton from '@/components/GlassParts/GlassButton.vue';

export default Vue.extend({
  components: {
    GlassButton,
  },
  data() {
    return {
      mdiDelete,
    };
  },
  methods: {
    resetMap() {
      MapModule.resetMap();
    },
  },
});
</script>
