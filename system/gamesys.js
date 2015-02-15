/*
VNWe2
Copyright (c) 2006-2011
Senior Design Interactive
All Rights Reserved.
*/
var sw=getResolution("width");
var sh=getResolution("height");
var imgoffset=[0,0];
var imgpan=[0,0,0,0];
var objid="";
var bgmdir="bgm/";
var sfxdir="sfx/";
var imgdir="images/";
var customcode="";
var endfx="";
var usebgm=100;
var usesfx=100;
var bgmstart=10;
var bgmfade=100;
var gamesize=[800,600];
var storybox=[100,400,600,150,15,50,"#000000","#ffffff","1px solid #ffffff"];
var notebox=[100,560,600,50,50,"#ffffff"];
var ender=[true,"ender.gif",10];
var imgopa=0;
var img1use=false;
var img1=false;
var currentline=0;
var addingline=0;
var ended=false;
var decisionrun="";
var running=false;
var gamerun=false;
var particlerun="";
var debug=false;
var autodelay=false;
var stopshaking=false;
var debugborder="";
var particletime=null;
var stoppan=false;
var panrun=false;

var savelist=new Array();
var varlist=new Array();
var modelist=new Array();
var textalignlist=new Array();
var textlist=new Array();
var notelist=new Array();
var condlist=new Array();
var sfxlist=new Array();
var bgmlist=new Array();
var particlelist=new Array();
var cursorlist=new Array();
var imglist=new Array();
var layerlist=new Array();
var anchorlist=new Array();
var decisionlist=new Array();
var shakelist=new Array();
var storyboxstylelist=new Array();
var noteboxstylelist=new Array();
var panlist=new Array();

function debugOn(){
debug=true;
}

function setImageOffset(xo,yo){
if(xo==null){xo=0;}
if(yo==null){yo=0;}
imgoffset=[xo,yo];
}

function setEnder(pos,img,offset){
if(pos==null){pos=true;}
if(img==null){img="ender.gif";}
if(offset==null){offset=10;}
ender=[pos,img,offset];
}

function setGame(w,h,sfx,bgm){
if(w==null){w=800;}
if(h==null){h=600;}
if(sfx==null){sfx=true;}
if(bgm==null){bgm=true;}
gamesize=[w,h];
usesfx=sfx;
usebgm=bgm;
}

function setSound(sfx,bgm,fade,start){
if(sfx==null){sfx=100;}
if(bgm==null){bgm=100;}
if(fade==null){fade=100;}
if(start==null){start=10;}
sfxvol=sfx;
bgmvol=bgm;
bgmfade=fade;
bgmstart=start;
}

function setStoryBox(left,top,width,height,rad,opa,bg,text,border){
if(left==null){left=100;}
if(top==null){top=400;}
if(width==null){width=600;}
if(height==null){height=150;}
if(rad==null){rad=15;}
if(opa==null){opa=30;}
if(bg==null){bg="#000000";}
if(text==null){text="#ffffff";}
if(border==null){border="1px solid #ffffff";}
storybox=[left,top,width,height,rad,opa,bg,text,border];
}

function setNoteBox(left,top,width,height,opa,text){
if(left==null){left=100;}
if(top==null){top=560;}
if(width==null){width=600;}
if(height==null){height=50;}
if(opa==null){opa=50;}
if(text==null){text="#ffffff";}
notebox=[left,top,width,height,opa,text];
}

function setDir(img,bgm,sfx){
if(img!=null){imgdir=img;}
if(bgm!=null){bgmdir=bgm;}
if(sfx!=null){bgmdir=sfx;}
}

function setCustomCode(code){
if(code!=null){
customcode=code;
}
}

function saveGame(name){
if(name!=null){
savelist[addingline]=["save",name];
}
}

function loadGame(name){
if(name!=null){
savelist[addingline]=["load",name];
}
}

function clearSave(name){
if(name!=null){
savelist[addingline]=["clear",name];
}
}

function checkSave(name,tanc,fanc){
if(name!=null&&tanc!=null&&fanc!=null){
savelist[addingline]=["check",name,tanc,fanc];
auto();
}
}

function addText(text,speed){
if(text!=null){
if(speed==null){speed=30;}
textlist[addingline]=[text,speed];
}
}

function addCursor(url){
if(url!=null){
cursorlist[addingline]=url;
}
}

function addAnchor(nm){
if(nm!=null){
anchorlist[addingline]=[nm,addingline];
}
}

function addPanning(fl,ft,ll,lt,speed,inst){
if(fl!=null){
if(fl=="stop"){
panlist[addingline]="stop";
}else{
if(ft!=null&&ll!=null&&lt!=null){
if(speed==null){speed=30;}
if(inst==null){inst=false;}
panlist[addingline]=[fl,ft,ll,lt,speed,inst];
}
}
}
}

function newButtonStyle(bgcol,bgimg,bsize,bcol,rad){
if(bgcol==null){bgcol="#87ceeb";}
if(bsize==null){bsize=1;}
if(bcol==null){bcol="#6ca6cd";}
if(rad==null){rad=5;}
return [bgcol,bgimg,bsize,bcol,rad];
}

function newButton(btnl,btnt,btnw,btnh,btnlab,btnanch,nstyle,hstyle){
if(btnlab!=null&&btnanch!=null){
if(btnw==null){btnw=150;}
if(btnh==null){btnh=25;}
if(btnl==null){btnl=(sw/2)-(btnw/2)}
if(btnt==null){btnt=(sh/2)-(btnh/2)}
return [btnl,btnt,btnw,btnh,btnlab,btnanch,nstyle,hstyle];
}
}

