import config from './config/config';
export const unsplashConfig = config.unsplash;
export const refreshFrequency = unsplashConfig.refresh;
let random = 0;
export const headers = new Headers({
    'Authorization': `Client-ID ${unsplashConfig.accessKey}`
});
export const command = async (dispatch) => await getCollection();

const getCollection = async () => {
    return await (await fetch(`https://api.unsplash.com/collections/${unsplashConfig.collectionId}/photos?per_page=${unsplashConfig.perPage}`, { headers: headers })).json()
};

const randomIntFromInterval = (max) => {
    return Math.floor(Math.random() * max);
};

export const render = ({ output }) => {
    random = window.navigator.onLine ? randomIntFromInterval(output.length) : 0;
    return (
        window.navigator.onLine ? (
            unsplashConfig ? (
                output.length > random ? (
                    <div className="unsplash">
                        <img alt="unsplash" className="image" src={output[random].urls.full} />
                    </div>
                ) : 'error'
            ) : (
                    <div className="error">
                        <i className="icon far fa-exclamation-triangle" />
                    </div>
                )
        ) : (
                ''
            )

    )
};
