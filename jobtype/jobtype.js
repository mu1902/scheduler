var cp = require('child_process');

exports.python = function (path, args, done) {
    // var str = JSON.stringify(args).replace(/"/g, '\\"');
    cp.exec('python ' + path + ' ' + args, function (err, stdout, stderr) {
        done();
        if (err) {
            return err.message;
        } else if (stderr) {
            return stderr;
        } else {
            return stdout;
        }
    });

}

exports.cmd = function (path, args, done) {
    var res = cp.exec('start powershell ' + args, function (err, stdout, stderr) {
        done();
        if (err) {
            return err.message;
        } else {
            return stderr;
        }
    });
}