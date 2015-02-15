var vnversion=1000;
var sw=getResolution("width");
var sh=getResolution("height");
var splitsign="%splitsign%";
var splitline="%splitline%";
var splitoption="%splitoption%";
var splitsection="%splitsection%";
var splitrow="%splitrow%";

var objid="";
var editorwidth=1000;
var editorheight=620;
var dialogshow=false;
var imgstylebox=true;
var grid=true;
var boxborder=1;
var totaldialog=0;
var currentdialog=0;

var dialogimg=new Array;
var dialogtxt=new Array;
var dialogtxtstyle=new Array;
var dialogtxtalign=new Array;
var dialogstoryboxstyle=new Array;
var dialogimgstyle=new Array;
var dialogbgm=new Array;
var dialoganchor=new Array;
var dialogdecision=new Array;

var respath=["images/","bgm/"];
var autocenter=true;
var resetdelay=500;
var imagespeed=2;
var enableskip=true;
var storybox=[20,430,760,150];
var storyboxstyle=["#ffffff",3,false,false,false];
var decisionbox=[20,30,3];
var decisionnor=["#aaaaff","#000000","#0000ff"];
var decisionhov=["#ccccff","#000000","#ffffff"];
var boxmask=["#ffffff",30];

soundManager.url="swf/";
soundManager.useFlashBlock=false;
soundManager.debugMode=false;
var s=null;
var bgmplay="";

function getVersion(){
return vnversion;
}

function playBGM(a){
if(!checkNone(a)){return}if(bgmplay!=""&&bgmplay==a){return}
if(bgmplay!=""){
stopBGM();
}
s=soundManager.createSound({id:'bgm',url:respath[1]+a,loops:9999999,autoLoad:true,onload:function(){s.play({onfinish:function(){s.play();}})}});
bgmplay=a;
}

function stopBGM(){
if(bgmplay!=""){
soundManager.stop('bgm');
s.destruct();
bgmplay="";
}
}

function clickIE(){if(document.all){return false;}}
function clickNS(e){if(document.layers||(document.getElementById&&!document.all)){if(e.which==2||e.which==3){return false;}}}
if(document.layers){
document.captureEvents(Event.MOUSEDOWN);document.onmousedown=clickNS;
}else{
document.onmouseup=clickNS;document.oncontextmenu=clickIE;
}
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
document.getElementById(objid).style.left=(sw/2)-(editorwidth/2);
document.getElementById(objid).style.top=(sh/2)-(editorheight/2);
}

function setVal(a,b){
if(a=="imgpath"){respath[0]=b;}
if(a=="bgmpath"){respath[0]=b;}
if(a=="autocenter"){autocenter=b;}
if(a=="resetdelay"){resetdelay=parseInt(b);}
if(a=="imgspeed"){imagespeed=parseInt(b);}
if(a=="enableskip"){enableskip=b;}
if(a=="storyposx"){storybox[0]=parseInt(b);}
if(a=="storyposy"){storybox[1]=parseInt(b);}
if(a=="storysizew"){storybox[2]=parseInt(b);}
if(a=="storysizeh"){storybox[3]=parseInt(b);}
if(a=="storycol"){storyboxstyle[0]=b;}
if(a=="storysize"){storyboxstyle[1]=parseInt(b);}
if(a=="storyb"){storyboxstyle[2]=b;}
if(a=="storyi"){storyboxstyle[3]=b;}
if(a=="storyu"){storyboxstyle[4]=b;}
if(a=="storybg"){boxmask[0]=b;}
if(a=="storyopa"){boxmask[1]=b;}
if(a=="decnorbg"){decisionnor[0]=b;}
if(a=="decnortxt"){decisionnor[1]=b;}
if(a=="decnorbr"){decisionnor[2]=b;}
if(a=="dechovbg"){decisionhov[0]=b;}
if(a=="dechovtxt"){decisionhov[1]=b;}
if(a=="dechovbr"){decisionhov[2]=b;}
if(a=="decsize"){decisionbox[2]=parseInt(b);}
if(a=="decoffset"){decisionbox[0]=parseInt(b);}
if(a=="dech"){decisionbox[1]=parseInt(b);}
}

function showDialog(a){
if(dialogshow){return;}
document.getElementById(objid+a).style.visibility="visible";
dialogshow=true;
}

function newDialog(){
if(dialogshow){return;}
currentdialog++;
totaldialog++;
dialogtxt[currentdialog-1]=[30,"\t",false];
dialogtxtalign[currentdialog-1]="left";
var a=dialogtxt[currentdialog-1][1];
var b="Add";
document.getElementById(objid+"txtclear").checked=false;
if(dialogtxt[currentdialog-1][1].charAt(0)=="\t"){b="Clear and Add";document.getElementById(objid+"txtclear").checked=true;a=a.substr(1);}
document.getElementById(objid+"txtstory").value=a;
var c=processText(a);
document.getElementById(objid+"infobg").innerHTML="Default";
document.getElementById(objid+"infospeed").innerHTML=dialogtxt[currentdialog-1][0];
document.getElementById(objid+"infoautoplay").innerHTML=dialogtxt[currentdialog-1][2].toString().toLowerCase();
document.getElementById(objid+"infomode").innerHTML=b;
document.getElementById(objid+"editortextstory").style.textAlign=dialogtxtalign[currentdialog-1];
document.getElementById(objid+"editortextstory").innerHTML=c;
document.getElementById(objid+"dialogtxt").innerHTML="Dialog "+currentdialog+"/"+totaldialog;
document.getElementById(objid+"txtalign").innerHTML=getTextAlign();
document.getElementById(objid+"txtspeed").value="30";
document.getElementById(objid+"txtclear").checked=true;
document.getElementById(objid+"txtautoplay").checked=false;
document.getElementById(objid+"txtstory").value="";
updateVN();
}

function checkNone(a){
if(a!=""&&a!=null){return true;}
return false;
}

function gotoPrev(){
if(dialogshow){return;}
if(currentdialog<=1){return;}
currentdialog--;
updateVN();
}

function gotoNext(){
if(dialogshow){return;}
if(currentdialog>=totaldialog){return;}
currentdialog++;
updateVN();
}

function miniText(a,b){
if(a.length<=b){
return a;
}else{
return a.substring(0,11)+"...";
}
}

function updateVN(){
document.getElementById(objid+"ui").style.visibility="hidden";
dialogshow=false;
document.getElementById(objid+"infobgmbtn").innerHTML="&lt;Play&gt;";
stopBGM();
document.getElementById(objid+"dialogtxt").innerHTML="Dialog "+currentdialog+"/"+totaldialog;
document.getElementById(objid+"uiimgpath").value=respath[0];
document.getElementById(objid+"uibgmpath").value=respath[1];
document.getElementById(objid+"uiautocenter").checked=autocenter;
document.getElementById(objid+"uiresetdelay").value=resetdelay;
document.getElementById(objid+"uiimgspeed").value=imagespeed;
document.getElementById(objid+"uienableskip").checked=enableskip;
document.getElementById(objid+"uistoryboxx").value=storybox[0];
document.getElementById(objid+"uistoryboxy").value=storybox[1];
document.getElementById(objid+"uistoryboxw").value=storybox[2];
document.getElementById(objid+"uistoryboxh").value=storybox[3];
document.getElementById(objid+"uistoryboxbg").value=boxmask[0];
document.getElementById(objid+"uistoryboxopa").value=boxmask[1];
document.getElementById(objid+"uidecnorbg").value=decisionnor[0];
document.getElementById(objid+"uidechovbg").value=decisionhov[0];
document.getElementById(objid+"uidecnorlab").value=decisionnor[1];
document.getElementById(objid+"uidechovlab").value=decisionhov[1];
document.getElementById(objid+"uidecnorborder").value=decisionnor[2];
document.getElementById(objid+"uidechovborder").value=decisionhov[2];
document.getElementById(objid+"uidecsize").value=decisionbox[2];
document.getElementById(objid+"uidecoffset").value=decisionbox[0];
document.getElementById(objid+"uidecheight").value=decisionbox[1];
document.getElementById(objid+"uistoryboxcol").value=storyboxstyle[0];
document.getElementById(objid+"uistoryboxsize").value=storyboxstyle[1];
document.getElementById(objid+"uistoryboxb").checked=storyboxstyle[2];
document.getElementById(objid+"uistoryboxi").checked=storyboxstyle[3];
document.getElementById(objid+"uistoryboxu").checked=storyboxstyle[4];
document.getElementById(objid+"storyboxstyledef").checked=!checkNone(dialogstoryboxstyle[currentdialog-1]);
document.getElementById(objid+"storyboxstylex").disabled=!checkNone(dialogstoryboxstyle[currentdialog-1]);
document.getElementById(objid+"storyboxstyley").disabled=!checkNone(dialogstoryboxstyle[currentdialog-1]);
document.getElementById(objid+"storyboxstylew").disabled=!checkNone(dialogstoryboxstyle[currentdialog-1]);
document.getElementById(objid+"storyboxstyleh").disabled=!checkNone(dialogstoryboxstyle[currentdialog-1]);
document.getElementById(objid+"editortextstorybg").style.background=boxmask[0];
document.getElementById(objid+"editortextstorybg").style.opacity=boxmask[1]/100;
if(checkNone(dialogstoryboxstyle[currentdialog-1])){
document.getElementById(objid+"editortextstorybox").style.left=dialogstoryboxstyle[currentdialog-1][0];
document.getElementById(objid+"editortextstorybox").style.top=dialogstoryboxstyle[currentdialog-1][1];
document.getElementById(objid+"editortextstorybox").style.width=dialogstoryboxstyle[currentdialog-1][2];
document.getElementById(objid+"editortextstorybox").style.height=dialogstoryboxstyle[currentdialog-1][3];
document.getElementById(objid+"storyboxstylex").value=dialogstoryboxstyle[currentdialog-1][0];
document.getElementById(objid+"storyboxstyley").value=dialogstoryboxstyle[currentdialog-1][1];
document.getElementById(objid+"storyboxstylew").value=dialogstoryboxstyle[currentdialog-1][2];
document.getElementById(objid+"storyboxstyleh").value=dialogstoryboxstyle[currentdialog-1][3];
}else{
document.getElementById(objid+"editortextstorybox").style.left=storybox[0];
document.getElementById(objid+"editortextstorybox").style.top=storybox[1];
document.getElementById(objid+"editortextstorybox").style.width=storybox[2];
document.getElementById(objid+"editortextstorybox").style.height=storybox[3];
document.getElementById(objid+"storyboxstylex").value=storybox[0];
document.getElementById(objid+"storyboxstyley").value=storybox[1];
document.getElementById(objid+"storyboxstylew").value=storybox[2];
document.getElementById(objid+"storyboxstyleh").value=storybox[3];
}
document.getElementById(objid+"imgtran").innerHTML=getImgTransition();
if(checkNone(dialogimg[currentdialog-1])){
document.getElementById(objid+"infobg").innerHTML=miniText(dialogimg[currentdialog-1][1],14);
document.getElementById(objid+"editorimg").src=respath[0]+dialogimg[currentdialog-1][1];
document.getElementById(objid+"imgprev").src=respath[0]+dialogimg[currentdialog-1][1];
document.getElementById(objid+"imgfile").value=dialogimg[currentdialog-1][1];
document.getElementById(objid+"imgspeed").value=dialogimg[currentdialog-1][2];
document.getElementById(objid+"imgclr").checked=dialogimg[currentdialog-1][3];
document.getElementById(objid+"imgpsv").checked=dialogimg[currentdialog-1][4];
}else{
document.getElementById(objid+"infobg").innerHTML="Default";
document.getElementById(objid+"imgprev").src=respath[0]+"spacing.gif";
document.getElementById(objid+"imgfile").value="";
document.getElementById(objid+"imgspeed").value="30";
document.getElementById(objid+"imgclr").checked=true;
document.getElementById(objid+"imgpsv").checked=true;
}
document.getElementById(objid+"decopt1").innerHTML=getAnchor(0);
document.getElementById(objid+"decopt2").innerHTML=getAnchor(1);
document.getElementById(objid+"decopt3").innerHTML=getAnchor(2);
document.getElementById(objid+"decopt4").innerHTML=getAnchor(3);
document.getElementById(objid+"decopt5").innerHTML=getAnchor(4);
if(checkNone(dialogdecision[currentdialog-1])){
if(checkNone(dialogdecision[currentdialog-1][0])){document.getElementById(objid+"declab1").value=dialogdecision[currentdialog-1][0][0];}
if(checkNone(dialogdecision[currentdialog-1][1])){document.getElementById(objid+"declab2").value=dialogdecision[currentdialog-1][1][0];}
if(checkNone(dialogdecision[currentdialog-1][2])){document.getElementById(objid+"declab3").value=dialogdecision[currentdialog-1][2][0];}
if(checkNone(dialogdecision[currentdialog-1][3])){document.getElementById(objid+"declab4").value=dialogdecision[currentdialog-1][3][0];}
if(checkNone(dialogdecision[currentdialog-1][4])){document.getElementById(objid+"declab5").value=dialogdecision[currentdialog-1][4][0];}
createDecision();
}else{
document.getElementById(objid+"declab1").value="";
document.getElementById(objid+"declab2").value="";
document.getElementById(objid+"declab3").value="";
document.getElementById(objid+"declab4").value="";
document.getElementById(objid+"declab5").value="";
document.getElementById(objid+"editordecision").innerHTML="";
}
if(checkNone(dialoganchor[currentdialog-1])){
if(dialoganchor[currentdialog-1].toLowerCase()=="end"){
document.getElementById(objid+"infoanchor").innerHTML="End";
}else{
document.getElementById(objid+"infoanchor").innerHTML=miniText(dialoganchor[currentdialog-1],14);
}
document.getElementById(objid+"anchorname").value=dialoganchor[currentdialog-1];
}else{
document.getElementById(objid+"infoanchor").innerHTML="Default";
document.getElementById(objid+"anchorname").value="";
}
if(checkNone(dialogbgm[currentdialog-1])){
if(dialogbgm[currentdialog-1].toLowerCase()=="stop"){
document.getElementById(objid+"bgmfile").value="stop";
document.getElementById(objid+"infobgm").innerHTML="Stop";
}else{
document.getElementById(objid+"bgmfile").value=dialogbgm[currentdialog-1];
document.getElementById(objid+"infobgm").innerHTML=dialogbgm[currentdialog-1];
}
}else{
document.getElementById(objid+"bgmfile").value="";
document.getElementById(objid+"infobgm").innerHTML="Default";
}
document.getElementById(objid+"imgstyledirection").innerHTML=getImgDirection();
if(checkNone(dialogimgstyle[currentdialog-1])){
document.getElementById(objid+"imgstylefirst").value=dialogimgstyle[currentdialog-1][1];
document.getElementById(objid+"imgstylelast").value=dialogimgstyle[currentdialog-1][2];
document.getElementById(objid+"imgstylefixed").value=dialogimgstyle[currentdialog-1][3];
document.getElementById(objid+"imgstylespeed").value=dialogimgstyle[currentdialog-1][4];
updateImg(dialogimgstyle[currentdialog-1][0],dialogimgstyle[currentdialog-1][1],dialogimgstyle[currentdialog-1][2],dialogimgstyle[currentdialog-1][3]);
}else{
document.getElementById(objid+"imgstylefirst").value="0";
document.getElementById(objid+"imgstylelast").value="0";
document.getElementById(objid+"imgstylefixed").value="0";
document.getElementById(objid+"imgstylespeed").value="30";
updateImg("lr",0,0,0);
}
document.getElementById(objid+"txtstyledef").checked=!checkNone(dialogtxtstyle[currentdialog-1]);
document.getElementById(objid+"txtstylecol").disabled=!checkNone(dialogtxtstyle[currentdialog-1]);
document.getElementById(objid+"txtstylesize").disabled=!checkNone(dialogtxtstyle[currentdialog-1]);
document.getElementById(objid+"txtstyleb").disabled=!checkNone(dialogtxtstyle[currentdialog-1]);
document.getElementById(objid+"txtstylei").disabled=!checkNone(dialogtxtstyle[currentdialog-1]);
document.getElementById(objid+"txtstyleu").disabled=!checkNone(dialogtxtstyle[currentdialog-1]);
if(checkNone(dialogtxtstyle[currentdialog-1])){
document.getElementById(objid+"txtstylecol").value=dialogtxtstyle[currentdialog-1][0];
document.getElementById(objid+"txtstylesize").value=dialogtxtstyle[currentdialog-1][1];
document.getElementById(objid+"txtstyleb").checked=dialogtxtstyle[currentdialog-1][2];
document.getElementById(objid+"txtstylei").checked=dialogtxtstyle[currentdialog-1][3];
document.getElementById(objid+"txtstyleu").checked=dialogtxtstyle[currentdialog-1][4];
}else{
document.getElementById(objid+"txtstylecol").value=storyboxstyle[0];
document.getElementById(objid+"txtstylesize").value=storyboxstyle[1];
document.getElementById(objid+"txtstyleb").checked=storyboxstyle[2];
document.getElementById(objid+"txtstylei").checked=storyboxstyle[3];
document.getElementById(objid+"txtstyleu").checked=storyboxstyle[4];
}
document.getElementById(objid+"txtalign").innerHTML=getTextAlign();
document.getElementById(objid+"txtspeed").value=dialogtxt[currentdialog-1][0];
document.getElementById(objid+"txtautoplay").checked=dialogtxt[currentdialog-1][2];
var a=dialogtxt[currentdialog-1][1];
var b="Add";
document.getElementById(objid+"txtclear").checked=false;
if(dialogtxt[currentdialog-1][1].charAt(0)=="\t"){b="Clear and Add";document.getElementById(objid+"txtclear").checked=true;a=a.substr(1);}
document.getElementById(objid+"txtstory").value=a;
var c=processText(a);
document.getElementById(objid+"infospeed").innerHTML=dialogtxt[currentdialog-1][0];
document.getElementById(objid+"infoautoplay").innerHTML=dialogtxt[currentdialog-1][2].toString().toLowerCase();
document.getElementById(objid+"infomode").innerHTML=b;
document.getElementById(objid+"editortextstory").style.textAlign=dialogtxtalign[currentdialog-1];
document.getElementById(objid+"editortextstory").innerHTML=c;
document.getElementById(objid+"editorcustom").innerHTML=document.getElementById(objid+"customsc").value;
}

