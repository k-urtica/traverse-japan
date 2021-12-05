<template>
  <v-row justify="center">
    <v-col cols="12">
      <glass-card class="pa-6">
        <div class="text-center mb-8">
          <h1 v-if="error.statusCode === 404">
            {{ pageNotFound }}
          </h1>
          <h1 v-else>
            {{ otherError }}
          </h1>

          <div class="py-6">
            <v-img
              :src="require('@/assets/img/error.svg')"
              max-width="640px"
              style="margin: auto"
            />
          </div>
        </div>

        <div class="text-center">
          <app-link to="/" class="blue--text text--lighten-4 font-weight-bold">
            トップへ戻る👉
          </app-link>
        </div>
      </glass-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue';
import type { MetaInfo } from 'vue-meta';
import GlassCard from '@/components/GlassParts/GlassCard.vue';
import AppLink from '@/components/AppLink.vue';

export default Vue.extend({
  components: {
    GlassCard,
    AppLink,
  },
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: '404エラー、ページが見つかりませんでした。。',
      otherError: '何らかのエラーが発生しました。。',
    };
  },
  head(): MetaInfo {
    const title = this.error.statusCode === 404 ? this.pageNotFound : this.otherError;
    return {
      title,
    };
  },
});
</script>

<style lang="scss" scoped>
h1 {
  color: white;
  font-size: 20px;
}
</style>
