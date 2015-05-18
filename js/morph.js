window.onload=function() {
    var trans=whichTransitionEvent();
    var morphs=document.getElementsByTagName('li');
    for(i=0;i<morphs.length;i++)
    {
        //var m=a.getElementsByClassName('morph-content')[0];
        var li=morphs[i];
        
        var a=li.getElementsByTagName('a')[0];
        var m=li.getElementsByClassName('morph-content')[0];
        
        if(m)
        {
            trans && m.addEventListener(trans,morphAnimEnd,false);
            a.onclick=morph(m);
        }
    }
        
    //alert("end")
};

function whichTransitionEvent(){
    var t;
    var el = document.createElement('fakeelement');
    var transitions = {
      'transition':'transitionend',
      'OTransition':'oTransitionEnd',
      'MozTransition':'transitionend',
      'WebkitTransition':'webkitTransitionEnd'
    }

    for(t in transitions){
        if( el.style[t] !== undefined ){
            return transitions[t];
        }
    }
}
function morph(m)
{    
    return function()
    {        
        if(hasClass(m,'morphit'))
        removeClass(m,'morphit');
        else
        addClass(m,'morphit');

        //alert("yo");
    }
}

function morphAnimEnd(e)
{
    var form=e.target.getElementsByClassName('form')[0];
    if(e.propertyName=="opacity")
    {        
        //alert("anim end");
    }
    else if(e.propertyName=='width')
    {
         var style=window.getComputedStyle(e.target),
            width=style.getPropertyValue('width');
        
        //alert(width);
        if(width=='340px')
        {
            form.style.opacity='1';
            
            form.style.transition='opacity 0.25s 0s';
            e.target.style.transition='opacity 0.4s 0.5s,        width 0.4s 0.5s,        height 0.4s 0.5s,        top 0.4s 0.5s,        left 0.4s 0.5s,  right 0.4s 0.5s,       margin 0.4s 0.5s';
        }
        else
        {
            form.style.transition='opacity 0.25s 0.5s';
            e.target.style.transition='opacity 0.4s 0.1s,        width 0.4s 0.1s,        height 0.4s 0.1s,        top 0.4s 0.1s,        left 0.4s 0.1s, right 0.4s 0.1s,       margin 0.4s 0.1s';
        }    //form.style.opacity='0';
    }
}
    
function hasClass(ele,cls) {
  return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}

function addClass(ele,cls) {
  if (!hasClass(ele,cls)) ele.className += " "+cls;
}

function removeClass(ele,cls) {
  if (hasClass(ele,cls)) {
    var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
    ele.className=ele.className.replace(reg,'');
  }
}