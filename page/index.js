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
		this.log(yosay('Welcome to the pioneering ' + chalk.red('Hfe') + ' generator!'));

		console.log("请在 src/pages 目录执行该命令");

		var prompts = [{
			name: 'pageName',
			message: 'Page Name'
		}, {
			name: 'pageTitle',
			message: 'Page Title',
			default: '页面标题'
		}];

		this.prompt(prompts, function (props) {
			this.props = props;
			done();
		}.bind(this));
	},

	writing: {
		app: function () {
			var pageName = this.props.pageName,
				pageTitle = this.props.pageTitle;
			this.mkdir(pageName);
			this.template('index.html', pageName + '/index.html');
			this.template('footer.html', pageName + '/footer.html');
			this.template('index.scss', pageName + '/index.scss');
			this.template('index.js', pageName + '/index.js');
		}
	}
});