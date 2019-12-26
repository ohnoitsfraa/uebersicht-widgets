#!/bin/bash

# Thanks to Thomas Brace for this script: https://github.com/ThomasBrace/Ubersicht-Spotify-widget

trackInfo=`osascript <<<'tell application "Spotify"
        set theTrack to current track
        set theArtist to artist of theTrack
        set trackName to name of theTrack
        set artworkUrl to artwork url of theTrack
        set playerState to player state
        return  theArtist & "|" & trackName & "|" & artworkUrl & "|" & playerState
    end tell'`;

echo $trackInfo;