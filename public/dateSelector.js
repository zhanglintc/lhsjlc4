// Refer to: http://www.jb51.net/article/31509.htm

function MakePeriodCfmStr(date_s, date_e) {
    preview = "";
    preview += (date_s.getMonth() + 1) + "/" + date_s.getDate() + " " + date_s.getHours() + ":00";
    preview += " - ";
    preview += (date_e.getMonth() + 1) + "/" + date_e.getDate() + " " + date_e.getHours() + ":00";;

    return preview;
}

function MakeTimeCfmStr(date_s, date_e) {
    days = parseInt((date_e - date_s) / 1000 / 3600 / 24);
    hours = parseInt((date_e - date_s) / 1000 / 3600 % 24);

    preview = "共计 " + days + " 天 " + hours + " 小时";

    return preview;
}

function DateSelector() {
    this.selYear_s = window.document.getElementById("selYear_s");
    this.selMonth_s = window.document.getElementById("selMonth_s");
    this.selDate_s = window.document.getElementById("selDate_s");
    this.selHour_s = window.document.getElementById("selHour_s");

    this.selYear_e = window.document.getElementById("selYear_e");
    this.selMonth_e = window.document.getElementById("selMonth_e");
    this.selDate_e = window.document.getElementById("selDate_e");
    this.selHour_e = window.document.getElementById("selHour_e");

    this.period_cfm = window.document.getElementById("period_cfm");
    this.time_cfm = window.document.getElementById("time_cfm");

    this.date_s = new Date();
    this.date_e = new Date();

    this.date_e.setDate(this.date_e.getDate() + 1);

    this.date_s.setHours(12);
    this.date_e.setHours(12);
    this.date_s.setMinutes(0);
    this.date_e.setMinutes(0);
    this.date_s.setSeconds(0);
    this.date_e.setSeconds(0);
    this.date_s.setMilliseconds(0);
    this.date_e.setMilliseconds(0);

    this.selYear_s.Group = this;
    this.selMonth_s.Group = this;
    this.selDate_s.Group = this;
    this.selHour_s.Group = this;
    this.selYear_e.Group = this;
    this.selMonth_e.Group = this;
    this.selDate_e.Group = this;
    this.selHour_e.Group = this;
    this.date_s.Group = this;
    this.date_e.Group = this;
    this.period_cfm.Group = this;
    this.time_cfm.Group = this;

    this.td_year = this.date_s.getFullYear();
    this.td_month = this.date_s.getMonth() + 1;
    this.td_date = this.date_s.getDate();
    this.td_hour = this.date_s.getHours();

    this.tm_year = this.date_e.getFullYear();
    this.tm_month = this.date_e.getMonth() + 1;
    this.tm_date = this.date_e.getDate();
    this.tm_hour = this.date_e.getHours();

    // 给年份、月份下拉菜单添加处理onchange事件的函数
    // IE
    if (window.document.all != null) {
        this.selYear_s.attachEvent("onchange", DateSelector.Onchange);
        this.selMonth_s.attachEvent("onchange", DateSelector.Onchange);
        this.selDate_s.attachEvent("onchange", DateSelector.Onchange);
        this.selHour_s.attachEvent("onchange", DateSelector.Onchange);

        this.selYear_e.attachEvent("onchange", DateSelector.Onchange);
        this.selMonth_e.attachEvent("onchange", DateSelector.Onchange);
        this.selDate_e.attachEvent("onchange", DateSelector.Onchange);
        this.selHour_e.attachEvent("onchange", DateSelector.Onchange);
    }
    // Firefox
    else {
        this.selYear_s.addEventListener("change", DateSelector.Onchange, false);
        this.selMonth_s.addEventListener("change", DateSelector.Onchange, false);
        this.selDate_s.addEventListener("change", DateSelector.Onchange, false);
        this.selHour_s.addEventListener("change", DateSelector.Onchange, false);

        this.selYear_e.addEventListener("change", DateSelector.Onchange, false);
        this.selMonth_e.addEventListener("change", DateSelector.Onchange, false);
        this.selDate_e.addEventListener("change", DateSelector.Onchange, false);
        this.selHour_e.addEventListener("change", DateSelector.Onchange, false);
    }

    // 默认使用当前日期
    this.InitSelector(this.td_year, this.td_month, this.td_date, this.td_hour, /*--*/ this.tm_year, this.tm_month, this.tm_date, this.tm_hour);
    period_cfm.innerHTML = MakePeriodCfmStr(this.date_s, this.date_e);
    time_cfm.innerHTML = MakeTimeCfmStr(this.date_s, this.date_e);
}

