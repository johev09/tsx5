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

var eventindex = 'cs',
    eventquotes = {
        "cs": ["#fireInTheHole",
               "Terrorist",
               "Counter-Terrorist",
               "de_dust2",
               "cover me",
               "de_nuke",
               "de_inferno",
               "headshot",
               "AK-47",
               "Carbine"],
        "tm": ["tatoo",
               "body",
               "draw",
               "canvas",
               "colors",
               "painting",
               "creativity",
               "abstract",
               "#lifeInArt",
               "express"],
        "t": ["tricks",
              "C++",
              "C#",
              "JAVA",
              "speed",
              "aptitide",
              "calculate",
              "#complexity",
              "geek"],
        "tc": ["chaos",
               "total",
               "destruction",
               "ultimate",
               "test",
               "genius",
               "challenge",
               "time",
               "#madness",
               "random"],
        "poy": ["performance",
                "best",
                "dance",
                "singing",
                "mimicry",
                "#talent",
                "stage",
                "#respect"]
    },
    quotes = eventquotes[eventindex];

var canvas, ctx;

$(function () {

    var $loadbg = $("#load-bg");

    $loadbg.velocity({
        scaleX: 3,
        scaleY: 3,
        opacity: 0
    }, {
        duration: 1000,
        //display: "none",
        easeing: "ease-in-out",
        complete: function () {
            $loadbg.remove();
        }
    });

    function initOnlineEvents() {
        //$("*").off(); //clear all events of all elements, so no problem in resize
        // ONLINE EVENTS
        var width = $(window).width() / 4;
        var onlinevents = $("#online-events .events .event"),
            $onlineevnetsParent = $("#online-events .events"),
            totalwidth = $(window).width(),
            totalheight,
            selectedEvent,
            $backtoevents = $(".back-to-events");

        onlinevents.off();
        $backtoevents.off();

        var animating = false;

        function hidebacktoevents() {
            if ($backtoevents.hasClass("open"))
                $backtoevents.removeClass("open");
        }

        function showbacktoevents() {
            if (!$backtoevents.hasClass("open"))
                $backtoevents.addClass("open");
        }

        //hidebacktoevents();

        onlinevents.css({
            "position": "relative",
            "top": "0px",
            "left": "0px"
        });
        onlinevents.find(".details h2").attr("title", "Click to Open");
        onlinevents.each(function (i, el) {
            var colspan = $(this).data("col-span"),
                rowspan = $(this).data("row-span");

            var borderWidth = parseInt($(this).css("borderLeftWidth"), 10) + parseInt($(this).css("borderRightWidth"), 10);
            var w = width * colspan - borderWidth,
                h = width * rowspan - borderWidth;
            $(this).width(w);
            $(this).height(h);
            $(this).prop('w', w);
            $(this).prop('h', h);
            $(this).prop('i', i);

            totalheight = 2 * h + borderWidth * 4;

            $(this).click(function () {
                if (animating)
                    return;
                animating = true;

                selectedEvent = $(this);

                console.log($(this).prop('w') + " " + $(this).prop('h'));

                selectedEvent.css({
                    'z-index': 2,
                    'border-width': '0px'
                });
                selectedEvent.velocity({
                    width: totalwidth,
                    height: totalheight,
                    borderWidth: '0px',
                    top: "0px",
                    left: "0px"
                }, {
                    duration: 500,
                    easeing: "ease-in-out",
                    complete: function () {
                        selectedEvent.addClass("open");
                        selectedEvent.find(".details h2").velocity({
                            translateX: "-50%",
                            translateY: "-50%",
                            scaleX: 0,
                            scaleY: 0,
                        }, 250);
                        selectedEvent.find(".details p").velocity({
                            translateX: "-50%",
                            translateY: "-50%",
                            scaleX: [1, 0],
                            scaleY: [1, 0],
                            opacity: 1
                        }, {
                            duration: 250,
                            //easeing: "ease",
                            display: "inline-block",
                            complete: function () {
                                showbacktoevents();
                                animating = false;
                            }
                        });
                    }
                });
            });
        });

        $onlineevnetsParent.width(totalwidth);
        $onlineevnetsParent.height(totalheight - 20);

        for (i = onlinevents.length - 1; i >= 0; i--) {
            onlinevents.eq(i).each(function () {
                var position = $(this).position();
                //console.log($(this).position().top+" "+$(this).position().left);

                $(this).prop('top', position.top);
                $(this).prop('left', position.left);
                $(this).css({
                    "position": "absolute",
                    "top": position.top + "px",
                    "left": position.left + "px"
                });
                //console.log($(this).position().top+" "+$(this).position().left);
            });
        }

        $backtoevents.click(function () {
            if (animating)
                return;
            animating = true;

            hidebacktoevents();

            selectedEvent.removeClass("open");
            selectedEvent.find(".details h2").velocity({
                translateX: "-50%",
                translateY: "-50%",
                scaleX: 1,
                scaleY: 1,
            }, 500);
            selectedEvent.find(".details p").velocity({
                translateX: "-50%",
                translateY: "-50%",
                scaleX: 0,
                scaleY: 0,
                opacity: 0
            }, {
                duration: 500,
                //easeing: "ease",
                display: "none",
                complete: function () {
                    selectedEvent.delay(500).velocity({
                        width: selectedEvent.prop('w') + 10 + "px",
                        height: selectedEvent.prop('h') + 10 + "px",
                        //borderWidth: '5px',
                        top: selectedEvent.prop('top'),
                        left: selectedEvent.prop('left')
                    }, {
                        duration: 500,
                        easeing: "ease-in-out",
                        complete: function () {
                            selectedEvent.css({
                                "z-index": 1,
                                "border-width": "5px"
                            });
                            animating = false;
                        }
                    });
                }
            });

        });
    }


    initHeaderGradientAnimatoin();
    initOfflineEventsCanvas();
    initNavScrollTo();
    initOnlineEvents();
    // RESIZE EVENTS
    $(window).resize(function () {
        initOnlineEvents();

        canvas.width = $(window).width();
        canvas.height = $(window).height();
    });
});

