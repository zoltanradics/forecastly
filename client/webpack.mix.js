const mix = require('laravel-mix')

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for your application, as well as bundling up your JS files.
 |
 */

mix
  .react('./src/index.jsx', './public/bundle.js')
  .sass('./src/index.scss', './public/bundle.css')
  .extract()
  .copy(['./src/index.html', './src/manifest.json'], './public/')
  .copyDirectory('./src/assets', './public/assets')
