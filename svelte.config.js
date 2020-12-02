const autoPreprocess = require("svelte-preprocess");

module.exports = {
  preprocess: autoPreprocess({
    defaults: {
      script: "typescript",
    },
    scss: {
      prependData: `@import 'src/scss/core.scss';`,
    },
  }),
  onwarn: (warning, handler) => {
    const { code } = warning;
    if (code === "css-unused-selector") return;

    handler(warning);
  },
};
