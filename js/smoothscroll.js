$(document).ready(function () {
    
    var fixeds=$('.fixedpic');
    
    $('.morph-li').hover(function() {
        //console.log("hovering");
        var width=$(this).outerWidth();
        $(this).find('.morph-content').css('width',width);
    });
    
    // private fields & init
    var win = $(window),
        doc = $(document),
        top = 0,
        step = 55,
        speed = 250,
        viewport = win.height(),
        body = $('body'),
        wheel = false;
    // events
    /*$('body').mousewheel(function(event, delta) {
        
        //console.log(top+"");
        wheel = true;

        console.log(top+" "+viewport+" "+doc.height());
        if (delta < 0) // down
        {
            top = (top+viewport) >= doc.height() ? top : top+=step;
            top+=step;
        }

        else // up
            top = top <= 0 ? 0 : top-=step;
        
        body.stop().animate({scrollTop: top}, speed,'swing', function () {
            wheel = false;
        });
        //alert("ran");
        
        return false;
    });*/

    win
    .on('resize', function (e) {
        viewport = win.height();
    })
    .on('scroll', function (e) {
        if (!wheel)
            top = win.scrollTop();
            //console.log(top);
        /*if(top<1300)
        {
            //change pic
            //console.log(fixeds.size);
            fixeds.eq(0).css('visibility', 'visible');
            fixeds.eq(1).css('visibility', 'hidden');
        }
        else
        {
            fixeds.eq(0).css('visibility', 'hidden');
            fixeds.eq(1).css('visibility', 'visible');
        }*/
    });

});