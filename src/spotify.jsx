import config from './config/config';
import { run } from 'uebersicht';

const trackInfoCommand =  `source scripts/spotify-current.sh`
const playPauseCommand = `source scripts/spotify-playpause.sh`;
const nextTrackCommand = `source scripts/spotify-nexttrack.sh`;
const separator = '|';
export const refreshFrequency = config.spotify.refresh;
export const command = trackInfoCommand;

const parseOutput = (output) => {
    const data = output.split(separator);
    return data.length > 3 ? {
        artist: data[0],
        title: data[1],
        artwork: data[2],
        state: data[3]
    } : undefined
}

const playPause = () => run(playPauseCommand);

const nextTrack = () => run(nextTrackCommand);

export const render = ({ output }) => {
    const data = parseOutput(output);
    return data ? (
        <div className={`item has-icon spotify ${data.state}`}>
            <span className="text">
                <i className="icon fab fa-spotify" onClick={() => playPause()}/>
                <span className="track-info" onClick={() => nextTrack()}>
                    <span className="artist">{data.artist}</span>
                    <span className="separator">-</span>
                    <span className="title">{data.title}</span>
                </span>
            </span>
            {
                config.spotify.showArtwork && data.artwork !== "missing value" ? <div className="artwork"><img src={data.artwork} /></div> : ''
            }
        </div>
    ) : <i className="icon fab fa-spotify"/>
}
