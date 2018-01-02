var data = null;

jQuery(function () {
    $.post("/jobs/all", {}, function (res) {
        data = res;
        data["logs"] = data["logs"].replace(/[\r\n]/g, "");
        data["_logs"] = [];
        data["instance"] = [];
        $.each(data["logs"].split('#'), function (i, log) {
            // [2017-12-14T11:15:32.065] [INFO] job - success:test;ID:1513221332015;Return:test from python.
            var line = {};
            if (log) {
                line["Name"] = log.split(' - ')[1].split(';')[0].split(':')[1];
                line["ID"] = log.split(' - ')[1].split(';')[1].split(':')[1];
                line["State"] = log.split(' - ')[1].split(';')[0].split(':')[0];
                line["Time"] = log.split(' - ')[0].slice(0, 25);
                line["Return"] = log.split(' - ')[1].split(';').length > 2 ? log.split(' - ')[1].split(';')[2].slice(7) : "";
                data["_logs"].push(line);
            }
        });

        $.each(data["_logs"], function (i, log) {
            if (data["instance"].length == 0) {
                data["instance"].push({ "ID": log["ID"], "Name": log["Name"], "Start": log["Time"] })
            } else {
                $.each(data["instance"], function (j, ins) {
                    if (ins["ID"] == log["ID"]) {
                        switch (log["State"]) {
                            case 'complete':
                                ins['Complete'] = log['Time'];
                                break;
                            case 'success':
                                ins['Success'] = log['Time'];
                                ins['Return'] = log['Return'];
                                break;
                            case 'fail':
                                ins['Fail'] = log['Time'];
                                ins['Return'] = log['Return'];
                                break;
                            default:
                                break;
                        }
                        return false;// 退出循环
                    }
                    if (j == data["instance"].length - 1) {
                        data["instance"].push({ "ID": log["ID"], "Name": log["Name"], "Start": log["Time"] })
                    }
                });
            }
        });

        $('#job tr:not(:first)').remove();
        for (var i in data['jobs']) {
            var row = '<tr>';
            row += '<td>' + data['jobs'][i]['_id'] + '</td>';
            row += '<td>' + data['jobs'][i]['name'] + '</td>';
            row += '<td>' + data['jobs'][i]['priority'] + '</td>';
            row += '<td>' + data['jobs'][i]['repeatInterval'] + '</td>';
            row += '<td><button class="detailBtn" data-name="' + data['jobs'][i]['name'] + '">Detail</button></td>';
            row += '</tr>';
            $(row).appendTo($('#job'));
        }

        $('.detailBtn').click(showDetail);
    });

});


function showDetail() {
    var name = $(this).data('name');
    $('#instance tr:not(:first)').remove();

    $.each(data['instance'].reverse(), function (i, ins) {
        if (name == ins['Name']) {
            var row = '<tr>';
            row += '<td>' + (ins['ID'] || '') + '</td>';
            row += '<td>' + (ins['Start'] || '') + '</td>';
            row += '<td>' + (ins['Complete'] || '') + '</td>';
            row += '<td>' + (ins['Success'] || '') + '</td>';
            row += '<td>' + (ins['Fail'] || '') + '</td>';
            row += '<td>' + (ins['Return'] || '') + '</td>';
            row += '</tr>';
            $(row).appendTo($('#instance'));
        }
    })
}