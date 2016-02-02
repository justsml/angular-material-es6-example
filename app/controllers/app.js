export default function($scope, mediaService) {
  // Do (almost) nothing here, use services, directives & markup to describe app
  loadMedia();
  $scope.$root.$on('media.refresh', loadMedia);
  function loadMedia() {
    // cache all media globally
    return mediaService.query({}).then(data => {
      $scope.$root.allMedia = data;
    });
  }
}