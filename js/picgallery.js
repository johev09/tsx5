function getImgSize(imgSrc) {
    var nImg = new Image();

    nImg.onload = function () {
        var height = nImg.height;
        var width = nImg.width;

        alert('The image size is ' + width + '*' + height);
    }

    nImg.src = imgSrc; // this must be done AFTER setting onload
}

function lockScroll() {
    var scrollPosition = [
        self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
        self.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
    ];
    var html = jQuery('html'); // it would make more sense to apply this to body, but IE7 won't have that
    html.data('scroll-position', scrollPosition);
    html.data('previous-overflow', html.css('overflow'));
    html.css('overflow', 'hidden');
    window.scrollTo(scrollPosition[0], scrollPosition[1]);
}

function unlockScroll() {
    var html = jQuery('html');
    var scrollPosition = html.data('scroll-position');
    html.css('overflow', html.data('previous-overflow'));
    window.scrollTo(scrollPosition[0], scrollPosition[1])
}


function resizeImg(width, height) {
    // RESIZING FULL IMAGE           
    var maxwidth = $(window).width(),
        maxheight = $(window).height();
    if (width + 200 >= maxwidth) {
        var oldwidth = width;
        width = maxwidth - 200;
        height = height * (width / oldwidth);
    }
    if (height >= 0.8 * maxheight) {
        var oldheight = height;
        height = 0.8 * maxheight;
        width = width * (height / oldheight);
    }

    return ({
        width: width,
        height: height
    });
}


$(function () {


    //************** SCROLLBAR OVERE PAGE **********
    $("html").niceScroll({
        cursorcolor: "#000",
        cursoropacitymax: 0.4,
        cursorwidth: 10,
        smoothscroll: true
    });
    var nicescroll = $("html").getNiceScroll();



    //**************ZOOMED PIC VIEWER**************
    var zoomedpic = $("#zoomedpic");
    var newimg = $(".currimg");

    var imgdivTop, imgdivLeft, imgdivWidth, imgdivHeight, currindex;

    var images = $("#piclist div >img");
    images.each(function (i) {
        $(this).click({
            index: i
        }, function (e) {

            //setting currently opened pic index
            currindex = e.data.index;

            zoomedpic.toggleClass("open");
            zoomedpic.css("visibility", "visible");
            /*zoomedpic.velocity({
                backgroundColor: "#000",
                backgroundColorAlpha: [0.5, 0]
            }, {
                duration: 500,
                visibility: "visible",
                display: "block"
            })*/

            // find imgdiv and img of clicked pic
            var imgdiv = $(this).parent(), //.parent(),
                img = imgdiv.find("img"),
                src = img.attr("src");

            var scrollTop = $(window).scrollTop(),
                viewportOffset = imgdiv.get(0).getBoundingClientRect();

            imgdivTop = viewportOffset.top;
            imgdivLeft = viewportOffset.left;
            imgdivWidth = imgdiv.width();
            imgdivHeight = imgdiv.height();

            newimg.attr("src", src);
            newimg.css({
                top: imgdivTop,
                left: imgdivLeft,
                width: imgdivWidth,
                height: imgdivHeight
            });

            //zooming in the clicked pic
            var nImg = new Image();
            nImg.onload = function () {
                var height = nImg.height,
                    width = nImg.width,
                    size = resizeImg(nImg.width, nImg.height);
                newimg.velocity({
                        width: size.width,
                        height: size.height,
                        top: "50%",
                        left: "50%",
                        translateX: "-50%",
                        translateY: "-50%"
                    },
                    700, [500, 30]);
            }
            nImg.src = src;

            // lock scroll position, but retain settings for later
            lockScroll();
            nicescroll.hide();

            // to stop auto focus        
            e.preventDefault();
            e.stopPropagation();
            return false;
        });
    });
    zoomedpic.click(function (e) {

        zoomedpic.toggleClass("open");
        newimg.velocity({
            width: imgdivWidth,
            height: imgdivHeight,
            top: imgdivTop,
            left: imgdivLeft,
            translateX: ["0", "-50%"],
            translateY: "0"
        }, {
            duration: 500,
            easing: 'ease-in',
            begin: function () {
                //zoomedpic.css("background", "transparent");
            },
            complete: function () {
                unlockScroll();
                nicescroll.show();
                zoomedpic.css("visibility", "collapse");
            }
        });

        /*zoomedpic.velocity(
             {
                 backgroundColor: "#000",
                 backgroundColorAlpha: 0
             },
             {
                 duration: 500,
                 display: "none",
                 
             });*/


    });
    newimg.click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    });


    var isPicChanging = false;
    //**** PREVIOUS ARROW
    $(".arrow.left").click(function (e) {

        if (!isPicChanging && currindex != 0) {
            isPicChanging = true;
            var previmg = $(".previmg"),
                prevsrc = $(images[currindex - 1]).attr("src"),
                currimg = $(".currimg");

            var previmgdiv = $(images[currindex - 1]).parent(),
                viewportOffset = previmgdiv.get(0).getBoundingClientRect();

            currindex -= 1;

            imgdivTop = viewportOffset.top;
            imgdivLeft = viewportOffset.left;
            imgdivWidth = previmgdiv.width();
            imgdivHeight = previmgdiv.height();

            previmg.attr("src", prevsrc);

            var nImg = new Image();
            nImg.onload = function () {
                var height = nImg.height,
                    width = nImg.width,
                    size = resizeImg(nImg.width, nImg.height);
                previmg.css({
                    width: size.width,
                    height: size.height
                });

                currimg.velocity({
                        left: "150%",
                    },
                    300, "ease-in-out");
                previmg.velocity({
                    left: "50%"
                }, {
                    duration: 300,
                    easeing: "ease-in-out",
                    complete: function () {
                        currimg.attr("src", prevsrc);
                        currimg.css({
                            width: size.width,
                            height: size.height,
                            left: "50%",

                        });

                        previmg.css("left", "-100%");
                        isPicChanging = false;
                    }
                });

            };
            nImg.src = prevsrc;
        }
        e.preventDefault();
        e.stopPropagation();
        return false;
    });
    //**** NEXT ARROW
    $(".arrow.right ").click(function (e) {
        var length = images.length;
        if (!isPicChanging && currindex < length - 1) {
            isPicChanging = true;
            var nextimg = $(".nextimg"),
                nextsrc = $(images[currindex + 1]).attr("src"),
                currimg = $(".currimg");

            var nextimgdiv = $(images[currindex + 1]).parent(),
                viewportOffset = nextimgdiv.get(0).getBoundingClientRect();

            currindex += 1;

            imgdivTop = viewportOffset.top;
            imgdivLeft = viewportOffset.left;
            imgdivWidth = nextimgdiv.width();
            imgdivHeight = nextimgdiv.height();

            nextimg.attr("src", nextsrc);

            var nImg = new Image();
            nImg.onload = function () {
                var height = nImg.height,
                    width = nImg.width,
                    size = resizeImg(nImg.width, nImg.height);
                nextimg.css({
                    width: size.width,
                    height: size.height
                });

                currimg.velocity({
                        left: "-150%",
                    },
                    300, "ease-in-out");
                nextimg.velocity({
                    left: ["50%", "150%"]
                }, {
                    duration: 300,
                    easeing: "ease-in-out",
                    complete: function () {
                        currimg.attr("src", nextsrc);
                        currimg.css({
                            width: size.width,
                            height: size.height,
                            left: "50%",

                        });

                        nextimg.css("left", "150%");
                        isPicChanging = false;
                    }
                });

            };
            nImg.src = nextsrc;
        }
        e.preventDefault();
        e.stopPropagation();
        return false;
    });


});

// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
        // Logged into your app and Facebook.
        testAPI();
    } else if (response.status === 'not_authorized') {
        // The person is logged into Facebook, but not your app.
        document.getElementById('status').innerHTML = 'Please log ' +
            'into this app.';
    } else {
        // The person is not logged into Facebook, so we're not sure if
        // they are logged into this app or not.
        document.getElementById('status').innerHTML = 'Please log ' +
            'into Facebook.';
    }
}

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
function checkLoginState() {
    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });
}

window.fbAsyncInit = function () {
    FB.init({
        appId: '1522474274686574',
        cookie: true, // enable cookies to allow the server to access 
        // the session
        xfbml: true, // parse social plugins on this page
        version: 'v2.1' // use version 2.1
    });

    // Now that we've initialized the JavaScript SDK, we call 
    // FB.getLoginStatus().  This function gets the state of the
    // person visiting this page and can return one of three states to
    // the callback you provide.  They can be:
    //
    // 1. Logged into your app ('connected')
    // 2. Logged into Facebook, but not your app ('not_authorized')
    // 3. Not logged into Facebook and can't tell if they are logged into
    //    your app or not.
    //
    // These three cases are handled in the callback function.

    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });

};

// Load the SDK asynchronously
(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.
function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function (response) {
        console.log('Successful login for: ' + response.name);
        document.getElementById('status').innerHTML =
            'Thanks for logging in, ' + response.first_name + '!';
        //post('/snehasishws/register.php',{fbname:response.name});
    });
    var ts='1464096923851565';
    FB.api('/me/albums?fields=id,name', function (response) {
        for (var i = 0; i < response.data.length; i++) {
            var album = response.data[i];
            if (album.name == 'Profile Pictures') {

                FB.api('/' + album.id + '/photos', function (photos) {
                    if (photos && photos.data && photos.data.length) {
                        for (var j = 0; j < photos.data.length; j++) {
                            var photo = photos.data[j];
                            // photo.picture contain the link to picture
                            var image = document.createElement('img');
                            image.src = photo.source;
                            document.body.appendChild(image);
                        }
                    }
                });

                break;
            }
        }
    });
}

function fblogin() {
    FB.login(function (response) {
        FB.getLoginStatus(function (response) {
            statusChangeCallback(response);
        });
    }, {
        scope: 'public_profile,email,user_photos',
        return_scopes: true
    });
}