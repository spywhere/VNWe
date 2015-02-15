function addListener(element, type, expression, bubbling)
{
  bubbling = bubbling || false;
  if(window.addEventListener)	{ // Standard
    element.addEventListener(type, expression, bubbling);
    return true;
  } else if(window.attachEvent) { // IE
    element.attachEvent('on' + type, expression);
    return true;
  } else return false;
}

var ImageLoader = function(url){
  this.url = url;
  this.image = null;
  this.loadEvent = null;
};

ImageLoader.prototype = {
  load:function(){
    this.image = document.createElement('img');
    var url = this.url;
    var image = this.image;
    var loadEvent = this.loadEvent;
    addListener(this.image, 'load', function(e){
      if(loadEvent != null){
        loadEvent(url, image);
      }
    }, false);
    this.image.src = this.url;
  },
  getImage:function(){
    return this.image;
  }
};

var imgloader_pos=0;
var imgloader_totalimg=0;
var imgloader_imgdone=false;

function getImgProgress(){
if(imgloader_imgdone){
return 100;
}else{
return ((imgloader_pos/imgloader_totalimg)*100).toFixed(2);
}
}

function loadImg(imgarr){
imgloader_totalimg=imgarr.length;
if(imgloader_pos>=imgloader_totalimg){imgloader_imgdone=true;return;}
var loader = new ImageLoader(imgarr[imgloader_pos]);
loader.loadEvent = function(url, image){
imgloader_pos++;
loadImg(imgarr);
}
loader.load();
}
