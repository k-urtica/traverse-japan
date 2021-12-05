<template>
  <v-footer elevation="16" padless dark color="#1a1a1a">
    <v-container class="text-center py-6">
      <div class="mb-6">
        <v-btn text rounded class="text-none footer-item" to="/about" nuxt> About </v-btn>
        <v-btn
          text
          rounded
          class="text-none footer-item"
          href="https://github.com/k-urtica/traverse-japan"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </v-btn>
      </div>

      <div>
        <span class="text-caption">&copy; 2021 — 日本踏破図🗾</span>
      </div>
    </v-container>
  </v-footer>
</template>

<style lang="scss" scoped>
.footer-item {
  margin: 0 0.4rem;
  box-shadow: rgba(104, 125, 243, 0.6) 0px 0px 12px;
}
</style>
