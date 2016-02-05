/*global Media, sails */
const fs          = require('fs');
const path        = require('path');
const UPLOAD_PATH = path.resolve(__dirname, '../..', '.uploads/');
const ASSETS_PATH = path.resolve(__dirname, '../..', '.tmp/public/assets/uploads/');
/**
 * MediaController
 *
 * @description :: Server-side logic for managing media
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
function copy(file, toPath, cb) {
  return fs.readFile(file, 'utf8', function(err, data) {
    fs.writeFile(toPath, 'utf8', data, cb);
  })
}

module.exports = {
	upload: function (req, res) {
    req.validate({ title: 'string' });

    req.file('file').upload({
      // don't allow the total upload size to exceed ~50MB
      dirname: ASSETS_PATH, //UPLOAD_PATH,
      maxBytes: 15000000,
    }, function _done(err, uploadedFiles) {
      if (err) { return res.negotiate(err); }
      // If no files were uploaded, respond with an error.
      if (uploadedFiles.length === 0) {
        return res.badRequest('No file was uploaded');
      }
      // // async-ly call copy
      // copy(uploadedFiles[0].fd, ASSETS_PATH, (err) => {
      //   console.log('Copied to public dir', arguments);
      // })
      // Save the "fd" and the url where the media can be accessed
      Media.create({
        title:  req.param('title'),
        artist: req.param('artist'),
        album:  req.param('album'),
        // Generate a unique URL where file be downloaded.
        audioUrl: '/media/uploads/' + encodeURIComponent(req.param('title')),
        // Grab the first file and use it's `fd` (file descriptor)
        audioFile: uploadedFiles[0].fd
      })
      .exec(function (err){
        if (err) return res.negotiate(err);
        return res.ok();
      });
    });
  },

  /**
  * Download media file by id
  *
  * (GET /media/uploads/:title)
  */
  download: function (req, res){
    req.validate({ title: 'string' });

    Media.findOne({'title': req.param('title')})
    .exec(function (err, media) {
      if (err) return res.negotiate(err);
      if (!media) return res.notFound();

      // Media has no file uploaded.
      // (should have never have hit this endpoint and used the default image)
      if (!media.audioFile) { return res.notFound(); }

      var SkipperDisk = require('skipper-disk');
      var fileAdapter = SkipperDisk({
        dirname: ASSETS_PATH, // UPLOAD_PATH,
      });

      // Stream the file down
      fileAdapter.read(media.audioFile)
      .on('error', function (err){
        return res.serverError(err);
      })
      .pipe(res);
    });
  }

};

