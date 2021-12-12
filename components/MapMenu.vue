<template>
  <v-row align="center" justify="center" dense>
    <v-col v-for="(menu, i) in menus" :key="i" cols="12" sm="auto">
      <component :is="menu.component" />
    </v-col>

    <v-divider vertical dark class="ma-1 hidden-sm-and-down" />

    <v-col cols="5" sm="auto">
      <map-copy />
    </v-col>
    <v-col cols="7" sm="auto">
      <map-download />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue';
import ResetMap from '@/components/MapMenus/ResetMap.vue';
import ChangeMapColor from '@/components/MapMenus/ChangeMapColor.vue';
import FillAllMap from '@/components/MapMenus/FillAllMap.vue';
import MapCopy from '@/components/MapMenus/MapCopy.vue';
import MapDownload from '@/components/MapMenus/MapDownload.vue';

export default Vue.extend({
  components: {
    ResetMap,
    ChangeMapColor,
    FillAllMap,
    MapCopy,
    MapDownload,
  },
  data() {
    return {
      menus: [
        { component: ResetMap },
        { component: ChangeMapColor },
        { component: FillAllMap },
      ],
    };
  },
});
</script>
