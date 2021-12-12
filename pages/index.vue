<template>
  <v-row justify="center">
    <v-col cols="12">
      <page-top-card class="mb-4" />

      <glass-card class="pa-3 pa-sm-6 mb-6">
        <map-of-japan v-show="isMapLoaded" />

        <v-skeleton-loader v-if="!isMapLoaded" type="image" height="690px" />
      </glass-card>

      <div class="text-center">
        <glass-card class="pa-6 mb-6">
          <map-menu />
        </glass-card>
      </div>

      <glass-card class="pa-6 mb-8">
        <map-check-buttons v-if="isMapLoaded" />
        <v-skeleton-loader v-if="!isMapLoaded" type="image" height="300px" />
      </glass-card>

      <share-links class="mb-6" />

      <v-divider dark class="my-5" />

      <page-footer-card />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue';
import type { MetaInfo } from 'vue-meta';
import { Context } from '@nuxt/types';
import { MapModule } from '@/store';
import MapCheckButtons from '@/components/MapCheckButtons.vue';
import MapOfJapan from '@/components/MapOfJapan.vue';
import MapMenu from '@/components/MapMenu.vue';
import GlassCard from '@/components/GlassParts/GlassCard.vue';
import PageTopCard from '@/components/PageTopCard.vue';
import ShareLinks from '@/components/ShareLinks.vue';
import PageFooterCard from '~/components/PageFooterCard.vue';

export default Vue.extend({
  components: {
    GlassCard,
    MapOfJapan,
    MapMenu,
    MapCheckButtons,
    PageTopCard,
    ShareLinks,
    PageFooterCard,
  },
  asyncData({ route }: Context) {
    const { bc, vc, hc } = route.query;
    if (bc) {
      MapModule.changeColor({ target: 'base', color: bc as string });
    }
    if (vc) {
      MapModule.changeColor({ target: 'visited', color: vc as string });
    }
    if (hc) {
      MapModule.changeColor({ target: 'hover', color: hc as string });
    }
  },
  head(): MetaInfo {
    let title = '日本踏破図🗾';
    let titleTemplate = '%s | 踏破した都道府県を日本地図で共有できるサービス';
    let ogTitle = `${title} | 踏破した都道府県を日本地図で共有できるサービス`;

    const { pref } = this.$route.query;
    if (pref) {
      titleTemplate = '%s | 日本踏破図🗾';
      title = `日本の${pref.length / 2}都道府県を踏破`;
      ogTitle = `${title} | 日本踏破図🗾`;
    }
    const BASE_URL = this.$config.baseURL;
    const FULL_PATH = this.$route.fullPath;

    const OGIMAGE =
      FULL_PATH === '/' ? `${BASE_URL}/ogp.png` : `${BASE_URL}/api/ogp${FULL_PATH}`;

    return {
      titleTemplate,
      title,
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: ogTitle,
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: `${BASE_URL}${FULL_PATH}`,
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: OGIMAGE,
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: OGIMAGE,
        },
      ],
    };
  },
  computed: {
    prefectures() {
      return MapModule.getPrefectures;
    },
    isMapLoaded() {
      return MapModule.mapLoaded;
    },
    colors() {
      return MapModule.getColors;
    },
  },
  watch: {
    prefectures: {
      deep: true,
      immediate: false,
      handler() {
        const { pref, bc, vc, hc } = this.$route.query;
        const queryPref = this.createQuery();

        if (!pref && !queryPref) {
          return;
        }
        if (pref === queryPref) {
          return;
        }

        this.$router.replace({ path: '/', query: { pref: queryPref, bc, vc, hc } });
      },
    },
    colors: {
      deep: true,
      immediate: false,
      handler() {
        const { pref, bc, vc, hc } = this.$route.query;
        const { base, visited, hover } = this.colors;
        if (base === bc && vc === visited && hc === hover) {
          return;
        }

        this.$router.replace({
          path: '/',
          query: { pref, bc: base, vc: visited, hc: hover },
        });
      },
    },
  },
  methods: {
    createQuery(): string {
      let query = '';
      for (const pref of this.prefectures) {
        if (pref.isChecked) {
          query += pref.code;
        }
      }
      return query;
    },
  },
});
</script>

<style lang="scss">
// TODO: Vuetifyのバグ暫定対処 https://github.com/vuetifyjs/vuetify/issues/11771
.v-skeleton-loader__image.v-skeleton-loader__bone {
  height: 100%;
}
</style>
