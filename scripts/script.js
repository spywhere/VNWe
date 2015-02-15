//DO NOT EDIT THESE LINES
var img=new Array;var pan=new Array;var bgm=new Array;var text=new Array;var txtstyle=new Array;var txtalign=new Array;var box=new Array;var anchor=new Array;var decision=new Array;function getText(){return text;}function getStyle(){return txtstyle;}function getAlign(){return txtalign;}function getBox(){return box;}function getImage(){return img;}function getPan(){return pan;}function getBGM(){return bgm;}function getAnchor(){return anchor;}function getDecision(){return decision;}function setImage(val){img[text.length]=val;}function setBGM(val){bgm[text.length]=val;}function setStoryBox(val){box[text.length]=val;}function setPan(val){pan[text.length]=val;}function setAlign(val){txtalign[text.length]=val;}function setStyle(val){txtstyle[text.length]=val;}function setAnchor(val){anchor[text.length+1]=val;}function showDecision(val){decision[text.length]=val;}function addMsg(val){text[text.length]=val;}

//Script Description
//Image//MODE|URL|SPEED|CLEAR|PASSIVE
//Pan//DIRECTION|FIRST|LAST|FIXED|SPEED
//Box//X|Y|W|H
//Decision//TEXT|[OPT LABEL|OPT ANCHOR]|[OPT LABEL|OPT ANCHOR]|...

//Game Scripts [EDIT HERE]
setImage(["fade","bg1.jpg",40,true,true]);
addMsg([30,"Welcome to  ",true]);
setStyle(["#ff0000","3","italicbold"]);
addMsg([30,"V",true]);
setStyle(["#00ff00","3","italicbold"]);
addMsg([30,"N",true]);
setStyle(["#4444ff","3","italicbold"]);
addMsg([30,"W",true]);
setStyle(["#ff00ff","3","italicbold"]);
addMsg([30,"e",true]);
setStyle("reset");
addMsg([30,". The Visual Novel system on website."]);
setImage(["fade","pan.png",40,true,true]);
setPan(["lr",0,-200,-200,50]);
setStyle(["#ffffff","3"]);
addMsg([30,"\tYou can edit your custom VN by 2 ways..."]);
addMsg([30,"\n      - Using script files editing",true]);
addMsg([30,"\n      - Using VN Scripts Editor"]);
setStyle(["#ffffff","3","underline"]);
setAlign("center");
setImage(["fade","bg2.jpg",60,true,true]);
addMsg([30,"\tThis is sample of game decisions."]);
setAlign("left");
addMsg([30,"\tAre you hungry?"]);
showDecision([["Yes, I am hungry now.","dec1"],["No.","dec2"]]);
setAnchor("dec1");
addMsg([30,"\tSo, please have some meal for your healthy."]);
addMsg([30,"\tBut we want you to answer 1 more question."]);
setAnchor("dec2");
addMsg([30,"\tYou don't but I am hungry now..."]);
addMsg([30,"\tWe want you to answer 1 more question."]);
setAnchor("end");
addMsg([30,"\tHere's come the question..."]);
setImage(["fade","bg1.jpg",60,true,true]);
addMsg([30,"\tAre you sure you want to exit?"]);
showDecision([["Yes","dec21"],["No","dec22"]]);
setAnchor("dec21");
addMsg([30,"\tBye..."]);
addMsg([30,"\tSee you again."]);
setAnchor("dec22");
addMsg([30,"\tThis game only a sample. So, it will exit now..."]);
addMsg([30,"\tBye..."]);
setAnchor("end");
