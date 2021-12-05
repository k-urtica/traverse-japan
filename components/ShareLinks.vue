<template>
  <glass-card class="pa-6">
    <div class="font-weight-bold text-sm-h6 white--text mb-3">
      日本踏破図<span class="emoji">🗾</span>をシェアする
      <v-divider dark />
    </div>

    <v-row justify="center" dense>
      <v-col v-for="link in links" :key="link.text" cols="12" sm="4" lg="2">
        <glass-button
          dark
          block
          class="py-5"
          :color="link.color"
          @click.native="share(link.text)"
        >
          <div class="mr-2">
            <v-img
              height="28"
              width="28"
              contain
              :src="require(`@/assets/img/${link.icon}`)"
            />
          </div>
          {{ link.text }}
        </glass-button>
      </v-col>
    </v-row>
  </glass-card>
</template>

<script lang="ts">
import Vue from 'vue';
import GlassCard from '@/components/GlassParts/GlassCard.vue';

export default Vue.extend({
  components: {
    GlassCard,
  },
  data() {
    return {
      links: [
        { icon: 'icon-twitter.svg', color: '#1da1f238', text: 'Twitter' },
        { icon: 'icon-facebook.svg', color: '#3b599838', text: 'Facebook' },
        { icon: 'icon-line.svg', color: '#06c75538', text: 'LINE' },
        { icon: 'icon-hatebu.svg', color: '#00A4DE38', text: 'はてブ' },
      ],
    };
  },
  computed: {
    shareLink() {
      return (sns: string) => {
        const pageUrl = this.$config.baseURL + this.$route.fullPath;
        const pageTitle = encodeURI(document.title);

        let link: string = '';
        switch (sns) {
          case 'Twitter':
            link = `https://twitter.com/intent/tweet?url=${pageUrl}&text=${pageTitle}`;
            break;
          case 'Facebook':
            link = `https://facebook.com/sharer/sharer.php?u=${pageUrl}`;
            break;

          case 'LINE':
            link = `https://social-plugins.line.me/lineit/share?url=${pageUrl}`;
            break;
          case 'はてブ':
            link = `https://b.hatena.ne.jp/entry/${pageUrl}`;
            break;
        }
        return link;
      };
    },
  },
  methods: {
    share(sns: string) {
      const url = this.shareLink(sns);
      window.open(url, '_blank', 'noopener noreferrer');
    },
  },
});
</script>
