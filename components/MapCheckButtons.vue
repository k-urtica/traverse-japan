<template>
  <div>
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
          @change="(e) => (prefCheck = [e, pref.code])"
        >
          <template #label>
            <span class="white--text">{{ pref.name }}</span>
          </template>
        </v-checkbox>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { MapModule } from '@/store';

export default Vue.extend({
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
      set(val: [boolean, string]) {
        const isChecked = val[0];
        const code = val[1];
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
