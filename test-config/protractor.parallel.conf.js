var browserstack = require('browserstack-local');
var SpecReporter = require('jasmine-spec-reporter');
var HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');
var capabilities = require('./capabilities.js')

const ports = require('../constants')
const helpers = require('../helpers');

let port;
helpers.hasProcessFlag('universal') ? port = ports.UNIVERSAL_PORT : port = ports.E2E_PORT;

var reporter = new HtmlScreenshotReporter({
  dest: 'e2e/captures',
  filename:'my-report.html',
  pathBuilder: function(currentSpec, suites, browserCapabilities) {
    return browserCapabilities.get('browserName') + '/' +  browserCapabilities.get('browserName') + '_' + browserCapabilities.get('browser_version') + '_' + browserCapabilities.get('os') + '_' + currentSpec.fullName;
  },
  showSummary: true,
  showConfiguration:true
});

exports.config = {
  allScriptsTimeout: 990000,
  specs: [ './../e2e/*.spec.e2e.ts' ],
  baseUrl: `http://localhost:${port}/`,
  seleniumAddress: 'http://hub-cloud.browserstack.com/wd/hub',

  commonCapabilities: {
    'browserstack.user': process.env.BROWSERSTACK_USERNAME || 'chaitraramesh1',
    'browserstack.key': process.env.BROWSERSTACK_ACCESS_KEY || 'XNqotMyQ1x1iaz2vL8jY',
    'build': 'protractor-browserstack',
    'name': 'parallel_local_test',
    'browserstack.local': true,
    'browserstack.debug': 'true'
  },

  multiCapabilities: capabilities,
  useAllAngular2AppRoots: true,
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function() {}
  },
  onPrepare: function() {
    require('ts-node').register({
      project: 'e2e'
    });
    jasmine.getEnv().addReporter(new SpecReporter());
    jasmine.getEnv().addReporter(reporter);
  },
  // Code to start browserstack local before start of test
  beforeLaunch: function(){
    console.log("Connecting local");

    return new Promise(function(resolve, reject){
      exports.bs_local = new browserstack.Local();
      exports.bs_local.start({'key': exports.config.commonCapabilities['browserstack.key'] }, function(error) {
        if (error) {
          console.log('error', error)
          return reject(error);
        }
        console.log('Connected. Now testing...');
        reporter.beforeLaunch(resolve);
        resolve();

        resolve();
      });
    });
  },

  // Code to stop browserstack local after end of test
  afterLaunch: function(){
    return new Promise(function(resolve, reject){
      exports.bs_local.stop(resolve);
    });
  }
};

// Code to support common capabilities
exports.config.multiCapabilities.forEach(function(caps){
  for(var i in exports.config.commonCapabilities) caps[i] = caps[i] || exports.config.commonCapabilities[i];
});
