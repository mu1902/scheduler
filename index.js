var Agenda = require('agenda')
var py = require("./python/py").python;

var log4js = require("log4js");
log4js.configure("./log/config.json");
var job_log = log4js.getLogger('job');

var mongo = 'mongodb://127.0.0.1:27017/agenda';
var agenda = new Agenda({ db: { address: mongo } });

agenda.define('test', function (job) {
    job.attrs.data["result"] = py("python/test.py");
});

agenda.on('ready', function () {
    agenda.every('1 minutes', 'test', { id: 0, result: "" }, { timezone: 'Asia/Shanghai' });
    // agenda.every('0 50 14 * * *', 'test', { result: "" }, { timezone: 'Asia/Shanghai' });
    agenda.start();
});

agenda.on('start', (job) => {
    job.attrs.data["id"] = (new Date()).valueOf();
    job.attrs.data["result"] = "";
    job_log.info('start:', job.attrs.name, ';ID:', job.attrs.data["id"]);
})

agenda.on('complete', (job) => {
    job_log.info('complete:', job.attrs.name, ';ID:', job.attrs.data["id"]);
})

agenda.on('success', (job) => {
    job_log.info('success:', job.attrs.name, ';ID:', job.attrs.data["id"], ';Return:', job.attrs.data["result"]);
})

agenda.on('fail', (job) => {
    job_log.error('fail:', job.attrs.name, ';ID:', job.attrs.data["id"], 'time:', job.attrs.failedAt, 'reason:', job.attrs.failReason);
})

function graceful() {
    agenda.stop(() => {
        job_log.info('退出')
        process.exit(0);
    });
}

process.on('SIGTERM', graceful);
process.on('SIGINT', graceful);

exports.agenda = agenda;
