import config from './config/config';
export const weatherConfig = config.weather;
export const refreshFrequency = config.weather.refresh;
export const command = async (dispatch) => getWeather();

const getWeather = async () => await (await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${weatherConfig.defaultLocation}&APPID=${weatherConfig.appId}`)).json();

const kelvinToCelsius = (temp) => {
    try {
        return Math.round(parseInt(temp, 10) - 273.15);
    } catch (e) {
        return undefined;
    }
};

export const render = ({ output, error }) => {
    return error || !weatherConfig.appId || !output.name ? (
        <div className="error-msg">
            <i className="icon far fa-exclamation-triangle" />
            <span className="text">{!weatherConfig.appId ? 'No config' : 'Invalid location'}</span>
        </div>
    ) : (
            <div className="item weather">
                {
                    output.sys ? (
                        <span className="location">
                            <span className="city">{output.name}, </span>
                            <span className="country">{output.sys.country}</span>
                        </span>
                    ) : ''
                }
                {
                    output.main ? (
                        <span className="temperature">
                            <span className="value">{kelvinToCelsius(output.main.temp)}</span>
                            <span className="degree-icon">&#176;</span>
                        </span>
                    ) : ''
                }
                {
                    output.weather && output.weather.length ? (
                        <span className="info">
                            <img className="img" alt="weather icon"
                                src={`http://openweathermap.org/img/w/${output.weather[0].icon}.png`} />
                            <span className={`text`}>{output.weather[0].description}</span>
                        </span>
                    ) : ''
                }
            </div>
        )
};
