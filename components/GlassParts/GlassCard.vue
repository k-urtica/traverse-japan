<template>
  <v-sheet class="glass-card-wrapper">
    <slot />
  </v-sheet>
</template>

<style lang="scss" scoped>
.glass-card-wrapper {
  border-radius: 12px !important;
  backdrop-filter: blur(9px) !important;
  -webkit-backdrop-filter: blur(9px) !important;
  // background-color: rgba(230, 230, 255, 0.065) !important;
  background-color: rgba(20, 20, 30, 0.16) !important;
  box-shadow: rgba(30, 30, 30, 0.25) 6px 12px 12px !important;
  border: 1px rgba(255, 255, 255, 0.16) solid !important;
  border-bottom: 1px rgba(140, 140, 140, 0.2) solid !important;
  border-right: 1px rgba(140, 140, 140, 0.2) solid !important;
}
</style>
