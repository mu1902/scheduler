var cp = require('child_process');

exports.exec = function (path, args) {
    // var str = JSON.stringify(args).replace(/"/g, '\\"');
    var res = cp.execSync('python ' + path + ' ' + args);
    return res.toString();
}