<template>
  <div class="text-center">
    <div id="map-wrapper">
      <h2
        class="
          font-weight-bold
          text-subtitle-1 text-sm-h5
          amber--text
          text--accent-1
          mb-3
        "
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
import { mdiTwitter } from '@mdi/js';
import { MapModule } from '@/store';
import { Prefectures } from '@/store/map';
import MapShare from '@/components/MapShare.vue';

export default Vue.extend({
  components: { MapShare },
  data() {
    return {
      // colorForMouseLeave: '',
      mdiTwitter,
    };
  },
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

        // pref.addEventListener('mouseover', (event) => {
        //   const svgEl = event.currentTarget as SVGElement;
        //   this.colorForMouseLeave = svgEl.style.fill;
        //   svgEl.style.fill = this.mapColors.hover;
        // });

        // pref.addEventListener('mouseleave', (event) => {
        //   (event.currentTarget as SVGElement).style.fill = this.colorForMouseLeave;
        // });

        pref.addEventListener('click', (event) => {
          const svgEl = event.currentTarget as SVGElement;
          this.prefClick(svgEl);
          // this.colorForMouseLeave = svgEl.style.fill;
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
      if (Object.keys(this.$route.query).length) {
        const prefs = this.$route.query.pref as string;
        if (!prefs) {
          return;
        }
        const prefCodes = prefs.match(/.{2}/g);
        const color = this.mapColors.visited;

        prefCodes?.forEach((code: string) => {
          MapModule.togglePrefecture(code);
          MapModule.fillPrefecture({ code, color });
        });
      }
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

    &:hover {
      fill: var(--fill-hover) !important;
      stroke-width: 2px;
      stroke: var(--stroke--hover);
      transition-timing-function: ease-in-out;
    }
  }

  .boundary-line {
    stroke-width: 4px;
    stroke: rgba(230, 230, 230, 0.85);
  }
}
</style>
