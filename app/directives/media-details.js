import template from './media-details.jade';

function MediaDetails($mdDialog, mediaService) {
  return {
    template: '<span><!-- placeholder for dialog/popup --></span>',
    restrict: 'E',
    scope: { media: '=?' },
    link: (scope, el, attrs) => {
      scope.title  = scope.media && scope.media.title || 'Add Song'
      scope.create = mediaService.create
      scope.save   = mediaService.save
      scope.remove = mediaService.remove
      scope.$on('media.open', (event, media) => scope.media = media )
      scope.$watch('media', (newVal, oldVal) => {
        if ( newVal && newVal !== oldVal ) {
          open();
        }
      });

      function open() {
        return $mdDialog.show({
          template:             template(),
          locals:               { 'media': scope.media, 'save': mediaService.save },
          clickOutsideToClose:  true,
          scope:                scope, // use parent scope in template
          preserveScope:        true,  // do not forget this if use parent scope
          // Since the Controller is instantiated with ControllerAs syntax
          // AND we are passing the parent '$scope' to the dialog, we MUST
          // use 'ctrl.<xxx>' in the template markup
          controllerAs: 'ctrl',
          controller: function DialogController($scope, $mdDialog) {
            $scope.save   = mediaService.save;
            $scope.close  = $mdDialog.hide;
          }
        })
      }
    }
  }
}

export { MediaDetails as default }
