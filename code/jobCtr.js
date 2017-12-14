var fs = require('fs');

exports.jobs = function (obj, agenda, callback) {
    agenda.jobs({}, function (err, jobs) {
        var logs = fs.readFileSync('./log/job.log', 'utf-8');
        // console.log(logs);
        callback({ "jobs": jobs, "logs": logs });
    });
};