function newStoryBoxStyle(left,top,width,height,rad,opa,bg,text,border){
if(left==null){left=100;}
if(top==null){top=400;}
if(width==null){width=600;}
if(height==null){height=150;}
if(rad==null){rad=15;}
if(opa==null){opa=30;}
if(bg==null){bg="#000000";}
if(text==null){text="#ffffff";}
if(border==null){border="1px solid #ffffff";}
storyboxstylelist[addingline]=["storyboxstyle",[left,top,width,height,rad,opa,bg,text,border]];
}

function newNoteBoxStyle(left,top,width,height,opa,text){
if(left==null){left=100;}
if(top==null){top=560;}
if(width==null){width=600;}
if(height==null){height=50;}
if(opa==null){opa=50;}
if(text==null){text="#ffffff";}
noteboxstylelist[addingline]=["noteboxstyle",[left,top,width,height,opa,text]];
}

function addCond(vr,tr,fl){
if(tr!=""&&fl!=""){
condlist[addingline]=[vr,tr,fl];
auto();
}
}

function addDecision(){
var args=Array.prototype.slice.call(arguments, 0);
if(args.length>=2){
decisionlist[addingline]=args;
}
}

function hideStoryBox(){
storyboxstylelist[addingline]="hidestorybox";
}

function showStoryBox(){
storyboxstylelist[addingline]="showstorybox";
}

function addShake(xo,yo,loop,normalize,speed){
if(xo==null){xo=1;}
if(yo==null){yo=1;}
if(loop==null){loop=false;}
if(normalize==null){normalize=0;}
if(speed==null){speed=100;}
if(xo=="stop"){
shakelist[addingline]=["shake","stop"];
}else{
shakelist[addingline]=["shake",xo,yo,loop,normalize,speed];
}
}

function addAlign(alignment){
if(alignment==null){alignment="left";}
textalignlist[addingline]=alignment.toLowerCase();
}

function addParticle(boxleft,boxtop,boxwidth,boxheight,url,xv,yv,randx,randy,amount,speed){
if(boxleft!=null){
if(boxleft=="stop"){particlelist[addingline]="stop";return}
}
if(url!=null){
if(boxleft==null){boxleft=0;}
if(boxtop==null){boxtop=0;}
if(boxwidth==null){boxwidth=gamesize[0];}
if(boxheight==null){boxheight=gamesize[1];}
if(xv==null){xv=0;}
if(yv==null){yv=0;}
if(randx==null){randx=0;}
if(randy==null){randy=0;}
if(amount===null){amount=50;}
if(speed===null){speed=50;}

particlelist[addingline]=[boxleft,boxtop,boxwidth,boxheight,url,xv,yv,randx,randy,amount,speed];
}
}

function addNote(text){
if(text!=null){
notelist[addingline]=text;
}
}

function addImage(url,speed,clear){
if(url!=null){
if(speed==null){speed=50;}
if(clear==null){clear=false;}
imglist[addingline]=[url,speed,clear];
}
}

function addLayer(lp,tp,code,loop){
if(code!=null){
if(loop==null){loop=false;}
if(lp==null){lp=0;}
if(tp==null){tp=0;}
if(layerlist[addingline]==null){layerlist[addingline]=new Array();}
layerlist[addingline][layerlist[addingline].length]=[lp,tp,code,loop];
}
}

function addSFX(nm,url,loop){
if(url!=null&&nm!=null){
if(loop==null||loop<2){loop=0;}
if(sfxlist[addingline]==null){sfxlist[addingline]=new Array();}
sfxlist[addingline][sfxlist[addingline].length]=[nm,url,loop];
}
}

function addBGM(url){
if(url!=null){
bgmlist[addingline]=url;
}
}

function gotoAnchor(nm){
if(nm!=null){
auto();
modelist[addingline]="goto:"+nm;
addingline++;
}
}

function wait(){
modelist[addingline]="wait";
addingline++;
}

function waitNone(){
modelist[addingline]="waitnone";
addingline++;
}

function auto(delay){
if(delay==null){delay=0;}
modelist[addingline]="auto:"+delay;
addingline++;
}

function sVar(nm,vl){
varlist[varlist.length]=[nm,vl,vl];
}

function setVar(nm,vl){
if(nm!=null&&vl!=null){
setTimeout("sVar(\""+nm+"\",\""+vl+"\")",1);
}
}

function addVar(nm,vl){
if(nm!=null&&vl!=null){
varlist[addingline]=[nm,vl,null];
}
}

function useVar(nm){
if(nm!=null){
for(i=0;i<varlist.length;i++){
if(varlist[i]!=null){
if(varlist[i][0]==nm){return varlist[i][2];}
}
}
}
}

function getLine(anchor){
for(i=0;i<anchorlist.length;i++){
if(anchorlist[i]!=null){
if(anchorlist[i][0]==anchor){return anchorlist[i][1];}
}
}
return null;
}

function disableselect(e){return false;}
function reEnable(){return true;}
document.onselectstart=new Function("return false");
if(window.sidebar){document.onmousedown=disableselect;document.onclick=reEnable;}
function clickIE(){if(document.all){return false;}}
function clickNS(e){if(document.layers||(document.getElementById&&!document.all)){if(e.which==2||e.which==3){return false;}}}
if(document.layers){document.captureEvents(Event.MOUSEDOWN);document.onmousedown=clickNS;}else{document.onmouseup=clickNS;document.oncontextmenu=clickIE;}
document.oncontextmenu=new Function("return false");

