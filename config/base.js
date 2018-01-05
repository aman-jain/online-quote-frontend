import local from './local';

const CONFIG = {local}

const ENV = {
    'localhost': 'local'

}

const getHost = () => {
    if(typeof(window) === 'undefined') {return 'localhost'}
    return window.location.hostname;
}

const getEnvironment = () => {
    return CONFIG[ENV[getHost()]]
}

export default{
    env: getEnvironment()
}
