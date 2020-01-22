import config from './config/config';

export const command = `pmset -g batt | grep -o '[0-9]*%; [a-z]*'`;
export const refreshFrequency = config.battery.refresh;

const parseOutput = (output) => {
    const split = output.split(';');
    return {
        percentage: parseInt(split[0].substring(0, split[0].length - 1), 10),
        status: split[1].trim()
    }
}

export const render = ({ output }) => {
    if (config.battery.enabled && output) {
        document.getElementById('battery-jsx').classList.remove('none');
        const data = parseOutput(output);
        return (
            <div className='item battery has-icon'>
                <span className="icon">
                    <span className="amount" style={{ width: `${data.percentage}%` }}></span>
                    <span className="battery"></span>
                </span>
                <span className="text percentage">{`${data.percentage}%`}</span>
                {
                    data.status === 'charging' ? (
                        <i className="fa fa-bolt icon-charging"></i>
                    ) : ''
                }

            </div>
        )
    }
    document.getElementById('battery-jsx').classList.add('none');
    return ''
}