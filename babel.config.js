// eslint-disable-next-line
module.exports = function (api) {
  api.cache(true);
  const presets = ["@babel/env", "@babel/preset-react"];
  const plugins = ["@babel/plugin-proposal-class-properties"];
  return {
    presets,
    plugins,
  };
};
