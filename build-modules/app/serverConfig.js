'use strict';

const port = process.env.PORT || 4000;
const ip = process.env.IP || '0.0.0.0';
const env = process.env || 'local';

const config = () => {
    return {
        env,
        ip,
        port
    };
};
module.exports = config;

