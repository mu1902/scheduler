jQuery(function () {
    $.post("/jobs/all", {}, function (res) {
        console.log(res);
    });
});
