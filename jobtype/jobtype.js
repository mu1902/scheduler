var cp = require('child_process');

exports.python = function (path, args) {
    // var str = JSON.stringify(args).replace(/"/g, '\\"');
    var res = cp.execSync('python ' + path + ' ' + args);
    return res.toString();
}

exports.cmd = function (args) {
    var res = cp.execSync('start powershell ' + args);
    return res.toString();
}