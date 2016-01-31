import path from 'path';

export default {
  debug: true,
  watch: process.env.WATCH ? true : false,
  outputPath: path.resolve(__dirname, '../.public/'),
  build: {
    es6Src:    [path.resolve(__dirname, '../app/index.js')],
    jadeSrc:   [path.resolve(__dirname, '../views/index.jade')],
    lessSrc:   [path.resolve(__dirname, '../styles/site.less')],
    vendorSrc: [
      path.resolve(__dirname, '../node_modules/jquery/dist/jquery.min.js'),
      path.resolve(__dirname, '../node_modules/angular/angular.min.js'),
      path.resolve(__dirname, '../node_modules/angular-aria/angular-aria.js'),
      path.resolve(__dirname, '../node_modules/angular-resource/angular-resource.js'),
      path.resolve(__dirname, '../node_modules/angular-animate/angular-animate.js'),
      path.resolve(__dirname, '../node_modules/angular-material/angular-material.js')],
  },
}