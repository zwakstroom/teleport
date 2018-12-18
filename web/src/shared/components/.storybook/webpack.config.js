const path = require("path");
const webpackBaseCfg = require('./../../../../webpack/webpack.base');

const rules = [

  webpackBaseCfg.rules.css({ dev: true }),
  {
    test: /fonts\/(.)+\.(woff|woff2|ttf|eot|svg)/,
    loader: 'url-loader',
    include: /(node_modules)|(.json$)|(assets)/,
    options: {
      limit: 10,
    }
  },
  webpackBaseCfg.rules.svg,
  {
    test: /\.(js|jsx)$/,
    enforce: "pre",
    loader: "eslint-loader",
    exclude: /(node_modules)|(assets)/,
    options: {
      emitWarning: true
    },
  },
  {
    test: /\.(png|jpg|gif)$/,
    loader: "file-loader",
    options: {
      limit: 10000,
    }
  },
]

module.exports = (baseConfig, env, defaultConfig) => {

  //baseConfig.devtool = false;

  console.log(baseConfig.module.rules)

  baseConfig.module.rules.push(...rules);

  baseConfig.resolve = {
    ...baseConfig.resolve,
    ...webpackBaseCfg.resolve,
  }

  return baseConfig;
};