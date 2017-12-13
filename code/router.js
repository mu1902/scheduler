var jobCtr = require("./jobCtr");

exports.router = {
    "/jobs/all": jobCtr.jobs
};