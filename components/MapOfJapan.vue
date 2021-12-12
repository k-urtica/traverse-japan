<template>
  <div class="text-center">
    <div id="map-wrapper">
      <h2
        class="font-weight-bold text-subtitle-1 text-sm-h5 amber--text text--accent-1 mb-3"
      >
        踏破した都道府県 {{ distPrefsCount }} <span class="emoji">🗻</span> 日本の
        {{ distPrefsRatio }}%
      </h2>
      <div id="map" :style="mapStyles" />
    </div>

    <div class="mt-5">
      <map-share />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { MapModule } from '@/store';
import { Prefectures } from '@/store/map';
import MapShare from '@/components/MapShare.vue';

export default Vue.extend({
  components: { MapShare },
  computed: {
    prefectures() {
      return MapModule.getPrefectures;
    },
    prefsSvgEls() {
      return MapModule.getPrefsSvgEls;
    },
    isPrefVisited() {
      return (code: string) => MapModule.isPrefVisited(code);
    },
    mapColors() {
      return MapModule.getColors;
    },
    mapStyles() {
      return {
        '--fill-hover': MapModule.getColors.hover,
        '--stroke--hover': MapModule.getColors.stroke,
      };
    },
    distPrefsCount(): number {
      return this.prefectures.filter((e) => e.isChecked).length;
    },
    distPrefsRatio(): number {
      return Math.floor((this.distPrefsCount / 47) * 100);
    },
  },
  watch: {
    mapColors: {
      deep: true,
      immediate: false,
      handler() {
        this.prefectures.forEach((e) => {
          if (e.isChecked) {
            MapModule.fillPrefecture({ code: e.code, color: this.mapColors.visited });
          } else {
            MapModule.fillPrefecture({ code: e.code, color: this.mapColors.base });
          }
        });
      },
    },
  },
  async mounted() {
    const map = require('@/assets/img/map-mobile.svg');
    const container = document.querySelector('#map') as Element;

    const res = await fetch(map);

    if (res.ok) {
      const svg = await res.text();
      container.innerHTML = svg;

      let wkPrefsSvgEls = Array.from(
        document.querySelectorAll('.geolonia-svg-map .prefecture')
      ) as SVGElement[];

      wkPrefsSvgEls = wkPrefsSvgEls.reverse();

      const prefectures: Prefectures = [];
      wkPrefsSvgEls.forEach((pref) => {
        prefectures.push({
          name: pref.textContent!.trim().split(' ')[0],
          code: pref.dataset.code as string,
          isChecked: false,
        });

        pref.addEventListener('click', (event) => {
          const svgEl = event.currentTarget as SVGElement;
          this.prefClick(svgEl);
        });
      });

      MapModule.setPrefectures(prefectures);
      MapModule.setPrefsSvgEls(wkPrefsSvgEls);

      this.fillOnReload();

      MapModule.changeMapLoaded(true);
    }
  },
  methods: {
    prefClick(clickedEl: SVGElement) {
      const code = clickedEl.dataset.code as string;
      const color = this.isPrefVisited(code)
        ? this.mapColors.base
        : this.mapColors.visited;

      MapModule.fillPrefecture({
        code: clickedEl.dataset.code as string,
        color,
      });

      MapModule.togglePrefecture(code);
    },
    fillOnReload() {
      const { pref } = this.$route.query;
      const codes = (pref as string)?.match(/.{2}/g);
      this.prefectures.forEach((e) => {
        if (codes?.includes(e.code)) {
          MapModule.togglePrefecture(e.code);
          MapModule.fillPrefecture({ code: e.code, color: this.mapColors.visited });
        } else {
          MapModule.fillPrefecture({ code: e.code, color: this.mapColors.base });
        }
      });
    },
  },
});
</script>

<style lang="scss">
.geolonia-svg-map {
  max-height: 690px;

  .prefecture {
    cursor: pointer;
    -webkit-transition: all 0.3s ease;
    -moz-transition: all 0.3s ease;
    -o-transition: all 0.3s ease;
    transition: all 0.3s ease;

    @media (hover: hover) {
      &:hover {
        fill: var(--fill-hover) !important;
        stroke-width: 2px;
        stroke: var(--stroke--hover);
        transition-timing-function: ease-in-out;
      }
    }
  }

  .boundary-line {
    stroke-width: 4px;
    stroke: rgba(230, 230, 230, 0.85);
  }
}
</style>
