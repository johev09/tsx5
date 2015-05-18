Function.prototype.debounce = function (threshold) {
    var callback = this;
    var timeout;
    return function () {
        var context = this,
            params = arguments;
        window.clearTimeout(timeout);
        timeout = window.setTimeout(function () {
            callback.apply(context, params);
        }, threshold);
    };
};

$.fn.isOnScreen = function (x, y) {

    if (x == null || typeof x == 'undefined') x = 1;
    if (y == null || typeof y == 'undefined') y = 1;

    var win = $(window);

    var viewport = {
        top: win.scrollTop(),
        left: win.scrollLeft()
    };
    viewport.right = viewport.left + win.width();
    viewport.bottom = viewport.top + win.height();

    var height = this.outerHeight();
    var width = this.outerWidth();

    if (!width || !height) {
        return false;
    }

    var bounds = this.offset();
    bounds.right = bounds.left + width;
    bounds.bottom = bounds.top + height;

    var visible = (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));

    if (!visible) {
        return false;
    }

    var deltas = {
        top: Math.min(1, (bounds.bottom - viewport.top) / height),
        bottom: Math.min(1, (viewport.bottom - bounds.top) / height),
        left: Math.min(1, (bounds.right - viewport.left) / width),
        right: Math.min(1, (viewport.right - bounds.left) / width)
    };

    //console.log(deltas);

    return (deltas.left * deltas.right) >= x && (deltas.top * deltas.bottom) >= y;

};

//var tester = $('#orange');
var check = function () {
    //var visible = tester.isOnScreen(0.5, 0.5);
    //console.log(visible);
    $(".ros").each(function (i,el) {
        var el=$(this);
        if (el.isOnScreen(0.9, 0.9)) {
            el.addClass("animated");
        }
        else
            el.removeClass("animated");
    });
    
    /*var header_gradient=$("#header");
    if(header_gradient.isOnScreen(0.1,0.1)) {
        header_gradient.data("visible","1");
        console.log("visible");
    }
    else {
        console.log("invisible");
        header_gradient.data("visible","0");
    }*/
}
var debounced = check.debounce(50);
$(window).on('scroll', check);