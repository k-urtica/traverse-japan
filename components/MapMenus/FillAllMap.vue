<template>
  <glass-button class="py-5 py-sm-6" block dark @click.native="fillAll()">
    <v-icon color="pink lighten-2" class="mr-2">{{ mdiFlagVariant }}</v-icon>
    <span class="font-weight-bold text-sm-subtitle-1 grey--text text--lighten-5">
      日本を踏破する
    </span>
  </glass-button>
</template>

<script lang="ts">
import Vue from 'vue';
import { mdiFlagVariant } from '@mdi/js';
import { MapModule } from '@/store';
import GlassButton from '@/components/GlassParts/GlassButton.vue';

export default Vue.extend({
  components: {
    GlassButton,
  },
  data() {
    return {
      mdiFlagVariant,
    };
  },
  methods: {
    fillAll() {
      MapModule.fillAll();
    },
  },
});
</script>
