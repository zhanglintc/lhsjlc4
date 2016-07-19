// Refer to: http://www.jb51.net/article/31509.htm

function DateSelector(selYear_s, selMonth_s, selDate_s, selYear_e, selMonth_e, selDate_e) {
    this.selYear_s = selYear_s;
    this.selMonth_s = selMonth_s;
    this.selDate_s = selDate_s;

    this.selYear_e = selYear_e;
    this.selMonth_e = selMonth_e;
    this.selDate_e = selDate_e;

    this.date_s = new Date();
    this.date_e = new Date();

    this.selYear_s.Group = this;
    this.selMonth_s.Group = this;
    this.selDate_s.Group = this;
    this.selYear_e.Group = this;
    this.selMonth_e.Group = this;
    this.selDate_e.Group = this;
    this.date_s.Group = this;
    this.date_e.Group = this;

    this.today_year = this.date_s.getFullYear();
    this.today_month = this.date_s.getMonth() + 1;
    this.today_date = this.date_s.getDate();

    // 给年份、月份下拉菜单添加处理onchange事件的函数
    // IE
    if (window.document.all != null) {
        this.selYear_s.attachEvent("onchange", DateSelector.Onchange);
        this.selMonth_s.attachEvent("onchange", DateSelector.Onchange);
        this.selDate_s.attachEvent("onchange", DateSelector.Onchange);

        this.selYear_e.attachEvent("onchange", DateSelector.Onchange);
        this.selMonth_e.attachEvent("onchange", DateSelector.Onchange);
        this.selDate_e.attachEvent("onchange", DateSelector.Onchange);
    }
    // Firefox
    else {
        this.selYear_s.addEventListener("change", DateSelector.Onchange, false);
        this.selMonth_s.addEventListener("change", DateSelector.Onchange, false);
        this.selDate_s.addEventListener("change", DateSelector.Onchange, false);

        this.selYear_e.addEventListener("change", DateSelector.Onchange, false);
        this.selMonth_e.addEventListener("change", DateSelector.Onchange, false);
        this.selDate_e.addEventListener("change", DateSelector.Onchange, false);
    }

    // 默认使用当前日期
    this.InitSelector(this.today_year, this.today_month, this.today_date, this.today_year, this.today_month, this.today_date);
}
// 增加一个最大年份的属性
DateSelector.prototype.MinYear = (new Date()).getFullYear();
// 增加一个最大年份的属性
DateSelector.prototype.MaxYear = (new Date()).getFullYear() + 2;
// 初始化年份
DateSelector.prototype.InitYearSelect = function() {
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
// 初始化月份
DateSelector.prototype.InitMonthSelect = function() {
    // 循环添加OPION元素到月份select对象中
    for (var i = 1; i <= 12; i++) {
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
    for (var i = 1; i <= daysInMonth_s; i++) {
        var op_s = window.document.createElement("OPTION");
        op_s.value = i;
        op_s.innerHTML = i;
        this.selDate_s.appendChild(op_s);
    }
    for (var i = 1; i <= daysInMonth_e; i++) {
        var op_e = window.document.createElement("OPTION");
        op_e.value = i;
        op_e.innerHTML = i;
        this.selDate_e.appendChild(op_e);
    }
}
// 处理年份和月份onchange事件的方法，它获取事件来源对象（即selYear_s或selMonth_s）
// 并调用它的Group对象（即DateSelector实例，请见构造函数）提供的InitDateSelect方法重新初始化天数
// 参数e为event对象
DateSelector.Onchange = function(e) {
    var selector = window.document.all != null ? e.srcElement : e.target;

    dts = new Date(selector.Group.selYear_s.value, selector.Group.selMonth_s.value, selector.Group.selDate_s.value);
    dte = new Date(selector.Group.selYear_e.value, selector.Group.selMonth_e.value, selector.Group.selDate_e.value);

    if(dts > dte) {
        selector.Group.selYear_s.value = selector.Group.date_s.getFullYear();
        selector.Group.selMonth_s.value = selector.Group.date_s.getMonth() + 1;
        selector.Group.selDate_s.value = selector.Group.date_s.getDate();

        selector.Group.selYear_e.value = selector.Group.date_e.getFullYear();
        selector.Group.selMonth_e.value = selector.Group.date_e.getMonth() + 1;
        selector.Group.selDate_e.value = selector.Group.date_e.getDate();

        alert("错误:　结束日期不能小于开始日期！");

        // return;
    }
    else {
        selector.Group.date_s.setFullYear(selector.Group.selYear_s.value);
        selector.Group.date_s.setMonth(selector.Group.selMonth_s.value - 1);
        selector.Group.date_s.setDate(selector.Group.selDate_s.value);

        selector.Group.date_e.setFullYear(selector.Group.selYear_e.value);
        selector.Group.date_e.setMonth(selector.Group.selMonth_e.value - 1);
        selector.Group.date_e.setDate(selector.Group.selDate_e.value);
    }

    var date_s = selector.Group.selDate_s.value;
    var date_e = selector.Group.selDate_e.value;

    selector.Group.InitDateSelect();

    var year_s = selector.Group.selYear_s.value;
    var month_s = selector.Group.selMonth_s.value;

    var year_e = selector.Group.selYear_e.value;
    var month_e = selector.Group.selMonth_e.value;

    var daysInMonth_s = (new Date(year_s, month_s, 0)).getDate();
    var daysInMonth_e = (new Date(year_e, month_e, 0)).getDate();

    // 开始日期微调
    if(date_s < daysInMonth_s) {
        selector.Group.selDate_s.value = date_s;
    }
    else {
        selector.Group.selDate_s.value = daysInMonth_s;
    }
    selector.Group.date_s.setDate(selector.Group.selDate_s.value);

    // 结束日期微调
    if(date_e < daysInMonth_e) {
        selector.Group.selDate_e.value = date_e;
    }
    else {
        selector.Group.selDate_e.value = daysInMonth_e;
    }
    selector.Group.date_e.setDate(selector.Group.selDate_e.value);
}
// 根据参数初始化下拉菜单选项
DateSelector.prototype.InitSelector = function(year_s, month_s, date_s, year_e, month_e, date_e) {
    // 由于外部是可以调用这个方法，因此我们在这里也要将selYear_s和selMonth_s的选项清空掉
    // 另外因为InitDateSelect方法已经有清空天数下拉菜单，因此这里就不用重复工作了
    this.selYear_s.options.length = 0;
    this.selMonth_s.options.length = 0;

    this.selYear_e.options.length = 0;
    this.selMonth_e.options.length = 0;

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
}