function toggleImageStyleBox(){
if(imgstylebox){
document.getElementById(objid+"imgstyle").style.height="35px";
document.getElementById(objid+"imgstyle").style.opacity=0.5
}else{
document.getElementById(objid+"imgstyle").style.height="150px";
document.getElementById(objid+"imgstyle").style.opacity=1;
}
imgstylebox=!imgstylebox;
}

function getImgTransition(){
var a="";
if(!checkNone(dialogimg[currentdialog-1])||dialogimg[currentdialog-1][0]=="fade"){
a+="<option value=\"fade\" selected>Fade</option>";
}else{
a+="<option value=\"fade\">Fade</option>";
}
if(checkNone(dialogimg[currentdialog-1])&&dialogimg[currentdialog-1][0]=="flash"){
a+="<option value=\"flash\" selected>Flash</option>";
}else{
a+="<option value=\"flash\">Flash</option>";
}
return a;
}

function getTextAlign(){
var a="";
if(!checkNone(dialogtxtalign[currentdialog-1])||dialogtxtalign[currentdialog-1]=="left"){
a+="<option value=\"left\" selected>Left</option>";
}else{
a+="<option value=\"left\">Left</option>";
}
if(checkNone(dialogtxtalign[currentdialog-1])&&dialogtxtalign[currentdialog-1]=="center"){
a+="<option value=\"center\" selected>Center</option>";
}else{
a+="<option value=\"center\">Center</option>";
}
if(checkNone(dialogtxtalign[currentdialog-1])&&dialogtxtalign[currentdialog-1]=="right"){
a+="<option value=\"right\" selected>Right</option>";
}else{
a+="<option value=\"right\">Right</option>";
}
return a;
}

function getAnchor(a){
var b="";
if(!checkNone(dialogdecision[currentdialog-1])){
b+="<option value=\"\" selected>None</option>";
}else{
b+="<option value=\"\">None</option>";
}

for(i=0;i<dialoganchor.length;i++){
if(checkNone(dialoganchor[i])){
if(checkNone(dialogdecision[currentdialog-1])&&checkNone(dialogdecision[currentdialog-1][a])&&dialogdecision[currentdialog-1][a][1]==dialoganchor[i]){
b+="<option value=\""+dialoganchor[i]+"\" selected>"+dialoganchor[i]+"</option>";
}else{
b+="<option value=\""+dialoganchor[i]+"\">"+dialoganchor[i]+"</option>";
}
}
}
return b;
}

function getImgDirection(){
var a="";
if(!checkNone(dialogimgstyle[currentdialog-1])||dialogimgstyle[currentdialog-1][0]=="lr"){
a+="<option value=\"lr\" selected>Left-&gt;Right</option>";
}else{
a+="<option value=\"lr\">Left-&gt;Right</option>";
}
if(checkNone(dialogimgstyle[currentdialog-1])&&dialogimgstyle[currentdialog-1][0]=="rl"){
a+="<option value=\"rl\" selected>Right-&gt;Left</option>";
}else{
a+="<option value=\"rl\">Right-&gt;Left</option>";
}
if(checkNone(dialogimgstyle[currentdialog-1])&&dialogimgstyle[currentdialog-1][0]=="tb"){
a+="<option value=\"tb\" selected>Top-&gt;Bottom</option>";
}else{
a+="<option value=\"tb\">Top-&gt;Bottom</option>";
}
if(checkNone(dialogimgstyle[currentdialog-1])&&dialogimgstyle[currentdialog-1][0]=="bt"){
a+="<option value=\"bt\" selected>Bottom-&gt;Top</option>";
}else{
a+="<option value=\"bt\">Bottom-&gt;Top</option>";
}
return a;
}