function getResolution(a){
var b;
var c;
if(typeof window.innerWidth!='undefined'){
b=window.innerWidth,c=window.innerHeight;
}else if(typeof document.documentElement!='undefined'&&typeof document.documentElement.clientWidth!='undefined'&&document.documentElement.clientWidth!=0){
b=document.documentElement.clientWidth,c=document.documentElement.clientHeight;
}else{
b=document.getElementsByTagName('body')[0].clientWidth,c=document.getElementsByTagName('body')[0].clientHeight;
}
if(a=="width"){return b;}else{return c;}
}

function setCenter(){
sw=getResolution("width");
sh=getResolution("height");
document.getElementById(objid).style.left=((sw/2)-(gamesize[0]/2))+"px";
document.getElementById(objid).style.top=((sh/2)-(gamesize[1]/2))+"px";
}

function checkProgress(){
if(ended){return;}
var imgprogress = getImgProgress();
if(imgprogress>=100){
document.getElementById("mainloader").style.visibility="hidden";
if(!gamerun){
runEvent();
gamerun=true;
}
}

document.getElementById("customcode").innerHTML=replaceAll(replaceAll(customcode,"%bgmprogress%",getBGMProgress()),"%imgprogress%",imgprogress);
document.getElementById("loader").innerHTML="Loading: "+imgprogress+"%";
}

function rand(min,max){
return min+Math.round(Math.random()*(max-min));
}

function getCenterX(){
return (gamesize[0]/2);
}

function getCenterY(){
return (gamesize[1]/2);
}

function nextPan(fl,ft,ll,lt,speed){
if(!stoppan){
runPan(fl,ft,ll,lt,speed);
return;
}
var fx="nextPan("+fl+","+ft+","+ll+","+lt+","+speed+")";
setTimeout(fx,10);
}

function preparePan(fl,ft){
if(img1use){
imgpan[0]=fl;
imgpan[1]=ft;
}else{
imgpan[2]=fl;
imgpan[3]=ft;
}
normalizeScreen();
}

function runPan(fl,ft,ll,lt,speed,percent){
if(percent>100||stoppan){stoppan=false;panrun=false;normalizeScreen();return;}
if(percent==null){percent=0;}
var delx=ll-fl;
var dely=lt-ft;
if(img1use){
imgpan[2]=fl+delx*(percent/100);
imgpan[3]=ft+dely*(percent/100);
}else{
imgpan[0]=fl+delx*(percent/100);
imgpan[1]=ft+dely*(percent/100);
}
normalizeScreen();
percent++;
var fx="runPan("+fl+","+ft+","+ll+","+lt+","+speed+","+percent+")";
panrun=true;
setTimeout(fx,speed);
}

function nextLayer(noid,lp,tp,code,loop,created,pos){
var codedat=code.split("|");
var iid="";
if(!img1use){
iid="box2layer";
}else{
iid="box1layer";
}
if(pos==null){pos=0;}
if(created==null){created=false;}
if(pos>=codedat.length){
if(loop){
pos=0;
}else{
return;
}
}
if(codedat[pos].substring(0,5)=="wait:"){
var time=parseInt(codedat[pos].substring(5));
var fx="nextLayer("+noid+","+lp+","+tp+",\""+code+"\","+loop+","+created+","+(pos+1)+")";
setTimeout(fx,time);
return;
}

if(codedat[pos].indexOf(".jpg")!=-1||codedat[pos].indexOf(".jpeg")!=-1||codedat[pos].indexOf(".gif")!=-1||codedat[pos].indexOf(".png")!=-1){
if(created){
if(document.getElementById("layerimg"+noid)!=null){
document.getElementById("layerimg"+noid).src=imgdir+codedat[pos];
}else{
return;
}
}else{
document.getElementById(iid).innerHTML+="<img id=\"layerimg"+noid+"\" src=\""+imgdir+codedat[pos]+"\" style=\"position:absolute;left:"+lp+"px;top:"+tp+"px;\">";
created=true;
}
}
var fx="nextLayer("+noid+","+lp+","+tp+",\""+code+"\","+loop+","+created+","+(pos+1)+")";
setTimeout(fx,0);
}

function normalizeScreen(){
document.getElementById("box1").style.left=imgoffset[0]+imgpan[0]+"px";
document.getElementById("box1").style.top=imgoffset[1]+imgpan[1]+"px";
document.getElementById("box2").style.left=imgoffset[0]+imgpan[2]+"px";
document.getElementById("box2").style.top=imgoffset[1]+imgpan[3]+"px";
}

function shakeScreen(xo,yo,loop,normalize,speed){
if(stopshaking){normalizeScreen();stopshaking=false;return;}
var px=imgoffset[0];
var py=imgoffset[1];
px+=rand(-xo,xo);
py+=rand(-yo,yo);
document.getElementById("box1").style.left=imgoffset[0]+imgpan[0]+px+"px";
document.getElementById("box1").style.top=imgoffset[1]+imgpan[1]+py+"px";
document.getElementById("box2").style.left=imgoffset[0]+imgpan[2]+px+"px";
document.getElementById("box2").style.top=imgoffset[1]+imgpan[3]+py+"px";
if(normalize>0){setTimeout("normalizeScreen()",normalize);}
if(loop){
setTimeout("shakeScreen("+xo+","+yo+","+loop+","+normalize+","+speed+")",speed);
}
}

