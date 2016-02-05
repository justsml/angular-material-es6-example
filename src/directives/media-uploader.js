import _            from 'lodash';
import template     from './media-uploader.jade';
import uploader     from '../modules/uploader';

const validMusic = /\.mp[34]$/;

function MediaUploader(playerUiService, $timeout, $mdToast, $mdDialog) {
  return {
    template:   template,
    restrict:   'E',
    scope:      {'media': '='},
    link: (scope, el, attrs) => {
      let fileEl = el.find('[type="file"]')[0];
      scope.submit        = submit;
      scope.close         = close;
      scope.selectFile    = selectFile;
      scope.uploadPercent = 0;
      scope.$on('$destroy', destroy);

      // Create some native events for drag+drop UI
      let hoverEnabled  = document.body.classList.add.bind(document.body, 'hover-mode'),
          hoverDisabled = document.body.classList.remove.bind(document.body, 'hover-mode');

      // setup file input, drag+drop
      init();

      function close() {
        $mdDialog.hide();
      }
      function selectFile() {
        console.log('MediaUploader.selectFile.fired', arguments);
        if (fileEl && fileEl.click) { fileEl.click() }
      }
      function submit() {
        if (!scope.file) {
          return $mdToast.showSimple('Please select a file to upload');
        } else if (!validMusic.test(scope.file.name)) {
          return $mdToast.showSimple('Invalid file type selected');
        }
        // for click event, needs a file
        uploader({'file': scope.file, 'media': scope.media, onProgress: _.throttle(onProgress, 500)})
        .catch(err => {
          scope.error = err && err.message;
          console.error('Upload ERR:', err);
          return null;
        })
        .then(response => {
          if (response) {
            console.warn('RESPONSE', response);
            scope.file.done = true;
            $mdToast.showSimple('Successfully saved!');
            $timeout(close, 1000);
          }
        });
      }
      function onProgress(e) {
        scope.$apply(function() {
          if (e.lengthComputable) {
            scope.uploadPercent = Math.round((e.loaded * 100) / e.total).toFixed(2);
          }
        });
      }
      function fileHandler(e) {
        scope.uploadPercent = 0;
        try {
          let files = null;
          if (fileEl.files && fileEl.files.length >= 1) {
             files = fileEl.files
          } else if (e && e.dataTransfer && e.dataTransfer.files) {
            let dt = e.dataTransfer;
            files = dt.files;
          } else {
            console.error('ERROR: No file to handle', arguments);
          }
          scope.file = files[0];
        } catch(err) {
          $mdToast.showSimple('File Handler Error: ' + (err && err.message))
          $mdToast.showSimple('Only new browsers please')
        }
      }
      function init() {
        console.log('MediaUploader.init.fired', arguments);
        fileEl.addEventListener('change',             fileHandler, false);
        window.document.addEventListener("drop",      fileHandler, false);
        window.document.addEventListener("dragenter", hoverEnabled, false);
        window.document.addEventListener("dragover",  hoverDisabled, false);
      }
      function destroy() {
        console.log('MediaUploader.destroy.fired', arguments);
        fileEl.removeEventListener('change',             fileHandler, false);
        window.document.removeEventListener("drop",      fileHandler, false);
        window.document.removeEventListener("dragenter", hoverEnabled, false);
        window.document.removeEventListener("dragover",  hoverDisabled, false);
      }

    }
  }
}

export {MediaUploader as default};
