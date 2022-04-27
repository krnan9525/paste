const getPresets = (isDev) => [
  'babel-preset-gatsby',
  [
    '@emotion/babel-preset-css-prop',
    {
      sourceMap: isDev,
      // @NOTE update for v11
      autoLabel: 'dev-only',
      labelFormat: '[local]',
      cssPropOptimization: !isDev,
    },
  ],
];

const BASE_PLUGINS = ['@babel/proposal-object-rest-spread'];

module.exports = {
  env: {
    production: {
      presets: getPresets(false),
      plugins: BASE_PLUGINS,
    },
    development: {
      presets: getPresets(true),
      plugins: BASE_PLUGINS,
    },
  },
};
