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
            name: 'componentName',
            message: 'Component Name',
            default: 'ngComponent.js'
        }, {
            name: 'providerName',
            message: 'Provider Name',
            default: 'providerName'
        }, {
            name: 'directiveName',
            message: 'Directive Name',
            default: 'directiveName'
        }];

        this.prompt(prompts, function (props) {
            this.componentName = props.componentName;
            this.providerName = props.providerName;
            this.directiveName = props.directiveName;
            this.props = props;

            done();
        }.bind(this));
    },

    writing: {
        app: function () {
            this.template('index.js', this.componentName, this.props);
        },

        projectfiles: function () {

        }
    },

    install: function () {

    }
});
