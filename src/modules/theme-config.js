// One way to explicitly declare deps, using the function member `$inject`

themeConfig.$inject = ['$mdThemingProvider'];

function themeConfig($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('blue-grey')
    .accentPalette('blue')
    .warnPalette('red');
}

export { themeConfig as default };
