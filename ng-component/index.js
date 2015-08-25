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

        var prompts = [ {
            name: 'componentName',
            message: 'What\'s the name of your component?',
            default: 'ngHfeComponentModule'
        }, {
            name: 'moduleType',
            message: 'Would kind of module do you want to create?',
            type: 'list',
            choices: ['directive', 'factory', 'service', 'filter'],
            default: 0
        }, {
            name: 'directiveName',
            message: 'What\'s the name of your directive?',
            default: 'ngHfeComponent'
        }];

        this.prompt(prompts, function (props) {
            this.props = props;

            done();
        }.bind(this));
    },

    writing: {
        app: function () {
            this.copy('src/_' + this.props.moduleType + '.js', this.props.componentName + '.js');
        },

        projectfiles: function () {

        }
    },

    install: function () {

    }
});
