import config from './config/config';
import { run } from 'uebersicht';

export const refreshFrequency = config.cpus.refresh;
export const command = async dispatch => {
    return {
        usage: await run("ps -e -o %cpu | awk '{s+=$1} END {print s}'"),
        cpus: await run('sysctl hw.physicalcpu')
    }
};

export const render = ({ output }) => {
    const cpus = output.cpus ? parseInt(output.cpus.substr('hw.physicalcpu: '.length)) : config.cpus.max;
    const avg = Math.ceil(parseInt(output.usage, 10) / cpus);
    return (
        <div className="item has-icon cpu">
            <i className="icon fas fa-microchip" />
            <span className="text">{avg}%</span>
        </div>
    )
}
