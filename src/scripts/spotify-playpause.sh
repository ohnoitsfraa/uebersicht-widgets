#!/bin/bash

# Thanks to ellcom for this script: https://gist.github.com/ellcom/58f47d7eeb3601734ef9

`osascript <<<'using terms from application "Spotify"
	if player state of application "Spotify" is paused then
		tell application "Spotify" to play
	else
		tell application "Spotify" to pause
	end if
end using terms from'`;