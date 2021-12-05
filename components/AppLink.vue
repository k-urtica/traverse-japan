<template>
  <component :is="linkTag" v-bind="attr">
    <slot />
    <v-icon v-if="isExternal && !removeIcon" small color="grey lighten-1" class="ml-1">
      {{ icon.mdiOpenInNew }}
    </v-icon>
  </component>
</template>

<script lang="ts">
import Vue from 'vue';
import { mdiOpenInNew } from '@mdi/js';

type InternalAttr = {
  to: String;
};
type ExternalAttr = {
  href: String;
  target: String;
  rel: String;
};

export default Vue.extend({
  props: {
    to: {
      type: String,
      required: true,
    },
    removeIcon: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      icon: {
        mdiOpenInNew,
      },
    };
  },
  computed: {
    isExternal(): boolean {
      return /^https?:\/\//.test(this.to);
    },
    linkTag(): string {
      return this.isExternal ? 'a' : 'nuxt-link';
    },
    attr(): ExternalAttr | InternalAttr {
      if (this.isExternal) {
        return {
          href: this.to,
          target: '_blank',
          rel: 'noopener noreferrer',
        };
      } else {
        return {
          to: this.to,
        };
      }
    },
  },
});
</script>
