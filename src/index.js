/*global angular*/
import audio5             from 'audio5'

import themeConfig        from './modules/theme-config'
import appController      from './controllers/app'

import playlistMenu       from './directives/playlist-menu'
import mediaList          from './directives/media-list'
import mediaControls      from './directives/media-controls'
import navToolbar         from './directives/nav-toolbar'
import sidenav            from './directives/sidenav'

import mediaService       from './services/media'
import playlistService    from './services/playlist'
import playerUiService    from './services/player-ui'
import sampleDataService  from './services/sample-data' // Helper 4 starting from scratch

const app = angular.module('app', ['ngMaterial', 'ngResource']);

app.config(themeConfig)
  .controller('AppController',    appController)

  .factory('playerUiService',     playerUiService)
  .factory('playlistService',     playlistService)
  .factory('mediaService',        mediaService)
  .factory('sampleDataService',   sampleDataService)

  .directive('playlistMenu',      playlistMenu)
  .directive('mediaList',         mediaList)
  .directive('mediaControls',     mediaControls)
  .directive('navToolbar',        navToolbar)
  .directive('sidenav',           sidenav)

