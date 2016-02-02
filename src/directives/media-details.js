// import template from './media-details.jade';

// function MediaDetails($mdDialog, mediaService) {
//   return {
//     template: '<span><!-- placeholder for dialog/popup --></span>',
//     restrict: 'E',
//     scope: { media: '=?' },
//     link: (scope, el, attrs) => {
//       scope.title  = scope.media && scope.media.title || 'Add Song'
//       scope.create = mediaService.create
//       scope.save   = mediaService.save
//       scope.remove = mediaService.remove
//       scope.$on('media.open', (event, media) => scope.media = media )
//       scope.$watch('media', (newVal, oldVal) => {
//         if ( newVal && newVal !== oldVal ) {
//           open();
//         }
//       });

//     }
//   }
// }

// export { MediaDetails as default }
