/** @license


 SoundManager 2: JavaScript Sound for the Web
 ----------------------------------------------
 http://schillmania.com/projects/soundmanager2/

 Copyright (c) 2007, Scott Schiller. All rights reserved.
 Code provided under the BSD License:
 http://schillmania.com/projects/soundmanager2/license.txt

 V2.97a.20111030
*/
(function(R){function S(S,ea){function k(b){return function(a){return!this._t||!this._t._a?(this._t&&this._t.sID?c._wD(h+"ignoring "+a.type+": "+this._t.sID):c._wD(h+"ignoring "+a.type),null):b.call(this,a)}}this.flashVersion=8;this.debugMode=!0;this.debugFlash=!1;this.useConsole=!0;this.waitForWindowLoad=this.consoleOnly=!1;this.bgColor="#ffffff";this.useHighPerformance=!1;this.flashPollingInterval=null;this.flashLoadTimeout=1E3;this.wmode=null;this.allowScriptAccess="always";this.useFlashBlock=
!1;this.useHTML5Audio=!0;this.html5Test=/^(probably|maybe)$/i;this.preferFlash=!0;this.audioFormats={mp3:{type:['audio/mpeg; codecs="mp3"',"audio/mpeg","audio/mp3","audio/MPA","audio/mpa-robust"],required:!0},mp4:{related:["aac","m4a"],type:['audio/mp4; codecs="mp4a.40.2"',"audio/aac","audio/x-m4a","audio/MP4A-LATM","audio/mpeg4-generic"],required:!1},ogg:{type:["audio/ogg; codecs=vorbis"],required:!1},wav:{type:['audio/wav; codecs="1"',"audio/wav","audio/wave","audio/x-wav"],required:!1}};this.defaultOptions=
{autoLoad:!1,stream:!0,autoPlay:!1,loops:1,onid3:null,onload:null,whileloading:null,onplay:null,onpause:null,onresume:null,whileplaying:null,onstop:null,onfailure:null,onfinish:null,multiShot:!0,multiShotEvents:!1,position:null,pan:0,type:null,usePolicyFile:!1,volume:100};this.flash9Options={isMovieStar:null,usePeakData:!1,useWaveformData:!1,useEQData:!1,onbufferchange:null,ondataerror:null};this.movieStarOptions={bufferTime:3,serverURL:null,onconnect:null,duration:null};this.movieID="sm2-container";
this.id=ea||"sm2movie";this.swfCSS={swfBox:"sm2-object-box",swfDefault:"movieContainer",swfError:"swf_error",swfTimedout:"swf_timedout",swfLoaded:"swf_loaded",swfUnblocked:"swf_unblocked",sm2Debug:"sm2_debug",highPerf:"high_performance",flashDebug:"flash_debug"};this.debugID="soundmanager-debug";this.debugURLParam=/([#?&])debug=1/i;this.versionNumber="V2.97a.20110918";this.movieURL=this.version=null;this.url=S||null;this.altURL=null;this.enabled=this.swfLoaded=!1;this.oMC=this.o=null;this.sounds=
{};this.soundIDs=[];this.didFlashBlock=this.specialWmodeCase=this.muted=!1;this.filePattern=null;this.filePatterns={flash8:/\.mp3(\?.*)?$/i,flash9:/\.mp3(\?.*)?$/i};this.features={buffering:!1,peakData:!1,waveformData:!1,eqData:!1,movieStar:!1};this.sandbox={type:null,types:{remote:"remote (domain-based) rules",localWithFile:"local with file access (no internet access)",localWithNetwork:"local with network (internet access only, no local access)",localTrusted:"local, trusted (local+internet access)"},
description:null,noRemote:null,noLocal:null};this.hasHTML5=typeof Audio!=="undefined"&&typeof(new Audio).canPlayType!=="undefined";this.html5={usingFlash:null};this.flash={};this.ignoreFlash=this.html5Only=!1;var xa,c=this,h="HTML5::",u,r=navigator.userAgent,i=R,J=i.location.href.toString(),g=document,fa,T,j,y=[],ga=!0,q,K=!1,L=!1,m=!1,v=!1,ha=!1,l,Pa=0,M,s,ia,C,D,U,ya,ja,B,V,W,E,ka,X,Y,F,za,la,Qa=["log","info","warn","error"],Aa,Z,Ba,N=null,ma=null,n,na,G,Ca,$,aa,oa,o,ba=!1,pa=!1,Da,Ea,w=null,Fa,
ca,O,z,qa,ra,Ga,p,Ha=Array.prototype.slice,P=!1,t,da,Ia,x,Ja,sa=r.match(/(ipad|iphone|ipod)/i),Ra=r.match(/(mobile|pre\/|xoom)/i)||sa,A=r.match(/msie/i),Sa=r.match(/webkit/i),Q=r.match(/safari/i)&&!r.match(/chrome/i),Ta=r.match(/opera/i),ta=!J.match(/usehtml5audio/i)&&!J.match(/sm2\-ignorebadua/i)&&Q&&r.match(/OS X 10_6_([3-7])/i),ua=typeof console!=="undefined"&&typeof console.log!=="undefined",va=typeof g.hasFocus!=="undefined"?g.hasFocus():null,H=Q&&typeof g.hasFocus==="undefined",Ka=!H,La=/(mp3|mp4|mpa)/i,
I=g.location?g.location.protocol.match(/http/i):null,Ma=!I?"http://":"",Na=/^\s*audio\/(?:x-)?(?:mpeg4|aac|flv|mov|mp4||m4v|m4a|mp4v|3gp|3g2)\s*(?:$|;)/i,Oa=["mpeg4","aac","flv","mov","mp4","m4v","f4v","m4a","mp4v","3gp","3g2"],Ua=RegExp("\\.("+Oa.join("|")+")(\\?.*)?$","i");this.mimePattern=/^\s*audio\/(?:x-)?(?:mp(?:eg|3))\s*(?:$|;)/i;this.useAltURL=!I;this._global_a=null;if(Ra&&(c.useHTML5Audio=!0,c.preferFlash=!1,sa))P=c.ignoreFlash=!0;this.supported=this.ok=function(){return w?m&&!v:c.useHTML5Audio&&
c.hasHTML5};this.getMovie=function(c){return u(c)||g[c]||i[c]};this.createSound=function(b){function a(){e=$(e);c.sounds[d.id]=new xa(d);c.soundIDs.push(d.id);return c.sounds[d.id]}var e=null,f=null,d=null;if(!m||!c.ok())return oa("soundManager.createSound(): "+n(!m?"notReady":"notOK")),!1;arguments.length===2&&(b={id:arguments[0],url:arguments[1]});d=e=s(b);d.id.toString().charAt(0).match(/^[0-9]$/)&&c._wD("soundManager.createSound(): "+n("badID",d.id),2);c._wD("soundManager.createSound(): "+d.id+
" ("+d.url+")",1);if(o(d.id,!0))return c._wD("soundManager.createSound(): "+d.id+" exists",1),c.sounds[d.id];if(ca(d))f=a(),c._wD("Loading sound "+d.id+" via HTML5"),f._setup_html5(d);else{if(j>8){if(d.isMovieStar===null)d.isMovieStar=d.serverURL||(d.type?d.type.match(Na):!1)||d.url.match(Ua);d.isMovieStar&&c._wD("soundManager.createSound(): using MovieStar handling");if(d.isMovieStar){if(d.usePeakData)l("noPeak"),d.usePeakData=!1;d.loops>1&&l("noNSLoop")}}d=aa(d,"soundManager.createSound(): ");f=
a();if(j===8)c.o._createSound(d.id,d.loops||1,d.usePolicyFile);else if(c.o._createSound(d.id,d.url,d.usePeakData,d.useWaveformData,d.useEQData,d.isMovieStar,d.isMovieStar?d.bufferTime:!1,d.loops||1,d.serverURL,d.duration||null,d.autoPlay,!0,d.autoLoad,d.usePolicyFile),!d.serverURL)f.connected=!0,d.onconnect&&d.onconnect.apply(f);!d.serverURL&&(d.autoLoad||d.autoPlay)&&f.load(d)}!d.serverURL&&d.autoPlay&&f.play();return f};this.destroySound=function(b,a){if(!o(b))return!1;var e=c.sounds[b],f;e._iO=
{};e.stop();e.unload();for(f=0;f<c.soundIDs.length;f++)if(c.soundIDs[f]===b){c.soundIDs.splice(f,1);break}a||e.destruct(!0);delete c.sounds[b];return!0};this.load=function(b,a){return!o(b)?!1:c.sounds[b].load(a)};this.unload=function(b){return!o(b)?!1:c.sounds[b].unload()};this.onposition=function(b,a,e,f){return!o(b)?!1:c.sounds[b].onposition(a,e,f)};this.start=this.play=function(b,a){return!m||!c.ok()?(oa("soundManager.play(): "+n(!m?"notReady":"notOK")),!1):!o(b)?(a instanceof Object||(a={url:a}),
a&&a.url?(c._wD('soundManager.play(): attempting to create "'+b+'"',1),a.id=b,c.createSound(a).play()):!1):c.sounds[b].play(a)};this.setPosition=function(b,a){return!o(b)?!1:c.sounds[b].setPosition(a)};this.stop=function(b){if(!o(b))return!1;c._wD("soundManager.stop("+b+")",1);return c.sounds[b].stop()};this.stopAll=function(){var b;c._wD("soundManager.stopAll()",1);for(b in c.sounds)c.sounds.hasOwnProperty(b)&&c.sounds[b].stop()};this.pause=function(b){return!o(b)?!1:c.sounds[b].pause()};this.pauseAll=
function(){var b;for(b=c.soundIDs.length;b--;)c.sounds[c.soundIDs[b]].pause()};this.resume=function(b){return!o(b)?!1:c.sounds[b].resume()};this.resumeAll=function(){var b;for(b=c.soundIDs.length;b--;)c.sounds[c.soundIDs[b]].resume()};this.togglePause=function(b){return!o(b)?!1:c.sounds[b].togglePause()};this.setPan=function(b,a){return!o(b)?!1:c.sounds[b].setPan(a)};this.setVolume=function(b,a){return!o(b)?!1:c.sounds[b].setVolume(a)};this.mute=function(b){var a=0;typeof b!=="string"&&(b=null);if(b){if(!o(b))return!1;
c._wD('soundManager.mute(): Muting "'+b+'"');return c.sounds[b].mute()}else{c._wD("soundManager.mute(): Muting all sounds");for(a=c.soundIDs.length;a--;)c.sounds[c.soundIDs[a]].mute();c.muted=!0}return!0};this.muteAll=function(){c.mute()};this.unmute=function(b){typeof b!=="string"&&(b=null);if(b){if(!o(b))return!1;c._wD('soundManager.unmute(): Unmuting "'+b+'"');return c.sounds[b].unmute()}else{c._wD("soundManager.unmute(): Unmuting all sounds");for(b=c.soundIDs.length;b--;)c.sounds[c.soundIDs[b]].unmute();
c.muted=!1}return!0};this.unmuteAll=function(){c.unmute()};this.toggleMute=function(b){return!o(b)?!1:c.sounds[b].toggleMute()};this.getMemoryUse=function(){var b=0;c.o&&j!==8&&(b=parseInt(c.o._getMemoryUse(),10));return b};this.disable=function(b){var a;typeof b==="undefined"&&(b=!1);if(v)return!1;v=!0;l("shutdown",1);for(a=c.soundIDs.length;a--;)Aa(c.sounds[c.soundIDs[a]]);M(b);p.remove(i,"load",D);return!0};this.canPlayMIME=function(b){var a;c.hasHTML5&&(a=O({type:b}));return!w||a?a:b?!!(j>8&&
b.match(Na)||b.match(c.mimePattern)):null};this.canPlayURL=function(b){var a;c.hasHTML5&&(a=O({url:b}));return!w||a?a:b?!!b.match(c.filePattern):null};this.canPlayLink=function(b){return typeof b.type!=="undefined"&&b.type&&c.canPlayMIME(b.type)?!0:c.canPlayURL(b.href)};this.getSoundById=function(b,a){if(!b)throw Error("soundManager.getSoundById(): sID is null/undefined");var e=c.sounds[b];!e&&!a&&c._wD('"'+b+'" is an invalid sound ID.',2);return e};this.onready=function(b,a){if(b&&b instanceof Function)return m&&
c._wD(n("queue","onready")),a||(a=i),ia("onready",b,a),C(),!0;else throw n("needFunction","onready");};this.ontimeout=function(b,a){if(b&&b instanceof Function)return m&&c._wD(n("queue","ontimeout")),a||(a=i),ia("ontimeout",b,a),C({type:"ontimeout"}),!0;else throw n("needFunction","ontimeout");};this._wD=this._writeDebug=function(b,a,e){var f,d;if(!c.debugMode)return!1;typeof e!=="undefined"&&e&&(b=b+" | "+(new Date).getTime());if(ua&&c.useConsole){e=Qa[a];if(typeof console[e]!=="undefined")console[e](b);
else console.log(b);if(c.useConsoleOnly)return!0}try{f=u("soundmanager-debug");if(!f)return!1;d=g.createElement("div");if(++Pa%2===0)d.className="sm2-alt";a=typeof a==="undefined"?0:parseInt(a,10);d.appendChild(g.createTextNode(b));if(a){if(a>=2)d.style.fontWeight="bold";if(a===3)d.style.color="#ff3333"}f.insertBefore(d,f.firstChild)}catch(Va){}return!0};this._debug=function(){var b,a;l("currentObj",1);b=0;for(a=c.soundIDs.length;b<a;b++)c.sounds[c.soundIDs[b]]._debug()};this.reboot=function(){c._wD("soundManager.reboot()");
c.soundIDs.length&&c._wD("Destroying "+c.soundIDs.length+" SMSound objects...");var b,a;for(b=c.soundIDs.length;b--;)c.sounds[c.soundIDs[b]].destruct();try{if(A)ma=c.o.innerHTML;N=c.o.parentNode.removeChild(c.o);c._wD("Flash movie removed.")}catch(e){l("badRemove",2)}ma=N=w=null;c.enabled=ka=m=ba=pa=K=L=v=c.swfLoaded=!1;c.soundIDs=c.sounds=[];c.o=null;for(b in y)if(y.hasOwnProperty(b))for(a=y[b].length;a--;)y[b][a].fired=!1;c._wD("soundManager: Rebooting...");i.setTimeout(c.beginDelayedInit,20)};
this.getMoviePercent=function(){return c.o&&typeof c.o.PercentLoaded!=="undefined"?c.o.PercentLoaded():null};this.beginDelayedInit=function(){ha=!0;E();setTimeout(function(){if(pa)return!1;Y();W();return pa=!0},20);U()};this.destruct=function(){c._wD("soundManager.destruct()");c.disable(!0)};xa=function(b){var a=this,e,f,d;this.sID=b.id;this.url=b.url;this._iO=this.instanceOptions=this.options=s(b);this.pan=this.options.pan;this.volume=this.options.volume;this._lastURL=null;this.isHTML5=!1;this._a=
null;this.id3={};this._debug=function(){if(c.debugMode){var b=null,d=[],e,f;for(b in a.options)a.options[b]!==null&&(a.options[b]instanceof Function?(e=a.options[b].toString(),e=e.replace(/\s\s+/g," "),f=e.indexOf("{"),d.push(" "+b+": {"+e.substr(f+1,Math.min(Math.max(e.indexOf("\n")-1,64),64)).replace(/\n/g,"")+"... }")):d.push(" "+b+": "+a.options[b]));c._wD("SMSound() merged options: {\n"+d.join(", \n")+"\n}")}};this._debug();this.load=function(b){var d=null;if(typeof b!=="undefined")a._iO=s(b,
a.options),a.instanceOptions=a._iO;else if(b=a.options,a._iO=b,a.instanceOptions=a._iO,a._lastURL&&a._lastURL!==a.url)l("manURL"),a._iO.url=a.url,a.url=null;if(!a._iO.url)a._iO.url=a.url;c._wD("SMSound.load(): "+a._iO.url,1);if(a._iO.url===a.url&&a.readyState!==0&&a.readyState!==2)return l("onURL",1),a;a._lastURL=a.url;a.loaded=!1;a.readyState=1;a.playState=0;if(ca(a._iO))d=a._setup_html5(a._iO),d._called_load?c._wD(h+"ignoring request to load again: "+a.sID):(c._wD(h+"load: "+a.sID),a._html5_canplay=
!1,d.load(),d._called_load=!0,a._iO.autoPlay&&a.play());else try{a.isHTML5=!1,a._iO=aa($(a._iO)),j===8?c.o._load(a.sID,a._iO.url,a._iO.stream,a._iO.autoPlay,a._iO.whileloading?1:0,a._iO.loops||1,a._iO.usePolicyFile):c.o._load(a.sID,a._iO.url,!!a._iO.stream,!!a._iO.autoPlay,a._iO.loops||1,!!a._iO.autoLoad,a._iO.usePolicyFile)}catch(e){l("smError",2),q("onload",!1),F({type:"SMSOUND_LOAD_JS_EXCEPTION",fatal:!0})}return a};this.unload=function(){a.readyState!==0&&(c._wD('SMSound.unload(): "'+a.sID+'"'),
a.isHTML5?(f(),a._a&&(a._a.pause(),qa(a._a))):j===8?c.o._unload(a.sID,"about:blank"):c.o._unload(a.sID),e());return a};this.destruct=function(b){c._wD('SMSound.destruct(): "'+a.sID+'"');if(a.isHTML5){if(f(),a._a)a._a.pause(),qa(a._a),P||a._remove_html5_events(),a._a._t=null,a._a=null}else a._iO.onfailure=null,c.o._destroySound(a.sID);b||c.destroySound(a.sID,!0)};this.start=this.play=function(b,e){var f,e=e===void 0?!0:e;b||(b={});a._iO=s(b,a._iO);a._iO=s(a._iO,a.options);a.instanceOptions=a._iO;if(a._iO.serverURL&&
!a.connected)return a.getAutoPlay()||(c._wD("SMSound.play():  Netstream not connected yet - setting autoPlay"),a.setAutoPlay(!0)),a;ca(a._iO)&&(a._setup_html5(a._iO),d());if(a.playState===1&&!a.paused)if(f=a._iO.multiShot)c._wD('SMSound.play(): "'+a.sID+'" already playing (multi-shot)',1);else return c._wD('SMSound.play(): "'+a.sID+'" already playing (one-shot)',1),a;if(a.loaded)c._wD('SMSound.play(): "'+a.sID+'"');else if(a.readyState===0){c._wD('SMSound.play(): Attempting to load "'+a.sID+'"',1);
if(!a.isHTML5)a._iO.autoPlay=!0;a.load(a._iO)}else if(a.readyState===2)return c._wD('SMSound.play(): Could not load "'+a.sID+'" - exiting',2),a;else c._wD('SMSound.play(): "'+a.sID+'" is loading - attempting to play..',1);if(!a.isHTML5&&j===9&&a.position>0&&a.position===a.duration)c._wD('SMSound.play(): "'+a.sID+'": Sound at end, resetting to position:0'),a._iO.position=0;if(a.paused&&a.position&&a.position>0)c._wD('SMSound.play(): "'+a.sID+'" is resuming from paused state',1),a.resume();else{c._wD('SMSound.play(): "'+
a.sID+'" is starting to play');a.playState=1;a.paused=!1;(!a.instanceCount||a._iO.multiShotEvents||!a.isHTML5&&j>8&&!a.getAutoPlay())&&a.instanceCount++;a.position=typeof a._iO.position!=="undefined"&&!isNaN(a._iO.position)?a._iO.position:0;if(!a.isHTML5)a._iO=aa($(a._iO));if(a._iO.onplay&&e)a._iO.onplay.apply(a),a._onplay_called=!0;a.setVolume(a._iO.volume,!0);a.setPan(a._iO.pan,!0);a.isHTML5?(d(),f=a._setup_html5(),a.setPosition(a._iO.position),f.play()):c.o._start(a.sID,a._iO.loops||1,j===9?a._iO.position:
a._iO.position/1E3)}return a};this.stop=function(b){if(a.playState===1){a._onbufferchange(0);a.resetOnPosition(0);a.paused=!1;if(!a.isHTML5)a.playState=0;a._iO.onstop&&a._iO.onstop.apply(a);if(a.isHTML5){if(a._a)a.setPosition(0),a._a.pause(),a.playState=0,a._onTimer(),f()}else c.o._stop(a.sID,b),a._iO.serverURL&&a.unload();a.instanceCount=0;a._iO={}}return a};this.setAutoPlay=function(b){c._wD("sound "+a.sID+" turned autoplay "+(b?"on":"off"));a._iO.autoPlay=b;a.isHTML5||(c.o._setAutoPlay(a.sID,b),
b&&!a.instanceCount&&a.readyState===1&&(a.instanceCount++,c._wD("sound "+a.sID+" incremented instance count to "+a.instanceCount)))};this.getAutoPlay=function(){return a._iO.autoPlay};this.setPosition=function(b){b===void 0&&(b=0);var d=a.isHTML5?Math.max(b,0):Math.min(a.duration||a._iO.duration,Math.max(b,0));a.position=d;b=a.position/1E3;a.resetOnPosition(a.position);a._iO.position=d;if(a.isHTML5){if(a._a)if(a._html5_canplay){if(a._a.currentTime!==b){c._wD("setPosition("+b+"): setting position");
try{a._a.currentTime=b,(a.playState===0||a.paused)&&a._a.pause()}catch(e){c._wD("setPosition("+b+"): setting position failed: "+e.message,2)}}}else c._wD("setPosition("+b+"): delaying, sound not ready")}else b=j===9?a.position:b,a.readyState&&a.readyState!==2&&c.o._setPosition(a.sID,b,a.paused||!a.playState);a.isHTML5&&a.paused&&a._onTimer(!0);return a};this.pause=function(b){if(a.paused||a.playState===0&&a.readyState!==1)return a;c._wD("SMSound.pause()");a.paused=!0;a.isHTML5?(a._setup_html5().pause(),
f()):(b||b===void 0)&&c.o._pause(a.sID);a._iO.onpause&&a._iO.onpause.apply(a);return a};this.resume=function(){if(!a.paused)return a;c._wD("SMSound.resume()");a.paused=!1;a.playState=1;a.isHTML5?(a._setup_html5().play(),d()):(a._iO.isMovieStar&&a.setPosition(a.position),c.o._pause(a.sID));!a._onplay_called&&a._iO.onplay?(a._iO.onplay.apply(a),a._onplay_called=!0):a._iO.onresume&&a._iO.onresume.apply(a);return a};this.togglePause=function(){c._wD("SMSound.togglePause()");if(a.playState===0)return a.play({position:j===
9&&!a.isHTML5?a.position:a.position/1E3}),a;a.paused?a.resume():a.pause();return a};this.setPan=function(b,d){typeof b==="undefined"&&(b=0);typeof d==="undefined"&&(d=!1);a.isHTML5||c.o._setPan(a.sID,b);a._iO.pan=b;if(!d)a.pan=b,a.options.pan=b;return a};this.setVolume=function(b,d){typeof b==="undefined"&&(b=100);typeof d==="undefined"&&(d=!1);if(a.isHTML5){if(a._a)a._a.volume=Math.max(0,Math.min(1,b/100))}else c.o._setVolume(a.sID,c.muted&&!a.muted||a.muted?0:b);a._iO.volume=b;if(!d)a.volume=b,
a.options.volume=b;return a};this.mute=function(){a.muted=!0;if(a.isHTML5){if(a._a)a._a.muted=!0}else c.o._setVolume(a.sID,0);return a};this.unmute=function(){a.muted=!1;var b=typeof a._iO.volume!=="undefined";if(a.isHTML5){if(a._a)a._a.muted=!1}else c.o._setVolume(a.sID,b?a._iO.volume:a.options.volume);return a};this.toggleMute=function(){return a.muted?a.unmute():a.mute()};this.onposition=function(c,b,d){a._onPositionItems.push({position:c,method:b,scope:typeof d!=="undefined"?d:a,fired:!1});return a};
this.processOnPosition=function(){var b,d;b=a._onPositionItems.length;if(!b||!a.playState||a._onPositionFired>=b)return!1;for(;b--;)if(d=a._onPositionItems[b],!d.fired&&a.position>=d.position)d.fired=!0,c._onPositionFired++,d.method.apply(d.scope,[d.position]);return!0};this.resetOnPosition=function(b){var d,e;d=a._onPositionItems.length;if(!d)return!1;for(;d--;)if(e=a._onPositionItems[d],e.fired&&b<=e.position)e.fired=!1,c._onPositionFired--;return!0};d=function(){a.isHTML5&&Da(a)};f=function(){a.isHTML5&&
Ea(a)};e=function(){a._onPositionItems=[];a._onPositionFired=0;a._hasTimer=null;a._onplay_called=!1;a._a=null;a._html5_canplay=!1;a.bytesLoaded=null;a.bytesTotal=null;a.position=null;a.duration=a._iO&&a._iO.duration?a._iO.duration:null;a.durationEstimate=null;a.failures=0;a.loaded=!1;a.playState=0;a.paused=!1;a.readyState=0;a.muted=!1;a.isBuffering=!1;a.instanceOptions={};a.instanceCount=0;a.peakData={left:0,right:0};a.waveformData={left:[],right:[]};a.eqData=[];a.eqData.left=[];a.eqData.right=[]};
e();this._onTimer=function(b){var d={};if(a._hasTimer||b)return a._a&&(b||(a.playState>0||a.readyState===1)&&!a.paused)?(a.duration=a._get_html5_duration(),a.durationEstimate=a.duration,b=a._a.currentTime?a._a.currentTime*1E3:0,a._whileplaying(b,d,d,d,d),!0):(c._wD('_onTimer: Warn for "'+a.sID+'": '+(!a._a?"Could not find element. ":"")+(a.playState===0?"playState bad, 0?":"playState = "+a.playState+", OK")),!1)};this._get_html5_duration=function(){var c=a._a?a._a.duration*1E3:a._iO?a._iO.duration:
void 0;return c&&!isNaN(c)&&c!==Infinity?c:a._iO?a._iO.duration:null};this._setup_html5=function(b){var b=s(a._iO,b),d=P?c._global_a:a._a,f=decodeURI(b.url),g=d&&d._t?d._t.instanceOptions:null;if(d){if(d._t&&g.url===b.url&&(!a._lastURL||a._lastURL===g.url))return d;c._wD("setting new URL on existing object: "+f+(a._lastURL?", old URL: "+a._lastURL:""));P&&d._t&&d._t.playState&&b.url!==g.url&&d._t.stop();e();d.src=b.url;a.url=b.url;a._lastURL=b.url;d._called_load=!1}else if(c._wD("creating HTML5 Audio() element with URL: "+
f),d=new Audio(b.url),d._called_load=!1,P)c._global_a=d;a.isHTML5=!0;a._a=d;d._t=a;a._add_html5_events();d.loop=b.loops>1?"loop":"";b.autoLoad||b.autoPlay?(d.autobuffer="auto",d.preload="auto",a.load(),d._called_load=!0):(d.autobuffer=!1,d.preload="none");d.loop=b.loops>1?"loop":"";return d};this._add_html5_events=function(){if(a._a._added_events)return!1;var b;c._wD(h+"adding event listeners: "+a.sID);a._a._added_events=!0;for(b in x)x.hasOwnProperty(b)&&a._a&&a._a.addEventListener(b,x[b],!1);return!0};
this._remove_html5_events=function(){var b;c._wD(h+"removing event listeners: "+a.sID);a._a._added_events=!1;for(b in x)x.hasOwnProperty(b)&&a._a&&a._a.removeEventListener(b,x[b],!1)};this._onload=function(b){b=!!b;c._wD('SMSound._onload(): "'+a.sID+'"'+(b?" loaded.":" failed to load? - "+a.url),b?1:2);!b&&!a.isHTML5&&(c.sandbox.noRemote===!0&&c._wD("SMSound._onload(): "+n("noNet"),1),c.sandbox.noLocal===!0&&c._wD("SMSound._onload(): "+n("noLocal"),1));a.loaded=b;a.readyState=b?3:2;a._onbufferchange(0);
a._iO.onload&&a._iO.onload.apply(a,[b]);return!0};this._onbufferchange=function(b){if(a.playState===0)return!1;if(b&&a.isBuffering||!b&&!a.isBuffering)return!1;a.isBuffering=b===1;a._iO.onbufferchange&&(c._wD("SMSound._onbufferchange(): "+b),a._iO.onbufferchange.apply(a));return!0};this._onfailure=function(b,d,e){a.failures++;c._wD('SMSound._onfailure(): "'+a.sID+'" count '+a.failures);if(a._iO.onfailure&&a.failures===1)a._iO.onfailure(a,b,d,e);else c._wD("SMSound._onfailure(): ignoring")};this._onfinish=
function(){var b=a._iO.onfinish;a._onbufferchange(0);a.resetOnPosition(0);if(a.instanceCount){a.instanceCount--;if(!a.instanceCount)a.playState=0,a.paused=!1,a.instanceCount=0,a.instanceOptions={},a._iO={},f();if((!a.instanceCount||a._iO.multiShotEvents)&&b)c._wD('SMSound._onfinish(): "'+a.sID+'"'),b.apply(a)}};this._whileloading=function(c,b,d,e){a.bytesLoaded=c;a.bytesTotal=b;a.duration=Math.floor(d);a.bufferLength=e;if(a._iO.isMovieStar)a.durationEstimate=a.duration;else if(a.durationEstimate=
a._iO.duration?a.duration>a._iO.duration?a.duration:a._iO.duration:parseInt(a.bytesTotal/a.bytesLoaded*a.duration,10),a.durationEstimate===void 0)a.durationEstimate=a.duration;a.readyState!==3&&a._iO.whileloading&&a._iO.whileloading.apply(a)};this._whileplaying=function(c,b,d,e,f){if(isNaN(c)||c===null)return!1;a.position=c;a.processOnPosition();if(!a.isHTML5&&j>8){if(a._iO.usePeakData&&typeof b!=="undefined"&&b)a.peakData={left:b.leftPeak,right:b.rightPeak};if(a._iO.useWaveformData&&typeof d!=="undefined"&&
d)a.waveformData={left:d.split(","),right:e.split(",")};if(a._iO.useEQData&&typeof f!=="undefined"&&f&&f.leftEQ&&(c=f.leftEQ.split(","),a.eqData=c,a.eqData.left=c,typeof f.rightEQ!=="undefined"&&f.rightEQ))a.eqData.right=f.rightEQ.split(",")}a.playState===1&&(!a.isHTML5&&j===8&&!a.position&&a.isBuffering&&a._onbufferchange(0),a._iO.whileplaying&&a._iO.whileplaying.apply(a));return!0};this._onid3=function(b,d){c._wD('SMSound._onid3(): "'+this.sID+'" ID3 data received.');var e=[],f,g;f=0;for(g=b.length;f<
g;f++)e[b[f]]=d[f];a.id3=s(a.id3,e);a._iO.onid3&&a._iO.onid3.apply(a)};this._onconnect=function(b){b=b===1;c._wD('SMSound._onconnect(): "'+a.sID+'"'+(b?" connected.":" failed to connect? - "+a.url),b?1:2);if(a.connected=b)a.failures=0,o(a.sID)&&(a.getAutoPlay()?a.play(void 0,a.getAutoPlay()):a._iO.autoLoad&&a.load()),a._iO.onconnect&&a._iO.onconnect.apply(a,[b])};this._ondataerror=function(b){a.playState>0&&(c._wD("SMSound._ondataerror(): "+b),a._iO.ondataerror&&a._iO.ondataerror.apply(a))}};X=function(){return g.body||
g._docElement||g.getElementsByTagName("div")[0]};u=function(b){return g.getElementById(b)};s=function(b,a){var e={},f,d;for(f in b)b.hasOwnProperty(f)&&(e[f]=b[f]);f=typeof a==="undefined"?c.defaultOptions:a;for(d in f)f.hasOwnProperty(d)&&typeof e[d]==="undefined"&&(e[d]=f[d]);return e};p=function(){function b(a){var a=Ha.call(a),b=a.length;c?(a[1]="on"+a[1],b>3&&a.pop()):b===3&&a.push(!1);return a}function a(a,b){var g=a.shift(),j=[f[b]];if(c)g[j](a[0],a[1]);else g[j].apply(g,a)}var c=i.attachEvent,
f={add:c?"attachEvent":"addEventListener",remove:c?"detachEvent":"removeEventListener"};return{add:function(){a(b(arguments),"add")},remove:function(){a(b(arguments),"remove")}}}();x={abort:k(function(){c._wD(h+"abort: "+this._t.sID)}),canplay:k(function(){if(this._t._html5_canplay)return!0;this._t._html5_canplay=!0;c._wD(h+"canplay: "+this._t.sID+", "+this._t.url);this._t._onbufferchange(0);var b=!isNaN(this._t.position)?this._t.position/1E3:null;if(this._t.position&&this.currentTime!==b){c._wD(h+
"canplay: setting position to "+b);try{this.currentTime=b}catch(a){c._wD(h+"setting position failed: "+a.message,2)}}}),load:k(function(){this._t.loaded||(this._t._onbufferchange(0),this._t._whileloading(this._t.bytesTotal,this._t.bytesTotal,this._t._get_html5_duration()),this._t._onload(!0))}),emptied:k(function(){c._wD(h+"emptied: "+this._t.sID)}),ended:k(function(){c._wD(h+"ended: "+this._t.sID);this._t._onfinish()}),error:k(function(){c._wD(h+"error: "+this.error.code);this._t._onload(!1)}),loadeddata:k(function(){var b=
this._t,a=b.bytesTotal||1;c._wD(h+"loadeddata: "+this._t.sID);if(!b._loaded&&!Q)b.duration=b._get_html5_duration(),b._whileloading(a,a,b._get_html5_duration()),b._onload(!0)}),loadedmetadata:k(function(){c._wD(h+"loadedmetadata: "+this._t.sID)}),loadstart:k(function(){c._wD(h+"loadstart: "+this._t.sID);this._t._onbufferchange(1)}),play:k(function(){c._wD(h+"play: "+this._t.sID+", "+this._t.url);this._t._onbufferchange(0)}),playing:k(function(){c._wD(h+"playing: "+this._t.sID+", "+this._t.url);this._t._onbufferchange(0)}),
progress:k(function(b){if(this._t.loaded)return!1;var a,e,f;f=0;var d=b.type==="progress";e=b.target.buffered;var g=b.loaded||0,wa=b.total||1;if(e&&e.length){for(a=e.length;a--;)f=e.end(a)-e.start(a);g=f/b.target.duration;if(d&&e.length>1){f=[];e=e.length;for(a=0;a<e;a++)f.push(b.target.buffered.start(a)+"-"+b.target.buffered.end(a));c._wD(h+"progress: timeRanges: "+f.join(", "))}d&&!isNaN(g)&&c._wD(h+"progress: "+this._t.sID+": "+Math.floor(g*100)+"% loaded")}isNaN(g)||(this._t._onbufferchange(0),
this._t._whileloading(g,wa,this._t._get_html5_duration()),g&&wa&&g===wa&&x.load.call(this,b))}),ratechange:k(function(){c._wD(h+"ratechange: "+this._t.sID)}),suspend:k(function(b){c._wD(h+"suspend: "+this._t.sID);x.progress.call(this,b)}),stalled:k(function(){c._wD(h+"stalled: "+this._t.sID)}),timeupdate:k(function(){this._t._onTimer()}),waiting:k(function(){c._wD(h+"waiting: "+this._t.sID);this._t._onbufferchange(1)})};ca=function(b){return!b.serverURL&&(b.type?O({type:b.type}):O({url:b.url})||c.html5Only)};
qa=function(b){if(b)b.src=r.match(/gecko/i)?"":"about:blank"};O=function(b){function a(a){return c.preferFlash&&t&&!c.ignoreFlash&&typeof c.flash[a]!=="undefined"&&c.flash[a]}if(!c.useHTML5Audio||!c.hasHTML5)return!1;var e=b.url||null,b=b.type||null,f=c.audioFormats,d;if(b&&c.html5[b]!=="undefined")return c.html5[b]&&!a(b);if(!z){z=[];for(d in f)f.hasOwnProperty(d)&&(z.push(d),f[d].related&&(z=z.concat(f[d].related)));z=RegExp("\\.("+z.join("|")+")(\\?.*)?$","i")}d=e?e.toLowerCase().match(z):null;
if(!d||!d.length)if(b)e=b.indexOf(";"),d=(e!==-1?b.substr(0,e):b).substr(6);else return!1;else d=d[1];return d&&typeof c.html5[d]!=="undefined"?c.html5[d]&&!a(d):(b="audio/"+d,e=c.html5.canPlayType({type:b}),(c.html5[d]=e)&&c.html5[b]&&!a(b))};Ga=function(){function b(b){var d,e,f=!1;if(!a||typeof a.canPlayType!=="function")return!1;if(b instanceof Array){d=0;for(e=b.length;d<e&&!f;d++)if(c.html5[b[d]]||a.canPlayType(b[d]).match(c.html5Test))f=!0,c.html5[b[d]]=!0,c.flash[b[d]]=!(!c.preferFlash||!t||
!b[d].match(La));return f}else return b=a&&typeof a.canPlayType==="function"?a.canPlayType(b):!1,!(!b||!b.match(c.html5Test))}if(!c.useHTML5Audio||typeof Audio==="undefined")return!1;var a=typeof Audio!=="undefined"?Ta?new Audio(null):new Audio:null,e,f={},d,g;d=c.audioFormats;for(e in d)if(d.hasOwnProperty(e)&&(f[e]=b(d[e].type),f["audio/"+e]=f[e],c.flash[e]=c.preferFlash&&!c.ignoreFlash&&e.match(La)?!0:!1,d[e]&&d[e].related))for(g=d[e].related.length;g--;)f["audio/"+d[e].related[g]]=f[e],c.html5[d[e].related[g]]=
f[e],c.flash[d[e].related[g]]=f[e];f.canPlayType=a?b:null;c.html5=s(c.html5,f);return!0};V={notReady:"Not loaded yet - wait for soundManager.onload()/onready()",notOK:"Audio support is not available.",domError:"soundManager::createMovie(): appendChild/innerHTML call failed. DOM not ready or other error.",spcWmode:"soundManager::createMovie(): Removing wmode, preventing known SWF loading issue(s)",swf404:"soundManager: Verify that %s is a valid path.",tryDebug:"Try soundManager.debugFlash = true for more security details (output goes to SWF.)",
checkSWF:"See SWF output for more debug info.",localFail:"soundManager: Non-HTTP page ("+g.location.protocol+" URL?) Review Flash player security settings for this special case:\nhttp://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager04.html\nMay need to add/allow path, eg. c:/sm2/ or /users/me/sm2/",waitFocus:"soundManager: Special case: Waiting for focus-related event..",waitImpatient:"soundManager: Getting impatient, still waiting for Flash%s...",waitForever:"soundManager: Waiting indefinitely for Flash (will recover if unblocked)...",
needFunction:"soundManager: Function object expected for %s",badID:'Warning: Sound ID "%s" should be a string, starting with a non-numeric character',currentObj:"--- soundManager._debug(): Current sound objects ---",waitEI:"soundManager::initMovie(): Waiting for ExternalInterface call from Flash..",waitOnload:"soundManager: Waiting for window.onload()",docLoaded:"soundManager: Document already loaded",onload:"soundManager::initComplete(): calling soundManager.onload()",onloadOK:"soundManager.onload() complete",
init:"soundManager::init()",didInit:"soundManager::init(): Already called?",flashJS:"soundManager: Attempting to call Flash from JS..",secNote:"Flash security note: Network/internet URLs will not load due to security restrictions. Access can be configured via Flash Player Global Security Settings Page: http://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager04.html",badRemove:"Warning: Failed to remove flash movie.",noPeak:"Warning: peakData features unsupported for movieStar formats",
shutdown:"soundManager.disable(): Shutting down",queue:"soundManager: Queueing %s handler",smFail:"soundManager: Failed to initialise.",smError:"SMSound.load(): Exception: JS-Flash communication failed, or JS error.",fbTimeout:"No flash response, applying ."+c.swfCSS.swfTimedout+" CSS..",fbLoaded:"Flash loaded",fbHandler:"soundManager::flashBlockHandler()",manURL:"SMSound.load(): Using manually-assigned URL",onURL:"soundManager.load(): current URL already assigned.",badFV:'soundManager.flashVersion must be 8 or 9. "%s" is invalid. Reverting to %s.',
as2loop:"Note: Setting stream:false so looping can work (flash 8 limitation)",noNSLoop:"Note: Looping not implemented for MovieStar formats",needfl9:"Note: Switching to flash 9, required for MP4 formats.",mfTimeout:"Setting flashLoadTimeout = 0 (infinite) for off-screen, mobile flash case",mfOn:"mobileFlash::enabling on-screen flash repositioning",policy:"Enabling usePolicyFile for data access"};n=function(){var b=Ha.call(arguments),a=b.shift(),a=V&&V[a]?V[a]:"",c,f;if(a&&b&&b.length){c=0;for(f=b.length;c<
f;c++)a=a.replace("%s",b[c])}return a};$=function(b){if(j===8&&b.loops>1&&b.stream)l("as2loop"),b.stream=!1;return b};aa=function(b,a){if(b&&!b.usePolicyFile&&(b.onid3||b.usePeakData||b.useWaveformData||b.useEQData))c._wD((a||"")+n("policy")),b.usePolicyFile=!0;return b};oa=function(b){typeof console!=="undefined"&&typeof console.warn!=="undefined"?console.warn(b):c._wD(b)};fa=function(){return!1};Aa=function(b){for(var a in b)b.hasOwnProperty(a)&&typeof b[a]==="function"&&(b[a]=fa)};Z=function(b){typeof b===
"undefined"&&(b=!1);if(v||b)l("smFail",2),c.disable(b)};Ba=function(b){var a=null;if(b)if(b.match(/\.swf(\?.*)?$/i)){if(a=b.substr(b.toLowerCase().lastIndexOf(".swf?")+4))return b}else b.lastIndexOf("/")!==b.length-1&&(b+="/");return(b&&b.lastIndexOf("/")!==-1?b.substr(0,b.lastIndexOf("/")+1):"./")+c.movieURL};ja=function(){j=parseInt(c.flashVersion,10);if(j!==8&&j!==9)c._wD(n("badFV",j,8)),c.flashVersion=j=8;var b=c.debugMode||c.debugFlash?"_debug.swf":".swf";if(c.useHTML5Audio&&!c.html5Only&&c.audioFormats.mp4.required&&
j<9)c._wD(n("needfl9")),c.flashVersion=j=9;c.version=c.versionNumber+(c.html5Only?" (HTML5-only mode)":j===9?" (AS3/Flash 9)":" (AS2/Flash 8)");j>8?(c.defaultOptions=s(c.defaultOptions,c.flash9Options),c.features.buffering=!0,c.defaultOptions=s(c.defaultOptions,c.movieStarOptions),c.filePatterns.flash9=RegExp("\\.(mp3|"+Oa.join("|")+")(\\?.*)?$","i"),c.features.movieStar=!0):c.features.movieStar=!1;c.filePattern=c.filePatterns[j!==8?"flash9":"flash8"];c.movieURL=(j===8?"soundmanager2.swf":"soundmanager2_flash9.swf").replace(".swf",
b);c.features.peakData=c.features.waveformData=c.features.eqData=j>8};za=function(b,a){if(!c.o)return!1;c.o._setPolling(b,a)};la=function(){if(c.debugURLParam.test(J))c.debugMode=!0;if(u(c.debugID))return!1;var b,a,e,f;if(c.debugMode&&!u(c.debugID)&&(!ua||!c.useConsole||c.useConsole&&ua&&!c.consoleOnly)){b=g.createElement("div");b.id=c.debugID+"-toggle";a={position:"fixed",bottom:"0px",right:"0px",width:"1.2em",height:"1.2em",lineHeight:"1.2em",margin:"2px",textAlign:"center",border:"1px solid #999",
cursor:"pointer",background:"#fff",color:"#333",zIndex:10001};b.appendChild(g.createTextNode("-"));b.onclick=Ca;b.title="Toggle SM2 debug console";if(r.match(/msie 6/i))b.style.position="absolute",b.style.cursor="hand";for(f in a)a.hasOwnProperty(f)&&(b.style[f]=a[f]);a=g.createElement("div");a.id=c.debugID;a.style.display=c.debugMode?"block":"none";if(c.debugMode&&!u(b.id)){try{e=X(),e.appendChild(b)}catch(d){throw Error(n("domError")+" \n"+d.toString());}e.appendChild(a)}}};o=this.getSoundById;
l=function(b,a){return b?c._wD(n(b),a):""};if(J.indexOf("sm2-debug=alert")+1&&c.debugMode)c._wD=function(b){R.alert(b)};Ca=function(){var b=u(c.debugID),a=u(c.debugID+"-toggle");if(!b)return!1;ga?(a.innerHTML="+",b.style.display="none"):(a.innerHTML="-",b.style.display="block");ga=!ga};q=function(b,a,c){if(typeof sm2Debugger!=="undefined")try{sm2Debugger.handleEvent(b,a,c)}catch(f){}return!0};G=function(){var b=[];c.debugMode&&b.push(c.swfCSS.sm2Debug);c.debugFlash&&b.push(c.swfCSS.flashDebug);c.useHighPerformance&&
b.push(c.swfCSS.highPerf);return b.join(" ")};na=function(){var b=n("fbHandler"),a=c.getMoviePercent(),e=c.swfCSS,f={type:"FLASHBLOCK"};if(c.html5Only)return!1;if(c.ok()){if(c.didFlashBlock&&c._wD(b+": Unblocked"),c.oMC)c.oMC.className=[G(),e.swfDefault,e.swfLoaded+(c.didFlashBlock?" "+e.swfUnblocked:"")].join(" ")}else{if(w)c.oMC.className=G()+" "+e.swfDefault+" "+(a===null?e.swfTimedout:e.swfError),c._wD(b+": "+n("fbTimeout")+(a?" ("+n("fbLoaded")+")":""));c.didFlashBlock=!0;C({type:"ontimeout",
ignoreInit:!0,error:f});F(f)}};ia=function(b,a,c){typeof y[b]==="undefined"&&(y[b]=[]);y[b].push({method:a,scope:c||null,fired:!1})};C=function(b){b||(b={type:"onready"});if(!m&&b&&!b.ignoreInit)return!1;if(b.type==="ontimeout"&&c.ok())return!1;var a={success:b&&b.ignoreInit?c.ok():!v},e=b&&b.type?y[b.type]||[]:[],f=[],d,g=[a],j=w&&c.useFlashBlock&&!c.ok();if(b.error)g[0].error=b.error;a=0;for(d=e.length;a<d;a++)e[a].fired!==!0&&f.push(e[a]);if(f.length){c._wD("soundManager: Firing "+f.length+" "+
b.type+"() item"+(f.length===1?"":"s"));a=0;for(d=f.length;a<d;a++)if(f[a].scope?f[a].method.apply(f[a].scope,g):f[a].method.apply(this,g),!j)f[a].fired=!0}return!0};D=function(){i.setTimeout(function(){c.useFlashBlock&&na();C();c.onload instanceof Function&&(l("onload",1),c.onload.apply(i),l("onloadOK",1));c.waitForWindowLoad&&p.add(i,"load",D)},1)};da=function(){if(t!==void 0)return t;var b=!1,a=navigator,c=a.plugins,f,d=i.ActiveXObject;if(c&&c.length)(a=a.mimeTypes)&&a["application/x-shockwave-flash"]&&
a["application/x-shockwave-flash"].enabledPlugin&&a["application/x-shockwave-flash"].enabledPlugin.description&&(b=!0);else if(typeof d!=="undefined"){try{f=new d("ShockwaveFlash.ShockwaveFlash")}catch(g){}b=!!f}return t=b};Fa=function(){var b,a;if(sa&&r.match(/os (1|2|3_0|3_1)/i)){c.hasHTML5=!1;c.html5Only=!0;if(c.oMC)c.oMC.style.display="none";return!1}if(c.useHTML5Audio){if(!c.html5||!c.html5.canPlayType)return c._wD("SoundManager: No HTML5 Audio() support detected."),c.hasHTML5=!1,!0;else c.hasHTML5=
!0;if(ta&&(c._wD("soundManager::Note: Buggy HTML5 Audio in Safari on this OS X release, see https://bugs.webkit.org/show_bug.cgi?id=32159 - "+(!t?" would use flash fallback for MP3/MP4, but none detected.":"will use flash fallback for MP3/MP4, if available"),1),da()))return!0}else return!0;for(a in c.audioFormats)if(c.audioFormats.hasOwnProperty(a)&&(c.audioFormats[a].required&&!c.html5.canPlayType(c.audioFormats[a].type)||c.flash[a]||c.flash[c.audioFormats[a].type]))b=!0;c.ignoreFlash&&(b=!1);c.html5Only=
c.hasHTML5&&c.useHTML5Audio&&!b;return!c.html5Only};Da=function(b){if(!b._hasTimer)b._hasTimer=!0};Ea=function(b){if(b._hasTimer)b._hasTimer=!1};F=function(b){b=typeof b!=="undefined"?b:{};c.onerror instanceof Function&&c.onerror.apply(i,[{type:typeof b.type!=="undefined"?b.type:null}]);typeof b.fatal!=="undefined"&&b.fatal&&c.disable()};Ia=function(){if(!ta||!da())return!1;var b=c.audioFormats,a,e;for(e in b)if(b.hasOwnProperty(e)&&(e==="mp3"||e==="mp4"))if(c._wD("soundManager: Using flash fallback for "+
e+" format"),c.html5[e]=!1,b[e]&&b[e].related)for(a=b[e].related.length;a--;)c.html5[b[e].related[a]]=!1};this._setSandboxType=function(b){var a=c.sandbox;a.type=b;a.description=a.types[typeof a.types[b]!=="undefined"?b:"unknown"];c._wD("Flash security sandbox type: "+a.type);if(a.type==="localWithFile")a.noRemote=!0,a.noLocal=!1,l("secNote",2);else if(a.type==="localWithNetwork")a.noRemote=!1,a.noLocal=!0;else if(a.type==="localTrusted")a.noRemote=!1,a.noLocal=!1};this._externalInterfaceOK=function(b){if(c.swfLoaded)return!1;
var a=(new Date).getTime();c._wD("soundManager::externalInterfaceOK()"+(b?" (~"+(a-b)+" ms)":""));q("swf",!0);q("flashtojs",!0);c.swfLoaded=!0;H=!1;ta&&Ia();A?setTimeout(T,100):T()};Y=function(b,a){function e(){c._wD("-- SoundManager 2 "+c.version+(!c.html5Only&&c.useHTML5Audio?c.hasHTML5?" + HTML5 audio":", no HTML5 audio support":"")+(!c.html5Only?(c.useHighPerformance?", high performance mode, ":", ")+((c.flashPollingInterval?"custom ("+c.flashPollingInterval+"ms)":"normal")+" polling")+(c.wmode?
", wmode: "+c.wmode:"")+(c.debugFlash?", flash debug mode":"")+(c.useFlashBlock?", flashBlock mode":""):"")+" --",1)}function f(a,b){return'<param name="'+a+'" value="'+b+'" />'}if(K&&L)return!1;if(c.html5Only)return ja(),e(),c.oMC=u(c.movieID),T(),L=K=!0,!1;var d=a||c.url,j=c.altURL||d,h;h=X();var i,o,k=G(),m,p=null,p=(p=g.getElementsByTagName("html")[0])&&p.dir&&p.dir.match(/rtl/i),b=typeof b==="undefined"?c.id:b;ja();c.url=Ba(I?d:j);a=c.url;c.wmode=!c.wmode&&c.useHighPerformance?"transparent":
c.wmode;if(c.wmode!==null&&(r.match(/msie 8/i)||!A&&!c.useHighPerformance)&&navigator.platform.match(/win32|win64/i))c.specialWmodeCase=!0,l("spcWmode"),c.wmode=null;h={name:b,id:b,src:a,width:"1px",height:"1px",quality:"high",allowScriptAccess:c.allowScriptAccess,bgcolor:c.bgColor,pluginspage:Ma+"www.macromedia.com/go/getflashplayer",title:"JS/Flash audio component (SoundManager 2)",type:"application/x-shockwave-flash",wmode:c.wmode,hasPriority:"true"};if(c.debugFlash)h.FlashVars="debug=1";c.wmode||
delete h.wmode;if(A)d=g.createElement("div"),o=['<object id="'+b+'" data="'+a+'" type="'+h.type+'" title="'+h.title+'" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="'+Ma+'download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0" width="'+h.width+'" height="'+h.height+'">',f("movie",a),f("AllowScriptAccess",c.allowScriptAccess),f("quality",h.quality),c.wmode?f("wmode",c.wmode):"",f("bgcolor",c.bgColor),f("hasPriority","true"),c.debugFlash?f("FlashVars",h.FlashVars):
"","</object>"].join("");else for(i in d=g.createElement("embed"),h)h.hasOwnProperty(i)&&d.setAttribute(i,h[i]);la();k=G();if(h=X())if(c.oMC=u(c.movieID)||g.createElement("div"),c.oMC.id){m=c.oMC.className;c.oMC.className=(m?m+" ":c.swfCSS.swfDefault)+(k?" "+k:"");c.oMC.appendChild(d);if(A)i=c.oMC.appendChild(g.createElement("div")),i.className=c.swfCSS.swfBox,i.innerHTML=o;L=!0}else{c.oMC.id=c.movieID;c.oMC.className=c.swfCSS.swfDefault+" "+k;i=k=null;if(!c.useFlashBlock)if(c.useHighPerformance)k=
{position:"fixed",width:"8px",height:"8px",visibility:"hidden",bottom:"0px",left:"0px",overflow:"hidden"};else if(k={position:"absolute",width:"6px",height:"6px",visibility:"hidden",top:"-9999px",left:"-9999px"},p)k.left=Math.abs(parseInt(k.left,10))+"px";if(Sa)c.oMC.style.zIndex=1E4;if(!c.debugFlash)for(m in k)k.hasOwnProperty(m)&&(c.oMC.style[m]=k[m]);try{A||c.oMC.appendChild(d);h.appendChild(c.oMC);if(A)i=c.oMC.appendChild(g.createElement("div")),i.className=c.swfCSS.swfBox,i.innerHTML=o;L=!0}catch(q){throw Error(n("domError")+" \n"+
q.toString());}}K=!0;e();c._wD("soundManager::createMovie(): Trying to load "+a+(!I&&c.altURL?" (alternate URL)":""),1);return!0};W=function(){if(c.html5Only)return Y(),!1;if(c.o)return!1;c.o=c.getMovie(c.id);if(!c.o)N?(A?c.oMC.innerHTML=ma:c.oMC.appendChild(N),N=null,K=!0):Y(c.id,c.url),c.o=c.getMovie(c.id);c.o&&l("waitEI");c.oninitmovie instanceof Function&&setTimeout(c.oninitmovie,1);return!0};U=function(){setTimeout(ya,1E3)};ya=function(){if(ba)return!1;ba=!0;p.remove(i,"load",U);if(H&&!va)return l("waitFocus"),
!1;var b;m||(b=c.getMoviePercent(),c._wD(n("waitImpatient",b===100?" (SWF loaded)":b>0?" (SWF "+b+"% loaded)":"")));setTimeout(function(){b=c.getMoviePercent();m||(c._wD("soundManager: No Flash response within expected time.\nLikely causes: "+(b===0?"Loading "+c.movieURL+" may have failed (and/or Flash "+j+"+ not present?), ":"")+"Flash blocked or JS-Flash security error."+(c.debugFlash?" "+n("checkSWF"):""),2),!I&&b&&(l("localFail",2),c.debugFlash||l("tryDebug",2)),b===0&&c._wD(n("swf404",c.url)),
q("flashtojs",!1,": Timed out"+I?" (Check flash security or flash blockers)":" (No plugin/missing SWF?)"));!m&&Ka&&(b===null?c.useFlashBlock||c.flashLoadTimeout===0?(c.useFlashBlock&&na(),l("waitForever")):Z(!0):c.flashLoadTimeout===0?l("waitForever"):Z(!0))},c.flashLoadTimeout)};B=function(){function b(){p.remove(i,"focus",B);p.remove(i,"load",B)}if(va||!H)return b(),!0;va=Ka=!0;c._wD("soundManager::handleFocus()");Q&&H&&p.remove(i,"mousemove",B);ba=!1;b();return!0};Ja=function(){var b,a=[];if(c.useHTML5Audio&&
c.hasHTML5){for(b in c.audioFormats)c.audioFormats.hasOwnProperty(b)&&a.push(b+": "+c.html5[b]+(!c.html5[b]&&t&&c.flash[b]?" (using flash)":c.preferFlash&&c.flash[b]&&t?" (preferring flash)":!c.html5[b]?" ("+(c.audioFormats[b].required?"required, ":"")+"and no flash support)":""));c._wD("-- SoundManager 2: HTML5 support tests ("+c.html5Test+"): "+a.join(", ")+" --",1)}};M=function(b){if(m)return!1;if(c.html5Only)return c._wD("-- SoundManager 2: loaded --"),m=!0,D(),q("onload",!0),!0;var a;if(!c.useFlashBlock||
!c.flashLoadTimeout||c.getMoviePercent())m=!0,v&&(a={type:!t&&w?"NO_FLASH":"INIT_TIMEOUT"});c._wD("-- SoundManager 2 "+(v?"failed to load":"loaded")+" ("+(v?"security/load error":"OK")+") --",1);if(v||b){if(c.useFlashBlock&&c.oMC)c.oMC.className=G()+" "+(c.getMoviePercent()===null?c.swfCSS.swfTimedout:c.swfCSS.swfError);C({type:"ontimeout",error:a});q("onload",!1);F(a);return!1}else q("onload",!0);if(c.waitForWindowLoad&&!ha)return l("waitOnload"),p.add(i,"load",D),!1;else c.waitForWindowLoad&&ha&&
l("docLoaded"),D();return!0};T=function(){l("init");if(m)return l("didInit"),!1;if(c.html5Only){if(!m)p.remove(i,"load",c.beginDelayedInit),c.enabled=!0,M();return!0}W();try{l("flashJS"),c.o._externalInterfaceTest(!1),za(!0,c.flashPollingInterval||(c.useHighPerformance?10:50)),c.debugMode||c.o._disableDebug(),c.enabled=!0,q("jstoflash",!0),c.html5Only||p.add(i,"unload",fa)}catch(b){return c._wD("js/flash exception: "+b.toString()),q("jstoflash",!1),F({type:"JS_TO_FLASH_EXCEPTION",fatal:!0}),Z(!0),
M(),!1}M();p.remove(i,"load",c.beginDelayedInit);return!0};E=function(){if(ka)return!1;ka=!0;la();(function(){var b=J.toLowerCase(),a=null,a=null,e=typeof console!=="undefined"&&typeof console.log!=="undefined";if(b.indexOf("sm2-usehtml5audio=")!==-1)a=b.charAt(b.indexOf("sm2-usehtml5audio=")+18)==="1",e&&console.log((a?"Enabling ":"Disabling ")+"useHTML5Audio via URL parameter"),c.useHTML5Audio=a;if(b.indexOf("sm2-preferflash=")!==-1)a=b.charAt(b.indexOf("sm2-preferflash=")+16)==="1",e&&console.log((a?
"Enabling ":"Disabling ")+"preferFlash via URL parameter"),c.preferFlash=a})();if(!t&&c.hasHTML5)c._wD("SoundManager: No Flash detected"+(!c.useHTML5Audio?", enabling HTML5.":". Trying HTML5-only mode.")),c.useHTML5Audio=!0,c.preferFlash=!1;Ga();c.html5.usingFlash=Fa();w=c.html5.usingFlash;Ja();if(!t&&w)c._wD("SoundManager: Fatal error: Flash is needed to play some required formats, but is not available."),c.flashLoadTimeout=1;g.removeEventListener&&g.removeEventListener("DOMContentLoaded",E,!1);
W();return!0};ra=function(){g.readyState==="complete"&&(E(),g.detachEvent("onreadystatechange",ra));return!0};da();p.add(i,"focus",B);p.add(i,"load",B);p.add(i,"load",U);Q&&H&&p.add(i,"mousemove",B);g.addEventListener?g.addEventListener("DOMContentLoaded",E,!1):g.attachEvent?g.attachEvent("onreadystatechange",ra):(q("onload",!1),F({type:"NO_DOM2_EVENTS",fatal:!0}));g.readyState==="complete"&&setTimeout(E,100)}var ea=null;if(typeof SM2_DEFER==="undefined"||!SM2_DEFER)ea=new S;R.SoundManager=S;R.soundManager=
ea})(window);

var bgmdir="bgm/";
var sfxdir="sfx/";
soundManager.useHTML5Audio = true;
soundManager.preferFlash = true
soundManager.useFlashBlock = true;
soundManager.url = "swf/";
soundManager.debugMode = false;
soundManager.consoleOnly = true;

var bgmplay="";
var stateready=0;
var bgmloadprogress=0;
var sfxloadprogress=0;
var startpercent=10;
var bgmvol=100;
var sfxvol=100;
var fadespeed=50;
var fading=false;

var errortext="";

soundManager.defaultOptions = {
  autoLoad: false,
  autoPlay: false,
  loops: 9999999,
  stream: true
}
soundManager.onready(function() {
  stateready=1;
});

soundManager.ontimeout(function() {
  stateready=2;
  errortext="Sound system error...";
});

function getError(){
return errortext;
}

function getBGMProgress(){
return bgmloadprogress;
}

function getSFXProgress(){
return sfxloadprogress;
}

function startPlay(nm){
if(soundManager.getSoundById(nm)==null){return;}
if(soundManager.getSoundById(nm).readyState==1||soundManager.getSoundById(nm).readyState==3){
if(soundManager.getSoundById(nm).playState==0){
soundManager.getSoundById(nm).stop();
soundManager.getSoundById(nm).play();
return;
}else{
if(soundManager.getSoundById(nm).position<=0){
soundManager.getSoundById(nm).stop();
}
}
setTimeout("startPlay(\""+nm+"\",100)");
}else{
errortext="Cannot load sound file...";
}
}

function getLoadStatus(nm,autop,percent,time,started){
if(soundManager.getSoundById(nm)==null){return;}
if(started==null){started=false;}
if(percent==null){percent=0;}
if(time==null){time=0;}
if(time>100){errortext="Internet connection error?";}
if(soundManager.getSoundById(nm).readyState==1||soundManager.getSoundById(nm).readyState==3){
if(nm=="bgm"){
bgmloadprogress=((soundManager.getSoundById(nm).bytesLoaded/soundManager.getSoundById(nm).bytesTotal)*100).toFixed(2);
if(percent!=bgmloadprogress){
percent=bgmloadprogress;
time=0;
}else{
if(percent!=100){
time++;
}
}
if(!started&&bgmloadprogress>=startpercent){startPlay(nm);started=true;}
if(bgmloadprogress>=100){startPlay(nm);return;}
}else{
sfxloadprogress=((soundManager.getSoundById(nm).bytesLoaded/soundManager.getSoundById(nm).bytesTotal)*100).toFixed(2);
if(percent!=sfxloadprogress){
percent=sfxloadprogress;
time=0;
}else{
if(percent!=100){
time++;
}
}
if(!autop&&sfxloadprogress>=startpercent){startPlay(nm);return;}
}
}
setTimeout("getLoadStatus(\""+nm+"\","+autop+","+percent+","+time+","+started+")",100);
}

function playBGM(file){
if(soundManager.getSoundById("bgm")!=null){
if(bgmplay!=file){
stopBGM();
}else{return;}
}
if(fading||stateready!=1){return;}
soundManager.createSound({
 id: "bgm",
 url: bgmdir+file,
 volume: bgmvol,
 whileloading: function(){getLoadStatus("bgm");}
});
bgmplay=file;
soundManager.getSoundById("bgm").load();
}

function playSFX(nm,file,lp){
if(stateready!=1){return;}
if(soundManager.getSoundById("sfx"+nm)!=null){
stopSFX(nm);
}
var autop=false;
if(lp==null||lp<2){lp=1;autop=true;}
soundManager.createSound({
 id: "sfx"+nm,
 url: sfxdir+file,
 loops: lp,
 volume: sfxvol,
 autoPlay: autop,
 autoLoad: true,
 stream: true,
 whileloading: function(){getLoadStatus("sfx"+nm,autop);}
});
soundManager.getSoundById("sfx"+nm).load();
}

function fadeBGM(vol){
if(vol==null){vol=bgmvol;}
fading=true;
vol-=2;
soundManager.setVolume("bgm",vol);
if(vol<=0){fading=false;stopSFX("bgm");return;}
setTimeout("fadeBGM("+vol+")",fadespeed);
}

function stopSFX(nm){
if(fading){return;}
if(nm!="bgm"){nm="sfx"+nm;}
if(soundManager.getSoundById(nm)!=null){
soundManager.stop(nm);
soundManager.getSoundById(nm).destruct();
}
}

function stopBGM(){
if(bgmplay!=""){
stopSFX("bgm");
bgmplay="";
}
}

function soundSetup(bdir,sdir,startp,bvol,svol){
sfxdir=sdir;
bgmdir=bdir;
startpercent=startp;
bgmvol=bvol;
sfxvol=svol;
}

function soundVol(bvol,svol){
if(bvol!=null){bgmvol=bvol;}
if(svol!=null){sfxvol=svol;}
}
