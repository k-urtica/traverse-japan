<template>
  <v-row align="center" justify="center" dense>
    <v-col cols="12" sm="auto">
      <glass-button class="py-5 py-sm-6" block dark @click.native="resetMap()">
        <v-icon color="grey" class="mr-2">{{ mdiDelete }}</v-icon>
        <span class="font-weight-bold text-sm-subtitle-1 grey--text text--lighten-5">
          地図をリセットする
        </span>
      </glass-button>
    </v-col>
    <v-col cols="12" sm="auto">
      <change-map-color />
    </v-col>
    <v-col cols="12" sm="auto">
      <glass-button class="py-5 py-sm-6" block dark @click.native="fillAll()">
        <v-icon color="pink lighten-2" class="mr-2">{{ mdiFlagVariant }}</v-icon>
        <span class="font-weight-bold text-sm-subtitle-1 grey--text text--lighten-5">
          日本を踏破する
        </span>
      </glass-button>
    </v-col>

    <v-divider vertical dark class="ma-1 hidden-sm-and-down" />

    <v-col cols="12" sm="auto">
      <glass-button
        class="py-5 py-sm-6"
        block
        dark
        :loading="copying"
        @click.native="doCopy()"
      >
        <v-icon left>{{ mdiContentCopy }}</v-icon>
        コピー
      </glass-button>
      <v-snackbar
        v-model="snackbar"
        timeout="3000"
        rounded="lg"
        color="rgba(30, 30, 30, 0.8)"
      >
        <v-icon left v-text="mdiCheckCircleOutline" />
        <span class="green--text text--accent-3 font-weight-bold text-subtitle-1">
          地図画像をコピーしました！
        </span>
      </v-snackbar>
    </v-col>
    <v-col cols="12" sm="auto">
      <glass-button
        class="py-5 py-sm-6"
        block
        dark
        :loading="processing"
        @click.native="doDownload()"
      >
        <v-icon left>{{ mdiDownload }}</v-icon>
        ダウンロード
      </glass-button>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue';
import {
  mdiDelete,
  mdiFlagVariant,
  mdiPalette,
  mdiContentCopy,
  mdiDownload,
  mdiCheckCircleOutline,
} from '@mdi/js';
import domtoimage from 'dom-to-image';
import { MapModule } from '@/store';
import GlassButton from '@/components/GlassParts/GlassButton.vue';
import ChangeMapColor from '@/components/MapMenus/ChangeMapColor.vue';

export default Vue.extend({
  components: {
    GlassButton,
    ChangeMapColor,
  },
  data() {
    return {
      showDialog: false,
      copying: false,
      processing: false,
      snackbar: false,
      mdiDelete,
      mdiFlagVariant,
      mdiPalette,
      mdiContentCopy,
      mdiDownload,
      mdiCheckCircleOutline,
      imgStyle: {
        'background-image': 'linear-gradient(135deg, #97ABFF 10%, #123597 100%)',
      },
    };
  },
  methods: {
    resetMap() {
      MapModule.resetMap();
    },
    fillAll() {
      MapModule.fillAll();
    },
    async doCopy() {
      const node = MapModule.getMapNode;
      if (!node) return;

      this.copying = true;
      const blob = await domtoimage.toBlob(node, { style: this.imgStyle });
      try {
        // @ts-ignore
        await navigator.clipboard.write([new ClipboardItem({ [blob.type]: blob })]);
        this.snackbar = true;
      } catch (err) {
        console.log(err);
      } finally {
        this.copying = false;
      }
    },
    async doDownload() {
      const node = MapModule.getMapNode;
      if (!node) return;

      this.processing = true;
      try {
        const dataUrl = await domtoimage.toPng(node, { style: this.imgStyle });
        const link = document.createElement('a');
        link.download = '日本踏破図.png';
        link.href = dataUrl;
        link.click();
      } finally {
        this.processing = false;
      }
    },
  },
});
</script>

<style lang="scss">
.emoji {
  font-weight: initial !important;
}
</style>
