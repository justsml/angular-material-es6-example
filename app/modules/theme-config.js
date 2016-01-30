// One way to explicitly declare deps, using the function member `$inject`

themeConfig.$inject = ['$mdThemingProvider'];

function themeConfig($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('indigo')
    .accentPalette('grey')
    .warnPalette('red');
}

export { themeConfig as default };
