/*global angular */
import audio5 from            'audio5'
// angular deps
import themeConfig    from    './modules/theme-config'
import appController  from    './controllers/app'
import mediaList      from    './directives/media-list'
import mediaDetails   from    './directives/media-details'
import navToolbar     from    './directives/nav-toolbar'
import sidenav        from    './directives/sidenav'
import mediaService   from    './services/media'

const app = angular.module('app', ['ngMaterial', 'ngResource']);

app.config(themeConfig)
  .controller('AppController',    appController)
  .factory('mediaService',        mediaService)
  .directive('mediaList',         mediaList)
  .directive('mediaDetails',      mediaDetails)
  .directive('navToolbar',        navToolbar)
  .directive('sidenav',           sidenav)