function nextDecision(arr){
for(i=2;i<arr.length;i++){
var nbtnstyle=arr[0];
var hbtnstyle=arr[1];
if(arr[i][6]!=null){nbtnstyle=arr[i][6];}
if(arr[i][7]!=null){hbtnstyle=arr[i][7];}
var imgcode="";
var nimgcode="";
var himgcode="";
if(nbtnstyle[1]!=null&&nbtnstyle[1]!=""){
imgcode="background-image:url('"+imgdir+nbtnstyle[1]+"');";
nimgcode="this.style.backgroundImage='url("+imgdir+hbtnstyle[1]+")';";
}
if(hbtnstyle[1]!=null&&hbtnstyle[1]!=""){
himgcode="this.style.backgroundImage='url("+imgdir+hbtnstyle[1]+")';";
}
var code="<table cellspacing=\"0\" cellpadding=\"0\" width=\""+arr[i][2]+"\" height=\""+arr[i][3]+"\" style=\"position:absolute;left:"+arr[i][0]+"px;top:"+arr[i][1]+"px;"+debugborder+"\"><tr>";
code+="<td width=\""+arr[i][2]+"\" height=\""+arr[i][3]+"\" onmouseover=\"this.style.background='"+hbtnstyle[0]+"';this.style.border='"+hbtnstyle[2]+"px solid "+hbtnstyle[3]+"';this.style.borderRadius='"+hbtnstyle[4]+"px';"+himgcode+"\" onmouseout=\"this.style.background='"+nbtnstyle[0]+"';this.style.border='"+nbtnstyle[2]+"px solid "+nbtnstyle[3]+"';this.style.borderRadius='"+nbtnstyle[4]+"px';"+nimgcode+"\" style=\"cursor:default;border:"+nbtnstyle[2]+"px solid "+nbtnstyle[3]+";border-radius:"+nbtnstyle[4]+"px;background:"+nbtnstyle[0]+";"+imgcode+"\" align=\"center\" onClick=\"gotoLine('"+arr[i][5]+"');\">"+formatText(arr[i][4])+"<td></tr></table>";
document.getElementById("decisionbox").innerHTML+=code;
}
decisionrun="run";
}

function playNewParticle(imgsrc,boxleft,boxtop,boxwidth,boxheight,amount,xv,yv,randmotionx,randmotiony,speed){
if(particletime==null){
particlerun=imgsrc;
playParticle(boxleft,boxtop,boxwidth,boxheight,amount,xv,yv,randmotionx,randmotiony,speed);
}else{
var fx="playNewParticle(\""+imgsrc+"\","+boxleft+","+boxtop+","+boxwidth+","+boxheight+","+amount+","+xv+","+yv+","+randmotionx+","+randmotiony+","+speed+")";
setTimeout(fx,10);
}
}

function playParticle(boxleft,boxtop,boxwidth,boxheight,amount,xv,yv,randmotionx,randmotiony,speed){
if(particlerun!=""){
for(i=0;i<amount;i++){
var posx=parseInt(document.getElementById("particle"+i).style.left);
var posy=parseInt(document.getElementById("particle"+i).style.top);
posx+=xv;
posy+=yv;
if(randmotionx!=0){
posx+=rand(-randmotionx,randmotionx);
}
if(randmotiony!=0){
posy+=rand(-randmotiony,randmotiony);
}
if(posx<-(20*Math.abs(xv))||posx>boxwidth+(20*Math.abs(xv))){posy=rand(-(20*Math.abs(xv)),boxheight+(20*Math.abs(xv)));if(xv>0){posx=-(20*Math.abs(xv));}else{posx=boxwidth+(20*Math.abs(xv));}}
if(posy<-(20*Math.abs(yv))||posy>boxheight+(20*Math.abs(yv))){posx=rand(-(20*Math.abs(yv)),boxwidth+(20*Math.abs(yv)));if(yv>0){posy=-(20*Math.abs(yv));}else{posy=boxheight+(20*Math.abs(yv));}}
document.getElementById("particle"+i).style.left=posx+"px";
document.getElementById("particle"+i).style.top=posy+"px";
}

var fx="playParticle("+boxleft+","+boxtop+","+boxwidth+","+boxheight+","+amount+","+xv+","+yv+","+randmotionx+","+randmotiony+","+speed+")"
particletime=setTimeout(fx,speed);
}else{
particletime=null;
}
}

function nextParticle(boxleft,boxtop,boxwidth,boxheight,imgsrc,xv,yv,randmotionx,randmotiony,amount,speed){
document.getElementById("particlebox").style.left=boxleft+"px";
document.getElementById("particlebox").style.top=boxtop+"px";
document.getElementById("particlebox").style.width=boxwidth+"px";
document.getElementById("particlebox").style.height=boxheight+"px";
document.getElementById("particlebox").innerHTML="";
for(i=0;i<amount;i++){
var code="<img id=\"particle"+i+"\" src=\""+imgdir+imgsrc+"\" style=\"position:absolute;left:"+rand(-20,boxwidth+20)+"px;top:"+rand(-20,boxheight+20)+"px;z-index:6;\">";
document.getElementById("particlebox").innerHTML+=code;
}
particlerun="";
playNewParticle(imgsrc,boxleft,boxtop,boxwidth,boxheight,amount,xv,yv,randmotionx,randmotiony,speed);
}

