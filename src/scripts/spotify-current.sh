#!/bin/bash

# Thanks to Thomas Brace for this script: https://github.com/ThomasBrace/Ubersicht-Spotify-widget

trackInfo=`osascript <<<'tell application "Spotify"
        set theTrack to current track
        set theArtist to artist of theTrack
        set trackName to name of theTrack
        set artworkUrl to artwork url of theTrack
        set playerState to player state
        set trackDuration to duration of current track
        set secondsPlayed to player position
        return  theArtist & "|" & trackName & "|" & artworkUrl & "|" & playerState & "|" & trackDuration & "|" & secondsPlayed
    end tell'`;

echo $trackInfo;