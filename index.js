var Agenda = require('agenda');
var fs = require('fs');
var py = require("./jobtype/jobtype").python;

var log4js = require("log4js");
log4js.configure("./log/config.json");
var job_log = log4js.getLogger('job');
var console_log = log4js.getLogger('console');

var mongo = 'mongodb://127.0.0.1:27017/agenda';
var agenda = new Agenda({ db: { address: mongo } });

var op = {
    "python": py
};

var js = [];

if (fs.existsSync('./jobs')) {
    var files = fs.readdirSync('./jobs');
    for (var f of files) {
        if (f.split('.').slice(-1) == 'json') {
            js.push(JSON.parse(fs.readFileSync('./jobs/' + f)));
        }
    }
} else {
    console_log.error('无任务配置文件路径');
}

for (var j of js) {
    agenda.define(j["name"], function (job, done) {
        job.attrs.data["result"] = op[j["type"]](j["program"], j["para"]);
        done();
    });
}

agenda.on('ready', function () {
    for (var j of js) {
        agenda.every(j["plan"], j["name"], { id: 0, result: "" }, { timezone: 'Asia/Shanghai' });
    }
    agenda.start();
});

agenda.on('start', (job) => {
    job.attrs.data["id"] = (new Date()).valueOf();
    job.attrs.data["result"] = "";
    job_log.info('start:' + job.attrs.name + ';ID:' + job.attrs.data["id"] + '#');
})

agenda.on('complete', (job) => {
    job_log.info('complete:' + job.attrs.name + ';ID:' + job.attrs.data["id"] + '#');
})

agenda.on('success', (job) => {
    job_log.info('success:' + job.attrs.name + ';ID:' + job.attrs.data["id"] + ';Return:' + job.attrs.data["result"] + '#');
})

agenda.on('fail', (err, job) => {
    job_log.error('fail:' + job.attrs.name + ';ID:' + job.attrs.data["id"] + ';Return:' + err + '#');
})

function graceful() {
    agenda.stop(() => {
        console_log.info('退出')
        process.exit(0);
    });
}

process.on('SIGTERM', graceful);
process.on('SIGINT', graceful);

exports.agenda = agenda;