// shim layer with setTimeout fallback
window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();



//============= NAV SCROLL TO ===========
function initNavScrollTo() {
    var menu_a = $("#menu a");
    menu_a.each(function (i, el) {
        $(this).click(function (ev) {
            var id = "#" + $(this).data("scroll-id");
            //scroll=$(id).offset().top;
            //console.log(id+" "+scroll);

            $(".lines-button").click();
            $(id).velocity(
                "scroll", {
                    duration: 1000,
                    easing: "ease"
                }
            );
            /*
            $("html,body").velocity({
                scroll: scroll
            },1000);*/

            ev.preventDefault();
            return false;
        });
    });
}

function initHeaderGradientAnimatoin() {
    var colors = new Array(
  [62, 35, 255], [60, 255, 60], [255, 35, 98], [45, 175, 230], [255, 0, 255], [255, 128, 0]),
        step = 0;
    //color table indices for: 
    // current color left
    // next color left
    // current color right
    // next color right
    var colorIndices = [0, 1, 2, 3],
        gradientSpeed = 0.008,
        header_gradient = $('#header');

    function updateGradient() {

        if ($ === undefined) return;

        if (header_gradient.isOnScreen(0.1, 0.1)) {

            var c0_0 = colors[colorIndices[0]];
            var c0_1 = colors[colorIndices[1]];
            var c1_0 = colors[colorIndices[2]];
            var c1_1 = colors[colorIndices[3]];

            var istep = 1 - step;
            var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
            var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
            var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
            var color1 = "rgba(" + r1 + "," + g1 + "," + b1 + ",0.75)";

            var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
            var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
            var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
            var color2 = "rgba(" + r2 + "," + g2 + "," + b2 + ",0.75)";

            header_gradient.css({
                background: prefix.css + "gradient(linear, left top, right top, from(" + color1 + "), to(" + color2 + "))"

            });

            step += gradientSpeed;
            if (step >= 1) {
                step %= 1;
                colorIndices[0] = colorIndices[1];
                colorIndices[2] = colorIndices[3];

                //pick two new target color indices
                //do not pick the same as the current one
                colorIndices[1] = (colorIndices[1] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;
                colorIndices[3] = (colorIndices[3] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;

            }
        }

        requestAnimationFrame(updateGradient);
    }

    //setInterval(updateGradient, 10);
    updateGradient();
}

// =============== CANVAS =================
function initOfflineEventsCanvas() {

    // OFFLINE EVENTS
    var isDivSliding = false,
        slidingDuration = 200,
        lastindex = 0,
        backdivs = $("#offline-events .events .event-show"),
        selecteda,
        $canvas;

    function showdiv(i, clearquotes) {
        if (isDivSliding)
            return;
        var backdiv = backdivs.eq(i);

        backdivs.css("opacity", 0);
        backdiv.css("opacity", 1);

        eventindex = backdiv.attr('class').split(/\s+/)[1];
        //clear previous quotes
        if (clearquotes)
            allshowntexts = [];
        quotes = eventquotes[eventindex];
        lastindex = i;
    }

    $("#offline-events .events ul li a").each(function (i, el) {
        $(this).hover(
            function () {
                showdiv(i, false);
                if (typeof selecteda !== "undefined")
                    selecteda.toggleClass("selected");
                $(this).toggleClass("selected");
                selecteda = $(this);
            },
            function () {
                showdiv(lastindex, false);
            }
        );
    });
    showdiv(lastindex, false);

    function setupCanvas() {

        //canvas and context setup
        $canvas = $("#mycanvas");
        canvas = document.getElementById("mycanvas");
        canvas.width = $(window).width();
        canvas.height = $(window).height();
        ctx = canvas.getContext("2d");

        newFadeOutText();
        drawtxt();
        //setInterval(drawtxt, 50);
    }

    var fadespeed = 0.028,
        txtsizespeed = 0.8,
        timeSinceLastWord = 0,
        newTextInterval = 150,
        allshowntexts = new Array();

    function text(alpha, color, x, y, size, txt, fadeTime) {
        this.color = color
        this.opacity = alpha;
        this.fadein = true;
        this.alpha = 0.0;
        this.x = x;
        this.y = y;
        this.size = size;
        this.txt = txt;
        this.lh = 1;
        this.fadeTime = fadeTime;
        this.fadeout = function () {
            /*this.alpha -= speed;
            if (this.alpha < 0)
                allshowntexts.splice(allshowntexts.indexOf(this), 1);
                */
            if (this.fadein) {
                this.alpha += fadespeed;
                if (this.alpha >= this.opacity)
                    this.fadein = false;
            } else {
                this.alpha -= fadespeed;
                if (this.alpha < 0)
                    allshowntexts.splice(allshowntexts.indexOf(this), 1);
            }

            this.size += txtsizespeed;
        };
        this.draw = function (ctx) {
            //var metrics = context.measureText(message);
            ctx.fillStyle = "rgba(" + this.color + "," + this.alpha + ")";
            //ctx.fillStyle="transparent";
            //ctx.shadowOffsetX = 2;
            //ctx.shadowOffsetY = 2;
            //ctx.shadowBlur = 2;
            //ctx.shadowColor = 'rgba(0, 0, 0, ' + 0.25 + ')';
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
            ctx.shadowBlur = 10;
            ctx.shadowColor = 'rgba(255, 255, 255, ' + 0.5 + ')';
            ctx.font = "normal 500 " + this.size + "px Raleway Dots,monospace,Raleway, sans-serif";
            //ctx.textBaseline='middle';
            ctx.textAlign = 'center';
            ctx.fillText(this.txt, this.x, this.y);
        };

    }

    function newFadeOutText() {
        if (document.hasFocus()) {
            var txtmaxsize = 80,
                txtminsize = 10,
                alpha = Math.random() * 1.0 + 0.5,
                randomIndex = Math.floor(Math.random() * quotes.length),
                randomX = Math.random() * canvas.width,
                randomY = Math.random() * canvas.height,
                randomSize = Math.random() * txtmaxsize + txtminsize;
            /* RANDOM COLORS
            var r = Math.round(Math.random() * 255),
                g = Math.round(Math.random() * 255),
                b = Math.round(Math.random() * 255),
                color = r + ',' + g + ',' + b;
            */
            //'51, 51, 51', '150, 150, 150', '166, 255, 127', '224, 224, 224'
            //colors=[rgb(0, 172, 33)
            //var colors = ['255, 101, 101', '255, 162, 82','166, 255, 127', '75, 137, 255'];
            //rgb(110, 140, 213)
            //rgb(245, 96, 96)
            //rgb(194, 68, 189)
            var colors = ['194, 68, 189', '68, 194, 141', '245, 96, 96', '110, 140, 213']; //, '200,200,200', '128,128,128', '64,64,64', '32,32,32'];
            var color = colors[Math.floor(Math.random() * colors.length)];
            //console.log(color);
            var t = new text(alpha, color, randomX, randomY, randomSize, quotes[randomIndex]);
            allshowntexts.push(t);
        }
        //setTimeout(newFadeOutText, newTextInterval);
    }

    function drawtxt() {

        if (document.hasFocus() && $canvas.isOnScreen(0.1, 0.1)) {
            //console.log("canvas");
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (i = allshowntexts.length - 1; i >= 0; i--) {
                var t = allshowntexts[i];
                t.draw(ctx);
                t.fadeout();
            }
            timeSinceLastWord += 17; //60FPS called each 16ms
            if (timeSinceLastWord >= newTextInterval) {
                timeSinceLastWord -= newTextInterval;
                newFadeOutText();
            }
        }
        requestAnimFrame(drawtxt);
    }

    setupCanvas();
}