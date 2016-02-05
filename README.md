# jsbeats - Music Player Project

## Preview

![jsbeats-split-screen-playlist](https://raw.githubusercontent.com/justsml/angular-material-es6-example/master/assets/images/jsbeats-split-screen-playlist.png)

## Technology

In no particular order:

* NodeJS
* ES6/ES2015
* Babel - (es2015 & stage0 plugins)
* Angular v1.x
* Express JS
* Sails.js (REST API)
* Browserify
* Angular Material (Google's Material Design)
* Gulp
* Jade/Jadeify

## Features

* [x] File upload
* [x] Add music button, opens add music form
* [x] Add music form, title, artist, album, file
* [x] Queue list, displays title, artist, album
* [x] Double-clicking in queue list plays selected song
* [x] When a song finishes playing, play next song in queue
* [x] Player status: current song title, artist, album, time elapsed, duration
* [x] Player interface: play, stop, previous, next, scrubber bar, should all actually function.
* [x] Actually playing audio.
* [x] Simple UI theme in CSS.
* [x] Persistence using **REST API**.
* [x] Dummy data loader (set to auto initialize data)

## Run the Project

> Develped & Tested on Debian 8

```sh
git clone https://github.com/justsml/angular-material-es6-example.git
cd angular-material-es6-example
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
  * `Title`
  * `Artist`
  * `Album`
  * `AudioUrl`
* Playlist
  * `Title`
  * `Tracks[Media]`

## CREDIT & REFERENCES

* [Exploring ES6 Patterns for Angular v1.0](http://www.michaelbromley.co.uk/blog/350/exploring-es6-classes-in-angularjs-1-x%20nice)
* [Angular & Material Design Info](https://scotch.io/bar-talk/angular-material-vs-material-design-lite)
* [ES6 Module Info](http://www.2ality.com/2014/09/es6-modules-final.html)
* [REST API built using SailsJS](https://www.smashingmagazine.com/2015/11/sailing-sails-js-mvc-style-framework-node-js/)

### Sample MP3 Files - Credit

* https://soundcloud.com/trapmusic/fuzzy-peach-by-brillz-minxx
* https://soundcloud.com/trapmusic/hydraulix-oski-lets-play
* https://soundcloud.com/dubpolice/subscape-shanghai


