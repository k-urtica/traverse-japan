<template>
  <v-btn
    depressed
    :dark="dark"
    :block="block"
    :large="large"
    :color="color"
    :loading="loading"
    class="glass-button rounded-lg text-none"
  >
    <slot />
  </v-btn>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  props: {
    large: {
      type: Boolean,
      default: false,
    },
    block: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: 'rgba(255,255,255,0.16)',
    },
    dark: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style lang="scss" scoped>
.glass-button {
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  backdrop-filter: blur(12px) !important;
  -webkit-backdrop-filter: blur(12px) !important;
  box-shadow: rgba(240, 240, 240, 0.15) 0px 0px 12px !important;
}
</style>
