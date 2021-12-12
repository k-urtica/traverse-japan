<template>
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
</template>

<script lang="ts">
import Vue from 'vue';
import domtoimage from 'dom-to-image';
import { mdiDownload } from '@mdi/js';
import { MapModule } from '@/store';
import GlassButton from '@/components/GlassParts/GlassButton.vue';

export default Vue.extend({
  components: {
    GlassButton,
  },
  data() {
    return {
      mdiDownload,
      processing: false,
      imgStyle: {
        'background-image': 'linear-gradient(135deg, #97ABFF 10%, #123597 100%)',
      },
    };
  },
  methods: {
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
