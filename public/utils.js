// Provide tool functions

Array.prototype.contains = function (obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
}

var post = function(url, params) {
    var form = document.createElement("form");

    form.action = url;
    form.method = "post";
    form.style.display = "none";

    for(var x in params) {
        var opt = document.createElement("input");
        opt.name = x;
        opt.value = params[x];
        form.appendChild(opt);
    }

    document.body.appendChild(form);
    form.submit();

    return form;
}