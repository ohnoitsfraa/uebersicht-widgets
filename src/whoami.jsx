import config from './config/config';

export const refreshFrequency = config.whoami.refresh;
export const command = 'whoami';

export const render = ({output}) => {
    return (
        <a href={config.whoami.url} className="item has-icon whoami">
            <img className="icon" src={config.whoami.logo}/>
            <span className="text">{output}</span>
        </a>
    )
};
