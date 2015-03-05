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
            name: 'pageName',
            message: 'Page Name',
            default: 'index.html'
        }, {
            name: 'pageTitle',
            message: 'Page Title',
            default: '页面标题'
        }];

        this.prompt(prompts, function (props) {
            this.pageName = props.pageName;
            this.pageTitle = props.pageTitle;
            this.props = props;

            done();
        }.bind(this));
    },

    writing: {
        app: function () {
            this.template('index.html', this.pageName, this.props);
        },

        projectfiles: function () {

        }
    },

    install: function () {

    }
});
