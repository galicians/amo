var browserstack = require('browserstack-local');
var SpecReporter = require('jasmine-spec-reporter');
var HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');

var reporter = new HtmlScreenshotReporter({
  dest: 'e2e/captures',
  filename:'my-report.html'
});

exports.config = {
  allScriptsTimeout: 990000,
  specs: [ './app.e2e-spec.ts' ],
  seleniumAddress: 'http://hub-cloud.browserstack.com/wd/hub',

  capabilities: {
    'browserstack.user': process.env.BROWSERSTACK_USERNAME || 'chaitraramesh1',
    'browserstack.key': process.env.BROWSERSTACK_ACCESS_KEY || 'XNqotMyQ1x1iaz2vL8jY',
    'build': 'protractor-browserstack',
    'name': 'local_test',
    'browserName': 'firefox',
    'browserstack.local': true,
    'browserstack.debug': 'true'
  },
  // Code to start browserstack local before start of test
  useAllAngular2AppRoots: true,
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function() {}
  },
  onPrepare: function() {
    jasmine.getEnv().addReporter(new SpecReporter());
    jasmine.getEnv().addReporter(reporter);
  },
  beforeLaunch: function(){
    console.log("Connecting local");
    require('ts-node').register({
      project: 'e2e'
    });
    return new Promise(function(resolve, reject){
      exports.bs_local = new browserstack.Local();
      exports.bs_local.start({'key': exports.config.capabilities['browserstack.key'] }, function(error) {
        if (error) {
          console.log('error', error)
          return reject(error);
        }
        console.log('Connected. Now testing...');
        reporter.beforeLaunch(resolve);
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
