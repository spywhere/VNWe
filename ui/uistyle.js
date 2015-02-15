//Preset UI Style value and functions
//DO NOT EDIT THESE LINES
var BoxMask=new Array;var textcustom=new Array;var ImagePath="";var BGMPath="";var Decision=new Array;var DecisionNor=new Array;var DecisionHov=new Array;var ImageSpeed=2;var CustomCode="";var StoryBox=new Array;var VNSize=new Array;var EnableSkip=false;var ResetDelay=500;var AutoCenter=true;function getData(val){if(val=="size"){return VNSize;}if(val=="delay"){return ResetDelay;}if(val=="autocenter"){return AutoCenter;}if(val=="boxmask"){return BoxMask;}if(val=="storybox"){return StoryBox;}if(val=="enableskip"){return EnableSkip;}if(val=="decision"){return Decision;}if(val=="decisionnor"){return DecisionNor;}if(val=="decisionhov"){return DecisionHov;}if(val=="txtcustom"){return textcustom;}if(val=="customcode"){return CustomCode;}if(val=="imagespeed"){return ImageSpeed;}if(val=="imgdir"){return ImagePath;}if(val=="bgmdir"){return BGMPath;}}function SetSize(w,h){VNSize[0]=w;VNSize[1]=h;}function StoryBoxPosition(x,y){StoryBox[0]=[x,y];}function StoryBoxSize(w,h){StoryBox[1]=[w,h];}function DecisionBox(offset,height,fontsize){Decision=[offset,height,fontsize];}function DecisionNormal(bg,txt,br){DecisionNor=[bg,txt,br];}function DecisionHover(bg,txt,br){DecisionHov=[bg,txt,br];}function TextCustomize(col,fontsize,bold,italic,underline){textcustom=[col,fontsize,bold,italic,underline];}function StoryBoxBG(col,opa){BoxMask=[col,opa];}

//UI Style customization
//You can edit and set value for your VN here
ImagePath="images/";
BGMPath="bgm/";
SetSize(800,600);  //VN Resolution   Recommend at 800x600
AutoCenter=true;   //Enable AutoCenter to make your VN still on center of screen
ResetDelay=500;   //AutoCenter Calibrate rate [milliseconds]
ImageSpeed=2;   //Animation render rate
EnableSkip=true;   //Enable Skipper for fast forward
StoryBoxPosition(20,430);   //Story Box Position
StoryBoxSize(760,150);   //Story Box Size
StoryBoxBG("#000000",50)   //Story Box Background
CustomCode = "<div style=\"position:absolute;left:0px;top:10px;width:800px;height:20px;z-index:2;\"><center><a href=\"#\" style=\"color:#ffffff;\">Back to main menu</a></center></div>";   //Custom Code for extra menu or object
DecisionBox(40,30,3);   //Offset Height Size
DecisionNormal("#ffaaaa","#000000","1px solid #ff0000");
DecisionHover("#ffcccc","#000000","1px solid #ffffff");
TextCustomize("#ffffff",3,false,false,false);
