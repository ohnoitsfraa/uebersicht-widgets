import config from './config/config';

export const refreshFrequency = config.cpus.refresh;
export const command = "ps -e -o %cpu | awk '{s+=$1} END {print s}'";

export const render = ({output}) => {
    const avg = Math.ceil(parseInt(output, 10) / config.cpus.max);
    return (
        <div className="item has-icon cpu">
            <i className="icon fas fa-microchip"/>
            <span className="text">{avg}%</span>
        </div>
    )
}