function nextImg(fade,imgsrc){
if(img1){
document.getElementById("box2").style.zIndex=1;
document.getElementById("box1").style.zIndex=2;
document.getElementById("img2").style.zIndex=1;
document.getElementById("img1").style.zIndex=2;
document.getElementById("img1").src=imgdir+imgsrc;
}else{
document.getElementById("box2").style.zIndex=2;
document.getElementById("box1").style.zIndex=1;
document.getElementById("img2").style.zIndex=2;
document.getElementById("img1").style.zIndex=1;
document.getElementById("img2").src=imgdir+imgsrc;
}

if(fade>0){
if(img1){
document.getElementById("box1").style.opacity=imgopa/100;
}else{
document.getElementById("box2").style.opacity=imgopa/100;
}
imgopa+=5;

if(imgopa>100){
if(img1){
document.getElementById("box2").style.opacity=0;
}else{
document.getElementById("box1").style.opacity=0;
}
imgopa=0;
img1=!img1;
running=false;
runAfterImage();
return;
}
running=true;
setTimeout("nextImg("+fade+",\""+imgsrc+"\")",fade);
}else{
if(img1){
document.getElementById("box1").style.opacity=0;
document.getElementById("box2").style.opacity=1;
}else{
document.getElementById("box1").style.opacity=1;
document.getElementById("box2").style.opacity=0;
}
imgopa=0;
img1=!img1;
runAfterImage();
}
}

function formatText(text){
var outtxt="";
if(text!=""){
var offset=0;
var size=3;
var col="";
var bopen=false;
var iopen=false;
var uopen=false;
while(1){
var b="";
var a="";
if(text.substring(offset,offset+2)=="~c"&&text.charAt(offset+9)=="~"){
col=text.substring(offset+2,offset+9);
offset+=10;
}else if(text.substring(offset,offset+2)=="~s"&&text.charAt(offset+4)=="~"){
size=text.charAt(offset+2);
offset+=4;
}else if(text.substring(offset,offset+3)=="~c~"){
col="";
offset+=3;
}else if(text.substring(offset,offset+3)=="~s~"){
size=3;
offset+=3;
}else if(text.substring(offset,offset+3)=="~b~"){
bopen=!bopen;
offset+=3;
}else if(text.substring(offset,offset+3)=="~i~"){
iopen=!iopen;
offset+=3;
}else if(text.substring(offset,offset+3)=="~[~"){
outtxt+="<img src=\""+imgdir+"[.gif\">";
offset+=3;
}else if(text.substring(offset,offset+3)=="~]~"){
outtxt+="<img src=\""+imgdir+"].gif\">";
offset+=3;
}else if(text.substring(offset,offset+3)=="~u~"){
uopen=!uopen;
offset+=3;
}else if(text.substring(offset,offset+5)=="~clr~"){
outtxt="";
offset+=5;
}else{
if(col!=""){b+="<font color=\""+col+"\">";a="</font>";}
if(size!=3){b+="<font size=\""+size+"\">";a="</font>";}
if(bopen){b+="<font style=\"font-weight:bold;\">";a="</font>";}
if(iopen){b+="<font style=\"font-style:italic;\">";a="</font>";}
if(uopen){b+="<font style=\"text-decoration:underline;\">";a="</font>";}
if(text.charAt(offset)=="\n"){outtxt+="<br>";
}else if(text.charAt(offset)=="&"){outtxt+="&amp;";
}else if(text.charAt(offset)=="<"){outtxt+="&lt;";
}else if(text.charAt(offset)==">"){outtxt+="&gt;";
}else if(text.charAt(offset)=="\""){outtxt+="&quot;";
}else if(text.charAt(offset)==" "){outtxt+="&nbsp;";
}else{outtxt+=b+text.charAt(offset)+a;}
offset++;
}
if(offset>=text.length){break;}
}
}
return outtxt;
}

function nextText(text,speed,offset,bopen,iopen,uopen,col,size){
if(speed>0){
running=true;
if(offset==null){offset=0;}
if(size==null){size=3;}
if(col==null){col="";}
if(bopen==null){bopen=false;}
if(iopen==null){iopen=false;}
if(uopen==null){uopen=false;}
var b="";
var a="";
if(text.substring(offset,offset+2)=="~c"&&text.charAt(offset+9)=="~"){
col=text.substring(offset+2,offset+9);
offset+=10;
}else if(text.substring(offset,offset+2)=="~s"&&text.charAt(offset+4)=="~"){
size=text.charAt(offset+2);
offset+=4;
}else if(text.substring(offset,offset+3)=="~c~"){
col="";
offset+=3;
}else if(text.substring(offset,offset+3)=="~s~"){
size=3;
offset+=3;
}else if(text.substring(offset,offset+3)=="~b~"){
bopen=!bopen;
offset+=3;
}else if(text.substring(offset,offset+3)=="~i~"){
iopen=!iopen;
offset+=3;
}else if(text.substring(offset,offset+3)=="~[~"){
document.getElementById("storybox").innerHTML+="<img src=\""+imgdir+"[.gif\">";
offset+=3;
}else if(text.substring(offset,offset+3)=="~]~"){
document.getElementById("storybox").innerHTML+="<img src=\""+imgdir+"].gif\">";
offset+=3;
}else if(text.substring(offset,offset+3)=="~u~"){
uopen=!uopen;
offset+=3;
}else if(text.substring(offset,offset+5)=="~clr~"){
document.getElementById("storybox").innerHTML="";
offset+=5;
}else{
if(col!=""){b+="<font color=\""+col+"\">";a="</font>";}
if(size!=3){b+="<font size=\""+size+"\">";a="</font>";}
if(bopen){b+="<font style=\"font-weight:bold;\">";a="</font>";}
if(iopen){b+="<font style=\"font-style:italic;\">";a="</font>";}
if(uopen){b+="<font style=\"text-decoration:underline;\">";a="</font>";}
if(text.charAt(offset)=="\n"){document.getElementById("storybox").innerHTML+="<br>";
}else if(text.charAt(offset)=="&"){document.getElementById("storybox").innerHTML+="&amp;";
}else if(text.charAt(offset)=="<"){document.getElementById("storybox").innerHTML+="&lt;";
}else if(text.charAt(offset)==">"){document.getElementById("storybox").innerHTML+="&gt;";
}else if(text.charAt(offset)=="\""){document.getElementById("storybox").innerHTML+="&quot;";
}else if(text.charAt(offset)==" "){document.getElementById("storybox").innerHTML+="&nbsp;";
}else{document.getElementById("storybox").innerHTML+=b+text.charAt(offset)+a;}
offset++;
}
if(offset>=text.length){running=false;runAfterText();return;}
var fx="nextText(\""+replaceAll(replaceAll(replaceAll(text,"\\","\\\\"),"\n","\\n"),"\"","\\\"")+"\","+speed+","+offset+","+bopen+","+iopen+","+uopen+",\""+col+"\","+size+")";
setTimeout(fx,speed);
}else{
document.getElementById("storybox").innerHTML+=formatText(text);
runAfterText();
}
}