function processText(a){
var b=a;
b=b.replace(/&/g,"&amp;");
b=b.replace(/ /g,"&nbsp;");
b=b.replace(/\"/g,"&quot;");
b=b.replace(/</g,"&lt;");
b=b.replace(/>/g,"&gt;");
b=b.replace(/\n/g,"<br>");
b=b.replace(/\r/g,"<br>");
b=b.replace(/\r\n/g,"<br>");
b=b.replace(/\[/g,"<img src=\""+respath[0]+"[.gif\">&nbsp;");
b=b.replace(/\]/g,"&nbsp;<img src=\""+respath[0]+"].gif\">");
b=b.replace(/{/g,"[");
b=b.replace(/}/g,"]");
var c=storyboxstyle[0];
var d=storyboxstyle[1];
var e=storyboxstyle[2];
var f=storyboxstyle[3];
var g=storyboxstyle[4];
if(checkNone(dialogtxtstyle[currentdialog-1])){
c=dialogtxtstyle[currentdialog-1][0];
d=dialogtxtstyle[currentdialog-1][1];
e=dialogtxtstyle[currentdialog-1][2];
f=dialogtxtstyle[currentdialog-1][3];
g=dialogtxtstyle[currentdialog-1][4];
}
b=b.fontcolor(c);
b=b.fontsize(d);
if(f){b="<font style=\"font-style:italic;\">"+b+"</font>";}
if(e){b="<strong>"+b+"</strong>";}
if(g){b="<font style=\"font-decoration:underline;\"><u>"+b+"</u></font>";}
return b;
}

function addImg(a,b,c,d,e){
document.getElementById(objid+"img").style.visibility="hidden";
dialogshow=false;
if(b!=""){
document.getElementById(objid+"infobg").innerHTML=miniText(b,14);
document.getElementById(objid+"editorimg").src=respath[0]+b;
dialogimg[currentdialog-1]=[a,b,c,d,e];
}else{
document.getElementById(objid+"infobg").innerHTML="Default";
document.getElementById(objid+"editorimg").src=respath[0]+"spacing.gif";
dialogimg[currentdialog-1]=null;
}
}

function addStoryText(a,b,c,d,e){
document.getElementById(objid+"txt").style.visibility="hidden";
dialogshow=false;
var f="";
var g="Add";
if(d){f="\t";g="Clear and Add";}
dialogtxt[currentdialog-1]=[a,f+b,c];
dialogtxtalign[currentdialog-1]=e;
var h=processText(b);
document.getElementById(objid+"infospeed").innerHTML=a;
document.getElementById(objid+"infoautoplay").innerHTML=c.toString().toLowerCase();
document.getElementById(objid+"infomode").innerHTML=g;
document.getElementById(objid+"editortextstory").style.textAlign=e;
document.getElementById(objid+"editortextstory").innerHTML=h;
}

function addTextStyle(a,c,d,b,i,u){
document.getElementById(objid+"txtstyle").style.visibility="hidden";
dialogshow=false;
if(a){
dialogtxtstyle[currentdialog-1]=null;
}else{
dialogtxtstyle[currentdialog-1]=[c,d,b,i,u];
}
updateVN();
}

function addStoryBoxStyle(a,x,y,w,h){
document.getElementById(objid+"storyboxstyle").style.visibility="hidden";
dialogshow=false;
if(a){
dialogstoryboxstyle[currentdialog-1]=null;
}else{
dialogstoryboxstyle[currentdialog-1]=[x,y,w,h];
}
updateVN();
}

function addAnchor(a){
document.getElementById(objid+"anchor").style.visibility="hidden";
dialogshow=false;
if(!checkNone(a)){
dialoganchor[currentdialog-1]=null;
}else{
dialoganchor[currentdialog-1]=a;
}
updateVN();
}

function addDecision(a,b,c,d,e){
if(checkNone(a[0])&&!checkNone(a[1])){alert("Option 1 Anchor must not be none.");return;}
if(checkNone(b[0])&&!checkNone(b[1])){alert("Option 2 Anchor must not be none.");return;}
if(checkNone(c[0])&&!checkNone(c[1])){alert("Option 3 Anchor must not be none.");return;}
if(checkNone(d[0])&&!checkNone(d[1])){alert("Option 4 Anchor must not be none.");return;}
if(checkNone(e[0])&&!checkNone(e[1])){alert("Option 5 Anchor must not be none.");return;}
document.getElementById(objid+"decision").style.visibility="hidden";
dialogshow=false;
if(!checkNone(a[0])&&checkNone(a[1])){a[0]=a[1];}
if(!checkNone(b[0])&&checkNone(b[1])){b[0]=b[1];}
if(!checkNone(c[0])&&checkNone(c[1])){c[0]=c[1];}
if(!checkNone(d[0])&&checkNone(d[1])){d[0]=d[1];}
if(!checkNone(e[0])&&checkNone(e[1])){e[0]=e[1];}

if(checkNone(a)||checkNone(b)||checkNone(c)||checkNone(d)||checkNone(e)){dialogdecision[currentdialog-1]=[a,b,c,d,e];}
updateVN();
}

function addImageStyle(a,b,c,d,e){
document.getElementById(objid+"imgstyle").style.visibility="hidden";
dialogshow=false;
if(checkNone(dialogimg[currentdialog-1])){
if(b==0&&c==0&&d==0){
updateImg(a,b,c,d);
}else{
dialogimgstyle[currentdialog-1]=[a,b,c,d,e];
}
updateImg(a,b,c,d);
}else{
alert("No BG Image to set panning effect.");
}
updateVN();
}

function updateImg(a,b,c,d){
if(!checkNone(dialogimg[currentdialog-1])){return;}
if(a=="lr"||a=="rl"){document.getElementById(objid+"editorimg").style.left=c;document.getElementById(objid+"editorimg").style.top=d;}
if(a=="tb"||a=="bt"){document.getElementById(objid+"editorimg").style.left=d;document.getElementById(objid+"editorimg").style.top=c;}
}

function moveImg(a,b,c){
if(a=="lr"||a=="rl"){document.getElementById(objid+"editorimg").style.left=b;document.getElementById(objid+"editorimg").style.top=c;}
if(a=="bt"||a=="tb"){document.getElementById(objid+"editorimg").style.top=b;document.getElementById(objid+"editorimg").style.left=c;}
}

function checkNum(a){
if(a.value==""){a.value="0";}
if(isNaN(parseInt(a.value))){
a.value="0";
}else{
a.value=parseInt(a.value);
}
}

function toggleinBGM(a){
if(!checkNone(a)){return;}
if(a.toLowerCase()=="stop"){return;}
if(bgmplay!=""){
document.getElementById(objid+"bgmbtn").innerHTML="&lt;Play&gt;";
stopBGM();
}else{
document.getElementById(objid+"bgmbtn").innerHTML="&lt;Stop&gt;";
playBGM(a);
}
}

function toggleBGM(){
if(!checkNone(dialogbgm[currentdialog-1])){return;}
if(dialogbgm[currentdialog-1].toLowerCase()=="stop"){return;}
if(bgmplay!=""){
document.getElementById(objid+"infobgmbtn").innerHTML="&lt;Play&gt;";
stopBGM();
}else{
document.getElementById(objid+"infobgmbtn").innerHTML="&lt;Stop&gt;";
playBGM(dialogbgm[currentdialog-1]);
}
}

function addBGM(a){
document.getElementById(objid+"bgmbtn").innerHTML="&lt;Play&gt;";
stopBGM();
document.getElementById(objid+"bgm").style.visibility="hidden";
dialogshow=false;
if(!checkNone(a)){
dialogbgm[currentdialog-1]=null;
}else{
dialogbgm[currentdialog-1]=a;
}
updateVN();
}

function processPath(a){
var b=a;
b=b.replace(/\\/g,"");
b=b.replace(/\//g,"");
b=b.replace(/ /g,"");
b=b.replace(/:/g,"");
return b;
}

function processData(a){
var b=a;
b=b.replace(/\\/g,"\\\\");
b=b.replace(/\t/g,"\\t");
b=b.replace(/\n/g,"\\n");
b=b.replace(/\r/g,"\\r");
b=b.replace(/\r\n/g,"\\r\\n");
b=b.replace(/\"/g,"\\\"");
return b;
}

function startCompile(a,b,c){
document.getElementById(objid+"compile").style.visibility="hidden";
dialogshow=false;
if(a==""){a="Untitled";}
if(b==""){b="UI";}
if(c){
var d="var img=new Array;var pan=new Array;var bgm=new Array;var text=new Array;var txtstyle=new Array;var txtalign=new Array;var box=new Array;var anchor=new Array;var decision=new Array;function getText(){return text;}function getStyle(){return txtstyle;}function getAlign(){return txtalign;}function getBox(){return box;}function getImage(){return img;}function getPan(){return pan;}function getBGM(){return bgm;}function getAnchor(){return anchor;}function getDecision(){return decision;}";

for(i=0;i<dialogtxt.length;i++){
if(checkNone(dialoganchor[i])){
d+="anchor["+i+"]=\""+dialoganchor[i]+"\";"
}

if(checkNone(dialogstoryboxstyle[i])){
d+="box["+i+"]=["+dialogstoryboxstyle[i][0]+","+dialogstoryboxstyle[i][1]+","+dialogstoryboxstyle[i][2]+","+dialogstoryboxstyle[i][3]+"];"
}

if(checkNone(dialogbgm[i])){
d+="bgm["+i+"]=\""+processData(dialogbgm[i])+"\";"
}

if(checkNone(dialogimg[i])){
d+="img["+i+"]=[\""+dialogimg[i][0]+"\",\""+processData(dialogimg[i][1])+"\","+dialogimg[i][2]+","+dialogimg[i][3].toString().toLowerCase()+","+dialogimg[i][4].toString().toLowerCase()+"];"
}

if(checkNone(dialogimgstyle[i])){
d+="pan["+i+"]=[\""+dialogimgstyle[i][0]+"\","+dialogimgstyle[i][1]+","+dialogimgstyle[i][2]+","+dialogimgstyle[i][3]+","+dialogimgstyle[i][4]+"];"
}

if(checkNone(dialogtxtstyle[i])){
var e="";
if(dialogtxtstyle[i][2]){e+="bold";}
if(dialogtxtstyle[i][3]){e+="italic";}
if(dialogtxtstyle[i][4]){e+="underline";}
d+="txtstyle["+i+"]=[\""+dialogtxtstyle[i][0]+"\","+dialogtxtstyle[i][1]+",\""+e+"\"];"
}

if(checkNone(dialogtxtalign[i])){
d+="txtalign["+i+"]=\""+dialogtxtalign[i]+"\";"
}

d+="text["+i+"]=["+dialogtxt[i][0]+",\""+processData(dialogtxt[i][1])+"\","+dialogtxt[i][2].toString().toLowerCase()+"];";

if(checkNone(dialogdecision[i])){
var f="";
for(c=0;c<dialogdecision[i].length;c++){
if(checkNone(dialogdecision[i][c][1])){
if(f!=""){f+=",";}
f+="[\""+dialogdecision[i][c][0]+"\",\""+dialogdecision[i][c][1]+"\"]";
}
}
d+="decision["+(i+1)+"]=["+f+"];";
}
}
document.getElementById(objid+"scriptfile").value=a;
document.getElementById(objid+"scriptdata").value=d;
document.getElementById(objid+"uiscriptfile").value=b;
document.getElementById(objid+"uiscriptdata").value=getUI();
document.getElementById(objid+"compileform").submit();
}
document.getElementById(objid+"scriptfilename").value=a;
}

function saveScript(a,b,d){
document.getElementById(objid+"save").style.visibility="hidden";
dialogshow=false;
if(b==""){b="UntitledVN";}
if(d){
var e="";
e+=grid.toString().toLowerCase()+splitsign+boxborder+splitsign+totaldialog+splitline;
e+=respath[0]+splitsign+respath[1]+splitline;
e+=autocenter.toString().toLowerCase()+splitsign+resetdelay+splitsign+imagespeed+splitsign+enableskip.toString().toLowerCase()+splitline;
e+=storybox[0]+splitsign+storybox[1]+splitsign+storybox[2]+splitsign+storybox[3]+splitline;
e+=storyboxstyle[0]+splitsign+storyboxstyle[1]+splitsign+storyboxstyle[2].toString().toLowerCase()+splitsign+storyboxstyle[3].toString().toLowerCase()+splitsign+storyboxstyle[4].toString().toLowerCase()+splitline;
e+=decisionbox[0]+splitsign+decisionbox[1]+splitsign+decisionbox[2]+splitline;
e+=decisionnor[0]+splitsign+decisionnor[1]+splitsign+decisionnor[2]+splitline;
e+=decisionhov[0]+splitsign+decisionhov[1]+splitsign+decisionhov[2]+splitline;
e+=boxmask[0]+splitsign+boxmask[1]+splitline;
var f="";
for(i=0;i<dialogimg.length;i++){
if(checkNone(dialogimg[i])){
if(f!=""){f+=splitsection;}
f+=i+splitsign+dialogimg[i][0]+splitsign+dialogimg[i][1]+splitsign+dialogimg[i][2]+splitsign+dialogimg[i][3].toString().toLowerCase()+splitsign+dialogimg[i][4].toString().toLowerCase();
}
}
e+=f+splitline;

f="";
for(i=0;i<dialogtxt.length;i++){
if(f!=""){f+=splitsection;}
f+=i+splitsign+dialogtxt[i][0]+splitsign+dialogtxt[i][1]+splitsign+dialogtxt[i][2].toString().toLowerCase();
}
e+=f+splitline;

f="";
for(i=0;i<dialogtxtstyle.length;i++){
if(checkNone(dialogtxtstyle[i])){
if(f!=""){f+=splitsection;}
f+=i+splitsign+dialogtxtstyle[i][0]+splitsign+dialogtxtstyle[i][1]+splitsign+dialogtxtstyle[i][2].toString().toLowerCase()+splitsign+dialogtxtstyle[i][3].toString().toLowerCase()+splitsign+dialogtxtstyle[i][4].toString().toLowerCase();
}
}
e+=f+splitline;

f="";
for(i=0;i<dialogtxtalign.length;i++){
if(checkNone(dialogtxtalign[i])){
if(f!=""){f+=splitsection;}
f+=i+splitsign+dialogtxtalign[i];
}
}
e+=f+splitline;

f="";
for(i=0;i<dialogstoryboxstyle.length;i++){
if(checkNone(dialogstoryboxstyle[i])){
if(f!=""){f+=splitsection;}
f+=i+splitsign+dialogstoryboxstyle[i][0]+splitsign+dialogstoryboxstyle[i][1]+splitsign+dialogstoryboxstyle[i][2]+splitsign+dialogstoryboxstyle[i][3];
}
}
e+=f+splitline;

f="";
for(i=0;i<dialogimgstyle.length;i++){
if(checkNone(dialogimgstyle[i])){
if(f!=""){f+=splitsection;}
f+=i+splitsign+dialogimgstyle[i][0]+splitsign+dialogimgstyle[i][1]+splitsign+dialogimgstyle[i][2]+splitsign+dialogimgstyle[i][3]+splitsign+dialogimgstyle[i][4];
}
}
e+=f+splitline;

f="";
for(i=0;i<dialogbgm.length;i++){
if(checkNone(dialogbgm[i])){if(f!=""){f+=splitsection;}
f+=i+splitsign+dialogbgm[i]
}
}
e+=f+splitline;

f="";
for(i=0;i<dialoganchor.length;i++){
if(checkNone(dialoganchor[i])){if(f!=""){f+=splitsection;}
f+=i+splitsign+dialoganchor[i];
}
}
e+=f+splitline;

f="";
for(i=0;i<dialogdecision.length;i++){
if(checkNone(dialogdecision[i])){
var g="";
for(c=0;c<dialogdecision[i].length;c++){
if(checkNone(dialogdecision[i][c][1])){if(g!=""){g+=splitoption;}
g+=dialogdecision[i][c][0]+splitsign+dialogdecision[i][c][1];
}
}
if(f!=""){f+=splitrow;}
f+=i+splitsection+g;
}
}
e+=f;document.getElementById(objid+"scvid").value=a;
document.getElementById(objid+"scfile").value=b;
document.getElementById(objid+"scdata").value=processData(e);
document.getElementById(objid+"saveform").submit();
}
document.getElementById(objid+"savefilename").value=b;
}

function openScript(a,b){if(b==""){b="UntitledVN"}document.getElementById(objid+"loadfilename").value=b;document.getElementById(objid+"loadscvid").value=a;document.getElementById(objid+"loadscfile").value=b;document.getElementById(objid+"loadform").submit()}

function isBool(a){if(a.toLowerCase()=="true"){return true}return false}

function loadScript(a,b){document.getElementById(objid+"load").style.visibility="hidden";dialogshow=false;if(b){var c=a.split(splitline);var d=new Array;if(c.length!=18){alert("Invalid vn scripts code.");return}d=c[0].split(splitsign);grid=!isBool(d[0]);boxborder=parseInt(d[1])-1;totaldialog=parseInt(d[2]);currentdialog=1;toggleBoxBorder();toggleGrid();d=c[1].split(splitsign);respath[0]=d[0];respath[1]=d[1];d=c[2].split(splitsign);autocenter=isBool(d[0]);resetdelay=parseInt(d[1]);imagespeed=parseInt(d[2]);enableskip=isBool(d[3]);d=c[3].split(splitsign);storybox[0]=parseInt(d[0]);storybox[1]=parseInt(d[1]);storybox[2]=parseInt(d[2]);storybox[3]=parseInt(d[3]);d=c[4].split(splitsign);storyboxstyle[0]=d[0];storyboxstyle[1]=parseInt(d[1]);storyboxstyle[2]=isBool(d[2]);storyboxstyle[3]=isBool(d[3]);storyboxstyle[4]=isBool(d[4]);d=c[5].split(splitsign);decisionbox[0]=parseInt(d[0]);decisionbox[1]=parseInt(d[1]);decisionbox[2]=parseInt(d[2]);d=c[6].split(splitsign);decisionnor[0]=d[0];decisionnor[1]=d[1];decisionnor[2]=d[2];d=c[7].split(splitsign);decisionhov[0]=d[0];decisionhov[1]=d[1];decisionhov[2]=d[2];d=c[8].split(splitsign);boxmask[0]=d[0];boxmask[1]=parseInt(d[1]);d=c[9].split(splitsection);for(i=0;i<d.length;i++){var e=d[i].split(splitsign);if(checkNone(e)){dialogimg[e[0]]=[e[1],e[2],parseInt(e[3]),isBool(e[4]),isBool(e[5])]}}d=c[10].split(splitsection);for(i=0;i<d.length;i++){var e=d[i].split(splitsign);dialogtxt[e[0]]=[parseInt(e[1]),e[2],isBool(e[3])]}d=c[11].split(splitsection);for(i=0;i<d.length;i++){var e=d[i].split(splitsign);if(checkNone(e)){dialogtxtstyle[e[0]]=[e[1],parseInt(e[2]),isBool(e[3]),isBool(e[4]),isBool(e[5])]}}d=c[12].split(splitsection);for(i=0;i<d.length;i++){var e=d[i].split(splitsign);if(checkNone(e)){dialogtxtalign[e[0]]=e[1]}}d=c[13].split(splitsection);for(i=0;i<d.length;i++){var e=d[i].split(splitsign);if(checkNone(e)){dialogstoryboxstyle[e[0]]=[parseInt(e[1]),parseInt(e[2]),parseInt(e[3]),parseInt(e[4])]}}d=c[14].split(splitsection);for(i=0;i<d.length;i++){var e=d[i].split(splitsign);if(checkNone(e)){dialogimgstyle[e[0]]=[e[1],parseInt(e[2]),parseInt(e[3]),parseInt(e[4]),parseInt(e[5])]}}d=c[15].split(splitsection);for(i=0;i<d.length;i++){var e=d[i].split(splitsign);if(checkNone(e)){dialogbgm[e[0]]=e[1]}}d=c[16].split(splitsection);for(i=0;i<d.length;i++){var e=d[i].split(splitsign);if(checkNone(e)){dialoganchor[e[0]]=e[1]}}d=c[17].split(splitrow);for(i=0;i<d.length;i++){var e=d[i].split(splitsection);if(checkNone(e)){var f=e[1].split(splitoption);dialogdecision[e[0]]=new Array;for(r=0;r<f.length;r++){dialogdecision[e[0]][r]=f[r].split(splitsign)}}}updateVN();}}

function saveSource(a){
document.getElementById(objid+"customcode").style.visibility="hidden";
dialogshow=false;
updateVN();
}

function createDecision(){
var a="<tr><td></td><td></td><td></td></tr>";
for(i=0;i<dialogdecision[currentdialog-1].length;i++){
if(checkNone(dialogdecision[currentdialog-1][i][1])){
a+="<tr height=\""+decisionbox[1]+"\"><td width=\""+decisionbox[0]+"%\"></td><td style=\"background:"+decisionnor[0]+";color:"+decisionnor[1]+";border:1px solid "+decisionnor[2]+";\" align=\"center\" onMouseOver=\"this.style.background='"+decisionhov[0]+"';this.style.border='1px solid "+decisionhov[2]+"';this.style.color='"+decisionhov[1]+"';\" onMouseOut=\"this.style.background='"+decisionnor[0]+"';this.style.border='1px solid "+decisionnor[2]+"';this.style.color='"+decisionnor[1]+"';\"><font size=\""+decisionbox[2]+"\">"+dialogdecision[currentdialog-1][i][0]+"</font></td><td width=\""+decisionbox[0]+"%\"></td></tr>";
}
}
a+="<tr><td></td><td></td><td></td></tr>";
running=false;
document.getElementById(objid+"editordecision").innerHTML=a;
}

function createPanel(){
var a="";
var b="";
var c="";
var d="";
a="<table width=\"100%\" height=\"100%\" style=\"color:#ffffff;font-size:smaller;\" cellspacing=\"1\" cellpadding=\"0\">";
a+="<tr><td align=\"center\" colspan=\"2\">VN UI Style</td></tr>";
a+="<tr><td>Image Path:</td><td><input type=\"textbox\" id=\""+objid+"uiimgpath\" value=\""+respath[0]+"\" onKeyUp=\"setVal('imgpath',this.value);\"></td></tr>";
a+="<tr><td>BGM Path:</td><td><input type=\"textbox\" id=\""+objid+"uibgmpath\" value=\""+respath[1]+"\" onKeyUp=\"setVal('bgmpath',this.value);\"></td></tr>";
if(autocenter){b=" checked";}else{b="";}
a+="<tr><td>AutoCenter:</td><td><input type=\"checkbox\" id=\""+objid+"uiautocenter\" onChange=\"setVal('autocenter',this.checked);\""+b+"></td></tr>";
a+="<tr><td>Reset Delay:</td><td><input type=\"textbox\" id=\""+objid+"uiresetdelay\" value=\""+resetdelay+"\" size=\"5\" onBlur=\"checkNum(this);setVal('resetdelay',this.value);\"></td></tr>";
a+="<tr><td>Image Speed:</td><td><input type=\"textbox\" id=\""+objid+"uiimgspeed\" value=\""+imagespeed+"\" size=\"3\" onBlur=\"checkNum(this);setVal('imgspeed',this.value);\"></td></tr>";
if(enableskip){b=" checked";}else{b="";}
a+="<tr><td>Enable Skip:</td><td><input type=\"checkbox\" id=\""+objid+"uienableskip\" onChange=\"setVal('enableskip',this.checked);\""+b+"></td></tr>";
a+="<tr><td>Story Box Position:</td><td>X:<input type=\"textbox\" id=\""+objid+"uistoryboxx\" value=\""+storybox[0]+"\" size=\"3\" onBlur=\"checkNum(this);setVal('storyposx',this.value);\">&nbsp;Y:<input type=\"textbox\" id=\""+objid+"uistoryboxy\" value=\""+storybox[1]+"\" size=\"3\" onBlur=\"checkNum(this);setVal('storyposy',this.value);\"></td></tr>";
a+="<tr><td>Story Box Size:</td><td>W:<input type=\"textbox\" id=\""+objid+"uistoryboxw\" value=\""+storybox[2]+"\" size=\"3\" onBlur=\"checkNum(this);setVal('storysizew',this.value);\">&nbsp;H:<input type=\"textbox\" id=\""+objid+"uistoryboxh\" value=\""+storybox[3]+"\" size=\"3\" onBlur=\"checkNum(this);setVal('storysizeh',this.value);\"></td></tr>";
a+="<tr><td>Story Box BG Color:</td><td><input type=\"textbox\" id=\""+objid+"uistoryboxbg\" value=\""+boxmask[0]+"\" size=\"6\" onKeyUp=\"setVal('storybg',this.value);\"></td></tr>";
a+="<tr><td>Story Box BG Opacity:</td><td><input type=\"textbox\" id=\""+objid+"uistoryboxopa\" value=\""+boxmask[1]+"\" size=\"3\" onBlur=\"checkNum(this);setVal('storyopa',this.value);\">%</td></tr>";
a+="<tr><td>Decision Box BG Color:</td><td>Normal:<input type=\"textbox\" id=\""+objid+"uidecnorbg\" value=\""+decisionnor[0]+"\" size=\"6\" onKeyUp=\"setVal('decnorbg',this.value);\">&nbsp;Hover:<input type=\"textbox\" id=\""+objid+"uidechovbg\" value=\""+decisionhov[0]+"\" size=\"6\" onKeyUp=\"setVal('dechovbg',this.value);\"></td></tr>";
a+="<tr><td>Decision Box Label Color:</td><td>Normal:<input type=\"textbox\" id=\""+objid+"uidecnorlab\" value=\""+decisionnor[1]+"\" size=\"6\" onKeyUp=\"setVal('decnortxt',this.value);\">&nbsp;Hover:<input type=\"textbox\" id=\""+objid+"uidechovlab\" value=\""+decisionhov[1]+"\" size=\"6\" onKeyUp=\"setVal('dechovtxt',this.value);\"></td></tr>";
a+="<tr><td>Decision Box Border Color:</td><td>Normal:<input type=\"textbox\" id=\""+objid+"uidecnorborder\" value=\""+decisionnor[2]+"\" size=\"6\" onKeyUp=\"setVal('decnorbr',this.value);\">&nbsp;Hover:<input type=\"textbox\" id=\""+objid+"uidechovborder\" value=\""+decisionhov[2]+"\" size=\"6\" onKeyUp=\"setVal('dechovbr',this.value);\"></td></tr>";
a+="<tr><td>Decision Box Font Size:</td><td><input type=\"textbox\" id=\""+objid+"uidecsize\" value=\""+decisionbox[2]+"\" size=\"2\" onBlur=\"checkNum(this);setVal('decsize',this.value);\"></td></tr>";
a+="<tr><td>Decision Box Offset:</td><td><input type=\"textbox\" id=\""+objid+"uidecoffset\" value=\""+decisionbox[0]+"\" size=\"3\" onBlur=\"checkNum(this);setVal('decoffset',this.value);\"></td></tr>";
a+="<tr><td>Decision Box Height:</td><td><input type=\"textbox\" id=\""+objid+"uidecheight\" value=\""+decisionbox[1]+"\" size=\"3\" onBlur=\"checkNum(this);setVal('dech',this.value);\"></td></tr>";
a+="<tr><td>Story Text Color:</td><td><input type=\"textbox\" id=\""+objid+"uistoryboxcol\" value=\""+storyboxstyle[0]+"\" size=\"6\" onKeyUp=\"setVal('storycol',this.value);\"></td></tr>";
a+="<tr><td>Story Text Size:</td><td><input type=\"textbox\" id=\""+objid+"uistoryboxsize\" value=\""+storyboxstyle[1]+"\" size=\"3\" onBlur=\"checkNum(this);setVal('storysize',this.value);\"></td></tr>";
if(storyboxstyle[2]){b=" checked";}else{b="";}
if(storyboxstyle[3]){c=" checked";}else{c="";}
if(storyboxstyle[4]){d=" checked";}else{d="";}
a+="<tr><td>Story Text Style:</td><td><label>Bold:<input type=\"checkbox\" id=\""+objid+"uistoryboxb\" onChange=\"setVal('storyb',this.checked);\""+b+"></label>&nbsp;<label>Italic:<input type=\"checkbox\" id=\""+objid+"uistoryboxi\" onChange=\"setVal('storyi',this.checked);\""+c+"></label>&nbsp;<label>Underline:<input type=\"checkbox\" id=\""+objid+"uistoryboxu\" onChange=\"setVal('storyu',this.checked);\""+d+"></label></td></tr>";
a+="<tr><td colspan=\"2\" align=\"center\" style=\"background:#444444;height:20px;\" onMouseOver=\"this.style.background='#448844';\" onMouseOut=\"this.style.background='#444444';\" onClick=\"updateVN();\">&lt;OK&gt;</td></tr>";
a+="</table>";
document.getElementById(objid+"ui").innerHTML=a;

a="<table width=\"100%\" height=\"100%\" style=\"color:#ffffff;font-size:smaller;\" cellspacing=\"1\" cellpadding=\"0\">";
a+="<tr><td align=\"center\" colspan=\"2\">BG Image</td></tr>";
a+="<tr><td>Transition:</td><td><select id=\""+objid+"imgtran\">"+getImgTransition()+"</select></td></tr>";
a+="<tr><td>Image File Name:</td><td><input type=\"textbox\" id=\""+objid+"imgfile\" onBlur=\"if(this.value!=''){document.getElementById('"+objid+"imgprev').src='"+respath[0]+"'+this.value;}else{document.getElementById('"+objid+"imgprev').src='"+respath[0]+"spacing.gif';}\"></td></tr>";
a+="<tr><td>Clear All Text:</td><td><input type=\"checkbox\" id=\""+objid+"imgclr\" checked></td></tr>";
a+="<tr><td>AutoPlay:</td><td><input type=\"checkbox\" id=\""+objid+"imgpsv\" checked></td></tr>";
a+="<tr><td>Show Speed:</td><td><input type=\"textbox\" value=\"40\" id=\""+objid+"imgspeed\" size=\"3\" onBlur=\"checkNum(this);\"></td></tr>";
a+="<tr><td colspan=\"2\" height=\"200\" valign=\"top\" align=\"center\">Preview:<br><img id=\""+objid+"imgprev\" style=\"max-width:200px;max-height:200px;\"></td></tr>";
a+="<tr><td colspan=\"2\" align=\"center\" style=\"background:#444444;height:20px;\" onMouseOver=\"this.style.background='#448844';\" onMouseOut=\"this.style.background='#444444';\" onClick=\"addImg(document.getElementById('"+objid+"imgtran').value,document.getElementById('"+objid+"imgfile').value,document.getElementById('"+objid+"imgspeed').value,document.getElementById('"+objid+"imgclr').checked,document.getElementById('"+objid+"imgpsv').checked);\">&lt;OK&gt;</td></tr>";
a+="</table>";
document.getElementById(objid+"img").innerHTML=a;

a="<table width=\"100%\" height=\"100%\" style=\"color:#ffffff;font-size:smaller;\" cellspacing=\"1\" cellpadding=\"0\">";
a+="<tr><td align=\"center\" colspan=\"2\">Image Panning</td></tr>";
a+="<tr><td colspan=\"2\" align=\"center\" style=\"background:#444444;\" onMouseOver=\"this.style.background='#448844';\" onMouseOut=\"this.style.background='#444444';\" onClick=\"toggleImageStyleBox();\">&lt;Show/Hide&gt;</td></tr>";
a+="<tr><td>Direction:</td><td><select id=\""+objid+"imgstyledirection\" onChange=\"updateImg(document.getElementById('"+objid+"imgstyledirection').value,parseInt(document.getElementById('"+objid+"imgstylefirst').value),parseInt(document.getElementById('"+objid+"imgstylelast').value),parseInt(document.getElementById('"+objid+"imgstylefixed').value));\">"+getImgDirection()+"</select></td></tr>";
a+="<tr><td>First Position:</td><td><input type=\"textbox\" value=\"0\" size=\"5\" id=\""+objid+"imgstylefirst\" onBlur=\"checkNum(this);updateImg(document.getElementById('"+objid+"imgstyledirection').value,parseInt(document.getElementById('"+objid+"imgstylefirst').value),parseInt(document.getElementById('"+objid+"imgstylelast').value),parseInt(document.getElementById('"+objid+"imgstylefixed').value));\" onFocus=\"moveImg(document.getElementById('"+objid+"imgstyledirection').value,parseInt(this.value),parseInt(document.getElementById('"+objid+"imgstylefixed').value));\"><font style=\"background:#444444;\" onMouseOver=\"this.style.background='#448844';\" onMouseOut=\"this.style.background='#444444';\" onClick=\"document.getElementById('"+objid+"imgstylefirst').value=parseInt(document.getElementById('"+objid+"imgstylefirst').value)*-1;\">&nbsp;&nbsp;+/-&nbsp;&nbsp;</font>&nbsp;<font style=\"background:#444444;\" onMouseOver=\"this.style.background='#448844';\" onMouseOut=\"this.style.background='#444444';\" onClick=\"moveImg(document.getElementById('"+objid+"imgstyledirection').value,parseInt(document.getElementById('"+objid+"imgstylefirst').value),parseInt(document.getElementById('"+objid+"imgstylefixed').value));\">&nbsp;&nbsp;Show&nbsp;&nbsp;</font></td></tr>";
a+="<tr><td>Last Position:</td><td><input type=\"textbox\" value=\"0\" size=\"5\" id=\""+objid+"imgstylelast\" onBlur=\"checkNum(this);updateImg(document.getElementById('"+objid+"imgstyledirection').value,parseInt(document.getElementById('"+objid+"imgstylefirst').value),parseInt(document.getElementById('"+objid+"imgstylelast').value),parseInt(document.getElementById('"+objid+"imgstylefixed').value));\" onFocus=\"moveImg(document.getElementById('"+objid+"imgstyledirection').value,parseInt(this.value),parseInt(document.getElementById('"+objid+"imgstylefixed').value));\"><font style=\"background:#444444;\" onMouseOver=\"this.style.background='#448844';\" onMouseOut=\"this.style.background='#444444';\" onClick=\"document.getElementById('"+objid+"imgstylelast').value=parseInt(document.getElementById('"+objid+"imgstylelast').value)*-1;\">&nbsp;&nbsp;+/-&nbsp;&nbsp;</font>&nbsp;<font style=\"background:#444444;\" onMouseOver=\"this.style.background='#448844';\" onMouseOut=\"this.style.background='#444444';\" onClick=\"moveImg(document.getElementById('"+objid+"imgstyledirection').value,parseInt(document.getElementById('"+objid+"imgstylelast').value),parseInt(document.getElementById('"+objid+"imgstylefixed').value));\">&nbsp;&nbsp;Show&nbsp;&nbsp;</font></td></tr>";
a+="<tr><td>Adjust:</td><td><input type=\"textbox\" value=\"0\" size=\"5\" id=\""+objid+"imgstylefixed\" onFocus=\"updateImg(document.getElementById('"+objid+"imgstyledirection').value,parseInt(document.getElementById('"+objid+"imgstylefirst').value),parseInt(document.getElementById('"+objid+"imgstylelast').value),parseInt(document.getElementById('"+objid+"imgstylefixed').value));\" onBlur=\"checkNum(this);updateImg(document.getElementById('"+objid+"imgstyledirection').value,parseInt(document.getElementById('"+objid+"imgstylefirst').value),parseInt(document.getElementById('"+objid+"imgstylelast').value),parseInt(document.getElementById('"+objid+"imgstylefixed').value));\"><font style=\"background:#444444;\" onMouseOver=\"this.style.background='#448844';\" onMouseOut=\"this.style.background='#444444';\" onClick=\"document.getElementById('"+objid+"imgstylefixed').value=parseInt(document.getElementById('"+objid+"imgstylefixed').value)*-1;\">&nbsp;&nbsp;+/-&nbsp;&nbsp;</font></td></tr>";
a+="<tr><td>Panning Speed:</td><td><input type=\"textbox\" value=\"30\" id=\""+objid+"imgstylespeed\" size=\"3\" onBlur=\"checkNum(this);\"></td></tr>";
a+="<tr><td colspan=\"2\" align=\"center\" style=\"background:#444444;height:20px;\" onMouseOver=\"this.style.background='#448844';\" onMouseOut=\"this.style.background='#444444';\" onClick=\"addImageStyle(document.getElementById('"+objid+"imgstyledirection').value,parseInt(document.getElementById('"+objid+"imgstylefirst').value),parseInt(document.getElementById('"+objid+"imgstylelast').value),parseInt(document.getElementById('"+objid+"imgstylefixed').value),parseInt(document.getElementById('"+objid+"imgstylespeed').value));\">&lt;OK&gt;</td></tr>";
a+="</table>";
document.getElementById(objid+"imgstyle").innerHTML=a;

a="<table width=\"100%\" height=\"100%\" style=\"color:#ffffff;font-size:smaller;\" cellspacing=\"1\" cellpadding=\"0\">";
a+="<tr><td align=\"center\" colspan=\"2\">Story Text</td></tr>";
a+="<tr><td>Alignment:</td><td><select id=\""+objid+"txtalign\">"+getTextAlign()+"</select></td></tr>";
a+="<tr><td>Speed:</td><td><input type=\"textbox\" id=\""+objid+"txtspeed\" value=\"30\" size=\"5\" onBlur=\"checkNum(this);\"></td></tr>";
a+="<tr><td>Clear before add:</td><td><input type=\"checkbox\" id=\""+objid+"txtclear\" checked></td></tr>";
a+="<tr><td>AutoPlay:</td><td><input type=\"checkbox\" id=\""+objid+"txtautoplay\"></td></tr>";
a+="<tr><td>Text:</td><td><textarea wrap=\"off\" style=\"width:175px;height:120px\" id=\""+objid+"txtstory\"></textarea></td></tr>";
a+="<tr><td colspan=\"2\" align=\"center\" style=\"background:#444444;\" onMouseOver=\"this.style.background='#448844';\" onMouseOut=\"this.style.background='#444444';\" onClick=\"addStoryText(parseInt(document.getElementById('"+objid+"txtspeed').value),document.getElementById('"+objid+"txtstory').value,document.getElementById('"+objid+"txtautoplay').checked,document.getElementById('"+objid+"txtclear').checked,document.getElementById('"+objid+"txtalign').value);\">&lt;OK&gt;</td></tr>";
a+="</table>";document.getElementById(objid+"txt").innerHTML=a;a="<table width=\"100%\" height=\"100%\" style=\"color:#ffffff;font-size:smaller;\" cellspacing=\"1\" cellpadding=\"0\">";
a+="<tr><td align=\"center\" colspan=\"2\">Text Style</td></tr>";
a+="<tr><td>Use Default Settings:</td><td><input type=\"checkbox\" id=\""+objid+"txtstyledef\" onChange=\"document.getElementById('"+objid+"txtstylecol').disabled=this.checked;document.getElementById('"+objid+"txtstylesize').disabled=this.checked;document.getElementById('"+objid+"txtstyleb').disabled=this.checked;document.getElementById('"+objid+"txtstylei').disabled=this.checked;document.getElementById('"+objid+"txtstyleu').disabled=this.checked;\" checked></td></tr>";
a+="<tr><td>Text Color:</td><td><input type=\"textbox\" value=\"#ffffff\" size=\"6\" id=\""+objid+"txtstylecol\" disabled></td></tr>";
a+="<tr><td>Text Size:</td><td><input type=\"textbox\" value=\"3\" size=\"3\" id=\""+objid+"txtstylesize\" onBlur=\"checkNum(this);\" disabled></td></tr>";
a+="<tr><td>Text Style:</td><td><label>Bold:<input type=\"checkbox\" id=\""+objid+"txtstyleb\" disabled></label>&nbsp;<label>Italic:<input type=\"checkbox\" id=\""+objid+"txtstylei\" disabled></label>&nbsp;<label>Underline:<input type=\"checkbox\" id=\""+objid+"txtstyleu\" disabled></label></td></tr>";
a+="<tr><td colspan=\"2\" align=\"center\" style=\"background:#444444;height:20px;\" onMouseOver=\"this.style.background='#448844';\" onMouseOut=\"this.style.background='#444444';\" onClick=\"addTextStyle(document.getElementById('"+objid+"txtstyledef').checked,document.getElementById('"+objid+"txtstylecol').value,parseInt(document.getElementById('"+objid+"txtstylesize').value),document.getElementById('"+objid+"txtstyleb').checked,document.getElementById('"+objid+"txtstylei').checked,document.getElementById('"+objid+"txtstyleu').checked);\">&lt;OK&gt;</td></tr>";
a+="</table>";
document.getElementById(objid+"txtstyle").innerHTML=a;

a="<table width=\"100%\" height=\"100%\" style=\"color:#ffffff;font-size:smaller;\" cellspacing=\"1\" cellpadding=\"0\">";
a+="<tr><td align=\"center\" colspan=\"2\">Story Box Style</td></tr>";
a+="<tr><td>Use Default Settings:</td><td><input type=\"checkbox\" id=\""+objid+"storyboxstyledef\" onChange=\"document.getElementById('"+objid+"storyboxstylex').disabled=this.checked;document.getElementById('"+objid+"storyboxstyley').disabled=this.checked;document.getElementById('"+objid+"storyboxstylew').disabled=this.checked;document.getElementById('"+objid+"storyboxstyleh').disabled=this.checked;\" checked></td></tr>";
a+="<tr><td>Story Box Position:</td><td>X:<input type=\"textbox\" value=\"20\" size=\"3\" id=\""+objid+"storyboxstylex\" onBlur=\"checkNum(this);\" disabled>&nbsp;Y:<input type=\"textbox\" value=\"430\" size=\"3\" id=\""+objid+"storyboxstyley\" onBlur=\"checkNum(this);\" disabled></td></tr>";
a+="<tr><td>Story Box Size:</td><td>W:<input type=\"textbox\" value=\"760\" size=\"3\" id=\""+objid+"storyboxstylew\" onBlur=\"checkNum(this);\" disabled>&nbsp;H:<input type=\"textbox\" value=\"150\" size=\"3\" id=\""+objid+"storyboxstyleh\" onBlur=\"checkNum(this);\" disabled></td></tr>";
a+="<tr><td colspan=\"2\" align=\"center\" style=\"background:#444444;height:20px;\" onMouseOver=\"this.style.background='#448844';\" onMouseOut=\"this.style.background='#444444';\" onClick=\"addStoryBoxStyle(document.getElementById('"+objid+"storyboxstyledef').checked,document.getElementById('"+objid+"storyboxstylex').value,parseInt(document.getElementById('"+objid+"storyboxstyley').value),document.getElementById('"+objid+"storyboxstylew').value,document.getElementById('"+objid+"storyboxstyleh').value);\">&lt;OK&gt;</td></tr>";
a+="</table>";
document.getElementById(objid+"storyboxstyle").innerHTML=a;

a="<table width=\"100%\" height=\"100%\" style=\"color:#ffffff;font-size:smaller;\" cellspacing=\"1\" cellpadding=\"0\">";
a+="<tr><td align=\"center\" colspan=\"2\">Background Music</td></tr>";
a+="<tr><td>BGM File Name:</td><td><input type=\"textbox\" id=\""+objid+"bgmfile\"></td></tr>";
a+="<tr><td colspan=\"2\" align=\"center\">Enter &quot;stop&quot; to mark as stop.</td></tr>";
a+="<tr><td colspan=\"2\" align=\"center\"><font style=\"background:#444444;height:20px;width:40px;\" onMouseOver=\"this.style.background='#448844';\" onMouseOut=\"this.style.background='#444444';\" onClick=\"toggleinBGM(document.getElementById('"+objid+"bgmfile').value);\" id=\""+objid+"bgmbtn\">&lt;Play&gt;</font></td></tr>";
a+="<tr><td colspan=\"2\" align=\"center\" style=\"background:#444444;height:20px;\" onMouseOver=\"this.style.background='#448844';\" onMouseOut=\"this.style.background='#444444';\" onClick=\"addBGM(document.getElementById('"+objid+"bgmfile').value);\">&lt;OK&gt;</td></tr>";
a+="</table>";
document.getElementById(objid+"bgm").innerHTML=a;

a="<table width=\"100%\" height=\"100%\" style=\"color:#ffffff;font-size:smaller;\" cellspacing=\"1\" cellpadding=\"0\">";
a+="<tr><td align=\"center\" colspan=\"2\">Anchor</td></tr>";
a+="<tr><td>Anchor Name:</td><td><input type=\"textbox\" id=\""+objid+"anchorname\"></td></tr>";
a+="<tr><td colspan=\"2\" align=\"center\">Enter &quot;end&quot; to mark as stop.</td></tr>";
a+="<tr><td colspan=\"2\" align=\"center\" style=\"background:#444444;height:20px;\" onMouseOver=\"this.style.background='#448844';\" onMouseOut=\"this.style.background='#444444';\" onClick=\"addAnchor(document.getElementById('"+objid+"anchorname').value);\">&lt;OK&gt;</td></tr>";
a+="</table>";
document.getElementById(objid+"anchor").innerHTML=a;

a="<table width=\"100%\" height=\"100%\" style=\"color:#ffffff;font-size:smaller;\" cellspacing=\"1\" cellpadding=\"0\">";
a+="<tr><td align=\"center\" colspan=\"2\">VN Compile</td></tr>";
a+="<tr><td>UI Script File Name:</td><td><input type=\"textbox\" id=\""+objid+"uiscriptfilename\" value=\"uistyle\" onBlur=\"this.value=processPath(this.value);\">.js</td></tr>";
a+="<tr><td>Script File Name:</td><td><input type=\"textbox\" id=\""+objid+"scriptfilename\" value=\"script\" onBlur=\"this.value=processPath(this.value);\">.js</td></tr>";
a+="<tr><td colspan=\"2\" align=\"center\">*Required internet connection to compile.</td></tr>";
a+="<tr><td colspan=\"2\" align=\"center\" style=\"background:#444444;height:20px;\" onMouseOver=\"this.style.background='#448844';\" onMouseOut=\"this.style.background='#444444';\" onClick=\"startCompile(document.getElementById('"+objid+"scriptfilename').value,document.getElementById('"+objid+"uiscriptfilename').value,true);\">&lt;Compile&gt;</td></tr>";
a+="<tr><td colspan=\"2\" align=\"center\" style=\"background:#444444;height:20px;\" onMouseOver=\"this.style.background='#448844';\" onMouseOut=\"this.style.background='#444444';\" onClick=\"startCompile(document.getElementById('"+objid+"scriptfilename').value,document.getElementById('"+objid+"uiscriptfilename').value,false);\">&lt;Close&gt;</td></tr>";
a+="</table>";
document.getElementById(objid+"compile").innerHTML=a;

a="<table width=\"100%\" height=\"100%\" style=\"color:#ffffff;font-size:smaller;\" cellspacing=\"1\" cellpadding=\"0\">";
a+="<tr><td align=\"center\" colspan=\"2\">VN Save</td></tr>";
a+="<tr><td>Save Location:</td><td><input type=\"textbox\" id=\""+objid+"savelocation\" value=\"globalfolder\" onBlur=\"this.value=processPath(this.value);\"></td></tr>";
a+="<tr><td>File Name:</td><td><input type=\"textbox\" id=\""+objid+"savefilename\" value=\"UntitledVN\" onBlur=\"this.value=processPath(this.value);\">.vnp</td></tr>";
a+="<tr><td colspan=\"2\" align=\"center\">*Required internet connection to save.</td></tr>";
a+="<tr><td colspan=\"2\" align=\"center\">**All existing file will be replace.</td></tr>";
a+="<tr><td colspan=\"2\" align=\"center\" style=\"background:#444444;height:20px;\" onMouseOver=\"this.style.background='#448844';\" onMouseOut=\"this.style.background='#444444';\" onClick=\"saveScript(document.getElementById('"+objid+"savelocation').value,document.getElementById('"+objid+"savefilename').value,true);\">&lt;Save&gt;</td></tr>";
a+="<tr><td colspan=\"2\" align=\"center\" style=\"background:#444444;height:20px;\" onMouseOver=\"this.style.background='#448844';\" onMouseOut=\"this.style.background='#444444';\" onClick=\"saveScript(document.getElementById('"+objid+"savelocation').value,document.getElementById('"+objid+"savefilename').value,false);\">&lt;Close&gt;</td></tr>";
a+="</table>";
document.getElementById(objid+"save").innerHTML=a;

a="<table width=\"100%\" height=\"100%\" style=\"color:#ffffff;font-size:smaller;\" cellspacing=\"1\" cellpadding=\"0\">";
a+="<tr><td align=\"center\" colspan=\"2\">VN Load</td></tr>";
a+="<tr><td>Save Location:</td><td><input type=\"textbox\" id=\""+objid+"loadlocation\" value=\"globalfolder\" onBlur=\"this.value=processPath(this.value);\"></td></tr>";
a+="<tr><td>File Name:</td><td><input type=\"textbox\" id=\""+objid+"loadfilename\" value=\"UntitledVN\" onBlur=\"this.value=processPath(this.value);\">.vnp</td></tr>";
a+="<tr><td colspan=\"2\" align=\"center\">*Required internet connection to load.</td></tr>";
a+="<tr><td colspan=\"2\" align=\"center\" style=\"background:#444444;height:20px;\" onMouseOver=\"this.style.background='#448844';\" onMouseOut=\"this.style.background='#444444';\" onClick=\"openScript(document.getElementById('"+objid+"loadlocation').value,document.getElementById('"+objid+"loadfilename').value,true);\">&lt;Open&gt;</td></tr>";
a+="<tr><td colspan=\"2\" align=\"center\">Source Code:</td></tr>";
a+="<tr><td colspan=\"2\" align=\"center\"><textarea id=\""+objid+"loadsc\" style=\"width:200px;height:100px;\"></textarea></td></tr>";
a+="<tr><td colspan=\"2\" align=\"center\" style=\"background:#444444;height:20px;\" onMouseOver=\"this.style.background='#448844';\" onMouseOut=\"this.style.background='#444444';\" onClick=\"if(document.getElementById('"+objid+"loadsc').value!=''){loadScript(document.getElementById('"+objid+"loadsc').value,true);}\">&lt;Load&gt;</td></tr>";
a+="<tr><td colspan=\"2\" align=\"center\" style=\"background:#444444;height:20px;\" onMouseOver=\"this.style.background='#448844';\" onMouseOut=\"this.style.background='#444444';\" onClick=\"loadScript(document.getElementById('"+objid+"loadsc').value,false);\">&lt;Close&gt;</td></tr>";
a+="</table>";document.getElementById(objid+"load").innerHTML=a;

a="<table width=\"100%\" height=\"100%\" style=\"color:#ffffff;font-size:smaller;\" cellspacing=\"1\" cellpadding=\"0\">";
a+="<tr><td align=\"center\" colspan=\"2\">Custom Code</td></tr>";
a+="<tr><td>Source Code:</td><td><textarea wrap=\"off\" id=\""+objid+"customsc\" style=\"width:200px;height:100px;\"></textarea></td></tr>";
a+="<tr><td colspan=\"2\" align=\"center\" style=\"background:#444444;height:20px;\" onMouseOver=\"this.style.background='#448844';\" onMouseOut=\"this.style.background='#444444';\" onClick=\"saveSource();\">&lt;OK&gt;</td></tr>";
a+="</table>";
document.getElementById(objid+"customcode").innerHTML=a;

a="<table width=\"100%\" height=\"100%\" style=\"color:#ffffff;font-size:smaller;\" cellspacing=\"1\" cellpadding=\"0\">";
a+="<tr><td align=\"center\" colspan=\"2\">Decision</td></tr>";
a+="<tr><td>Option 1 Label:</td><td><input type=\"textbox\" id=\""+objid+"declab1\"></td></tr>";
a+="<tr><td>Option 1 Anchor:</td><td><select id=\""+objid+"decopt1\">"+getAnchor(0)+"</select></td></tr>";
a+="<tr><td>Option 2 Label:</td><td><input type=\"textbox\" id=\""+objid+"declab2\"></td></tr>";
a+="<tr><td>Option 2 Anchor:</td><td><select id=\""+objid+"decopt2\">"+getAnchor(1)+"</select></td></tr>";
a+="<tr><td>Option 3 Label:</td><td><input type=\"textbox\" id=\""+objid+"declab3\"></td></tr>";
a+="<tr><td>Option 3 Anchor:</td><td><select id=\""+objid+"decopt3\">"+getAnchor(2)+"</select></td></tr>";
a+="<tr><td>Option 4 Label:</td><td><input type=\"textbox\" id=\""+objid+"declab4\"></td></tr>";
a+="<tr><td>Option 4 Anchor:</td><td><select id=\""+objid+"decopt4\">"+getAnchor(3)+"</select></td></tr>";
a+="<tr><td>Option 5 Label:</td><td><input type=\"textbox\" id=\""+objid+"declab5\"></td></tr>";
a+="<tr><td>Option 5 Anchor:</td><td><select id=\""+objid+"decopt5\">"+getAnchor(4)+"</select></td></tr>";
a+="<tr><td colspan=\"2\" align=\"center\" style=\"background:#444444;height:20px;\" onMouseOver=\"this.style.background='#448844';\" onMouseOut=\"this.style.background='#444444';\" onClick=\"addDecision([document.getElementById('"+objid+"declab1').value,document.getElementById('"+objid+"decopt1').value],[document.getElementById('"+objid+"declab2').value,document.getElementById('"+objid+"decopt2').value],[document.getElementById('"+objid+"declab3').value,document.getElementById('"+objid+"decopt3').value],[document.getElementById('"+objid+"declab4').value,document.getElementById('"+objid+"decopt4').value],[document.getElementById('"+objid+"declab5').value,document.getElementById('"+objid+"decopt5').value]);\">&lt;OK&gt;</td></tr>";
a+="</table>";
document.getElementById(objid+"decision").innerHTML=a;

a="<table width=\"100%\" height=\"100%\" style=\"color:#ffffff;\">";
a+="<tr><td id=\""+objid+"dialogtxt\" style=\"background:#448844;font-size:smaller;\" align=\"center\">Dialog "+currentdialog+"/"+totaldialog+"</td></tr>";
a+="<tr><td align=\"center\" style=\"font-size:smaller;\">Global Settings:</td></tr>";
a+="<tr><td align=\"center\" style=\"background:#444444;font-size:smaller;\" onMouseOver=\"this.style.background='#448844';\" onMouseOut=\"this.style.background='#444444';\" onClick=\"showDialog('ui');\">UI Style</td></tr>";
a+="<tr><td align=\"center\" style=\"font-size:smaller;\">Dialog Design:</td></tr>";
a+="<tr><td align=\"center\" style=\"background:#444444;font-size:smaller;\" onMouseOver=\"this.style.background='#448844';\" onMouseOut=\"this.style.background='#444444';\" onClick=\"showDialog('txt');\">Story Text</td></tr>";
a+="<tr><td align=\"center\" style=\"background:#444444;font-size:smaller;\" onMouseOver=\"this.style.background='#448844';\" onMouseOut=\"this.style.background='#444444';\" onClick=\"showDialog('img');\">BG Image</td></tr>";
a+="<tr><td align=\"center\" style=\"background:#444444;font-size:smaller;\" onMouseOver=\"this.style.background='#448844';\" onMouseOut=\"this.style.background='#444444';\" onClick=\"showDialog('anchor');\">Anchor</td></tr>";
a+="<tr><td align=\"center\" style=\"background:#444444;font-size:smaller;\" onMouseOver=\"this.style.background='#448844';\" onMouseOut=\"this.style.background='#444444';\" onClick=\"showDialog('decision');\">Decision</td></tr>";
a+="<tr><td align=\"center\" style=\"background:#444444;font-size:smaller;\" onMouseOver=\"this.style.background='#448844';\" onMouseOut=\"this.style.background='#444444';\" onClick=\"showDialog('bgm');\">BGM</td></tr>";
a+="<tr><td align=\"center\" style=\"font-size:smaller;\">Dialog Style:</td></tr>";
a+="<tr><td align=\"center\" style=\"background:#444444;font-size:smaller;\" onMouseOver=\"this.style.background='#448844';\" onMouseOut=\"this.style.background='#444444';\" onClick=\"showDialog('imgstyle');\">Image Panning</td></tr>";
a+="<tr><td align=\"center\" style=\"background:#444444;font-size:smaller;\" onMouseOver=\"this.style.background='#448844';\" onMouseOut=\"this.style.background='#444444';\" onClick=\"showDialog('txtstyle');\">Text Style</td></tr>";
a+="<tr><td align=\"center\" style=\"background:#444444;font-size:smaller;\" onMouseOver=\"this.style.background='#448844';\" onMouseOut=\"this.style.background='#444444';\" onClick=\"showDialog('storyboxstyle');\">Story Box Style</td></tr>";
a+="<tr><td align=\"center\" style=\"font-size:smaller;\">Custom Design:</td></tr>";
a+="<tr><td align=\"center\" style=\"background:#444444;font-size:smaller;\" onMouseOver=\"this.style.background='#448844';\" onMouseOut=\"this.style.background='#444444';\" onClick=\"showDialog('customcode');\">Custom Code</td></tr>";
a+="<tr height=\"90%\"></tr>";
a+="<tr><td align=\"center\" style=\"font-size:smaller;\">File:</td></tr>";
a+="<tr><td align=\"center\" style=\"background:#444444;font-size:smaller;\" onMouseOver=\"this.style.background='#448844';\" onMouseOut=\"this.style.background='#444444';\" onClick=\"showDialog('save');\">Save...</td></tr>";
a+="<tr><td align=\"center\" style=\"background:#444444;font-size:smaller;\" onMouseOver=\"this.style.background='#448844';\" onMouseOut=\"this.style.background='#444444';\" onClick=\"showDialog('load');\">Load...</td></tr>";
a+="<tr><td align=\"center\" style=\"font-size:smaller;\">View:</td></tr>";
a+="<tr><td align=\"center\" style=\"background:#444444;font-size:smaller;\" onMouseOver=\"this.style.background='#448844';\" onMouseOut=\"this.style.background='#444444';\" onClick=\"toggleGrid();\">Grid</td></tr>";
a+="<tr><td align=\"center\" style=\"background:#444444;font-size:smaller;\" onMouseOver=\"this.style.background='#448844';\" onMouseOut=\"this.style.background='#444444';\" onClick=\"toggleBoxBorder();\">Box Border</td></tr>";
a+="<tr><td align=\"center\" style=\"font-size:smaller;\">Post Processing:</td></tr>";
a+="<tr><td align=\"center\" style=\"background:#444444;font-size:smaller;\" onMouseOver=\"this.style.background='#448844';\" onMouseOut=\"this.style.background='#444444';\" onClick=\"testPlay();\">Test Play</td></tr>";
a+="<tr><td align=\"center\" style=\"background:#444444;font-size:smaller;\" onMouseOver=\"this.style.background='#448844';\" onMouseOut=\"this.style.background='#444444';\" onClick=\"showDialog('compile');\">Compile</td></tr>";
a+="<tr><td style=\"font-size:smaller;\">&nbsp;</td></tr>";
a+="<tr><td align=\"center\" style=\"background:#444444;font-size:smaller;\" onMouseOver=\"this.style.background='#448844';\" onMouseOut=\"this.style.background='#444444';\" onClick=\"newDialog();\">New Dialog</td></tr>";
a+="<tr><td align=\"center\" style=\"background:#444444;font-size:smaller;\" onMouseOver=\"this.style.background='#448844';\" onMouseOut=\"this.style.background='#444444';\" onClick=\"gotoPrev();\">&lt; Back</td></tr>";
a+="<tr><td align=\"center\" style=\"background:#444444;font-size:smaller;\" onMouseOver=\"this.style.background='#448844';\" onMouseOut=\"this.style.background='#444444';\" onClick=\"gotoNext();\">Next &gt;</td></tr>";
a+="</table>";
document.getElementById(objid+"leftpanel").innerHTML=a;

a="<table width=\"100%\" height=\"100%\" style=\"color:#ffffff;\">";
a+="<tr><td id=\""+objid+"dialogtxt\" style=\"background:#448844;font-size:smaller;\" align=\"center\">Dialog Info</td></tr>";
a+="<tr><td align=\"center\" style=\"background:#444488;font-size:smaller;\">Text Mode</td></tr>";
a+="<tr><td align=\"center\" style=\"font-size:smaller;\" id=\""+objid+"infomode\"></td></tr>";
a+="<tr><td align=\"center\" style=\"background:#444488;font-size:smaller;\">Text Speed</td></tr>";
a+="<tr><td align=\"center\" style=\"font-size:smaller;\" id=\""+objid+"infospeed\"></td></tr>";
a+="<tr><td align=\"center\" style=\"background:#444488;font-size:smaller;\">Text AutoPlay</td></tr>";
a+="<tr><td align=\"center\" style=\"font-size:smaller;\" id=\""+objid+"infoautoplay\"></td></tr>";
a+="<tr><td align=\"center\" style=\"background:#444488;font-size:smaller;\">BG Image</td></tr>";
a+="<tr><td align=\"center\" style=\"font-size:smaller;\" id=\""+objid+"infobg\">Default</td></tr>";
a+="<tr><td align=\"center\" style=\"background:#444488;font-size:smaller;\">BGM</td></tr>";
a+="<tr><td align=\"center\" style=\"font-size:smaller;\" id=\""+objid+"infobgm\">Default</td></tr>";
a+="<tr><td align=\"center\" style=\"font-size:smaller;\"><font style=\"background:#444444;height:20px;width:40px;\" onMouseOver=\"this.style.background='#448844';\" onMouseOut=\"this.style.background='#444444';\" id=\""+objid+"infobgmbtn\" onClick=\"toggleBGM();\">&lt;Play&gt;</font></td></tr>";
a+="<tr><td align=\"center\" style=\"background:#444488;font-size:smaller;\">Anchor</td></tr>";
a+="<tr><td align=\"center\" style=\"font-size:smaller;\" id=\""+objid+"infoanchor\">Default</td></tr>";
a+="<tr height=\"90%\"></tr>";
a+="</table>";
document.getElementById(objid+"rightpanel").innerHTML=a;

a="<iframe name=\""+objid+"compiler\" id=\""+objid+"compiler\" style=\"position:absolute;left:-1px;top:-1px;width:1px;height:1px;\"></iframe>";
a+="<form action=\"http://digitalparticle.com/vnwe/compiler/compiler.php?action=compile\" id=\""+objid+"compileform\" method=\"post\" target=\""+objid+"compiler\">";
a+="<input type=\"hidden\" name=\"filename\" id=\""+objid+"scriptfile\">";
a+="<input type=\"hidden\" name=\"uifilename\" id=\""+objid+"uiscriptfile\">";
a+="<input type=\"hidden\" name=\"data\" id=\""+objid+"scriptdata\">";
a+="<input type=\"hidden\" name=\"uidata\" id=\""+objid+"uiscriptdata\">";
a+="</form>";
a+="<form action=\"http://digitalparticle.com/vnwe/compiler/compiler.php?action=save\" id=\""+objid+"saveform\" method=\"post\" target=\""+objid+"compiler\">";
a+="<input type=\"hidden\" name=\"vid\" id=\""+objid+"scvid\">";
a+="<input type=\"hidden\" name=\"filename\" id=\""+objid+"scfile\">";
a+="<input type=\"hidden\" name=\"data\" id=\""+objid+"scdata\">";
a+="</form>";
a+="<form action=\"http://digitalparticle.com/vnwe/compiler/compiler.php?action=load\" id=\""+objid+"loadform\" method=\"post\" target=\""+objid+"scloader\">";
a+="<input type=\"hidden\" name=\"vid\" id=\""+objid+"loadscvid\">";
a+="<input type=\"hidden\" name=\"filename\" id=\""+objid+"loadscfile\">";
a+="</form>";
document.getElementById(objid+"connection").innerHTML=a;
}

function toggleGrid(){
if(grid){
document.getElementById(objid+"editorgrid").style.visibility="hidden";
}else{
document.getElementById(objid+"editorgrid").style.visibility="visible";
}
grid=!grid;
}

function toggleBoxBorder(){
if(boxborder>3){boxborder=0;}
if(boxborder==0){document.getElementById(objid+"editortextstorybox").style.border="1px solid #ffffff";}
if(boxborder==1){document.getElementById(objid+"editortextstorybox").style.border="1px dotted #ffffff";}
if(boxborder==2){document.getElementById(objid+"editortextstorybox").style.border="1px dashed #ffffff";}
if(boxborder==3){document.getElementById(objid+"editortextstorybox").style.border="none";}
boxborder++;
}

function getUI(){
var code="var BoxMask=new Array;var textcustom=new Array;var ImagePath=\"\";var BGMPath=\"\";var Decision=new Array;var DecisionNor=new Array;var DecisionHov=new Array;var ImageSpeed=2;var CustomCode=\"\";var StoryBox=new Array;var VNSize=new Array;var EnableSkip=false;var ResetDelay=500;var AutoCenter=true;function getData(val){if(val==\"size\"){return VNSize;}if(val==\"delay\"){return ResetDelay;}if(val==\"autocenter\"){return AutoCenter;}if(val==\"boxmask\"){return BoxMask;}if(val==\"storybox\"){return StoryBox;}if(val==\"enableskip\"){return EnableSkip;}if(val==\"decision\"){return Decision;}if(val==\"decisionnor\"){return DecisionNor;}if(val==\"decisionhov\"){return DecisionHov;}if(val==\"txtcustom\"){return textcustom;}if(val==\"customcode\"){return CustomCode;}if(val==\"imagespeed\"){return ImageSpeed;}if(val==\"imgdir\"){return ImagePath;}if(val==\"bgmdir\"){return BGMPath;}}";
code+="ImagePath=\""+respath[0]+"\";";
code+="BGMPath=\""+respath[1]+"\";";
code+="VNSize=[800,600];";
code+="AutoCenter="+autocenter.toString().toLowerCase()+";";
code+="ResetDelay="+resetdelay.toString().toLowerCase()+";";
code+="ImageSpeed="+imagespeed.toString().toLowerCase()+";";
code+="EnableSkip="+enableskip.toString().toLowerCase()+";";
code+="StoryBox[0]=["+storybox[0]+","+storybox[1]+"];";
code+="StoryBox[1]=["+storybox[2]+","+storybox[3]+"];";
code+="BoxMask=[\""+boxmask[0]+"\","+boxmask[1]+"];";
code+="CustomCode=\""+processData(document.getElementById(objid+"customsc").value)+"\";";
code+="Decision=["+decisionbox[0]+","+decisionbox[1]+","+decisionbox[2]+"];";
code+="DecisionNor=[\""+decisionnor[0]+"\",\""+decisionnor[1]+"\",\""+decisionnor[2]+"\"];";
code+="DecisionHov=[\""+decisionhov[0]+"\",\""+decisionhov[1]+"\",\""+decisionhov[2]+"\"];";
code+="textcustom=[\""+storyboxstyle[0]+"\","+storyboxstyle[1]+","+storyboxstyle[2].toString().toLowerCase()+","+storyboxstyle[3].toString().toLowerCase()+","+storyboxstyle[4].toString().toLowerCase()+"];";
return code;
}

function getScript(){
var e="var img=new Array;var pan=new Array;var bgm=new Array;var text=new Array;var txtstyle=new Array;var txtalign=new Array;var box=new Array;var anchor=new Array;var decision=new Array;function getText(){return text;}function getStyle(){return txtstyle;}function getAlign(){return txtalign;}function getBox(){return box;}function getImage(){return img;}function getPan(){return pan;}function getBGM(){return bgm;}function getAnchor(){return anchor;}function getDecision(){return decision;}";

for(i=0;i<dialoganchor.length;i++){
if(checkNone(dialoganchor[i])){
e+="anchor["+i+"]=\""+dialoganchor[i]+"\";"
}
}

for(i=0;i<dialogstoryboxstyle.length;i++){
if(checkNone(dialogstoryboxstyle[i])){
e+="box["+i+"]=["+dialogstoryboxstyle[i][0]+","+dialogstoryboxstyle[i][1]+","+dialogstoryboxstyle[i][2]+","+dialogstoryboxstyle[i][3]+"];"
}
}

for(i=0;i<dialogbgm.length;i++){
if(checkNone(dialogbgm[i])){
e+="bgm["+i+"]=\""+processData(dialogbgm[i])+"\";"
}
}

for(i=0;i<dialogimg.length;i++){
if(checkNone(dialogimg[i])){
e+="img["+i+"]=[\""+dialogimg[i][0]+"\",\""+processData(dialogimg[i][1])+"\","+dialogimg[i][2]+","+dialogimg[i][3].toString().toLowerCase()+","+dialogimg[i][4].toString().toLowerCase()+"];";
}
}

for(i=0;i<dialogimgstyle.length;i++){
if(checkNone(dialogimgstyle[i])){
e+="pan["+i+"]=[\""+dialogimgstyle[i][0]+"\","+dialogimgstyle[i][1]+","+dialogimgstyle[i][2]+","+dialogimgstyle[i][3]+","+dialogimgstyle[i][4]+"];"
}
}

for(i=0;i<dialogtxtstyle.length;i++){
if(checkNone(dialogtxtstyle[i])){
var d="";
if(dialogtxtstyle[i][2]){d+="bold";}
if(dialogtxtstyle[i][3]){d+="italic";}
if(dialogtxtstyle[i][4]){d+="underline";}
e+="txtstyle["+i+"]=[\""+dialogtxtstyle[i][0]+"\","+dialogtxtstyle[i][1]+",\""+d+"\"];";
}
if(checkNone(dialogtxtstyle[i-1])&&!checkNone(dialogtxtstyle[i])){
e+="txtstyle["+i+"]=[\"reset\"];";
}
}

for(i=0;i<dialogtxtalign.length;i++){
if(checkNone(dialogtxtalign[i])){
e+="txtalign["+i+"]=\""+dialogtxtalign[i]+"\";"
}
}

for(i=0;i<dialogtxt.length;i++){
e+="text["+i+"]=["+dialogtxt[i][0]+",\""+processData(dialogtxt[i][1])+"\","+dialogtxt[i][2].toString().toLowerCase()+"];";
}

for(i=0;i<dialogdecision.length;i++){
if(checkNone(dialogdecision[i])){
var f="";
for(c=0;c<dialogdecision[i].length;c++){
if(checkNone(dialogdecision[i][c][1])){
if(f!=""){f+=",";}
f+="[\""+dialogdecision[i][c][0]+"\",\""+dialogdecision[i][c][1]+"\"]";
}
}
e+="decision["+(i+1)+"]=["+f+"];";
}
}

return e;
}

function testPlay(){
var uic=getUI();
var scriptc=getScript();
var code="<html><head><script language=\"javascript\">function endGame(){alert(\"End\");}</script><script language=\"javascript\">"+scriptc+"</script><script language=\"javascript\">"+uic+"</script><script language=\"javascript\" src=\"system/soundsys.js\"></script><script language=\"javascript\" src=\"system/gamesys.js\"></script><title>VNWe: Visual Novel Web Edition</title></head><body bgcolor=\"#000000\"><div id=\"contents\"></div><script language=\"javascript\">document.onLoad = initGame(\"contents\",true,\"endGame()\");</script></body></html>";
alert("BGM cannot be tested in Test Play. You need to compile and test it manually.");
var win=window.open("","testplay","toolbar=no,directories=no,status=no,menubar=no,scrollbars=no");
win.document.write(code);
win.documen.close();
}

function createGrid(){
var a="";
for(x=0;x<40;x++){
a+="<div style=\"position:absolute;left:"+(x*20)+"px;top:0px;width:1px;height:600px;background:#333333;z-index:0;\"></div>";
}for(y=0;y<30;y++){
a+="<div style=\"position:absolute;left:0px;top:"+(y*20)+"px;width:800px;height:1px;background:#333333;z-index:0;\"></div>";
}
return a;
}

function createStoryBox(){
var a="<div style=\"position:absolute;left:0px;top:0px;width:100%;height:100%;overflow:hidden;background:"+boxmask[0]+";opacity:"+(boxmask[1]/100)+";z-index:2;\" id=\""+objid+"editortextstorybg\"></div>";
a+="<div style=\"position:absolute;left:0px;top:0px;width:100%;height:100%;overflow:hidden;color:#ffffff;z-index:2;\" id=\""+objid+"editortextstory\"></div>";
document.getElementById(objid+"editortextstorybox").innerHTML=a;
}

function createEditor(){
var a="<div style=\"position:absolute;left:0px;top:0px;width:800px;height:600px;z-index:2;\" id=\""+objid+"editorgrid\">"+createGrid()+"</div>";
a+="<img style=\"position:absolute;left:0px;top:0px;z-index:1;\" id=\""+objid+"editorimg\" src=\""+respath[0]+"spacing.gif\">";
a+="<div style=\"position:absolute;left:"+storybox[0]+"px;top:"+storybox[1]+"px;width:"+storybox[2]+"px;height:"+storybox[3]+"px;overflow:hidden;border:1px solid #ffffff;z-index:2;\" id=\""+objid+"editortextstorybox\"></div>";
a+="<table style=\"position:absolute;left:0px;top:0px;width:800px;height:600px;overflow:hidden;z-index:2;\" id=\""+objid+"editordecision\"></table>";
a+="<font id=\""+objid+"editorcustom\"></font>";
document.getElementById(objid+"editor").innerHTML=a;
createStoryBox();
}

function createUI(){
var a="";
a+="<div style=\"position:absolute;left:0px;top:0px;width:"+editorwidth+"px;height:20px;color:#ffffff;overflow:hidden;z-index:0;text-align:center;\">VNWe Scripts Editor</div>";
a+="<iframe style=\"position:absolute;left:-1px;top:-1px;width:1px;height:1px;overflow:hidden;\" src=\"http://digitalparticle.com/vnwe/version/?version="+vnversion+"\"></iframe>";
a+="<div style=\"position:absolute;left:-1px;top:-1px;width:1px;height:1px;overflow:hidden;\" id=\""+objid+"connection\"></div>";
a+="<div style=\"position:absolute;left:"+((editorwidth-800)/2)+"px;top:20px;width:800px;height:600px;background:#000000;overflow:hidden;z-index:0;\" id=\""+objid+"editor\"></div>";
a+="<div style=\"position:absolute;left:0px;top:20px;width:"+((editorwidth-800)/2)+"px;height:600px;color:#ffffff;background:#333333;overflow:hidden;z-index:1;\" id=\""+objid+"leftpanel\"></div>";
a+="<div style=\"position:absolute;left:"+(((editorwidth-800)/2)+800)+"px;top:20px;width:"+((editorwidth-800)/2)+"px;height:600px;color:#ffffff;background:#333333;overflow:hidden;z-index:1;\" id=\""+objid+"rightpanel\"></div>";
a+="<div style=\"position:absolute;left:"+((editorwidth/2)-225)+"px;top:"+((editorheight/2)-260+20)+"px;width:450px;height:520px;color:#ffffff;background:#333333;overflow:hidden;z-index:2;visibility:hidden;\" id=\""+objid+"ui\"></div>";
a+="<div style=\"position:absolute;left:"+((editorwidth/2)-150)+"px;top:"+((editorheight/2)-180+20)+"px;width:300px;height:360px;color:#ffffff;background:#333333;overflow:hidden;z-index:2;visibility:hidden;\" id=\""+objid+"img\"></div>";
a+="<div style=\"position:absolute;left:"+((editorwidth/2)-150)+"px;top:"+((editorheight/2)-130+20)+"px;width:300px;height:260px;color:#ffffff;background:#333333;overflow:hidden;z-index:2;visibility:hidden;\" id=\""+objid+"txt\"></div>";
a+="<div style=\"position:absolute;left:"+((editorwidth/2)-150)+"px;top:"+((editorheight/2)-100+20)+"px;width:300px;height:200px;color:#ffffff;background:#333333;overflow:hidden;z-index:2;visibility:hidden;\" id=\""+objid+"imgstyle\"></div>";
a+="<div style=\"position:absolute;left:"+((editorwidth/2)-160)+"px;top:"+((editorheight/2)-80+20)+"px;width:320px;height:160px;color:#ffffff;background:#333333;overflow:hidden;z-index:2;visibility:hidden;\" id=\""+objid+"txtstyle\"></div>";
a+="<div style=\"position:absolute;left:"+((editorwidth/2)-150)+"px;top:"+((editorheight/2)-60+20)+"px;width:300px;height:120px;color:#ffffff;background:#333333;overflow:hidden;z-index:2;visibility:hidden;\" id=\""+objid+"storyboxstyle\"></div>";
a+="<div style=\"position:absolute;left:"+((editorwidth/2)-150)+"px;top:"+((editorheight/2)-60+20)+"px;width:300px;height:120px;color:#ffffff;background:#333333;overflow:hidden;z-index:2;visibility:hidden;\" id=\""+objid+"bgm\"></div>";
a+="<div style=\"position:absolute;left:"+((editorwidth/2)-150)+"px;top:"+((editorheight/2)-40+20)+"px;width:300px;height:80px;color:#ffffff;background:#333333;overflow:hidden;z-index:2;visibility:hidden;\" id=\""+objid+"anchor\"></div>";
a+="<div style=\"position:absolute;left:"+((editorwidth/2)-150)+"px;top:"+((editorheight/2)-150+20)+"px;width:300px;height:300px;color:#ffffff;background:#333333;overflow:hidden;z-index:2;visibility:hidden;\" id=\""+objid+"decision\"></div>";
a+="<div style=\"position:absolute;left:"+((editorwidth/2)-150)+"px;top:"+((editorheight/2)-80+20)+"px;width:300px;height:160px;color:#ffffff;background:#333333;overflow:hidden;z-index:2;visibility:hidden;\" id=\""+objid+"customcode\"></div>";
a+="<div style=\"position:absolute;left:"+((editorwidth/2)-150)+"px;top:"+((editorheight/2)-70+20)+"px;width:300px;height:140px;color:#ffffff;background:#333333;overflow:hidden;z-index:2;visibility:hidden;\" id=\""+objid+"compile\"></div>";
a+="<div style=\"position:absolute;left:"+((editorwidth/2)-150)+"px;top:"+((editorheight/2)-75+20)+"px;width:300px;height:150px;color:#ffffff;background:#333333;overflow:hidden;z-index:2;visibility:hidden;\" id=\""+objid+"save\"></div>";
a+="<div style=\"position:absolute;left:"+((editorwidth/2)-150)+"px;top:"+((editorheight/2)-140+20)+"px;width:300px;height:280px;color:#ffffff;background:#333333;overflow:hidden;z-index:2;visibility:hidden;\" id=\""+objid+"load\"></div>";
document.getElementById(objid).innerHTML=a;
createEditor();
createPanel();
}

function initGame(a){
objid=a;
document.getElementById(objid).style.position="absolute";
document.getElementById(objid).style.width=editorwidth;
document.getElementById(objid).style.height=editorheight;
document.getElementById(objid).style.background="#000000";
document.getElementById(objid).style.border="1px solid #ffffff";
document.body.innerHTML+="<table width=\"100%\" style=\"color:#000000;font-size:smaller;\"><tr><td align=\"center\">VNWe: Web-based visual novel system.<br>Copyright &copy; 2006-2011 Senior Design Interactive. All Rights Reserved.</td></tr></table>";
createUI();
newDialog();
showDialog("ui");
setCenter();
setInterval("setCenter()",500);
}
