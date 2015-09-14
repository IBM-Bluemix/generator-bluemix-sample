'use strict'
var yeoman = require('yeoman-generator');
//var store = require('mem-fs').create();
//var File = require('vinyl');
var shelljs = require('shelljs');
var chalk = require('chalk');

var BluemixSampleGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');

    // requires cloudfoundry
    var dependenciesInstalled = ['cf'].every(function (depend) {
      return shelljs.which(depend);
    });

    if (!dependenciesInstalled) {
      this.log('MISSING DEPENDENCIES:' +
        '\n' + chalk.yellow('Cloud Foundry') + ' is not installed or missing from $PATH.');
      shelljs.exit(1);
    }
  },

  prompting: function () {
    var done = this.async();

      // this.log(this.yeoman);

      this.log('\n' + chalk.blue('                                                                                          \n                             .::::::::::-                                                 \n                            -oooooooooooo:                                                \n                           :oooooooooooooo\x2F                                               \n                          \x2Foooooooooooooooo+`                                             \n                         :++++++++++ooooooooo`                                            \n            `oyyyyyyyyoo\x2F:++oooooooo++oooooo+`                                            \n           `syyyyyyysoyy+s+o+++ooooooo\x2F+ooo\x2F   .+++++.\x2F+++++\x2F:  ++++:   :++++             \n          .yyyyyyyysoyyy+yy\x2Fooo++++oooo\x2Foo:    .\x2F+++\x2F.\x2F++++\x2F+++`\x2F++++. .+++++             \n         :yyyyyyyyy+yyyy+yyy+oooooo+++oo\x2F-       oy+   .yy\x2F:\x2Fyo` -yyys.syyy:              \n        .yyyyyyyyyy+yyyy+yyyy:++++++++::.        +s\x2F   .ssssss-  -ss:sss:ss-              \n         -yyyyyyyyy+yyyy+yyy\x2F+ooooo++++o\x2F-       :+:   `++` .++. .+\x2F :+: \x2F+.              \n          .syyyyyyyy+yyy+ys\x2Fooo++++oooo\x2Foo:    -sssss-osssssss+`ssss `o` ssss`..`         \n           `oyyyyyyysoyy+s\x2F++++oooooo+\x2Foooo\x2F   `-----`.------`  ----  `  ----             \n             +yyyyyyyyoo::++ooooooo+\x2F+oooooo+`                                            \n                         :+++++++++ooooooooo+.                                            \n                          \x2Foooooooooooooooo+`                                             \n                           :oooooooooooooo\x2F                                               \n                            -oooooooooooo:                                                \n                             .::::::::::-                                                 \n'));

      this.log(chalk.cyan('\n Let\'s generate your Bluemix sample app!'));
      this.log(chalk.yellow('\n First, we need some basic info about your app »'));

    var prompts = [{
      name: 'projectName',
      message: 'What is the name of your project?'
    }, {
      name: 'projectURL',
      message: 'What will the subdomain for your project be? ' + chalk.magenta('(do not include mybluemix.net)')
    }, {
      type: 'list',
      name: 'projectSize',
      message: 'How much memory would you like to allocate for your app?',
      choices: [{
            value: '32M',
            name: '32MB'
        }, {
            value: '64M',
            name: '64MB'
        }, {
            value: '128M',
            name: '128MB'
        }, {
            value: '512M',
            name: '512MB'
        }, {
            value: '1G',
            name: '1GB'
        }
    ],
      default: '64M'
    }, {
      type: 'list',
      name: 'projectLanguage',
      message: 'What runtime would you like to use?',
      choices: [{
            value: 'sdk-for-nodejs',
            name: 'node'
        }, {
            value: 'liberty-for-java',
            name: 'java liberty'
        }, {
            value: 'python_buildpack',
            name: 'python'
        }, {
            value: 'ruby_buildpack',
            name: 'ruby'
        }, {
            value: 'go_buildpack',
            name: 'go'
        }, {
            value: 'php_buildpack',
            name: 'php'
        }, {
            value: 'aspnet5-experimental',
            name: 'asp.net'
        }, {
            value: 'xpages_buildpack',
            name: 'xpages'
        }
    ],
      default: 'sdk-for-nodejs'
    }, {
      type: 'list',
      name: 'projectLicense',
      message: 'What license would you like to use?',
      choices: [{
            value: 'apache',
            name: 'Apache 2.0'
        }, {
            value: 'mit',
            name: 'MIT'
        }
    ],
      default: 'apache'
    }, {
      type: 'list',
      name: 'projectType',
      message: 'What type of sample app are you creating?',
      choices: [{
            value: 'hello_world',
            name: 'Hello World App'
        }, {
            value: 'sample_app',
            name: 'Simple Sample App'
        }, {
            value: 'demo',
            name: 'Demo App'
        }, {
            value: 'reference_architecture',
            name: 'Reference Architecture Pattern App'
        }
    ],
      default: 'sample_app'
    }];

    this.prompt(prompts, function (props) {
      this.projectName        = props.projectName;
      this.projectURL         = props.projectURL;
      this.projectSize        = props.projectSize;
      this.projectLanguage    = props.projectLanguage;
      this.projectLicense     = props.projectLicense;
      this.projectType        = props.projectType;

      done();
    }.bind(this));
  },

  writing: {

    app: function () {
      /* folders being made
      this.dest.mkdir('public');
      this.dest.mkdir('public/js');
      this.dest.mkdir('public/images');
      this.dest.mkdir('public/css');
      this.dest.mkdir('views');*/

      // files being templated
      this.template('_manifest.yml', 'manifest.yml');

      if (this.projectType === "hello_world")
        this.template('README-HelloWorld.md', 'README.md');
      else if (this.projectType === "sample_app")
        this.template('README-SampleApp.md', 'README.md');
      else if (this.projectType === "demo")
        this.template('README-Demo.md', 'README.md');
      else if (this.projectType === "reference_architecture")
        this.template('README-Ref_Arch_App.md', 'README.md');

      //files being copied over
      //this.copy('sample', 'sample');
    },

    projectfiles: function () {
      this.copy('.editorconfig', '.editorconfig');
      this.copy('.cfignore', '.cfignore');
      this.copy('gitignore', '.gitignore');

      if (this.projectLicense === "apache")
        this.copy('Apache2License.txt', 'License.txt');
      else if (this.projectLicense === "mit")
        this.copy('MITLicense.txt', 'License.txt');
    }
  },

  end: function () {
    var spawnSync = require('child_process').spawnSync;

    //spawnSync('npm', ['install'], {stdio: 'inherit'});
  }
});

module.exports = BluemixSampleGenerator;
