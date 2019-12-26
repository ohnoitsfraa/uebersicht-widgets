#!/bin/bash

`osascript <<<'using terms from application "Spotify"
	tell application "Spotify" to next track
end using terms from'`;