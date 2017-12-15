var data = null;

jQuery(function () {
    $.post("/jobs/all", {}, function (res) {
        data = res;
        data["logs"] = data["logs"].replace(/[\r\n]/g, "");
        data["_logs"] = [];
        $.each(data['logs'].split('#'), function (i, log) {
            // [2017-12-14T11:15:32.065] [INFO] job - success:test;ID:1513221332015;Return:test from python.
            var instance = {};
            instance["Name"] = log.split(' - ')[1].split(';')[0].split(':')[1];
            instance["ID"] = log.split(' - ')[1].split(';')[1].split(':')[1];
            instance["State"] = log.split(' - ')[1].split(';')[0].split(':')[0];
            instance["Time"] = og.split(' - ')[0].slice(0, 25) + '</td>';
            instance["Return"] = log.split(' - ')[1].split(';').length > 2 ? log.split(' - ')[1].split(';')[2].split(':')[1] : "";
            data["_logs"].push(instance);
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

    for(var i in data['_logs'])
        if (name == data['_logs'][i]['Name']) {
            var row = '<tr>';
            row += '<td>' + data['_logs'][i]['ID'] + '</td>';
            row += '<td>' + data['_logs'][i]['State'] + '</td>';
            row += '<td>' + data['_logs'][i]['Time'] + '</td>';
            row += '<td>' + data['_logs'][i]['Return'] + '</td>';
            row += '</tr>';
            $(row).appendTo($('#instance'));
        }
    });
}