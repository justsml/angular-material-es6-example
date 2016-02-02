/**
 * PlaylistController
 *
 * @description :: Server-side logic for managing playlists
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	tracks: (req, res) => {
    return Playlist.findOne({id: req.params.id})
      .populate('tracks')
      .exec(function(err, data) {
        return res.status(err ? 500 : 200).send(err || data);
      });
  },

	// addTrack: (req, res) => {
  //   return Playlist.findOne({id: req.params.id})
  //     .populate('tracks')
  //     .exec(function(err, playlist) {
  //       var track = req.param('track');
  //       if ( playlist && track ) {
  //         playlist.tracks.add(track);
  //         playlist.save((err, results) => {
  //           return res.status(err ? 500 : 200).send(err || results);
  //         })
  //       }
  //       return res.status(500).send('ERROR: Missing Playlist or Parameter required: ?track=id');
  //     });
  // },

};

