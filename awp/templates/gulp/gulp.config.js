module.exports = {
	//这里可以配置一些公共参数
	zipPathPrefix: 'http://msstest.sankuai.info/v1/mss_a5676b5c63924106b2e422c3820dde3e/mynodejs-container-3/',
	exec: {
		prepub: function (branch, msg) {
			var add = this.add();
			var commit = this.commit(msg);
			return add + ' && ' + commit + ' && ' + 'git push origin daily/' + branch + ':daily/' + branch;
		},
		publish: function (branch) {
			var tag = this.tag(branch);
			return tag + ' && ' + 'git push origin publish/' + branch + ':publish/' + branch;
		},
		tag: function (branch) {
			return 'git tag publish/' + branch;
		},
		add: function () {
			return 'git add . -A';
		},
		commit: function (msg) {
			return 'git commit -m ' + msg;
		}
	}
}