<template>
  <v-btn rounded dark color="rgba(29, 161, 242, 0.85)" class="share-btn" @click="share()">
    <v-icon left v-text="mdiTwitter" />
    踏破地図をシェアする!
  </v-btn>
</template>

<script lang="ts">
import Vue from 'vue';
import { mdiTwitter } from '@mdi/js';

export default Vue.extend({
  data() {
    return {
      mdiTwitter,
    };
  },
  computed: {
    shareUrl() {
      const pageTitle = encodeURI(document.title);
      const pageUrl = encodeURIComponent(this.$config.baseURL + this.$route.fullPath);
      return `https://twitter.com/intent/tweet?url=${pageUrl}&text=${pageTitle}`;
    },
  },
  methods: {
    share() {
      window.open(this.shareUrl, '_blank', 'noopener noreferrer');
    },
  },
});
</script>

<style lang="scss" scoped>
.share-btn {
  box-shadow: rgba(29, 161, 242, 0.75) 0px 0px 12px;
}
</style>
