const path = require('path'),
  webpack = require('webpack'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  ModernizrWebpackPlugin = require('modernizr-webpack-plugin'),
  CleanWebpackPlugin = require('clean-webpack-plugin');

const folder = require('./config/folder');
const entry = require('./config/entry');
const ROOT = path.resolve(__dirname),
  SRC = path.resolve(ROOT, folder.src),
  DIST = path.resolve(ROOT, folder.dist);

const postcssMixins = require('postcss-mixins'),
      postcssCssnext = require('postcss-cssnext'),
      postcssSimpleVars = require('postcss-simple-vars'),
      postcssNested = require('postcss-nested'),
      lost = require('lost'),
      postcssImport = require('postcss-import'),
      postcssFor = require('postcss-for'),
      postcssResponsiveType = require('postcss-responsive-type'),
      postcssPosition = require('postcss-position'),
      postcssMediaMinmax = require('postcss-media-minmax'),
      postcssCustomMedia = require('postcss-custom-media'),
      postcssFontMagician = require('postcss-font-magician')({hosted: path.resolve(SRC, folder.fonts), });

// const classie = require('classie');


const grid = require('postcss-grid');
const gridOptions = {
  columns: 12,
  gutter: 20,
  legacy: false
};



const isProd = () => {
  return process.env.NODE_ENV === 'production';
};

module.exports = {
  devServer: {
    contentBase: SRC,
    hot: true,
    inline: true,
  },
  devtool: isProd() ? '' : 'source-map',
  entry: entry.js,
  output: {
    filename: 'js/[name].js',
    path: DIST,
    //publicPath: '/',
  },
  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js', '.css', '.jade'],
  },
  module: {
    preLoaders: [{
      test: /\.js$/,
      exclude: /js\/vendor/,
      loader: 'eslint',
      include: SRC,
    }],
    loaders: [{
        test: /\.js$/,
        exclude: /node_modules|bower_components/,
        loader: 'babel?presets[]=es2015',
      }, {
        test: /\.json$/,
        exclude: /node_modules|bower_components/,
        loader: 'json',
      }, {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader', {
          publicPath: '../'
        })
      }, {
        test: /\.(woff2?|eot|ttf)$/,
        loader: 'file?name=font/[name].[hash].[ext]',
      },
      {
        test: /\.jade$/,
        loader: 'html!jade-html',
      },
      {
        test: /\.html$/,
        loader: 'html',
      }, {
        test: /\.(png|jpe?g|gif|svg)$/,
        loaders: [
          'file?name=img/[name].[hash].[ext]',
          'image-webpack?{bypassOnDebug: true, progressive: true}',
        ],
      },

    ],
  },
  jade: {
    pretty: isProd() ? false : true
  },
  postcss: function() {
    return {
      defaults: [postcssMixins,
                 postcssImport,
                 postcssCssnext,
                 postcssFor,
                 postcssSimpleVars,
                 postcssNested,
                 lost,
                 postcssResponsiveType,
                 postcssPosition,
                 postcssCustomMedia,
                 postcssMediaMinmax,
                 postcssFontMagician]
    }
  },
  plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
      // new webpack.optimize.UglifyJsPlugin({
      //   compress: { warnings: false },
      // }),
      new CleanWebpackPlugin([folder.dist], {
        root: ROOT,
        verbose: false,
      }),
      new webpack.optimize.CommonsChunkPlugin('common', 'js/common.js'),
    ]
    .concat(entry.html, entry.css),
};
