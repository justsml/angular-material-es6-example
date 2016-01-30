export default {
  debug: true,
  outputPath: '.public/',
  build: {
    es6Src:    ['app/index.js'],
    vendorSrc: [
      'node_modules/jquery/dist/jquery.min.js',
      'node_modules/angular/angular.min.js',
      'node_modules/angular-aria/angular-aria.js',
      'node_modules/angular-animate/angular-animate.js',
      'node_modules/angular-material/angular-material.min.js'],
    jadeSrc:   ['**/index*.jade'],
    lessSrc:   ['styles/site.less'],
  },
}