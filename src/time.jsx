import config from './config/config';
import moment from '../node_modules/moment';

export const refreshFrequency = config.time.words ? 3000 : config.time.refresh;
export const command = dispatch => {
    const now = moment();
    return config.time.enabled ? {
        time: now.format('HH:mm:ss'),
        minute: parseInt(now.format('mm'), 10),
        hour: now.format('HH') % 12 === 0 ? 12 : now.format('HH') % 12
    } : {}
}
export const initialState = { output: { time: moment().format('HH:MM:SS') } };
const hours = [null, "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve"];
const ones = [null, "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
const teens = ["ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
const tens = [null, null, "twenty", "thirty", "forty", "fifty"];

const generateWords = (output) => {
    const hourText = hours[output.hour];
    let minuteText;
    if (output.minute === 0) {
        minuteText = `o'clock`;
    } else if (output.minute >= 1 && output.minute <= 9) {
        minuteText = `o'${ones[output.minute]}`;
    } else if (output.minute >= 10 && output.minute <= 19) {
        minuteText = teens[output.minute - 10];
    } else {
        minuteText = output.minute ? tens[`${output.minute}`.substr(0, 1)] : '';
        if (`${output.minute}`.substr(1, 2) !== "0") {
            minuteText += ones[`${output.minute}`.substr(1, 2)];
        }
    }
    return { hourText, minuteText };
}

export const render = ({ output }) => {
    if (config.time.enabled) {
        const result = config.time.words ? generateWords(output) : output;
        return (
            <div className="item has-icon time">
                <div className="time">
                    <i className="icon far fa-clock" />
                    <span className="text">
                        {
                            config.time.words ? (
                                <span className="words">
                                    <span className="hour">{result.hourText}</span>&nbsp;
                                <span className="minute">{result.minuteText}</span>
                                </span>
                            ) : (
                                    result.time
                                )
                        }
                    </span>
                </div>
            </div>
        )
    }
    document.getElementById('time-jsx').classList.add('none');
    return ''
}
