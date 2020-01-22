import config from './config/config';
export const weatherConfig = config.weather;
export const refreshFrequency = config.weather.refresh;
export const command = async () => {
    if (config.weather.enabled) {
        const result = await getLocation();
        return getWeather(result.error ? weatherConfig.defaultLocation : result);
    }
    return '';
};

const getLocation = () => new Promise((resolve, reject) => {
    window.geolocation.getCurrentPosition(position => resolve(position.address), err => reject(err));
    setTimeout(() => resolve({ error: 'location service not enabled' }), 500);
});

const getWeather = async (location) => {
    const query = `${location.city}, ${location.country}`
    return await (await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${query}&APPID=${weatherConfig.appId}`)).json();
};

const kelvinToCelsius = (temp) => Math.round(parseInt(temp, 10) - 273.15);

const kelvinToFahrenheit = (temp) => Math.round(parseInt(temp, 10) * (9 / 5) - 459.67);

const convertTemperature = (temp) => weatherConfig.unit === 'C' ? kelvinToCelsius(temp) : kelvinToFahrenheit(temp);

export const render = ({ output, error }) => {
    if(config.weather.enabled) {
    return window.navigator.onLine ? (
        output && output.error || error || !weatherConfig.appId || !output.name ? (
            <div className="error-msg">
                <i className="icon far fa-exclamation-triangle" />
            </div>
        ) : (
                <div className="item has-icon weather">
                    {
                        output.weather ? (
                            <i className={`icon owi owi-${output.weather[0].icon}`}></i>
                        ) : ''
                    }
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
                                <span className="value">{convertTemperature(output.main.temp)}</span>
                                <span className="degree-icon">&#176;</span>
                                <span className="unit">{weatherConfig.unit === 'C' ? weatherConfig.unit : 'F'}</span>
                            </span>
                        ) : ''
                    }
                    {
                        output.weather ? (
                            <span className="info">
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
    }
    document.getElementById('weather-jsx').classList.add('none');
    return ''
};
