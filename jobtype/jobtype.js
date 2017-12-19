var cp = require('child_process');

exports.python = function (path, args, callback) {
    // var str = JSON.stringify(args).replace(/"/g, '\\"');
    cp.exec('python ' + path + ' ' + args, function (err, stdout, stderr) {
        if (err) {
            callback(err.message);
        } else if (stderr) {
            callback(stderr);
        } else {
            callback(stdout);
        }
    });

}

exports.cmd = function (path, args, callback) {
    var res = cp.exec('start powershell ' + args, function (err, stdout, stderr) {
        if (err) {
            callback(err.message);
        } else {
            callback(stderr);
        }
    });
}