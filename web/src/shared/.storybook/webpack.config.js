const path = require("path");
const webpackBaseCfg = require('./../../../webpack/webpack.base');

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
  {
    test: /\.svg$/,
    loader: 'svg-url-loader',
    options: {
      noquotes: true,
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

  baseConfig.devtool = false;

  baseConfig.module.rules.push(...rules);

  baseConfig.resolve = {
    ...baseConfig.resolve,
    ...webpackBaseCfg.resolve,
  }

  return baseConfig;
};