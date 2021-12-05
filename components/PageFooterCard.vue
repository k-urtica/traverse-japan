<template>
  <glass-card class="pa-6 text-center blue--text text--lighten-4">
    <div v-for="item in sectionItems" :key="item.title" class="section">
      <div class="font-weight-bold">{{ item.title }}</div>
      <app-link :to="item.link" remove-icon class="link-text">
        {{ item.linkText }}
      </app-link>
    </div>
  </glass-card>
</template>

<script lang="ts">
import Vue from 'vue';
import GlassCard from '@/components/GlassParts/GlassCard.vue';
import AppLink from '@/components/AppLink.vue';

export default Vue.extend({
  components: {
    GlassCard,
    AppLink,
  },
  data() {
    return {
      sectionItems: [
        // {
        //   title: 'Developed By',
        //   linkText: 'K (@k_urtica)',
        //   link: 'https://twitter.com/k_urtica',
        // },
        // {
        //   title: 'Made With',
        //   linkText: 'NuxtJS',
        //   link: 'https://nuxtjs.org/',
        // },
        // {
        //   title: 'Special Thanks',
        //   linkText: 'geolonia/japanese-prefectures',
        //   link: 'https://github.com/geolonia/japanese-prefectures',
        // },

        {
          title: 'Special Thanks',
          linkText: 'geolonia/japanese-prefectures',
          link: 'https://github.com/geolonia/japanese-prefectures',
        },
        {
          title: 'Made With',
          linkText: 'NuxtJS',
          link: 'https://nuxtjs.org/',
        },
        {
          title: 'Developed By',
          linkText: 'K (@k_urtica)',
          link: 'https://twitter.com/k_urtica',
        },
      ],
    };
  },
});
</script>

<style lang="scss" scoped>
.section {
  margin-bottom: 0.85rem;

  &:last-child {
    margin-bottom: 0;
  }
}
.link-text {
  font-weight: bold;
  font-size: 1.2rem;
  color: #fff8e1;
  text-shadow: 0px 0px 12px rgba(255, 255, 100, 0.6);
}
</style>