function runviaKey(e){
if(running){return;}
var keyID=(window.event)? event.keyCode : e.which;
if(keyID==32){runEvent();}
}

function runAfterImage(){
if(sfxlist[currentline]!=null){
for(i=0;i<sfxlist[currentline].length;i++){
if(sfxlist[currentline][i][0]=="stop"){stopSFX(sfxlist[currentline][i][1]);}else{playSFX(sfxlist[currentline][i][0],sfxlist[currentline][i][1],sfxlist[currentline][i][2]);}
}
}
if(panlist[currentline]!=null){
if(!panlist[currentline][5]){
nextPan(panlist[currentline][0],panlist[currentline][1],panlist[currentline][2],panlist[currentline][3],panlist[currentline][4]);
}
}
if(particlelist[currentline]!=null){if(particlelist[currentline]!="stop"){nextParticle(particlelist[currentline][0],particlelist[currentline][1],particlelist[currentline][2],particlelist[currentline][3],particlelist[currentline][4],particlelist[currentline][5],particlelist[currentline][6],particlelist[currentline][7],particlelist[currentline][8],particlelist[currentline][9],particlelist[currentline][10]);}}
if(notelist[currentline]!=null){document.getElementById("notebox").innerHTML=formatText(notelist[currentline]);}
if(textlist[currentline]!=null){nextText(textlist[currentline][0],textlist[currentline][1]);}else{runAfterText();}
}

function delayAuto(){
autodelay=false;
currentline++;
runEvent();
}

function runAfterText(){
if(decisionlist[currentline]!=null){nextDecision(decisionlist[currentline]);}
if(modelist[currentline]!=null){
if(modelist[currentline]=="wait"){
if(ender[0]){
document.getElementById("storybox").innerHTML+="<font id=\"ender"+currentline+"\"><img src=\""+imgdir+ender[1]+"\"></font>";
}else{
document.getElementById("storybox").innerHTML+="<font id=\"ender"+currentline+"\" style=\"position:absolute;right:"+ender[2]+"px;bottom:"+ender[2]+"px;\"><img src=\""+imgdir+ender[1]+"\"></font>";
}
}
if(modelist[currentline].substring(0,4)=="goto"){gotoLine(modelist[currentline].substring(5));}else{
if(modelist[currentline].substring(0,4)=="auto"){autodelay=true;setTimeout("delayAuto()",modelist[currentline].substring(5));}else{currentline++;}}
}else{
currentline++;
}
}

function gotoLine(nm,line){
if(line==null){line=getLine(nm);}
if(line!=null){
decisionrun="";
document.getElementById("decisionbox").innerHTML="";
currentline=line;
runEvent();
return;
}else{
alert("Error: Anchor \""+nm+"\" not found.");
decisionrun="";
document.getElementById("decisionbox").innerHTML="";
runEvent();
return;
}
}

function setCookie(c_name,value,exdays){
if(exdays==null){exdays=365;}
var exdate=new Date();
exdate.setDate(exdate.getDate() + exdays);
var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
document.cookie=c_name + "=" + c_value;
}

function getCookie(c_name){
var i,x,y,ARRcookies=document.cookie.split(";");
for (i=0;i<ARRcookies.length;i++){
x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
x=x.replace(/^\s+|\s+$/g,"");
if(x==c_name){return parseInt(unescape(y));}
}
return -1;
}

function clrCookie(name){
setCookie(name,-1,-1);
}