DateSelector.prototype.MinYear = (new Date()).getFullYear();
DateSelector.prototype.MaxYear = (new Date()).getFullYear() + 1;
DateSelector.prototype.InitYearSelect = function() {
    this.selYear_s.options.length = 0;
    this.selYear_e.options.length = 0;

    // 循环添加OPION元素到年份select对象中
    for(var i = this.MaxYear; i >= this.MinYear; i--) {
        // 新建一个OPTION对象
        var op_s = window.document.createElement("OPTION");
        var op_e = window.document.createElement("OPTION");
        // 设置OPTION对象的值
        op_s.value = i;
        op_e.value = i;
        // 设置OPTION对象的内容
        op_s.innerHTML = i;
        op_e.innerHTML = i;
        // 添加到年份select对象
        this.selYear_s.appendChild(op_s);
        this.selYear_e.appendChild(op_e);
    }
}

DateSelector.prototype.InitMonthSelect = function() {
    this.selMonth_s.options.length = 0;
    this.selMonth_e.options.length = 0;

    // 循环添加OPION元素到月份select对象中
    for(var i = 1; i <= 12; i++) {
        // 新建一个OPTION对象
        var op_s = window.document.createElement("OPTION");
        var op_e = window.document.createElement("OPTION");
        // 设置OPTION对象的值
        op_s.value = i;
        op_e.value = i;
        // 设置OPTION对象的内容
        op_s.innerHTML = i;
        op_e.innerHTML = i;
        // 添加到月份select对象
        this.selMonth_s.appendChild(op_s);
        this.selMonth_e.appendChild(op_e);
    }
}

// 根据年份与月份获取当月的天数
DateSelector.DaysInMonth = function(year, month) {
    var date = new Date(year, month, 0);
    return date.getDate();
}

// 初始化天数
DateSelector.prototype.InitDateSelect = function() {
    // 使用parseInt函数获取当前的年份和月份
    var year_s = parseInt(this.selYear_s.value);
    var month_s = parseInt(this.selMonth_s.value);
    var year_e = parseInt(this.selYear_e.value);
    var month_e = parseInt(this.selMonth_e.value);

    // 获取当月的天数
    var daysInMonth_s = DateSelector.DaysInMonth(year_s, month_s);
    var daysInMonth_e = DateSelector.DaysInMonth(year_e, month_e);

    // 清空原有的选项
    this.selDate_s.options.length = 0;
    this.selDate_e.options.length = 0;

    // 循环添加OPION元素到天数select对象中
    for(var i = 1; i <= daysInMonth_s; i++) {
        var op_s = window.document.createElement("OPTION");
        op_s.value = i;
        op_s.innerHTML = i;
        this.selDate_s.appendChild(op_s);
    }
    for(var i = 1; i <= daysInMonth_e; i++) {
        var op_e = window.document.createElement("OPTION");
        op_e.value = i;
        op_e.innerHTML = i;
        this.selDate_e.appendChild(op_e);
    }
}

DateSelector.prototype.InitHourSelect = function() {
    this.selHour_s.options.length = 0;
    this.selHour_e.options.length = 0;

    for(var i = 0; i < 24; i++) {
        var op_s = window.document.createElement("OPTION");
        var op_e = window.document.createElement("OPTION");
        op_s.value = i;
        op_e.value = i;

        op_s.innerHTML = i;
        op_e.innerHTML = i;

        this.selHour_s.appendChild(op_s);
        this.selHour_e.appendChild(op_e);
    }
}

