var data = null;
var instances = [];

jQuery(function () {
    $.post("/jobs/all", {}, function (res) {
        data = res;
        data["logs"] = data["logs"].replace(/[\r\n]/g, "");
        data["_logs"] = [];
        data["instance"] = [];

        //解析log文本
        $.each(data["logs"].split('#'), function (i, log) {
            // [2017-12-14T11:15:32.065] [INFO] job - success:test;ID:1513221332015;Return:test from python.
            var line = {};
            if (log) {
                if (log.split(' - ').length > 1) {
                    line["Name"] = log.split(' - ')[1].split(';')[0].split(':')[1];
                    line["ID"] = log.split(' - ')[1].split(';')[1].split(':')[1];
                    line["State"] = log.split(' - ')[1].split(';')[0].split(':')[0];
                    line["Time"] = log.split(' - ')[0].slice(0, 25);
                    line["Return"] = log.split(' - ')[1].split(';').length > 2 ? log.split(' - ')[1].split(';')[2].slice(7) : "";
                    data["_logs"].push(line);
                }
            }
        });

        //合并实例
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

        pagination(data["jobs"], "pagination1", showJobs);
    });

});

function pagination(data, el, fn, page) {
    var n = parseInt(data.length / 10 + 1);
    var page = page || 1;
    var maxpage = 0;
    if (page < 3) {
        maxpage = n >= 5 ? 5 : n;
    } else if (page > n - 2) {
        maxpage = n;
    } else {
        maxpage = page + 2;
    }
    $('#' + el).empty();
    if (page == 1) {
        $('#' + el).append('&lt;&lt;&nbsp;');
        $('#' + el).append('&lt;&nbsp;');
    } else {
        $('#' + el).append('<a href="#">&lt;&lt;</a>&nbsp;');
        $('#' + el).append('<a href="#">&lt;</a>&nbsp;');
    }

    for (var i = page - 2 < 1 ? 1 : page - 2; i <= maxpage; i++) {
        if (i == page) {
            $('#' + el).append(i + '&nbsp;');
        } else {
            $('#' + el).append('<a href="#">' + i + '</a>&nbsp;');
        }
    }

    if (page == n) {
        $('#' + el).append('&gt;&nbsp;');
        $('#' + el).append('&gt;&gt;&nbsp;');
    } else {
        $('#' + el).append('<a href="#">&gt;</a>&nbsp;');
        $('#' + el).append('<a href="#">&gt;&gt;</a>&nbsp;');
    }

    $.each($('#' + el + ' a'), function (i, a) {
        switch ($(a).text()) {
            case "<<":
                if (page != 1) {
                    $(a).click(function () {
                        pagination(data, el, fn, 1)
                    });
                }
                break;
            case "<":
                if (page != 1) {
                    $(a).click(function () {
                        pagination(data, el, fn, page - 1)
                    });
                }
                break;
            case ">":
                if (page != n) {
                    $(a).click(function () {
                        pagination(data, el, fn, page + 1)
                    });
                }
                break;
            case ">>":
                if (page != n) {
                    $(a).click(function () {
                        pagination(data, el, fn, n)
                    });
                }
                break;
            default:
                $(a).click(function () {
                    pagination(data, el, fn, parseInt($(a).text()))
                });
                break;
        }
    });

    fn(data.slice((page - 1) * 10, page * 10));
}

function showJobs(data) {
    $('#job tr:not(:first)').remove();
    for (var i in data) {
        var row = '<tr>';
        row += '<td>' + data[i]['_id'] + '</td>';
        row += '<td>' + data[i]['name'] + '</td>';
        row += '<td>' + data[i]['priority'] + '</td>';
        row += '<td>' + data[i]['repeatInterval'] + '</td>';
        row += '<td><button class="detailBtn" data-name="' + data[i]['name'] + '">Detail</button></td>';
        row += '</tr>';
        $(row).appendTo($('#job'));
    }

    $('.detailBtn').click(filterDetail);
}

function filterDetail() {
    var name = $(this).data('name');
    instances = [];

    $.each(data['instance'], function (i, ins) {
        if (name == ins['Name']) {
            instances.push(ins);
        }
    });

    pagination(instances.reverse(), "pagination2", showDetail);
}


function showDetail(data) {
    var name = $(this).data('name');
    $('#instance tr:not(:first)').remove();

    $.each(data, function (i, ins) {
        var row = '<tr>';
        row += '<td>' + (ins['ID'] || '') + '</td>';
        row += '<td>' + (ins['Start'] || '') + '</td>';
        row += '<td>' + (ins['Complete'] || '') + '</td>';
        row += '<td>' + (ins['Success'] || '') + '</td>';
        row += '<td>' + (ins['Fail'] || '') + '</td>';
        row += '<td>' + (ins['Return'] || '') + '</td>';
        row += '</tr>';
        $(row).appendTo($('#instance'));
    })
}