function runEvent(){
if(currentline>=addingline){ended=true;}
if(running||autodelay||decisionrun!=""){return;}
if(ended){setTimeout(endfx,0);return;}
if(document.getElementById("ender"+(currentline-1))!=null){document.getElementById("ender"+(currentline-1)).innerHTML="";}
if(savelist[currentline]!=null){
if(savelist[currentline][0]=="save"){
setCookie(savelist[currentline][1],currentline);
}
if(savelist[currentline][0]=="load"){
if(getCookie(savelist[currentline][1])>=0){
gotoLine("",getCookie(savelist[currentline][1]));
return;
}
}
if(savelist[currentline][0]=="clear"){
clrCookie(savelist[currentline][1]);
}
if(savelist[currentline][0]=="check"){
if(getCookie(savelist[currentline][1])>=0){
var line=getLine(savelist[currentline][2]);
if(line!=null){
gotoLine(savelist[currentline][2]);
}else{
alert("Anchor \""+savelist[currentline][2]+"\" not found.");
}
}else{
var line=getLine(savelist[currentline][3]);
if(line!=null){
gotoLine(savelist[currentline][3]);
}else{
alert("Anchor \""+savelist[currentline][3]+"\" not found.");
}
}
return;
}
}
if(varlist[currentline]!=null){
varlist[currentline][2]=varlist[currentline][1];
}
if(condlist[currentline]!=null){
if(useVar(condlist[currentline][0])!=null){
var line=getLine(condlist[currentline][1]);
if(line!=null){
gotoLine(condlist[currentline][1]);
}else{
alert("Anchor \""+condlist[currentline][1]+"\" not found.");
}
}else{
var line=getLine(condlist[currentline][2]);
if(line!=null){
gotoLine(condlist[currentline][2]);
}else{
alert("Anchor \""+condlist[currentline][2]+"\" not found.");
}
}
return;
}
document.getElementById("box2layer").innerHTML="";
document.getElementById("box1layer").innerHTML="";
if(layerlist[currentline]!=null){
for(i=0;i<layerlist[currentline].length;i++){
nextLayer(i,layerlist[currentline][i][0],layerlist[currentline][i][1],layerlist[currentline][i][2],layerlist[currentline][i][3]);
}
}

if(cursorlist[currentline]!=null){
document.getElementById(objid).style.cursor="url('"+imgdir+cursorlist[currentline]+"')";
}

if(img1){imgpan[0]=0;imgpan[1]=0;}else{imgpan[2]=0;imgpan[3]=0;}
normalizeScreen();
if(panlist[currentline]!=null){
if(panrun){
stoppan=true;
}
if(panlist[currentline]!="stop"){
preparePan(panlist[currentline][0],panlist[currentline][1]);
if(panlist[currentline][5]){
nextPan(panlist[currentline][0],panlist[currentline][1],panlist[currentline][2],panlist[currentline][3],panlist[currentline][4]);
}
}
}

if(shakelist[currentline]!=null){
if(shakelist[currentline][0]!=null){
if(shakelist[currentline][0]=="shake"){
if(shakelist[currentline][1]=="stop"){
stopshaking=true;
}else{
shakeScreen(shakelist[currentline][1],shakelist[currentline][2],shakelist[currentline][3],shakelist[currentline][4],shakelist[currentline][5]);
}
}
}
}
if(storyboxstylelist[currentline]!=null){
if(storyboxstylelist[currentline][0]!=null){
if(storyboxstylelist[currentline][0]=="storyboxstyle"){
storybox=storyboxstylelist[currentline][1];
document.getElementById("storyboxbg").style.left=storybox[0];
document.getElementById("storyboxbg").style.top=storybox[1];
document.getElementById("storyboxbg").style.width=storybox[2];
document.getElementById("storyboxbg").style.height=storybox[3];
document.getElementById("storybox").style.left=storybox[0];
document.getElementById("storybox").style.top=storybox[1];
document.getElementById("storybox").style.width=storybox[2];
document.getElementById("storybox").style.height=storybox[3];
document.getElementById("storyboxbg").style.borderRadius=storybox[4];
document.getElementById("storyboxbg").style.opacity=(storybox[5]/100);
document.getElementById("storyboxbg").style.background=storybox[6];
document.getElementById("storybox").style.color=storybox[7];
document.getElementById("storyboxbg").style.border=storybox[8];
}
}
if(storyboxstylelist[currentline]=="hidestorybox"){document.getElementById("storybox").style.visibility="hidden";document.getElementById("storyboxbg").style.visibility="hidden";}
if(storyboxstylelist[currentline]=="showstorybox"){document.getElementById("storybox").style.visibility="visible";document.getElementById("storyboxbg").style.visibility="visible";}
}
if(noteboxstylelist[currentline]!=null){
if(noteboxstylelist[currentline][0]!=null){
if(noteboxstylelist[currentline][0]=="noteboxstyle"){
notebox=noteboxstylelist[currentline][1];
document.getElementById("notebox").style.left=notebox[0];
document.getElementById("notebox").style.top=notebox[1];
document.getElementById("notebox").style.width=notebox[2];
document.getElementById("notebox").style.height=notebox[3];
document.getElementById("notebox").style.opacity=(notebox[4]/100);
document.getElementById("notebox").style.color=notebox[5];
}
}
}
if(particlelist[currentline]!=null){if(particlelist[currentline]=="stop"){document.getElementById("particlebox").innerHTML="";particlerun="";}else{if(particlelist[currentline][4]!=particlerun){document.getElementById("particlebox").innerHTML="";particlerun="";}}}
if(textalignlist[currentline]!=null){document.getElementById("storybox").style.textAlign=textalignlist[currentline];}
if(imglist[currentline]!=null){if(panrun&&panlist[currentline]==null){stoppan=true;};if(imglist[currentline][2]){document.getElementById("storybox").innerHTML="";};img1use=!img1use;nextImg(imglist[currentline][1],imglist[currentline][0]);}else{runAfterImage();}
if(bgmlist[currentline]!=null){
if(bgmlist[currentline]=="fade"){fadeBGM(bgmfade);}else if(bgmlist[currentline]=="stop"){stopBGM();}else{playBGM(bgmlist[currentline]);}
}
}

function replaceAll(instr,sstr,jstr){
var outstr=instr.split(sstr);
return outstr.join(jstr);
}