// 处理年份和月份onchange事件的方法，它获取事件来源对象（即selYear_s或selMonth_s）
// 并调用它的Group对象（即DateSelector实例，请见构造函数）提供的InitDateSelect方法重新初始化天数
// 参数e为event对象
DateSelector.Onchange = function(e) {
    var selector = window.document.all != null ? e.srcElement : e.target;

    var dts = new Date(selector.Group.selYear_s.value, selector.Group.selMonth_s.value - 1, selector.Group.selDate_s.value, selector.Group.selHour_s.value);
    var dte = new Date(selector.Group.selYear_e.value, selector.Group.selMonth_e.value - 1, selector.Group.selDate_e.value, selector.Group.selHour_e.value);

    // 如果控件中的开始时间不等于保存的时间, 则设置为可以联动修改时间
    var linkage = dts.getTime() != selector.Group.date_s.getTime() ? true : false

    // 开始日期大于或等于结束日期
    if(dts >= dte) {
        // 需要联动修改
        if(linkage) {
            DateAdjust(selector);
            UpdateStoredTime(selector);

            // 默认结束日期比开始日期晚一天
            dt = new Date(selector.Group.date_s.getTime() + 24 * 3600 * 1000);

            selector.Group.selYear_e.value = dt.getFullYear();
            selector.Group.selMonth_e.value = dt.getMonth() + 1;
            selector.Group.selDate_e.value = dt.getDate();
            selector.Group.selHour_e.value = dt.getHours();
        }

        // 无需联动修改, 直接提示出错, 并设置为原值
        else {
            selector.Group.InitYearSelect();
            selector.Group.InitMonthSelect();
            selector.Group.InitDateSelect();
            selector.Group.InitHourSelect();

            selector.Group.selYear_s.value = selector.Group.date_s.getFullYear();
            selector.Group.selMonth_s.value = selector.Group.date_s.getMonth() + 1;
            selector.Group.selDate_s.value = selector.Group.date_s.getDate();
            selector.Group.selHour_s.value = selector.Group.date_s.getHours();

            selector.Group.selYear_e.value = selector.Group.date_e.getFullYear();
            selector.Group.selMonth_e.value = selector.Group.date_e.getMonth() + 1;
            selector.Group.selDate_e.value = selector.Group.date_e.getDate();
            selector.Group.selHour_e.value = selector.Group.date_e.getHours();

            alert("结束日期必须大于开始日期!!!");

            return;
        }
    }

    DateAdjust(selector);
    UpdateStoredTime(selector);

    selector.Group.period_cfm.innerHTML = MakePeriodCfmStr(selector.Group.date_s, selector.Group.date_e);
    selector.Group.time_cfm.innerHTML = MakeTimeCfmStr(selector.Group.date_s, selector.Group.date_e);
}

function UpdateStoredTime(selector) {
    selector.Group.date_s.setFullYear(selector.Group.selYear_s.value);
    selector.Group.date_s.setMonth(selector.Group.selMonth_s.value - 1);
    selector.Group.date_s.setDate(selector.Group.selDate_s.value);
    selector.Group.date_s.setHours(selector.Group.selHour_s.value);

    selector.Group.date_e.setFullYear(selector.Group.selYear_e.value);
    selector.Group.date_e.setMonth(selector.Group.selMonth_e.value - 1);
    selector.Group.date_e.setDate(selector.Group.selDate_e.value);
    selector.Group.date_e.setHours(selector.Group.selHour_e.value);
}

// 微调天数
function DateAdjust(selector) {
    var date_s = selector.Group.selDate_s.value;
    var date_e = selector.Group.selDate_e.value;

    selector.Group.InitDateSelect();

    var year_s = selector.Group.selYear_s.value;
    var month_s = selector.Group.selMonth_s.value;

    var year_e = selector.Group.selYear_e.value;
    var month_e = selector.Group.selMonth_e.value;

    var daysInMonth_s = (new Date(year_s, month_s, 0)).getDate();
    var daysInMonth_e = (new Date(year_e, month_e, 0)).getDate();

    // 微调开始日期
    if(date_s < daysInMonth_s) {
        selector.Group.selDate_s.value = date_s;
    }
    else {
        selector.Group.selDate_s.value = daysInMonth_s;
    }
    selector.Group.date_s.setDate(selector.Group.selDate_s.value);

    // 微调结束日期
    if(date_e < daysInMonth_e) {
        selector.Group.selDate_e.value = date_e;
    }
    else {
        selector.Group.selDate_e.value = daysInMonth_e;
    }
    selector.Group.date_e.setDate(selector.Group.selDate_e.value);
}

// 根据参数初始化下拉菜单选项
DateSelector.prototype.InitSelector = function(year_s, month_s, date_s, hour_s, year_e, month_e, date_e, hour_e) {
    // 初始化年、月
    this.InitYearSelect();
    this.InitMonthSelect();

    // 设置年、月初始值
    this.selYear_s.value = year_s;
    this.selMonth_s.value = month_s;

    this.selYear_e.value = year_e;
    this.selMonth_e.value = month_e;

    // 初始化天数
    this.InitDateSelect();

    // 设置天数初始值
    this.selDate_s.value = date_s;
    this.selDate_e.value = date_e;

    // 初始化小时
    this.InitHourSelect();

    // 设置小时初始值
    this.selHour_s.value = hour_s;
    this.selHour_e.value = hour_e;
}
