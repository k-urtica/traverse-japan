<template>
  <div>
    <glass-button class="py-5 py-sm-6" block dark @click.native.stop="dialog = true">
      <v-icon color="amber" class="mr-2">{{ mdiPalette }}</v-icon>
      <span class="font-weight-bold text-sm-subtitle-1 grey--text text--lighten-5">
        地図の色を変える
      </span>
    </glass-button>
    <v-dialog v-model="dialog" max-width="600" hide-overlay>
      <div class="color-dialog pa-6 rounded-lg">
        <v-row>
          <v-col cols="12" md="6">
            <glass-button class="my-2" dark block @click.native="resetColor()">
              色をリセットする
            </glass-button>
            <v-divider dark class="my-3" />

            <glass-button
              v-for="btn in buttons"
              :key="btn.text"
              class="py-5 my-2"
              :class="{ 'btn-selected': selected === btn.type }"
              dark
              block
              @click.native="selected = btn.type"
            >
              <v-icon v-if="selected === btn.type" left>
                {{ mdiCheckOutline }}
              </v-icon>
              {{ btn.text }}
              <div class="ml-auto" :style="swatchStyle(btn.type)" />
            </glass-button>
          </v-col>
          <v-col cols="12" md="6">
            <chrome-color-picker
              class="mx-auto"
              :value="currentColor"
              disable-alpha
              @input="updateColor"
            />
          </v-col>
          <v-col cols="12">
            <glass-button block dark @click.native="dialog = false">
              閉じる
            </glass-button>
          </v-col>
        </v-row>
      </div>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mdiPalette, mdiCheckOutline } from '@mdi/js';
import { Chrome } from 'vue-color';
import GlassButton from '@/components/GlassParts/GlassButton.vue';
import { MapModule } from '@/store';
import { MapColors } from '@/store/map';

type Colors = {
  hex: string;
  hex8: string;
  hsl: { h: number; s: number; l: number; a: number };
  hsv: { h: number; s: number; v: number; a: number };
  rgba: { r: number; g: number; b: number; a: number };
  a: number;
  oldHue: number;
  source: string;
};

export default Vue.extend({
  components: { GlassButton, ChromeColorPicker: Chrome },
  data() {
    return {
      dialog: false,
      mdiPalette,
      mdiCheckOutline,
      selected: 'base' as keyof MapColors,
      buttons: [
        { text: '未踏破の色', type: 'base' },
        { text: '踏破した色', type: 'visited' },
        { text: 'ホバーの色', type: 'hover' },
      ],
    };
  },
  computed: {
    currentColor: {
      get(): string {
        return MapModule.getColors[this.selected];
      },
      set(param: { target: keyof MapColors; color: string }) {
        const { target, color } = param;
        MapModule.changeColor({ target, color });
      },
    },
    swatchStyle(): Object {
      return (target: keyof MapColors) => {
        const backgroundColor = MapModule.getColors[target];
        return {
          backgroundColor,
          height: '30px',
          width: '50px',
          borderRadius: '8px',
        };
      };
    },
  },
  methods: {
    resetColor() {
      MapModule.resetColor();
    },
    updateColor(colors: Colors) {
      this.currentColor = { target: this.selected, color: colors.hex };
    },
  },
});
</script>

<style lang="scss" scoped>
.vc-chrome {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: none;
}

.color-dialog {
  background-image: linear-gradient(
      45deg,
      rgba(130, 89, 219, 0.2),
      rgba(44, 192, 226, 0.2),
      rgba(182, 103, 181, 0.2)
    ),
    linear-gradient(135deg, rgb(39, 20, 149), rgb(65, 82, 185), rgb(91, 144, 220));
}

.btn-selected {
  font-weight: bold;
  color: #1de9b6 !important;
  box-shadow: rgba(59, 235, 241, 0.9) 0px 0px 20px !important;
}
</style>
