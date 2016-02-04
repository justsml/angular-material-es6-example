# jsbeats - Music Player Project

## Preview

![jsbeats-split-screen-playlist](https://raw.githubusercontent.com/justsml/angular-material-es6-example/master/assets/images/jsbeats-split-screen-playlist.png)


## Requirements:

* Initial List
  1. [x] Add music button, opens add music form
  2. [x] Add music form, title, artist, album, file
  3. [x] Queue list, displays title, artist, album
  4. [x] Double-clicking in queue list plays selected song
  5. [ ] When a song finishes playing, play next song in queue
  6. [x] Player status: current song title, artist, album, time elapsed, duration
  7. [x] Player interface: play, stop, previous, next, scrubber bar, should all actually function.
  1. [x] Actually playing audio. If not playing audio, just stub out file upload, playing, etc. Make each song just a two minute timer.
  2. [x] Simple UI theme in CSS.
  3. [x] Persistence using **REST API**.
* Misc Additions
  1. [x] Dummy data loader (set to auto initialize data)

## Run the Project

> Develped & Tested on Debian 8

```sh
npm install
npm start
```

## Run with Docker

```sh
npm run docker-build
npm run docker-run

# Or to mount the local dev folder for live updating (no `docker build` needed for every change)
npm run docker-run-dev

```

## Schemas

* Media
    1. `Title`
    1. `Artist`
    1. `Album`
    1. `AudioUrl`
* Playlist
    1. `Title`
    1. `Tracks[Media]`

## CREDIT & REFERENCES

* [Exploring ES6 Patterns for Angular v1.0](http://www.michaelbromley.co.uk/blog/350/exploring-es6-classes-in-angularjs-1-x%20nice)
* [Angular & Material Design Info](https://scotch.io/bar-talk/angular-material-vs-material-design-lite)
* [ES6 Module Info](http://www.2ality.com/2014/09/es6-modules-final.html)
* [REST API built using SailsJS](https://www.smashingmagazine.com/2015/11/sailing-sails-js-mvc-style-framework-node-js/)

### Sample MP3 Files - Credit

* https://soundcloud.com/trapmusic/fuzzy-peach-by-brillz-minxx
* https://soundcloud.com/trapmusic/hydraulix-oski-lets-play
* https://soundcloud.com/dubpolice/subscape-shanghai


