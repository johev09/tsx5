
function downloadJSAtOnload() {
    //alert("webpage loaded");
    function randomIntFromInterval(min,max)
    {
        return Math.floor(Math.random()*(max-min+1)+min);
    }
    
    $('#online .wincircle').each(function() {
        $(this)
        .delay(randomIntFromInterval(500,2000)+1000)
        .velocity({
            translateY: [0, "-50%"],
            opacity: 1
        },500);
    });
    
    $('#offline .wincircle').each(function() {
        $(this)
        .delay(randomIntFromInterval(500,2000)+1000)
        .velocity({
            translateY: [0, "50%"],
            opacity: 1
        },500);
    });
    
    
    /*$('#header div p:nth-child(2)').velocity(
        {
            opacity: 1
        },
        300,'ease');
    $('#header div p:nth-child(2)').velocity(
        {
            scaleX: 1,
            scaleY: 1
        },
        700,'spring');*/
}
if (window.addEventListener)
window.addEventListener("load", downloadJSAtOnload, false);
else if (window.attachEvent)
window.attachEvent("onload", downloadJSAtOnload);
else window.onload = downloadJSAtOnload;


//$('.wincircle').css('opacity',0);





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

// code run on document load
$(function() {
    
    /* CODE TO MOVE HEADING ON MOUSE MOVE*/
    var win=$(window),
        width=win.innerWidth(),
        height=win.innerHeight(),
        midw=width/2,
        midh=height/2,
        headertxt=$("#header h1"),
        animating=false;
    var tx,ty,txtshdw,trnsfrm;
    
    // drag technoshine heading
    
    var move=false,
        drag=
        {
            x:0,
            y:0,
            width: 0,
            height: 0
        };
    
    drag.width=(headertxt.offset().left);
    drag.height=(headertxt.offset().top);
    
    headertxt.mousedown(function(e) {
        if(move)
            return;
        move=true;
        drag.x=e.pageX;
        drag.y=e.pageY;
    });
    win.mouseup(function(e) {
        if(move)
        {
            animating=true;
            TweenLite.to(headertxt,0.5,{x:0,y:0,ease:Elastic.easeOut, onComplete: animComplete});
            
            function animComplete()
            {
                animating=move=false;
            }
        }
    });
    
    win.mousemove(function(e) {
        
        // move=true then drag the heading
        if(animating)
            return;
        if(move)
        {
            tx=0.4*(e.pageX-drag.x);
            ty=0.4*(e.pageY-drag.y);
            
            /*console.log(headertxt.offset().left+" "+headertxt.offset().top);*/
            var offset=headertxt.offset();
            if((offset.left+headertxt.width())>=width || 
               (offset.top+headertxt.height())>=height || 
               offset.left<=0 || 
               offset.top<=0)
            {
                var e = $.Event("mouseup",{ which: 1 });
                win.trigger(e);
                return;
            }
                
            TweenLite.set(headertxt,{x:tx,y:ty});
            return;
        }
        
        tx=parseInt(20 * ((e.pageX-midw)/midw) * -1);
        ty=parseInt(20 * ((e.pageY-midh)/midh) * -1);
        
        //$("#header h1 span").text(tx+" "+ty);
        
        txtshdw=tx+"px "+ty+"px 10px black";
        trnsfrm="translate("+tx+"px,"+ty+"px)";
        //$("#header h1 span").text(txtshdw);
        //headertxt.css("text-shadow",txtshdw);
        
        TweenLite.set(headertxt,{x:tx,y:ty});
        //headertxt.css(prefix.css+"transform",trnsfrm);   
    });
    
     win.resize(function() {
         //console.log("resized");
         width=win.innerWidth();
         height=win.innerHeight();
         midw=width/2;
         midh=height/2;
     });
    /*END OF CODE TO MOVE HEADING*/
    
    
    
    var cmsntxt=$("#header div p:nth-child(2)"),
        onlinetxt=$("#header div p:nth-child(1)"),
        offlinetxt=$("#header div p:nth-child(3)");
   
    $('#online.winners').hover(
        function() {
            cmsntxt.toggleClass("on");
            onlinetxt.toggleClass("on");
        },
        function() {
            cmsntxt.toggleClass("on");
            onlinetxt.toggleClass("on");
        });
    $('#offline.winners').hover(
        function() {
            cmsntxt.toggleClass("off");
            offlinetxt.toggleClass("off");
        },
        function() {
            cmsntxt.toggleClass("off");
            offlinetxt.toggleClass("off");
        });
    
    
    
    
    
    
    
    
    // neon glow sound on coming soon hover
    var neonAudio=$("#neon").get(0);
    $('#header div p a').hover(
        //mouse enter
        function() {
        neonAudio.play();
    }, 
        //mouse leave
        function() {
        neonAudio.pause();
        neonAudio.currentTime=0;        
    });

});