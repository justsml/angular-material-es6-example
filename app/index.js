import angular from           'angular'
import audio5 from            'audio5'
// angular deps
import themeConfig    from    './modules/theme-config'
import appController  from    './controllers/app'
import mediaDetails   from    './directives/media-details'
import mediaService   from    './services/media'

const app = angular.module('app', ['ngMaterial']);

app.config(themeConfig)
  .controller('AppController',    appController)
  .factory('mediaService',        mediaService)
  .directive('mediaDetails',      mediaDetails)

