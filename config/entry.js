const path = require('path'),
      HtmlWebpackPlugin = require('html-webpack-plugin'),
      ExtractTextPlugin = require('extract-text-webpack-plugin'),
      ModernizrWebpackPlugin = require('modernizr-webpack-plugin'),
      folder = require('./folder');

const modernizrOption = {
  "options": [
    "setClasses",
    "testProp",
    "testAllProps",
    "domPrefixes",
    "html5shiv",
    "load",
    "prefixed"
  ],
  "feature-detects": [
    "css/transitions"
  ]
}

const getJs = (filename) => {
  return path.resolve(folder.src, folder.js, filename);
}

const getHtml = (file, jsEntryArr) => {
    return new HtmlWebpackPlugin({
      filename: `${file}.html`,
      template: path.resolve(folder.src, folder.html, `${file}.jade`),
      chunks: jsEntryArr,
    })
};

const indexModernizd = getHtml('index', 'morphingButton', 'classie', 'uiMorphingButton_fixed');
const indexHtml = getHtml('index', [ 'common', 'classie', 'uiMorphingButton_fixed', 'index']);

module.exports = {
  js: {
    index: getJs('index.js'),
    classie: getJs('vendor/classie.js'),
    uiMorphingButton_fixed: getJs('vendor/uiMorphingButton_fixed.js'),
    morphingButton: getJs('morphingButton.js')
  },
  html: [
    indexHtml,
    new ModernizrWebpackPlugin(modernizrOption,indexModernizd)
  ],
  css: [
    new ExtractTextPlugin('css/index.css')
  ]
};
