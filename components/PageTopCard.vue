<!-- eslint-disable vue/no-v-html -->
<template>
  <glass-card class="py-4 px-6">
    <div
      class="grad-text font-weight-bold text-center text-h6 text-sm-h4 py-4 mb-2"
      v-html="budouX('日本をどれだけ踏破したか、みんなに共有しよう')"
    />

    <v-dialog max-width="550">
      <template #activator="{ on, attrs }">
        <div class="text-center">
          <v-btn
            color="pink lighten-4"
            small
            outlined
            rounded
            dark
            class="dialog-btn"
            v-bind="attrs"
            v-on="on"
          >
            踏破とは？
          </v-btn>
        </div>
      </template>
      <div class="dialog pa-6 rounded-lg">
        <div class="mb-2">
          <figure>
            <blockquote :cite="quotation" class="white--text">
              <p>困難な道や長い道のりを歩き通すこと。</p>
              <p>踏んで破る。踏んでこわす。蹴やぶる。また、ぶちこわしにする。</p>
              <p>
                踏みつけてこわすこと。転じて、困難な道、遠い行程などを歩きぬくこと。広い地域を縦横に歩きまわること。
              </p>
            </blockquote>
          </figure>
          <figcaption class="text-caption grey--text">
            引用：<cite>
              <app-link :to="quotation" class="blue--text text--lighten-3">
                踏破とは - コトバンク
              </app-link>
            </cite>
          </figcaption>
        </div>
        <v-divider dark class="mb-3" />
        <div
          class="pink--text text--lighten-4 text-center"
          v-html="budouX('...🤔 難しく考えず、自分が踏破したと思う都道府県を塗ろう❗')"
        />
      </div>
    </v-dialog>
  </glass-card>
</template>

<script lang="ts">
import Vue from 'vue';
import GlassCard from '@/components/GlassParts/GlassCard.vue';
import { parseBudouX } from '@/utils/AppUtils';

export default Vue.extend({
  components: {
    GlassCard,
  },
  data() {
    return {
      quotation: 'https://kotobank.jp/word/%E8%B8%8F%E7%A0%B4-581166',
    };
  },
  computed: {
    budouX() {
      return (text: string) => parseBudouX(text);
    },
  },
});
</script>

<style lang="scss" scoped>
.grad-text {
  background: linear-gradient(to right, #1fa2ff, #12d8fa, #a6ffcb);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: rgba(255, 255, 255, 0.35) 0px 0px 8px;
}

.dialog-btn {
  box-shadow: rgba(102, 103, 171, 0.8) 0px 0px 12px;
}
.dialog {
  background-image: linear-gradient(
      45deg,
      rgba(130, 89, 219, 0.2),
      rgba(44, 192, 226, 0.2),
      rgba(182, 103, 181, 0.2)
    ),
    linear-gradient(135deg, rgb(39, 20, 149), rgb(65, 82, 185), rgb(91, 144, 220));
}
</style>
