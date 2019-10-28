import config from './config/config';

export const refreshFrequency = config.memory.refresh;
export const command = "memory_pressure | tail -2";

export const render = ({output}) => {
    const result = output ? output.split(' ').pop() : '';
    return (
        <div className="item has-icon memory">
            <i className="icon fas fa-memory"/>
            <span className="text">{result}</span>
        </div>
    )
}
