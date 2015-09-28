var iniparser = require('iniparser');
var path = require('path');
var fs = require('fs');

module.exports = (function() {
  var workingDirName = path.basename(process.cwd()),
    homeDir, osUserName, configFile, user;

  if (process.platform === 'win32') {
    homeDir = process.env.USERPROFILE;
    osUserName = process.env.USERNAME || path.basename(homeDir).toLowerCase();
  } else {
    homeDir = process.env.HOME || process.env.HOMEPATH;
    osUserName = homeDir && homeDir.split('/').pop() || 'root';
  }

  configFile = path.join(homeDir, '.gitconfig');
  user = {};

  if (fs.existsSync(configFile)) {
    user = iniparser.parseSync(configFile).user;
  }

  return {
    appName: workingDirName,
    userName: osUserName || format(user.name || ''),
    authorName: user.name || '',
    authorEmail: user.email || '',
    appVersion: '0.1.0',
    appDescription: 'a angular component',
    groupName: 'HFE'
  };
})();