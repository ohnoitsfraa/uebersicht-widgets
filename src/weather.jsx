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
    return window.navigator.onLine ? (
        error || !weatherConfig.appId || !output.name ? (
            <div className="error-msg">
                <i className="icon far fa-exclamation-triangle" />
                <span className="text">{!weatherConfig.appId ? 'No config' : 'Invalid location'}</span>
            </div>
        ) : (
                <div className="item has-icon weather">
                    {
                        output.sys ? (
                            <span className="location">
                                <span className="city">{output.name}, </span>
                                <span className="country">{output.sys.country}</span>
                                <i className="far fa-wifi-slash" />
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
                        output.weather ? (
                            <span className="info">
                                <i className={`icon owi owi-${output.weather[0].icon}`}></i>
                                <span className={`text`}>{output.weather[0].description}</span>
                            </span>
                        ) : ''
                    }
                </div>
            )
    ) : (
            <div className="error-msg">
                <i className="fas fa-ethernet"></i>
            </div>
        )
};
