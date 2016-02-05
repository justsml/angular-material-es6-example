/**
* Track.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  attributes: {
    title:        { type: 'string', unique: true },
    artist:       { type: 'string' },
    album:        { type: 'string' },
    imageUrl:     { type: 'string' },
    audioFile:    { type: 'string' },
    audioUrl:     { type: 'string' },
    sourceUrl:    { type: 'string' },
    parent:       { collection: 'playlist', via: 'tracks' }
  }
};

