var sw=getResolution("width");
var sh=getResolution("height");
var objid="";
var autocenter=true;
var vnwidth=800;
var vnheight=600;
var resetdelay=500;
var enableskip=true;
var storybox=[[20,430],[760,150]];
var customcode="";
var imageSpeed=2;
var dec=[20,30,3];
var decnor=["#aaaaff","#000000","1px solid #0000ff"];
var dechov=["#ccccff","#000000","1px solid #ffffff"];
var imgdir="images/";
var bgmdir="bgm/";
var txtcustom=["#ffffff",3,false,false,false];
var boxmask=["#ffffff",30];

var vntext=getText();
var vntextstyle=getStyle();
var vntextalign=getAlign();
var vnimage=getImage();
var vnpan=getPan();
var vnbox=getBox();
var vnbgm=getBGM();
var vndecision=getDecision();
var vnanchor=getAnchor();

var ondec=0;
var ender=0;
var realline=0;
var currentchar=0;
var gameinit=false;
var textadding=false;
var stopadd=false;
var txtcolor=txtcustom[0];
var txtsize=txtcustom[1];
var txtbold=txtcustom[2];
var txtitalic=txtcustom[3];
var txtunderline=txtcustom[4];
var img=true;
var usebgm=false;
var ended=false;
var endfx="";
var running=false;
var pan=0;
var panmax=0;
var opa=0;
var posx=0;
var posy=0;
soundManager.url="swf/";
soundManager.useFlashBlock=false;
soundManager.debugMode=false;
var s=null;
var bgmplay="";

function playBGM(a){
if(bgmplay!=""&&bgmplay==a){return;}
if(bgmplay!=""){stopBGM();}
s=soundManager.createSound({id:'bgm',url:bgmdir+a,loops:9999999,autoLoad:true,onload:function(){s.play({onfinish:function(){s.play()}})}});
bgmplay=a;
}

function stopBGM(){
if(bgmplay!=""){
soundManager.stop('bgm');
s.destruct();
bgmplay="";
}
}

function disableselect(e){return false;}
function reEnable(){return true;}
document.onselectstart=new Function("return false");
if(window.sidebar){document.onmousedown=disableselect;document.onclick=reEnable;}
function clickIE(){if(document.all){return false;}}
function clickNS(e){if(document.layers||(document.getElementById&&!document.all)){if(e.which==2||e.which==3){return false;}}}
if(document.layers){document.captureEvents(Event.MOUSEDOWN);document.onmousedown=clickNS;}else{document.onmouseup=clickNS;document.oncontextmenu=clickIE;}
document.oncontextmenu=new Function("return false");

function getResolution(a){var b;
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
document.getElementById(objid).style.left=(sw/2)-(vnwidth/2);
document.getElementById(objid).style.top=(sh/2)-(vnheight/2);
}

function checkNone(a){
if(a!=""&&a!=null){return true;}
return false;
}

function preProcessing(){
setStyle();
if(checkNone(vntextalign[realline])){
document.getElementById(objid+"textstory").style.textAlign=vntextalign[realline];
}
}

function gotoEnd(line){
var a=0;
for(i=line+1;i<vnanchor.length;i++){
if(checkNone(vnanchor[i])&&vnanchor[i]=="end"){a=i;realline=a-1;ondec--;if(vntext[line-1][2]){playNext();};break;}
}
}

function decisionClick(a){
document.getElementById(objid+"decision").innerHTML="";
var b=0;
for(i=0;i<vnanchor.length;i++){
if(vnanchor[i]==a){b=i;break;}
}
vndecision[b-1]=null;
realline=b-1;
ondec++;
playNext();
}

function showDecision(){
var a="";
a+="<tr><td></td><td></td><td></td></tr>";
for(i=0;i<vndecision[realline+1].length;i++){
a+="<tr height=\""+dec[1]+"\"><td width=\""+dec[0]+"%\"></td><td style=\"background:"+decnor[0]+";color:"+decnor[1]+";border:"+decnor[2]+";\" align=\"center\" onMouseOver=\"this.style.background='"+dechov[0]+"';this.style.border='"+dechov[2]+"';this.style.color='"+dechov[1]+"';\" onMouseOut=\"this.style.background='"+decnor[0]+"';this.style.border='"+decnor[2]+"';this.style.color='"+decnor[1]+"';\" onClick=\"decisionClick('"+vndecision[realline+1][i][1]+"');\"><font size=\""+dec[2]+"\">"+vndecision[realline+1][i][0]+"</font></td><td width=\""+dec[0]+"%\"></td></tr>";
}
a+="<tr><td></td><td></td><td></td></tr>";
running=false;
document.getElementById(objid+"decision").innerHTML=a;
}

