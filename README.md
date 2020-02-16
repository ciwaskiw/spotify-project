# Spotify Modular Controls Project

## Architecture

* SpotifyComponent class
    * Button subclass
* SavedView class
    * Contains list of components
* Always visible: 


## REQS
Project Reqs (order of priority):
## Back-end

1. Add-to-playlist custom buttons
3. Spotify player 
    * Volume, back, forward, shuffle, repeat, play, pause, like
4. Additional custom buttons
    * Add to queue
    * Turn on/off crossfade
5. Nice-to-have buttons:
    * Devices playing
    * Switch to 10s seek for podcasts
6. Components saveable as 'views'
    * Eventually saveable w/ a profile online w/ username/password?
    * Or w/ spotify profile?

## Front-end

1. Now playing view window
    * Need to be able to obtain album art, album/song/artist, current time, and total time
2. "Plus" to add components to view
3. Changeable view window size
    * Want to be dynamic, but for starters could be saved w/ settings

