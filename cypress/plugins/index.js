const {afterRunHook, beforeRunHook} = require('cypress-mochawesome-reporter/lib');

module.exports = (on, config) => {
    require('@cypress/react/plugins/load-webpack')(on, config, {webpackFilename: 'webpack.cypress.config.js'});
    require('@cypress/code-coverage/task')(on, config);

    on('before:run', async details => {
        await beforeRunHook(details);
    });

    on('after:run', async () => {
        await afterRunHook();
    });

    on('file:preprocessor', require('@cypress/code-coverage/use-babelrc'));

    return config;
};