
module.exports = {
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "@/assets/style/main.scss";`
      }
    }
  },
  transpileDependencies: true
}
