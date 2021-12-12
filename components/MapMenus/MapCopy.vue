<template>
  <div>
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
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mdiContentCopy, mdiCheckCircleOutline } from '@mdi/js';
import domtoimage from 'dom-to-image';
import { MapModule } from '@/store';
import GlassButton from '@/components/GlassParts/GlassButton.vue';

export default Vue.extend({
  components: {
    GlassButton,
  },
  data() {
    return {
      mdiContentCopy,
      mdiCheckCircleOutline,
      copying: false,
      snackbar: false,
      imgStyle: {
        'background-image': 'linear-gradient(135deg, #97ABFF 10%, #123597 100%)',
      },
    };
  },
  methods: {
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
  },
});
</script>
