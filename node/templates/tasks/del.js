var del = require('del');

module.exports = {
    task: function(gulp) {
        del.sync('build');
    }
};
