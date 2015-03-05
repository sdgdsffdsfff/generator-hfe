'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');

module.exports = yeoman.generators.Base.extend({
    initializing: function () {
        this.pkg = require('../package.json');
    },

    prompting: function () {
        var done = this.async();

        // Have Yeoman greet the user.
        this.log(yosay(
            'Welcome to the fine' + chalk.red('Hfe') + ' generator!'
        ));

        var prompts = [{
            type: 'confirm',
            name: 'someOption',
            message: 'Would you like to enable this option?',
            default: true
        }, {
            name: 'projectName',
            message: 'Project Name',
            default: path.basename(process.cwd())
        }];

        this.prompt(prompts, function (props) {
            this.someOption = props.someOption;
            this.props = props;

            done();
        }.bind(this));
    },

    writing: {
        app: function () {
            this.directory('controllers', 'controllers');
            this.directory('helpers', 'helpers');
            this.directory('ops_automation', 'ops_automation');
            this.directory('public', 'public');
            this.directory('shell', 'shell');
            this.directory('tasks', 'tasks');
            this.directory('templates', 'templates');
            this.template('app.js', 'app.js');
            this.template('gulpfile.js', 'gulpfile.js');
            this.template('index.js', 'index.js');
            this.template('index.js', 'index.js', this.props);
            this.template('_package.json', 'package.json', this.props);
            this.template('_bower.json', 'bower.json', this.props);
        },

        projectfiles: function () {
            this.fs.copy(
                this.templatePath('editorconfig'),
                this.destinationPath('.editorconfig')
            );
            this.fs.copy(
                this.templatePath('jshintrc'),
                this.destinationPath('.jshintrc')
            );
        }
    },

    install: function () {
        this.installDependencies({
            skipInstall: this.options['skip-install']
        });
    }
});
