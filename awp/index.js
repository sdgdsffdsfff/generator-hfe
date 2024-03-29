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

		var appname = path.basename(process.cwd());
		var prompts = [{
			name: 'projectName',
			message: 'Project Name',
			default: appname
		}, {
			name: 'projectDesc',
			message: 'Description of Project?',
			default: appname,
			warning: ''
		}, {
			name: 'srcDir',
			message: 'create "src" directory?',
			default: 'Y/n',
			warning: ''
		}, {
			name: 'author',
			message: 'Author Name:',
			warning: ''
		}, {
			name: 'email',
			message: 'Author Email:',
			warning: ''
		}, {
			name: 'version',
			message: 'Version:',
			default: '0.1.0',
			warning: ''
		}, {
			name: 'groupName',
			message: 'Group Name:',
			default: 'HFE',
			warning: ''
		}, {
			type: 'list',
			name: 'publicType',
			message: '请选择一种发布方式',
			choices: [{
				name: '内网项目(外网不可见)',
				value: 'vip',
				checked: false
			}, {
				name: '外网i版',
				value: 'h5',
				checked: true
			}, {
				name: '外网pc版',
				value: 'pc',
				checked: true
			}]
		}];

		this.prompt(prompts, function (props) {
			this.srcDir = (/^y/i).test(props.srcDir);
			this.props = props;
			console.log(props);
			done();
		}.bind(this));
	},

	writing: {
		app: function () {
			if (this.srcDir) {
				this.mkdir('src/pages');
				this.mkdir('src/mods');
				this.mkdir('src/widgets');
			}
			this.mkdir('doc');
			this.mkdir('build');
			this.template('build.sh');
			this.template('README.md');
			this.template('offline.json');
			this.template('_package.json', 'package.json');
			this.template('_gitignore', '.gitignore');
			this.template('gulpfile.js');
			this.template('repo-info.json');
			this.directory('gulp', 'gulp');
		}
	},
	install: function () {
		this.installDependencies();
	}
});