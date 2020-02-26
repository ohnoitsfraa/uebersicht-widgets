import config from './config/config';
export const unsplashConfig = config.unsplash;
export const refreshFrequency = unsplashConfig.refresh;
let random = 0;
export const headers = new Headers({
    'Authorization': `Client-ID ${unsplashConfig.accessKey}`
});
export const command = config.unsplash.enabled ? async (dispatch) => await getCollection() : '';

const getCollection = async () => {
    return await (await fetch(`https://api.unsplash.com/collections/${unsplashConfig.collectionId}/photos?per_page=${unsplashConfig.perPage}`, { headers: headers })).json()
};

const randomIntFromInterval = (max) => {
    return Math.floor(Math.random() * max);
};

export const render = ({ output }) => {
    if (config.unsplash.enabled) {
        random = window.navigator.onLine && output ? randomIntFromInterval(output.length) : 0;
        return (
            window.navigator.onLine ? (
                unsplashConfig ? (
                    output && output.length > random ? (
                        <div className="unsplash">
                            <img alt="unsplash" className="image" src={output[random].urls.full} />
                            {
                                config.unsplash && config.unsplash.showCredits ? (
                                    <div className="credits">
                                        <div className="link">
                                            <span className="description">{output[random]['alt_description'] || ''}</span>
                                            <span className="by">&nbsp;by&nbsp;</span>
                                            <span className="username">{output[random].user.username}</span>
                                        </div>
                                    </div>
                                ) : ''
                            }
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
    }
    document.getElementById('unsplash-jsx').classList.add('none');
    return ''
};
