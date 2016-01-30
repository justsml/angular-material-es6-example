# jsbeats - Music Player Project


## Requirements:

1. Add music button, opens add music form
2. Add music form, title, artist, album, file
3. Queue list, displays title, artist, album
4. Double-clicking in queue list plays selected song
5. When a song finishes playing, play next song in queue
6. Player status: current song title, artist, album, time elapsed, duration
7. Player interface: play, stop, previous, next, scrubber bar, should all actually function.

## Extra Credit:

1. Actually playing audio. If not playing audio, just stub out file upload, playing, etc. Make each song just a two minute timer.
2. Simple UI theme in CSS.
3. Persistence in local storage.

## Schemas

* Track
    1. Title
    1. Artist
    1. Album
    1. Image
* Playlist
    1. Title
    1. Tracks[]

## MDL Styles

> See (https://github.com/google/material-design-lite/issues/1206)[https://github.com/google/material-design-lite/issues/1206]

```
Example: https://storage.googleapis.com/code.getmdl.io/1.0.1/material.teal-teal.min.css

Prepend with https://storage.googleapis.com/code.getmdl.io/1.0.1/

teal-teal
teal-purple
teal-deep_purple
teal-deep_orange
teal-pink
teal-indigo
teal-red
teal-yellow
teal-blue
teal-green
teal-orange
teal-light_blue
teal-amber
teal-cyan
teal-light_green
teal-lime
purple-teal
purple-purple
purple-deep_purple
purple-deep_orange
purple-pink
purple-indigo
purple-red
purple-yellow
purple-blue
purple-green
purple-orange
purple-light_blue
purple-amber
purple-cyan
purple-light_green
purple-lime
deep_purple-teal
deep_purple-purple
deep_purple-deep_purple
deep_purple-deep_orange
deep_purple-pink
deep_purple-indigo
deep_purple-red
deep_purple-yellow
deep_purple-blue
deep_purple-green
deep_purple-orange
deep_purple-light_blue
deep_purple-amber
deep_purple-cyan
deep_purple-light_green
deep_purple-lime
deep_orange-teal
deep_orange-purple
deep_orange-deep_purple
deep_orange-deep_orange
deep_orange-pink
deep_orange-indigo
deep_orange-red
deep_orange-yellow
deep_orange-blue
deep_orange-green
deep_orange-orange
deep_orange-light_blue
deep_orange-amber
deep_orange-cyan
deep_orange-light_green
deep_orange-lime
pink-teal
pink-purple
pink-deep_purple
pink-deep_orange
pink-pink
pink-indigo
pink-red
pink-yellow
pink-blue
pink-green
pink-orange
pink-light_blue
pink-amber
pink-cyan
pink-light_green
pink-lime
indigo-teal
indigo-purple
indigo-deep_purple
indigo-deep_orange
indigo-pink
indigo-indigo
indigo-red
indigo-yellow
indigo-blue
indigo-green
indigo-orange
indigo-light_blue
indigo-amber
indigo-cyan
indigo-light_green
indigo-lime
blue_grey-teal
blue_grey-purple
blue_grey-deep_purple
blue_grey-deep_orange
blue_grey-pink
blue_grey-indigo
blue_grey-red
blue_grey-yellow
blue_grey-blue
blue_grey-green
blue_grey-orange
blue_grey-light_blue
blue_grey-amber
blue_grey-cyan
blue_grey-light_green
blue_grey-lime
red-teal
red-purple
red-deep_purple
red-deep_orange
red-pink
red-indigo
red-red
red-yellow
red-blue
red-green
red-orange
red-light_blue
red-amber
red-cyan
red-light_green
red-lime
yellow-teal
yellow-purple
yellow-deep_purple
yellow-deep_orange
yellow-pink
yellow-indigo
yellow-red
yellow-yellow
yellow-blue
yellow-green
yellow-orange
yellow-light_blue
yellow-amber
yellow-cyan
yellow-light_green
yellow-lime
blue-teal
blue-purple
blue-deep_purple
blue-deep_orange
blue-pink
blue-indigo
blue-red
blue-yellow
blue-blue
blue-green
blue-orange
blue-light_blue
blue-amber
blue-cyan
blue-light_green
blue-lime
green-teal
green-purple
green-deep_purple
green-deep_orange
green-pink
green-indigo
green-red
green-yellow
green-blue
green-green
green-orange
green-light_blue
green-amber
green-cyan
green-light_green
green-lime
brown-teal
brown-purple
brown-deep_purple
brown-deep_orange
brown-pink
brown-indigo
brown-red
brown-yellow
brown-blue
brown-green
brown-orange
brown-light_blue
brown-amber
brown-cyan
brown-light_green
brown-lime
grey-teal
grey-purple
grey-deep_purple
grey-deep_orange
grey-pink
grey-indigo
grey-red
grey-yellow
grey-blue
grey-green
grey-orange
grey-light_blue
grey-amber
grey-cyan
grey-light_green
grey-lime
orange-teal
orange-purple
orange-deep_purple
orange-deep_orange
orange-pink
orange-indigo
orange-red
orange-yellow
orange-blue
orange-green
orange-orange
orange-light_blue
orange-amber
orange-cyan
orange-light_green
orange-lime
light_blue-teal
light_blue-purple
light_blue-deep_purple
light_blue-deep_orange
light_blue-pink
light_blue-indigo
light_blue-red
light_blue-yellow
light_blue-blue
light_blue-green
light_blue-orange
light_blue-light_blue
light_blue-amber
light_blue-cyan
light_blue-light_green
light_blue-lime
amber-teal
amber-purple
amber-deep_purple
amber-deep_orange
amber-pink
amber-indigo
amber-red
amber-yellow
amber-blue
amber-green
amber-orange
amber-light_blue
amber-amber
amber-cyan
amber-light_green
amber-lime
cyan-teal
cyan-purple
cyan-deep_purple
cyan-deep_orange
cyan-pink
cyan-indigo
cyan-red
cyan-yellow
cyan-blue
cyan-green
cyan-orange
cyan-light_blue
cyan-amber
cyan-cyan
cyan-light_green
cyan-lime
light_green-teal
light_green-purple
light_green-deep_purple
light_green-deep_orange
light_green-pink
light_green-indigo
light_green-red
light_green-yellow
light_green-blue
light_green-green
light_green-orange
light_green-light_blue
light_green-amber
light_green-cyan
light_green-light_green
light_green-lime
lime-teal
lime-purple
lime-deep_purple
lime-deep_orange
lime-pink
lime-indigo
lime-red
lime-yellow
lime-blue
lime-green
lime-orange
lime-light_blue
lime-amber
lime-cyan
lime-light_green
lime-lime

```


