/*global Media, sails */
const path = require('path');
const UPLOAD_PATH = path.resolve(__dirname, '../..', '.uploads/');
/**
 * MediaController
 *
 * @description :: Server-side logic for managing media
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	upload: function (req, res) {
    req.file('file').upload({
      // don't allow the total upload size to exceed ~10MB
      dirname: UPLOAD_PATH,
      maxBytes: 10000000,
    }, function _done(err, uploadedFiles) {
      if (err) { return res.negotiate(err); }

      // If no files were uploaded, respond with an error.
      if (uploadedFiles.length === 0){
        return res.badRequest('No file was uploaded');
      }

      // Save the "fd" and the url where the media can be accessed
      Media.create({
        title:  req.param('title'),
        artist: req.param('artist'),
        album:  req.param('album'),
        // Generate a unique URL where file be downloaded.
        audioUrl: require('util').format('%s/assets/uploads/%s', sails.getBaseUrl(), req.session.id),
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
  * (GET /media/uploads/:id)
  */
  download: function (req, res){
    req.validate({ id: 'string' });

    Media.findOne(req.param('id'))
    .exec(function (err, media) {
      if (err) return res.negotiate(err);
      if (!media) return res.notFound();

      // Media has no file uploaded.
      // (should have never have hit this endpoint and used the default image)
      if (!media.audioFile) {
        return res.notFound();
      }

      var SkipperDisk = require('skipper-disk');
      var fileAdapter = SkipperDisk({
        dirname: UPLOAD_PATH,
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

