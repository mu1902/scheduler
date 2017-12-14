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
    agenda.every('1 minutes', 'test', { result: "" }, { timezone: 'Asia/Shanghai' });
    // agenda.every('0 50 14 * * *', 'test', { result: "" }, { timezone: 'Asia/Shanghai' });
    agenda.start();
});

agenda.on('start', (job) => {
    job.attrs.data["result"] = "";
    job_log.info('job启动: ', job.attrs.name, "时间", job.attrs.lastRunAt);
})

agenda.on('complete', (job) => {
    job_log.info('job完成: ', job.attrs.name,  "时间", job.attrs.lastFinishedAt);
})

agenda.on('success', (job) => {
    job_log.info('job成功: ', job.attrs.name, job.attrs.data["result"]);
})

agenda.on('fail', (job) => {
    job_log.error('job失败: ', job.attrs.name);
    job_log.error('失败时间: ', job.attrs.failedAt);
    job_log.error('失败原因: ', job.attrs.failReason);
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
