"use strict";
const root = require('./helpers.js').root
const ip = require('ip');

const path = require('path');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

const IS_LOCAL = true;
const domain = (IS_LOCAL == true ? 'localhost:8443' : '1stcreditv5-dev\.telrock\.com\/telrock-tas-war')
exports.BASE_DOMAIN = domain;

exports.HOST = ip.address();
exports.DEV_PORT = 3000;
exports.E2E_PORT = 4201;
exports.PROD_PORT = 8088;
exports.UNIVERSAL_PORT = 4000;

/**
 * These constants set whether or not you will use proxy for Webpack DevServer
 * For advanced configuration details, go to:
 * https://webpack.github.io/docs/webpack-dev-server.html#proxy
 */
exports.USE_DEV_SERVER_PROXY = false;
exports.DEV_SERVER_PROXY_CONFIG = {
  '**': 'http://localhost:8089'
}

/**
 * These constants set the source maps that will be used on build. 
 * For info on source map options, go to: 
 * https://webpack.github.io/docs/configuration.html#devtool
 */
exports.DEV_SOURCE_MAPS = 'eval';
exports.PROD_SOURCE_MAPS = 'source-map';

/**
 * Set watch options for Dev Server. For better HMR performance, you can 
 * try setting poll to 1000 or as low as 300 and set aggregateTimeout to as low as 0. 
 * These settings will effect CPU usage, so optimal setting will depend on your dev environment.
 * https://github.com/webpack/docs/wiki/webpack-dev-middleware#watchoptionsaggregatetimeout
 */
exports.DEV_SERVER_WATCH_OPTIONS = {
  poll: undefined,
  aggregateTimeout: 300,
  ignored: /node_modules/
}

/**
 * specifies which @ngrx dev tools will be available when you build and load
 * your app in dev mode. Options are: monitor | logger | both | none
 */
exports.STORE_DEV_TOOLS = 'monitor'

exports.EXCLUDE_SOURCE_MAPS = [
  // these packages have problems with their sourcemaps
  root('node_modules/@angular'),
  root('node_modules/rxjs')
]

exports.MY_COPY_FOLDERS = [
  // use this for folders you want to be copied in to Client dist
  // src/assets and index.html are already copied by default.
  // format is { from: 'folder_name', to: 'folder_name' }
]

exports.MY_POLYFILL_DLLS = [
  // list polyfills that you want to be included in your dlls files
  // this will speed up initial dev server build and incremental builds.
  // Be sure to run `npm run build:dll` if you make changes to this array.
]

exports.MY_VENDOR_DLLS = [
  // list vendors that you want to be included in your dlls files
  // this will speed up initial dev server build and incremental builds.
  // Be sure to run `npm run build:dll` if you make changes to this array.
]

exports.MY_CLIENT_PLUGINS = [
  // use this to import your own webpack config Client plugins.
  new SWPrecacheWebpackPlugin ({
    cacheId: 'webpack-site-cache',
    filename: 'service-worker.js',
    staticFileGlobs: [
    ],
    handleFetch: true,
    runtimeCaching: [
      { 
        urlPattern: /^https:\/\/maxcdn\.bootstrapcdn\.com\/bootstrap\/3\.3\.7\/css\/bootstrap\.min\.css/,
        handler: 'cacheFirst'
      },
      {
        urlPattern: /^http:\/\/fonts\.googleapis\.com\/css\?family=Roboto/,
        handler: 'cacheFirst'
      },
      {
        urlPattern: /^https:\/\/fonts\.googleapis\.com\/icon\?family=Material\+Icons/,
        handler: 'cacheFirst'
      },
      {
        //urlPattern: /^https:\/\/localhost:8443\/rest\/properties/,
        urlPattern: /^https:\/\/1stcreditv5-dev\.telrock\.com\/telrock-tas-war\/rest\/properties/,
        handler: 'cacheFirst'
      },
      {
        //urlPattern: /^https:\/\/localhost:8443\/rest\/idv\/process/,
        urlPattern: /^https:\/\/1stcreditv5-dev\.telrock\.com\/telrock-tas-war\/rest\/idv\/process/,
        handler: 'cacheFirst'
      }
    ]

  })

]

exports.MY_CLIENT_PRODUCTION_PLUGINS = [
  // use this to import your own webpack config plugins for production use.
]

exports.MY_CLIENT_RULES = [
  // use this to import your own rules for Client webpack config.
]

exports.MY_SERVER_RULES = [
  // use this to import your own rules for Universal Server webpack config.
]

exports.MY_TEST_RULES = [
  // use this to import your own rules for Test webpack config.
]

exports.MY_TEST_PLUGINS = [
  // use this to import your own Test webpack config plugins.
]

exports.MY_SERVER_INCLUDE_CLIENT_PACKAGES = [
  // include these client packages so we can transform their source with webpack loaders
]