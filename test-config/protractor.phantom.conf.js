// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/docs/referenceConf.js

/*global jasmine */
var SpecReporter = require('jasmine-spec-reporter');

const ports = require('../constants')
const helpers = require('../helpers');

let port;
helpers.hasProcessFlag('universal') ? port = ports.UNIVERSAL_PORT : port = ports.E2E_PORT;

exports.config = {
  // seleniumAddress: 'http://localhost:44/wd/hub',
  allScriptsTimeout: 50000,
  specs: [
    './../e2e/*.spec.e2e.ts'
  ],
  capabilities: {
    browserName: 'phantomjs'
  },
  directConnect: false,
  baseUrl: `http://localhost:${port}/`,
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 50000,
    print: function() {}
  },
  useAllAngular2AppRoots: true,
  beforeLaunch: function() {
  },
  onPrepare: function() {
    require('ts-node').register({
      project: 'e2e'
    });
    jasmine.getEnv().addReporter(new SpecReporter());
  }
};
