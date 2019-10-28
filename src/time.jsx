import config from './config/config';

export const refreshFrequency = config.time.refresh;
export const command = "date \"+%H:%M\:%S\"";

export const render = ({output}) => {
    return (
        <div className="item has-icon time">
            <div className="time">
                <i className="icon far fa-clock"/>
                <span className="text">{output}</span>
            </div>
        </div>
    )
}