function checkPassive(){
if(checkNone(vnanchor[realline+1])&&ondec>0){running=false;gotoEnd(realline);return;}
if(vntext[realline-1][2]&&!checkNone(vndecision[realline-1])){running=false;playNext();return;}
}

function checkEnding(){
if(realline>=vntext.length){
ended=true;
setTimeout(endfx,0);
}
}

function addEnder(){
if(vntext[realline][2]!=true){
document.getElementById(objid+"textstory").innerHTML+="<font id=\"ender"+ender+"\"><img src=\""+imgdir+"ender.gif\"></font>";
}
ender++;
}

function addText(){
if(ended){return;}
running=true;
if(stopadd){stopadd=false;return;}
if(!textadding){preProcessing();}
textadding=true;
var a=vntext[realline][1].charAt(currentchar);
a=a.replace(/&/g,"&amp;");
a=a.replace(/ /g,"&nbsp;");
a=a.replace(/\"/g,"&quot;");
a=a.replace(/</g,"&lt;");
a=a.replace(/>/g,"&gt;");
a=a.replace(/\n/g,"<br>");
a=a.replace(/\[/g,"<img src=\""+imgdir+"[.gif\">&nbsp;");
a=a.replace(/\]/g,"&nbsp;<img src=\""+imgdir+"].gif\">");
a=a.replace(/{/g,"[");
a=a.replace(/}/g,"]");
a=a.fontcolor(txtcolor);
a=a.fontsize(txtsize);
if(txtitalic){a="<font style=\"font-style:italic;\">"+a+"</font>";}
if(txtbold){a="<font style=\"font-decoration:bold;\">"+a+"</font>";}
if(txtunderline){a="<font style=\"font-decoration:underline;\"><u>"+a+"</u></font>";}
if(ender!=0&&document.getElementById("ender"+(ender-1))!=null){document.getElementById("ender"+(ender-1)).innerHTML="";}
if(vntext[realline][1].charAt(currentchar)=="\t"){
document.getElementById(objid+"textstory").innerHTML="";
}else{
document.getElementById(objid+"textstory").innerHTML+=a;
}
currentchar++;
if(currentchar>=vntext[realline][1].length){if(checkNone(vndecision[realline+1])){showDecision();}currentchar=0;addEnder();realline++;textadding=false;checkPassive();running=false;return;}
setTimeout("addText()",vntext[realline][0]);
}

function startBGM(a){
if(a!="stop"&&usebgm){
playBGM(a);
}else{
stopBGM();
}
}

function setStyle(a){
if(ended){return;}
var b=realline;
if(checkNone(a)){b=a;}
if(checkNone(vnbgm[b])){
var c="startBGM(\""+vnbgm[b]+"\")";
setTimeout(c,1000);
vnbgm[b]=null;
}
if(checkNone(vnbox[b])){
document.getElementById(objid+"textstorybox").style.left=vnbox[b][0][0];
document.getElementById(objid+"textstorybox").style.top=vnbox[b][0][1];
document.getElementById(objid+"textstorybox").style.width=vnbox[b][1][0];
document.getElementById(objid+"textstorybox").style.height=vnbox[b][1][1];}
if(checkNone(vntextstyle[b])){
if(vntextstyle[b]!="reset"){
if(checkNone(vntextstyle[b][0])){txtcolor=vntextstyle[b][0];}else{txtcolor=txtcustom[0];}
if(checkNone(vntextstyle[b][1])){txtsize=vntextstyle[b][1];}else{txtsize=txtcustom[1];}
if(checkNone(vntextstyle[b][2])){
if(vntextstyle[b][2].toLowerCase().indexOf("italic")!=-1){txtitalic=true;}else{txtbold=txtcustom[2];}
if(vntextstyle[b][2].toLowerCase().indexOf("bold")!=-1){txtbold=true;}else{txtitalic=txtcustom[3];}
if(vntextstyle[b][2].toLowerCase().indexOf("underline")!=-1){txtunderline=true;}else{txtunderline=txtcustom[4];}
}
}else{
txtcolor=txtcustom[0];
txtsize=txtcustom[1];
txtbold=txtcustom[2];
txtitalic=txtcustom[3];
txtunderline=txtcustom[4];
}
}
}

function panImage(){
if(ended){return;}
setStyle();
if(!checkNone(vnpan[realline])){
if(vnimage[realline][4]==true){
vnimage[realline]=null;
if(!textadding){addText();return;}
}
vnimage[realline]=null;return;
}
panmax=Math.abs(parseInt(vnpan[realline][1])-parseInt(vnpan[realline][2]));
if(vnpan[realline][0]=="lr"){
if(img){
document.getElementById(objid+"img2").style.left=vnpan[realline][1]-pan;
document.getElementById(objid+"img2").style.top=vnpan[realline][3];
}else{
document.getElementById(objid+"img1").style.left=vnpan[realline][1]-pan;
document.getElementById(objid+"img1").style.top=vnpan[realline][3];
}
}
if(vnpan[realline][0]=="rl"){
if(img){
document.getElementById(objid+"img2").style.left=vnpan[realline][1]+pan;
document.getElementById(objid+"img2").style.top=vnpan[realline][3];
}else{
document.getElementById(objid+"img1").style.left=vnpan[realline][1]+pan;
document.getElementById(objid+"img1").style.top=vnpan[realline][3];
}
}
if(vnpan[realline][0]=="tb"){
if(img){
document.getElementById(objid+"img2").style.top=vnpan[realline][1]-pan;
document.getElementById(objid+"img2").style.left=vnpan[realline][3];
}else{
document.getElementById(objid+"img1").style.top=vnpan[realline][1]-pan;
document.getElementById(objid+"img1").style.left=vnpan[realline][3];
}
}
if(vnpan[realline][0]=="bt"){
if(img){
document.getElementById(objid+"img2").style.top=vnpan[realline][1]+pan;
document.getElementById(objid+"img2").style.left=vnpan[realline][3];
}else{
document.getElementById(objid+"img1").style.top=vnpan[realline][1]+pan;
document.getElementById(objid+"img1").style.left=vnpan[realline][3];
}
}
pan+=imageSpeed;
if(pan>panmax){
if(vnimage[realline][4]==true){
vnimage[realline]=null;
if(!textadding){addText();return;}
}
vnimage[realline]=null;
pan=0;
panmax=0;
return;
}
setTimeout("panImage()",vnpan[realline][4]);
}

function setImgPos(){if(ended){return}posx=0;posy=0;if(!checkNone(vnpan[realline])){return}if(vnpan[realline][0]=="lr"||vnpan[realline][0]=="rl"){posx=vnpan[realline][1];posy=vnpan[realline][3]}if(vnpan[realline][0]=="tb"||vnpan[realline][0]=="bt"){posx=vnpan[realline][3];posy=vnpan[realline][1]}if(img){document.getElementById(objid+"img1").style.left=posx;document.getElementById(objid+"img1").style.top=posy}else{document.getElementById(objid+"img2").style.left=posx;document.getElementById(objid+"img2").style.top=posy}}

function resetPos(a){document.getElementById(a).style.left=0;document.getElementById(a).style.top=0}

function fadeImage(){if(ended){return}running=true;if(!checkNone(vnimage[realline])){if(!textadding){addText();return};return}if(vnimage[realline][0]=="fade"){if(vnimage[realline][3]==true){document.getElementById(objid+"textstory").innerHTML=""}setImgPos();if(img){document.getElementById(objid+"img1").src=imgdir+vnimage[realline][1];document.getElementById(objid+"img1").style.opacity=(opa/100);document.getElementById(objid+"img1").style.zIndex="1";document.getElementById(objid+"img2").style.zIndex="0"}else{document.getElementById(objid+"img2").src=imgdir+vnimage[realline][1];document.getElementById(objid+"img2").style.opacity=(opa/100);document.getElementById(objid+"img1").style.zIndex="0";document.getElementById(objid+"img2").style.zIndex="1"}opa+=imageSpeed;if(opa>100){if(img){document.getElementById(objid+"img1").style.opacity=1;resetPos(objid+"img2")}else{document.getElementById(objid+"img2").style.opacity=1;resetPos(objid+"img1")}opa=0;img=!img;panImage();return}}if(vnimage[realline][0]=="flash"){if(vnimage[realline][2]==true){document.getElementById(objid+"textstory").innerHTML=""}setImgPos();if(img){document.getElementById(objid+"img1").style.opacity=1;document.getElementById(objid+"img2").style.opacity=0;document.getElementById(objid+"img1").style.zIndex="1";document.getElementById(objid+"img2").style.zIndex="0";document.getElementById(objid+"img1").src=imgdir+vnimage[realline][1]}else{document.getElementById(objid+"img1").style.opacity=0;document.getElementById(objid+"img2").style.opacity=1;document.getElementById(objid+"img1").style.zIndex="0";document.getElementById(objid+"img2").style.zIndex="1";document.getElementById(objid+"img2").src=imgdir+vnimage[realline][1]}img=!img;panImage();return}if(vnimage[realline][0]=="fade"){setTimeout("fadeImage()",vnimage[realline][2])}}

function playNext(){
checkEnding();
if(ended||running){return;}
if(checkNone(vndecision[realline])){return;}
setStyle();
fadeImage();
}

function createStoryBox(){
var a="";
a+="<div style=\"position:absolute;left:0px;top:0px;width:100%;height:100%;overflow:hidden;background:"+boxmask[0]+";opacity:"+(boxmask[1]/100)+";z-index:1;\" id=\""+objid+"storyboxbg\"></div>";
a+="<div style=\"position:absolute;left:0px;top:0px;width:100%;height:100%;overflow:hidden;color:#ffffff;z-index:2;\" id=\""+objid+"textstory\"></div>";
document.getElementById(objid+"textstorybox").innerHTML=a;
}

function createUI(){
var a="";
a+="<div style=\"position:absolute;left:-1px;top:-1px;width:1px;height:1px;overflow:hidden;visibility:hidden;\" id=\""+objid+"tmploader\"></div>";
a+="<img style=\"position:absolute;left:0px;top:0px;opacity:0;z-index:1;\" id=\""+objid+"img1\">";a+="<img style=\"position:absolute;left:0px;top:0px;opacity:0;z-index:0;\" id=\""+objid+"img2\">";
a+="<div style=\"position:absolute;left:"+storybox[0][0]+"px;top:"+storybox[0][1]+"px;width:"+storybox[1][0]+"px;height:"+storybox[1][1]+"px;overflow:hidden;color:#ffffff;z-index:2;\" id=\""+objid+"textstorybox\"></div>";
a+="<table style=\"position:absolute;left:0px;top:0px;width:"+vnwidth+"px;height:"+vnheight+"px;overflow:hidden;color:#ffffff;z-index:2;\" id=\""+objid+"decision\"></div>";
a+=customcode;
document.getElementById(objid).innerHTML=a;
addMouseClick(document.getElementById(objid));
createStoryBox();
}

function setSettings(){if(checkNone(getData("autocenter"))){autocenter=getData("autocenter")}if(checkNone(getData("size")[0])&&checkNone(getData("size")[1])){vnwidth=getData("size")[0];vnheight=getData("size")[1]}if(checkNone(getData("delay"))){resetdelay=getData("delay")}if(checkNone(getData("enableskip"))){enableskip=getData("enableskip")}if(checkNone(getData("storybox"))){storybox=getData("storybox")}if(checkNone(getData("imagespeed"))){imageSpeed=getData("imagespeed")}if(checkNone(getData("decision"))){dec=getData("decision")}if(checkNone(getData("decisionnor"))){decnor=getData("decisionnor")}if(checkNone(getData("decisionhov"))){dechov=getData("decisionhov")}if(checkNone(getData("imgdir"))){imgdir=getData("imgdir")}if(checkNone(getData("bgmdir"))){bgmdir=getData("bgmdir")}if(checkNone(getData("txtcustom"))){txtcustom=getData("txtcustom");txtcolor=txtcustom[0];txtsize=txtcustom[1];txtbold=txtcustom[2];txtitalic=txtcustom[3];txtunderline=txtcustom[4]}if(checkNone(getData("boxmask"))){boxmask=getData("boxmask")}if(checkNone(getData("customcode"))){customcode=getData("customcode")}}

function addMouseClick(el){
if (el.addEventListener) {
el.addEventListener("click",playNext,false);
} else if (el.attachEvent) {
el.attachEvent("onclick",playNext);
} else {
el.onclick=playNext;
}
}

function initGame(a,b,c){
endfx=c;
if(checkNone(b)){usebgm=b}
if(gameinit){return;}else{gameinit=true;setSettings();}
objid=a;
document.body.onkeypress=runviakey;
document.getElementById(objid).style.position="absolute";
document.getElementById(objid).style.width=vnwidth;
document.getElementById(objid).style.height=vnheight;
document.getElementById(objid).style.background="#000000";
document.getElementById(objid).style.border="1px solid #ffffff";
document.getElementById(objid).style.overflow="hidden";
document.body.innerHTML+="<table width=\"100%\" style=\"color:#000000;font-size:smaller;\"><tr><td align=\"center\">VNWe: Web-based visual novel system.<br>Copyright &copy; 2006-2011 Senior Design Interactive. All Rights Reserved.</td></tr></table>";
createUI();
setCenter();
if(autocenter){setInterval("setCenter()",resetdelay);}
playNext();
}

function runviakey(e){
var a=(window.event)?event.keyCode:e.which;
if(a==32){playNext();}}