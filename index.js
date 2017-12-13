var Agenda = require('agenda')
var py = require("./python/py").exec;

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
    console.log('检测到job启动: ', job.attrs.name);
    job.attrs.data["result"] = "";
})

agenda.on('complete', (job) => {
    console.log('检测到job完成: ', job.attrs.name);
    console.log(job.attrs.data["result"]);
})

agenda.on('success', (job) => {
    console.log('检测到job成功: ', job.attrs.name);
    console.log(job.attrs.data["result"]);
})

agenda.on('fail', (job) => {
    console.log('检测到job失败: ', job.attrs.name);
    console.log('失败时间: ', job.attrs.failedAt);
    console.log('失败原因: ', job.attrs.failReason);
})

function graceful() {
    agenda.stop(() => {
        console.log('检测到退出')
        process.exit(0);
    });
}

process.on('SIGTERM', graceful);
process.on('SIGINT', graceful);

exports.agenda = agenda;
