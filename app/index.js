'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

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
            type: 'list',
            name: 'features',
            message: 'What would you like to create?',
            choices: [
                {
                    name: 'Node Project (based on Express)',
                    value: 'node',
                    checked: true
                }, {
                    name: 'HTML 5 Pages (for Mobile)',
                    value: 'h5',
                    checked: true
                }, {
                    name: 'Node Controller',
                    value: 'controller',
                    checked: true
                }, {
                    name: 'Angular Component',
                    value: 'ng-component',
                    checked: true
                }, {
                    name: 'Web Pages(with offline)',
                    value: 'awp',
                    checked: true
                }
            ]
        }];

        this.prompt(prompts, function (props) {
            this.features = props.features;

            done();
        }.bind(this));
    },

    writing: {
        app: function () {
            switch(this.features) {
                case 'node':
                    this.composeWith('hfe:node');
                    break;
                case 'h5':
                    this.composeWith('hfe:h5');
                    break;
                case 'controller':
                    this.composeWith('hfe:controller');
                    break;
                case 'ng-component':
                    this.composeWith('hfe:ng-component');
                    break;
                case 'awp':
                    this.composeWith('hfe:awp');
                    break;
                default:
                    this.composeWith('hfe:awp');
            }
        },

        projectfiles: function () {

        }
    },

    install: function () {

    }
});
