var data = null;

jQuery(function () {
    $.post("/jobs/all", {}, function (res) {
        data = res;
        data['logs'] = data['logs'].replace(/[\r\n]/g, "");
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

    $.each(data['logs'].split('#'), function (i, log) {
        // [2017-12-14T11:15:32.065] [INFO] job - success:test;ID:1513221332015;Return:test from python.
        var n = log != '' ? log.split(' - ')[1].split(';')[0].split(':')[1] : '';
        if (name == n) {
            var row = '<tr>';
            row += '<td>' + log.split(' - ')[1].split(';')[1].split(':')[1] + '</td>';
            row += '<td>' + log.split(' - ')[1].split(';')[0].split(':')[0] + '</td>';
            row += '<td>' + log.split(' - ')[0].slice(0, 25) + '</td>';
            row += '<td>' + (log.split(' - ')[1].split(';').length > 2 ? log.split(' - ')[1].split(';')[2].split(':')[1] : "") + '</td>';
            row += '</tr>';
            $(row).appendTo($('#instance'));
        }
    });
}