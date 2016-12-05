/**
 * Created by Administrator on 2016/12/3.
 */
$(window).on('load',function () {
    waterfall();
    var dataInt={"data":[{"src":'../images/1.jpg'},{"src":'../images/2.jpg'},{"src":'../images/3.jpg'},{"src":'../images/4.jpg'}]}
    $(window).on('scroll',function () {
        if(checkscrollside){
            $.each(dataInt.data,function (key,value) {
                var oBox=$('<div>').addClass('box').appendTo($('#main'));
                var oPic=$('<div>').addClass('pic').appendTo($(oBox));
                var oImg=$('<img>').attr('src',$(value).attr('src')).appendTo($(oPic));
            })
            waterfall();
        }
    })
})

function waterfall() {
    var $boxs=$('#main > div');//获取maina下的子div
    var w=$boxs.eq(0).outerWidth();  //outerWidth包括了padding和margin
    var cols=Math.floor($(window).width()/w);
    $('#main').width(w*cols).css('margin','0px auto');
    var hArr=[];
    $boxs.each(function (index,value) {
        var h=$boxs.eq(index).outerHeight();
        console.log(cols)
        if(index<cols){
            hArr[index]=h;
        }else{
            var minH=Math.min.apply(null,hArr);
            var minIndex=$.inArray(minH,hArr);
            $(value).css({
                'position':'absolute',
                'top':minH+'px',
                'left':minIndex*w+'px'
            })
            hArr[minIndex]+=$boxs.eq(index).outerHeight();
        }
    })
}

function checkscrollside() {
    var $lastBox=$('#main>div').last();
    var lastBoxDis=$lastBox.offset().top+Math.floor($lastBox.outerHeight()/2);
    var scrollTop=$(window).scrollTop();
    var documentH=$(window).height();
    return (lastBoxDis<scrollTop+documentH)?true:false
}