var through = require('through2'),
	exec = require('child_process').exec;

function Prepub(cfg) {
	var cfg = cfg || {};
	return through.obj(function (file, env, cb) {
		var publishType = cfg.publishType,
			version = cfg.version,
			group = cfg.group,
			repoName = cfg.repoName,
			filePath = 'pages' + file.path.split('/build/pages')[1];
		//发送post请求
		var command = 'curl -F "file=@' + file.path + '" -F "publishType=' +
			publishType + '"  -F "version=' + version + '" -F "group=' + group +
			'" -F "repoName=' + repoName + '" -F "filePath=' + filePath +
			'"  http://hfe.sankuai.com/cdn/upload';
		// var command = 'curl -F "file=@' + file.path + '" -F "publishType=' + publishType + '"  -F "version=' + version + '" -F "group=' + group + '" -F "repoName=' + repoName + '" -F "filePath=' + filePath + '"  http://localhost:8000/cdn/upload';
		exec(command, function (err, stdout, stderr) {
			if (err) {
				console.log(err);
			}
			if (stdout == '500') {
				console.log('文件：' + stdout + ' 发布失败！');
			} else {
				console.log('文件：' + stdout + ' 发布成功！');
			}
			cb(null, file);
		})

	})
}
module.exports = Prepub;