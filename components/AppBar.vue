<!-- eslint-disable vue/no-v-html -->
<template>
  <v-app-bar app flat color="rgba(20,20,20,0.15)" dark>
    <v-toolbar-title tag="h1" class="font-weight-bold text-h5">
      <button @click="backToHome()">日本踏破図<span class="emoji">🗾</span></button>
    </v-toolbar-title>

    <v-spacer />
    <v-menu
      v-model="menu"
      dark
      :close-on-content-click="false"
      nudge-width="240"
      max-width="340"
      offset-y
    >
      <template #activator="{ on, attrs }">
        <v-btn
          icon
          class="mx-1"
          v-bind="attrs"
          aria-label="使い方メニューの開閉"
          v-on="on"
        >
          <v-icon>{{ mdiHelpCircleOutline }}</v-icon>
        </v-btn>
      </template>
      <v-card rounded="lg" class="menu-card px-5 py-6">
        <div class="text-center text-h6 font-weight-bold mb-3">つかいかた</div>
        <div class="py-2">
          <ol>
            <li
              v-for="(item, i) in items"
              :key="i"
              class="mb-1"
              v-html="parseBudouX(item.text)"
            />
          </ol>
        </div>
        <div class="text-center py-3">
          <map-share />
        </div>
      </v-card>
    </v-menu>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue';
import { mdiHelpCircleOutline } from '@mdi/js';
import { MapModule } from '@/store';
import { parseBudouX } from '~/utils/AppUtils';
import MapShare from '@/components/MapShare.vue';

export default Vue.extend({
  components: {
    MapShare,
  },
  data() {
    return {
      menu: false,
      mdiHelpCircleOutline,
      items: [
        { text: '踏破した都道府県をチェックする' },
        { text: '好みの色に変える🎨' },
        { text: 'Twitterで共有する👍' },
      ],
    };
  },
  computed: {
    parseBudouX() {
      return (text: string) => parseBudouX(text);
    },
  },
  methods: {
    backToHome() {
      MapModule.resetMap();
      this.$router.push('/');
    },
  },
});
</script>

<style lang="scss" scoped>
.menu-card {
  background-image: linear-gradient(
      45deg,
      rgba(130, 89, 219, 0.2),
      rgba(44, 192, 226, 0.2),
      rgba(182, 103, 181, 0.2)
    ),
    linear-gradient(135deg, rgb(39, 20, 149), rgb(65, 82, 185), rgb(91, 144, 220));
}
</style>