function getAllImages(){
var img = new Array();
for(i=0;i<imglist.length;i++){
if(imglist[i]!=null){
img[img.length]=imgdir+imglist[i][0];
}
}

for(i=0;i<layerlist.length;i++){
if(layerlist[i]!=null){
for(x=0;x<layerlist[i].length;x++){
var codedat=layerlist[i][x][2].split("|");
for(y=0;y<codedat.length;y++){
if(codedat[y].indexOf(".jpg")!=-1||codedat[y].indexOf(".jpeg")!=-1||codedat[y].indexOf(".gif")!=-1||codedat[y].indexOf(".png")!=-1){
img[img.length]=imgdir+codedat[y];
}
}
}
}
}

for(i=0;i<particlelist.length;i++){
if(particlelist[i]!=null){
if(particlelist[i][4]!=null){
img[img.length]=imgdir+particlelist[i][4];
}
}
}
return img;
}

function initGame(obj,bgm,sfx,preloadimg,preloadbgm,efx){
if(typeof loadImg!="function"){alert("Error! imgsys.js not found!");return;}
if(typeof playBGM!="function"&&bgm){alert("Error! sndsys.js not found!");return;}
objid=obj;
endfx=efx;
usebgm=bgm;
usesfx=sfx;
if(debug){
debugborder="border:1px solid #777777;";
storybox[8]="1px solid #777777";
}
document.getElementById(objid).style.position="absolute";
document.getElementById(objid).style.width = gamesize[0]+"px";
document.getElementById(objid).style.height = gamesize[1]+"px";
document.getElementById(objid).style.border = "1px solid #ffffff";
document.getElementById(objid).style.overflow="hidden";
document.getElementById(objid).style.cursor="default";
document.getElementById(objid).setAttribute("onclick","runEvent()");
document.body.setAttribute("onkeypress","runviaKey()");
var code="<table id=\"mainloader\" style=\"position:absolute;left:0px;top:0px;width:"+gamesize[0]+"px;height:"+gamesize[1]+"px;color:#ffffff;z-index:5;background:#333333;\"><tr><td align=\"center\" id=\"loader\"></td></tr></table>";
code+="<div width=\""+gamesize[0]+"\" height=\""+gamesize[1]+"\" id=\"box1\" style=\"position:absolute;left:"+imgoffset[0]+"px;top:"+imgoffset[1]+"px;z-index:2;opacity:0;\">";
code+="<img width=\""+gamesize[0]+"\" height=\""+gamesize[1]+"\" id=\"img1\" style=\"position:absolute;left:0px;top:0px;z-index:2;\"><div id=\"box1layer\" style=\"position:absolute;left:0px;top:0px;width:"+gamesize[0]+"px;height:"+gamesize[1]+"px;z-index:3;\"></div></div>";
code+="<div width=\""+gamesize[0]+"\" height=\""+gamesize[1]+"\" id=\"box2\" style=\"position:absolute;left:"+imgoffset[0]+"px;top:"+imgoffset[1]+"px;z-index:1;opacity:0;\">";
code+="<img width=\""+gamesize[0]+"\" height=\""+gamesize[1]+"\" id=\"img2\" style=\"position:absolute;left:0px;top:0px;z-index:1;\"><div id=\"box2layer\" style=\"position:absolute;left:0px;top:0px;width:"+gamesize[0]+"px;height:"+gamesize[1]+"px;z-index:3;\"></div></div>";
code+="<div id=\"particlebox\" style=\"position:absolute;left:0px;top:0px;width:"+gamesize[0]+"px;height:"+gamesize[1]+"px;z-index:4;overflow:hidden;"+debugborder+"\"></div>";
code+="<div id=\"decisionbox\" style=\"position:absolute;left:0px;top:0px;width:"+gamesize[0]+"px;height:"+gamesize[1]+"px;z-index:5;\"></div>";
code+="<div id=\"storyboxbg\" style=\"position:absolute;border-radius:"+storybox[4]+"px;left:"+storybox[0]+"px;top:"+storybox[1]+"px;width:"+storybox[2]+"px;height:"+storybox[3]+"px;opacity:"+(storybox[5]/100)+";background:"+storybox[6]+";border:"+storybox[8]+";z-index:6;\"></div>";
code+="<div id=\"storybox\" style=\"position:absolute;left:"+(storybox[0]+5)+"px;top:"+(storybox[1]+5)+"px;width:"+(storybox[2]-5)+"px;height:"+(storybox[3]-5)+"px;color:"+storybox[7]+";z-index:7;\"></div>";
code+="<div id=\"notebox\" style=\"position:absolute;left:"+notebox[0]+"px;top:"+notebox[1]+"px;width:"+notebox[2]+"px;height:"+notebox[3]+"px;opacity:"+(notebox[4]/100)+";font-size:small;color:"+notebox[5]+";z-index:8;"+debugborder+"\"></div>";
code+="<span id=\"customcode\" style=\"z-index:8;\"></span>";
document.getElementById(objid).innerHTML=code;
document.body.innerHTML+="<table width=\"100%\" style=\"color:#444444;font-size:smaller;\"><tr><td align=\"center\">VNWe2: Web-based visual novel engine.<br>Copyright &copy; 2006-2011 Senior Design Interactive. All Rights Reserved.<br>Use SchillMania Sound Manager 2</td></tr></table>";
setInterval("setCenter()",100);
if(usebgm>0||usesfx>0){
soundSetup(bgmdir,sfxdir,bgmstart,usebgm,usesfx);
}
var img = getAllImages();
img[img.length]=imgdir+ender[1];
img[img.length]=imgdir+"[.gif";
img[img.length]=imgdir+"].gif";
loadImg(img);
setInterval("checkProgress()",100);
}
