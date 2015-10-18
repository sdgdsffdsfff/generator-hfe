module.exports = {
	//这里可以配置一些公共参数
	zipPathPrefix: 'http://awp-assets.meituan.net/',
	exec: {
		prepub: function (branch, msg) {
			if(!msg){
				console.log('请输入本次修改内容')
				return
			}
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
	},
	pubConfig: {
		"vip": ['pc:vip:publish', 'pc:vip:prepub'],
		"h5": ['h5:publish', 'h5:prepub'],
		"pc": ['pc:publish', 'pc:prepub']
	}
}
