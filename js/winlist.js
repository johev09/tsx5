$(function () {

    var winners = {
        "cz": ["<b>Team: 100Pi</b><br/>Sk Jhohev, Souradeep Saha",
                 "<b>Team: 100Pi</b><br/>Sk Jhohev, Souradeep Saha",
                 "<b>Team: 100Pi</b><br/>Sk Jhohev, Souradeep Saha"],
        "cw": ["<b>Team: Insaaf hoke rehega</b><br/>Bill Gates, Stephen Hawkins",
                 "<b>Team: Insaaf hoke rehega</b><br/>Bill Gates, Stephen Hawkins",
                 "<b>Team: Insaaf hoke rehega</b><br/>Bill Gates, Stephen Hawkins"]
    };
    var container2 = $('#container2');
    var container = $("#tsx4-winners");

    // WINNER LIST OPEN CODE
    $(".wincircle").click(function () {

        var event = $(this).attr('id');
        if (event in winners) {
            var currlist = winners[event];
            $('#one .name').html(currlist[0]);
            $('#two .name').html(currlist[1]);
            $('#three .name').html(currlist[2]);
        }

        /******GET VENDOR PREFIX******/
        var prefix = (function () {
            var styles = window.getComputedStyle(document.documentElement, ''),
                pre = (Array.prototype.slice
                    .call(styles)
                    .join('')
                    .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
                )[1],
                dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];
            return {
                dom: dom,
                lowercase: pre,
                css: '-' + pre + '-',
                js: pre[0].toUpperCase() + pre.substr(1)
            };
        })();

        var names = $('.name');
        names.css("opacity", 0);
        container2
            .css('visibility', 'visible')
            .velocity({
                opacity: 1
            }, 500, function () {
            names.addClass("show");
                /*names.each(function(i) {
                    $(this)
                    .delay(i*100)
                    .velocity({
                        scale: [1,3],
                        opacity: 1
                    },500);
                });*/
            });


        /*var blurElement = {a:0};//start the blur at 0 pixels

        TweenMax.to(blurElement, 0.5, {a:10, onUpdate:applyBlur});
        
        //here you pass the filter to the DOM element
        function applyBlur()
        {
            TweenMax.set(container,{webkitFilter:"blur(" + blurElement.a + "px)"}); 
        };
        // blurring container on winlist open*/

        //$("#container").toggleClass("blur");
    });


    // CLOSE LIST ON OUTSIDE CLICK
    var winlist = $('#winlist');
    winlist.click(function (e) {
        e.stopPropagation();
        e.preventDefault();
        return false;
    });
    container2.click(function () {
        var names = $('.name');
        names.removeClass("show");
        winlist.velocity({
            opacity: 0
        }, 250, function () {
            container2.velocity({
                opacity: 0
            }, 250, function () {
                container2.css('visibility', 'collapse');
                winlist.css('opacity', '1');
            });
        });

        /*
        var blurElement = {a:10};//start the blur at 0 pixels
        TweenMax.to(blurElement, 0.5, {a:0, onUpdate:applyBlur});
        
        //here you pass the filter to the DOM element
        function applyBlur()
        {
            TweenMax.set(container,{webkitFilter:"blur(" + blurElement.a + "px)"}); 
        };
        //$("#container").toggleClass("blur");*/
    });
});