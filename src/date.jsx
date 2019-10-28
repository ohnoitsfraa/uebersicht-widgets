import config from './config/config';

export const refreshFrequency = config.date.refresh;
export const command = "date +%A,%b,%e,%Y";

export const render = ({output}) => {
    const [weekday, month, day, year] = output.split(',');
    return (
        <div className="item has-icon date">
            <div className="date">
                <i className="icon fas fa-calendar-day"/>
                <span className="text">{weekday} {month} {day}, {year}</span>
            </div>
        </div>
    )
}
