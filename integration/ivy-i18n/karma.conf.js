// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

// Env var CHROME_BIN is later picked up by karma-chrome-launcher that is triggered by
// `browsers: ['ChromeHeadlessNoSandbox']` below.
// See https://github.com/karma-runner/karma-chrome-launcher#usage for more info.
process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'), require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'), require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      clearContext: false  // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, './coverage/latest-app'),
      reports: ['html', 'lcovonly', 'text-summary'],
      fixWebpackSourcePaths: true
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        // See /integration/README.md#browser-tests for more info on these args
        flags: [
          '--no-sandbox', '--headless', '--disable-gpu', '--disable-dev-shm-usage',
          '--hide-scrollbars', '--mute-audio'
        ]
      }
    },
    customHeaders: [{
      match: '.*',
      name: 'Content-Security-Policy',
      value: `require-trusted-types-for 'script';`,
    }],
    browsers: ['ChromeHeadlessNoSandbox'],
    singleRun: false,
    restartOnFileChange: true
  });
};
