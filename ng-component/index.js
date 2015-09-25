'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');
var shelljs = require('shelljs');
var defaults = require('./_defaults');
var _ = require('lodash');
var __ = require('underscore.string');

module.exports = yeoman.generators.Base.extend({
  initializing: function() {
    this.pkg = require('../package.json');
  },

  prompting: function() {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the fine' + chalk.red('Hfe') + ' generator!'
    ));

    var prompts = [{
      name: 'appName',
      message: 'What\'s the name of your component?',
      default: 'ng.hfe.' + defaults.appName
    }, {
      name: 'appVersion',
      message: 'What is the version of your project?',
      default: defaults.appVersion
    }, {
      name: 'authorName',
      message: 'What is the author name?',
      default: defaults.authorName
    }, {
      name: 'authorEmail',
      message: 'What is the author email?',
      default: defaults.authorEmail
    }, {
      name: 'moduleType',
      message: 'Would kind of module do you want to create?',
      type: 'list',
      choices: ['directive', 'factory', 'service', 'filter'],
      default: 0
    }, {
      name: 'directiveName',
      message: function(answers) {
        return 'What\'s the name of your ' + answers.moduleType + '?';
      },
      default: 'ngHfeComponent'
    }, {
      name: 'cssprocessor',
      message: 'Which css preprocessor do you want?',
      type: 'list',
      choices: [
        'css',
        'postcss',
        'less',
        'scss'
      ],
      default: 0
    }];

    this.prompt(prompts, function(props) {
      this.props = _.merge(defaults, props, {
        providerName: __.camelize(props.appName.replace(/\./g, '-')),
        directive: __.slugify(props.appName),
      });

      done();
    }.bind(this));
  },

  writing: {
    app: function() {
      this.template('src/_' + this.props.moduleType + '.js', 'src/' + this.props.appName + '.js', this.props);
      this.template('src/index.js', 'src/index.js', this.props);
      this.template('README.md.template', 'README.md', this.props);
      this.template('package.json.template', 'package.json', this.props);
      this.template('bower.json.template', 'bower.json', this.props);
      this.template('gulpfile.js', 'gulpfile.js', this.props);
    },

    assets: function() {
      this.fs.copy(
        this.templatePath('src/assets/**/*'),
        this.destinationPath('src/assets')
      );
    },

    examples: function() {
      this.fs.copyTpl(
        this.templatePath('examples/**/*'),
        this.destinationPath('examples'),
        this.props
      );
    },

    test: function() {
      this.fs.copyTpl(
        this.templatePath('test'),
        this.destinationPath('test'),
        this.props
      );
    },

    projectfiles: function() {
      this.fs.copy(
        this.templatePath('_d_editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('_d_eslintrc'),
        this.destinationPath('.eslintrc')
      );
      this.fs.copy(
        this.templatePath('_d_gitignore'),
        this.destinationPath('.gitignore')
      );
      this.fs.copy(
        this.templatePath('_d_babelrc'),
        this.destinationPath('.babelrc')
      );
      this.fs.copy(
        this.templatePath('_d_eslintignore'),
        this.destinationPath('.eslintignore')
      );
      this.template('_d_bowerrc', '.bowerrc', this.props);
    }
  },

  install: function() {
    shelljs.exec('git init && git add --all && git commit -m "initial commit"');
    shelljs.exec('npm install');
  }
});