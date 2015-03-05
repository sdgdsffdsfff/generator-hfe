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
            name: 'controllerName',
            message: 'Page Name',
            default: 'index.js'
        }];

        this.prompt(prompts, function (props) {
            this.controllerName = props.controllerName;
            this.props = props;

            done();
        }.bind(this));
    },

    writing: {
        app: function () {
            this.template('index.js', this.controllerName, this.props);
        },

        projectfiles: function () {

        }
    },

    install: function () {

    }
});
