<template>
  <v-row>
    <v-col>
      <glass-card class="pa-6 pa-sm-9">
        <section class="mb-12">
          <h2 class="section-title">日本踏破図🗾について</h2>
          <v-divider dark class="mb-4" />
          <p class="section-text">
            日本踏破図🗾
            は、踏破したことがある都道府県を日本地図でみんなに共有できるサービスです。
          </p>
          <p class="section-text">
            "踏破"というと難しく聞こえ、そんな都道府県ないよ！と思うかもしれません。
            しかし、当サイトでの踏破とは、使っていただく人それぞれが踏破した！と思えば、その都道府県は踏破したものになるのです😉
          </p>
          <p class="section-text">
            たとえば、旅行したから踏破／出身地だから踏破／新幹線で通過したから踏破等々、各々が思った理由でOKです😀
          </p>
        </section>

        <section class="mb-12">
          <h2 class="section-title">免責事項</h2>
          <v-divider dark class="mb-4" />
          <p class="section-text">
            当サイトで掲載している情報については正確なものを掲載するよう細心の注意を払っておりますが、必ずしもそれを保証するものではありません。
          </p>
          <p class="section-text">
            当サイトを利用して発生した損害、トラブルについて当サイトは一切の責任を負わないものとします。
          </p>
        </section>

        <section class="mb-12">
          <h2 class="section-title">アクセス解析ツールについて</h2>
          <v-divider dark class="mb-4" />
          <p class="section-text">
            当サイトではアクセス解析ツールとして「Googleアナリティクス」を利用しています。
          </p>
          <p class="section-text">
            このGoogleアナリティクスはトラフィックデータの収集のためにCookieを使用しています。トラフィックデータは匿名で収集されており、個人を特定するものではありません。この機能はCookieを無効にすることで収集を拒否することが出来ますので、お使いのブラウザの設定をご確認ください。この規約に関して、詳しくは以下をご確認ください。
            <br />
            <app-link
              to="https://marketingplatform.google.com/about/analytics/terms/jp/"
              class="light-blue--text"
            >
              Googleアナリティクス利用規約
            </app-link>
          </p>
        </section>

        <section class="mb-12">
          <h2 class="section-title">開発・運営</h2>
          <v-divider dark class="mb-4" />
          <p class="section-text">
            ITエンジニアの
            <app-link to="https://twitter.com/k_urtica" class="light-blue--text">
              K (@k_urtica)
            </app-link>
            が個人で開発し運営しています。
          </p>
        </section>

        <section>
          <h2 class="section-title">他のサービス</h2>
          <v-divider dark class="mb-4" />
          <p class="section-text">
            Web
            ToolBoxという、ブラウザで簡単・無料で使えるツール集のWebサービスを公開・運営しています❗
            <br />
            よかったら、こちらも使ってみてください❗
          </p>
          <p class="section-text">
            <app-link to="https://web-toolbox.dev/" class="amber--text lighten-4">
              Web ToolBox | 無料で気軽に使えるWebツール
            </app-link>
          </p>
        </section>
      </glass-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue';
import type { MetaInfo } from 'vue-meta';
import GlassCard from '@/components/GlassParts/GlassCard.vue';

export default Vue.extend({
  components: {
    GlassCard,
  },
  head(): MetaInfo {
    return {
      titleTemplate: '%s | 日本踏破図🗾',
      title: 'About',
    };
  },
});
</script>

<style lang="scss" scoped>
.section-title {
  font-weight: inherit;
  font-size: 1.45rem;
  color: #ffe082;
  text-shadow: rgba(255, 255, 255, 0.45) 0px 0px 10px;
}
.section-text {
  color: #eee;
  text-shadow: rgba(255, 255, 255, 0.3) 0px 0px 10px;
}
</style>
