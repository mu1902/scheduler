res = {
    jobs: [{
        _id: "5a30cee4c1e8e72a054aaea6",
        data: {
            id: 1513221909711,
            result: "test from python "
        },
        failCount: 1,
        failedAt: "2017-12-14T02:50:13.833Z",
        failReason: "date is not defined",
        lastFinishedAt: "2017-12-14T03:25:09.761Z",
        lastModifiedBy: null,
        lastRunAt: "2017-12-14T03:25:09.709Z",
        lockedAt: null,
        name: "test",
        nextRunAt: "2017-12-14T03:26:09.709Z",
        priority: 0,
        repeatInterval: "1 minutes",
        repeatTimezone: "Asia/Shanghai",
        type: "single"
    }],
    logs: "[2017-12-14T11:15:32.016] [INFO] job - start: test ;ID: 1513221332015 [2017-12-14T11:15:32.065] [INFO] job - success: test ;ID: 1513221332015 ;Return: test from python [2017-12-14T11:15:32.066] [INFO] job - complete: test ;ID: 1513221332015 [2017-12-14T11:16:32.015] [INFO] job - start: test ;ID: 1513221392015 [2017-12-14T11:16:32.061] [INFO] job - success: test ;ID: 1513221392015 ;Return: test from python [2017-12-14T11:16:32.061] [INFO] job - complete: test ;ID: 1513221392015 [2017-12-14T11:17:32.014] [INFO] job - start: test ;ID: 1513221452014 [2017-12-14T11:17:32.061] [INFO] job - success: test ;ID: 1513221452014 ;Return: test from python [2017-12-14T11:17:32.061] [INFO] job - complete: test ;ID: 1513221452014 [2017-12-14T11:17:51.214] [INFO] job - 退出 [2017-12-14T11:21:30.909] [INFO] job - start: test ;ID: 1513221690909 [2017-12-14T11:21:30.959] [INFO] job - success: test ;ID: 1513221690909 ;Return: test from python [2017-12-14T11:21:30.960] [INFO] job - complete: test ;ID: 1513221690909 [2017-12-14T11:22:30.911] [INFO] job - start: test ;ID: 1513221750911 [2017-12-14T11:22:30.960] [INFO] job - success: test ;ID: 1513221750911 ;Return: test from python [2017-12-14T11:22:30.961] [INFO] job - complete: test ;ID: 1513221750911 [2017-12-14T11:23:58.280] [INFO] job - start: test ;ID: 1513221838279 [2017-12-14T11:23:58.330] [INFO] job - success: test ;ID: 1513221838279 ;Return: test from python [2017-12-14T11:23:58.330] [INFO] job - complete: test ;ID: 1513221838279 [2017-12-14T11:24:22.238] [INFO] job - 退出 [2017-12-14T11:25:09.711] [INFO] job - start: test ;ID: 1513221909711 [2017-12-14T11:25:09.762] [INFO] job - success: test ;ID: 1513221909711 ;Return: test from python [2017-12-14T11:25:09.762] [INFO] job - complete: test ;ID: 1513221909711 "
}

jQuery(function () {
    // $.post("/jobs/all", {}, function (res) {
    //     console.log(res);
    // });
});
