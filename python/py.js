var cp = require('child_process');
var path = 'code/python/';

exports.exec = function (args) {
    // var str = JSON.stringify(args).replace(/"/g, '\\"');
    var res = cp.execSync('python ' + path + 'net.py ' + args);
    if (res.toString()) {
        // console.log(res.toString());
        return JSON.parse(res.toString());
    } else {
        return '';
    }
}