var _menu = [{ subcode: "m0000", subtext: "权限配置", code: "m00", text: "系统" },
{ subcode: "m0001", subtext: "用户配置", code: "m00", text: "系统" },
{ subcode: "m0101", subtext: "股票池", code: "m01", text: "股票池管理" },
{ subcode: "m0102", subtext: "催化剂到期", code: "m01", text: "股票池管理" },
{ subcode: "m0201", subtext: "选股表", code: "m02", text: "投资管理" },
{ subcode: "m0202", subtext: "数据分析", code: "m02", text: "投资管理" },
{ subcode: "m0301", subtext: "净值维护", code: "m03", text: "净值管理" },
{ subcode: "m0302", subtext: "净值分析", code: "m03", text: "净值管理" },
{ subcode: "m0401", subtext: "交易明细维护", code: "m04", text: "交易管理" },
{ subcode: "m0402", subtext: "资产组合报告", code: "m04", text: "交易管理" }];

var grobalEvent = new Vue();

jQuery(function () {
    var infoVue = new Vue({
        el: '#GlobalInfo',
        data: {
            title: "消息",
            info: "",
            showX: false,
            showClose: false
        },
        mounted: function () {
            var v = this;
            grobalEvent.$on('show', function (data) {
                v.info = data.info;
                v.showX = data.showX;
                v.showClose = data.showClose;
                $(v.$refs.self).modal({
                    backdrop: 'static',
                    keyboard: false,
                }).modal('show');
            });
            grobalEvent.$on('hide', function (data) {
                v.info = '';
                $(v.$refs.self).modal('hide');
            });
        }
    });

    $('#menu1').click(function () {
        $('#menu').css("opacity", "0.1");
        setTimeout(function () {
            $('#menu').addClass('hidden');
            $('#content').removeClass('col-md-10');
            $('#menu2').removeClass('hidden');
        }, 300);
    });

    $('#menu2').click(function () {
        $('#menu').removeClass('hidden');
        $('#menu').css("display");
        $('#menu').css("opacity", "1");
        $('#content').addClass('col-md-10');
        $('#menu2').addClass('hidden');
    });
});

function message(modal, message) {
    if (message == "") {
        modal.find('.message').addClass('hidden');
    } else {
        modal.find('.message').removeClass('hidden');
    }
    modal.find('.message').html(message);

};

//排序比较
//prop属性
//dir方向，正序或倒序
//ser自定义序列对象
var compare = function (prop, dir, sorter, ignoreNull) {
    return function (obj1, obj2) {
        var val1, val2;
        dir = dir || 1;
        if (sorter) {
            val1 = sorter[obj1[prop]];
            val2 = sorter[obj2[prop]];
        } else {
            val1 = obj1[prop];
            val2 = obj2[prop];
        }
        if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
            val1 = Number(val1);
            val2 = Number(val2);
        }
        if ((!val1 || !val2) && ignoreNull) {
            if (val1 < val2) {
                return -1 * -1;
            } else if (val1 > val2) {
                return 1 * -1;
            } else {
                return 0;
            }
        } else {
            if (val1 < val2) {
                return -1 * dir;
            } else if (val1 > val2) {
                return 1 * dir;
            } else {
                return 0;
            }
        }
    }
};

var multiCompare = function (sortOptions) {
    return function (obj1, obj2) {
        var val1, val2;
        var res = [];
        for (var s in sortOptions) {
            var prop = sortOptions[s]["prop"];
            var dir = sortOptions[s]["dir"] || 1;
            var sorter = sortOptions[s]["sorter"];
            var ignoreNull = sortOptions[s]["ignoreNull"];
            if (sorter) {
                val1 = sorter[obj1[prop]];
                val2 = sorter[obj2[prop]];
            } else {
                val1 = obj1[prop];
                val2 = obj2[prop];
            }
            if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
                val1 = Number(val1);
                val2 = Number(val2);
            }
            if ((!val1 || !val2) && ignoreNull) {
                if (val1 < val2) {
                    res.push(-1 * -1);
                } else if (val1 > val2) {
                    res.push(1 * -1);
                } else {
                    res.push(0);
                }
            } else {
                if (val1 < val2) {
                    res.push(-1 * dir);
                } else if (val1 > val2) {
                    res.push(1 * dir);
                } else {
                    res.push(0);
                }
            }
        }
        for (var i in res) {
            if (res[i] != 0) {
                return res[i];
            }
        }
        return 0;
    }
}

//比较两个对象是否相等，用于筛选
//part：条件
//whole：整个对象
var contain = function (part, whole) {
    var res = true;
    $.each(part, function (f, v) {
        if (v && v != whole[f]) {
            res = false;
            //跳出esch
            return true;
        }
    });
    return res;
};

//判断对象是否在对象数组中
//value：对象的ID字段值
//field：对象的ID字段名
//arr：数组
var isIn = function (value, field, arr) {
    var res = false;
    $.each(arr, function (i, o) {
        if (o[field] == value) {
            res = true;
            return true;
        }
    })
    return res;
}
