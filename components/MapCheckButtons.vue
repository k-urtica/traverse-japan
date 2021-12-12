<template>
  <glass-card class="pa-6">
    <div class="font-weight-bold text-sm-h6 white--text mb-3">
      踏破した都道府県を選択する
      <v-divider dark />
    </div>
    <v-row no-gutters>
      <v-col v-for="pref in prefectures" :key="pref.code" cols="4" sm="3" lg="2">
        <v-checkbox
          dark
          dense
          hide-details
          :color="mapColors.visited"
          :input-value="prefCheck(pref.code)"
          @change="(e) => (prefCheck = { isChecked: e, code: pref.code })"
        >
          <template #label>
            <span class="white--text">{{ pref.name }}</span>
          </template>
        </v-checkbox>
      </v-col>
    </v-row>
  </glass-card>
</template>

<script lang="ts">
import Vue from 'vue';
import { MapModule } from '@/store';
import GlassCard from '@/components/GlassParts/GlassCard.vue';

export default Vue.extend({
  components: {
    GlassCard,
  },
  computed: {
    prefectures() {
      return MapModule.getPrefectures;
    },
    prefCheck: {
      get() {
        return (code: string) => {
          return MapModule.isPrefVisited(code);
        };
      },
      set(param: { isChecked: boolean; code: string }) {
        const { isChecked, code } = param;
        const color = isChecked ? this.mapColors.visited : this.mapColors.base;
        MapModule.togglePrefecture(code);
        MapModule.fillPrefecture({ code, color });
      },
    },
    mapColors() {
      return MapModule.getColors;
    },
  },
});
</script>
