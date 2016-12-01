/**
 * Created by zb on 2016/12/1.
 */
window.onload=function () {
    waterfall('main','box')
}

function waterfall(parent,box) {
    //将main下的所有class为box的元素取出来
    var oParent=document.getElementById(parent);
    var oBoxs=getByClass(oParent,box);
    //计算整个页面显示的列数（页面宽/Box的的宽）
    var oBoxW=oBoxs[0].offsetWidth;
    //document.documentElement是获取树的跟节点，即<html>节点
    var cols=Math.floor(document.documentElement.clientWidth/oBoxW)
    // //设置main的宽
    oParent.style.cssText='width:'+oBoxW*cols+'px;margin:0 auto';
    var hArr=[];  //存放每列的宽
    for(var i=0;i<oBoxs.length;i++){
        if(i<cols){
            hArr.push(oBoxs[i].offsetHeight);
        }else{
            var minH=Math.min.apply(null,hArr);
            var index=getMInhIndex(hArr,minH);
            console.log(index)
            oBoxs[i].style.position='absolute';
            oBoxs[i].style.top=minH+'px';
            console.log(oBoxs[2])
            oBoxs[i].style.left=oBoxs[index].offsetLeft+'px';
            hArr[index]+=oBoxs[i].offsetHeight;
        }
    }
    console.log(hArr)
}

function getByClass(parent,clsName) {
    var boxArr=new Array(); //用来存储获取到的所有class为box的元素
    var oElements=parent.getElementsByTagName("*");
    for(var i=0;i<oElements.length;i++){
        if(oElements[i].className==clsName){
            boxArr.push(oElements[i])
        }
    }
    return boxArr;
}
/****
 *获取 pin高度 最小值的索引index
 */
function getMInhIndex(arr,val) {
    for(var i in arr){
        if(arr[i]==val){
            return i;
        }
    }
}