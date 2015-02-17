(function(window){
	"use strict";

	function VNWeEnglishLanguage(){
		this.verificationFailed = "Game verification failed";
	}

	function VNWeStep(settings){
		this._game = settings.game;
		this._texts = settings.texts;
		this._images = settings.images;
		this._prompter = settings.prompter;
		this._sounds = settings.sounds;
		this._paths = settings.paths;
		this._notes = settings.notes;
		this._debug = settings.debug;
		this._callbacks = settings.callbacks;
		this._custom = settings.custom;

		this.ending = function(ending){
			this._ending = ending;
		};

		this.image = function(){
			if("_image" in this){
				return this.path("images", this._image.url);
			}else{
				return null;
			}
		};

		this.path = function(type, url){
			if(url){
				return this.path(type) + url;
			}else{
				return this._paths[type];
			}
		};
	}

	function VNWeScript(){
		this._ending = {
			delay: -1,
			prompter: true
		};
		this._game = {
			width: 800,
			height: 600,
			sfx: true,
			bgm: true,
			voices: true
		};
		this._texts = {
			left: 50,
			top: 50,
			offset: {
				x: -275,
				y: -75
			},
			width: 550,
			height: 150,
			radius: 15,
			opacity: 1,
			background: "#000000",
			text: "#ffffff",
			border: "1px solid #ffffff"
		};
		this._images = {
			left: 0,
			top: 0,
			offset: {
				x: 0,
				y: 0
			}
		};
		this._prompter = {
			fixed: false,
			url: "prompter.gif",
			offset: 10
		};
		this._sounds = {
			sfx: 1,
			bgm: 1,
			voices: 1,
			minimum: 10
		};
		this._paths = {
			images: "assets/images/",
			bgm: "assets/bgm/",
			sfx: "assets/sfx/",
			voices: "assets/voices/"
		};
		this._notes = {
			left: 50,
			top: 100,
			offset: {
				x: -275,
				y: -55
			},
			width: 550,
			height: 50,
			opacity: 0.5,
			color: "#ffffff"
		};
		this._debug = {
			enable: false,
			border: "1px solid #777777"
		};
		this._callbacks = {
			start: {
				game: null,
				text: null
			},
			loading: {
				images: null,
				bgm: null
			},
			finish: {
				game: null,
				images: null,
				bgm: null,
				text: null
			}
		};
		this._custom = "";
		/////////////////////////////
		// End of default settings //
		/////////////////////////////
		this._line = 0;
		this._script = [];

		// VN Settings

		this.mergeObject = function(source, merge){
			for(var key in source){
				if(key in merge){
					if(merge[key] === Object(merge[key])){
						source[key] = this.mergeObject(source[key], merge[key] || {});
					}else{
						source[key] = merge[key];
					}
				}
			}
			return source;
		};

		this.game = function(properties){
			return this.mergeObject(this._game, properties || {});
		};

		this.texts = function(properties){
			return this.mergeObject(this._texts, properties || {});
		};

		this.images = function(properties){
			return this.mergeObject(this._images, properties || {});
		};

		this.prompter = function(properties){
			return this.mergeObject(this._prompter, properties || {});
		};

		this.sounds = function(properties){
			return this.mergeObject(this._sounds, properties || {});
		};

		this.paths = function(properties){
			return this.mergeObject(this._paths, properties || {});
		};

		this.notes = function(properties){
			return this.mergeObject(this._notes, properties || {});
		};

		this.debug = function(properties){
			return this.mergeObject(this._debug, properties || {});
		};

		this.callbacks = function(properties){
			return this.mergeObject(this._callbacks, properties || {});
		};

		this.custom = function(code){
			this._custom = code || "";
		};

		// Scripting

		this.image = function(url, duration){
			if(!url){return;}
			duration = duration || 100;

			this._image = {
				url: url,
				duration: duration
			};
		};

		this.auto = function(delay){
			if(delay === null || delay === undefined || delay < 0){
				delay = 0;
			}
			var step = this.makeStep();
			step.ending({
				delay: delay,
				prompter: false
			});
			this._script[this.nextLine()] = step;
		};

		this.wait = function(prompter){
			if(prompter === null || prompter === undefined){
				prompter = true;
			}
			var step = this.makeStep();
			step.ending({
				delay: -1,
				prompter: prompter
			});
			this._script[this.nextLine()] = step;
		};

		// Internal

		this.makeStep = function(){
			var step = new VNWeStep({
				game: this._game,
				texts: this._texts,
				images: this._images,
				prompter: this._prompter,
				sounds: this._sounds,
				paths: this._paths,
				notes: this._notes,
				debug: this._debug,
				callbacks: this._callbacks,
				custom: this._custom
			});
			if("_image" in this && this._image){
				step._image = this._image;
				this._image = undefined;
			}
			return step;
		};

		this.resetLine = function(){
			this._line = 0;
		};

		this.line = function(){
			return this._line;
		};

		this.nextLine = function(){
			return this._line++;
		};

		this.getImage = function(index){
			return this.script(index).image();
		};

		this.script = function(line){
			if(line === null || line === undefined){
				line = this.nextLine();
			}
			return this._script[line];
		};

		this.totalScript = function(){
			return this._script.length;
		};

		this.getVersion = function(){
			return "VNWe v3.0";
		};
	}

	function VNWe(script){
		this.lang = new VNWeLanguage();
		this.script = script;
		this.waiting = {};
		this.imageBuffer = [];

		this.getTick = function(){
			return (new Date()).getTime();
		};

		this.endScript = function(){
			alert("End!");
		};

		this.fadeImage = function(script, endTime){
			var image = script._image;
			endTime = endTime || this.getTick()+image.duration;
			var elapse = endTime-this.getTick();
			if(elapse < 0 || image.duration == 2){
				this.imageBuffer[0].style.opacity = 1;
				this.imageBuffer[this.imageBuffer.length-1].style.opacity = 0;
				this.imageBuffer[0].style.zIndex = 2;
				this.waiting.image = false;
				return;
			}
			this.waiting.image = true;
			this.imageBuffer[0].style.zIndex = 2;
			this.imageBuffer[0].style.opacity = 1-elapse/image.duration;
			this.imageBuffer[0].src = script.path("images", image.url);
			var vnwe = this;
			setTimeout(function(){
				vnwe.fadeImage(script, endTime);
			}, 25);
		};

		this.nextScript = function(){
			for(var key in this.waiting){
				if(this.waiting[key]){
					return;
				}
			}

			this.waiting.main = true;
			this.currentLine = this.script.nextLine();
			if(this.currentLine >= this.script.totalScript()){
				this.endScript();
				return;
			}
			var script = this.script.script(this.currentLine);

			// if("_game" in script){
			// 	console.log("Setup game");
			// }
			// if("_texts" in script){
			// 	console.log("Setup texts");
			// }
			// if("_images" in script){
			// 	console.log("Setup images");
			// }
			// if("_prompter" in script){
			// 	console.log("Setup prompter");
			// }
			// if("_sounds" in script){
			// 	console.log("Setup sounds");
			// }
			// if("_paths" in script){
			// 	console.log("Setup paths");
			// }
			// if("_notes" in script){
			// 	console.log("Setup notes");
			// }
			// if("_debug" in script){
			// 	console.log("Setup debug");
			// }
			// if("_callbacks" in script){
			// 	console.log("Setup callbacks");
			// }
			// if("_custom" in script){
			// 	console.log("Setup custom");
			// }

			if("_image" in script){
				for(var i=this.imageBuffer.length-1;i>=0;i--){
					this.imageBuffer[i].style.zIndex = 1;
				}
				this.imageBuffer.push(this.imageBuffer.shift());
				this.fadeImage(script);
			}

			if("_ending" in script){
				var ending = script._ending;
				var vnwe = this;
				if(ending.delay < 0){
					this.waiting.main = false;
				}else{
					setTimeout(function(){
						vnwe.waiting.main = false;
						vnwe.nextScript();
					}, ending.delay);
				}
			}
		};

		this.prepareScript = function(){
			var vnwe = this;
			document.addEventListener("keypress", function(e){
				if(e.keyCode && e.keyCode !== 32 && e.keyCode !== 13){
					return;
				}
				vnwe.nextScript();
			});
			document.addEventListener("click", function(){
				vnwe.nextScript();
			});
			this.nextScript();
		};

		this.preloadImage = function(index, loadingParent, loadingText){
			index = index || 0;
			loadingParent = loadingParent || document.createElement("table");
			loadingText = loadingText || document.createElement("td");
			if(index === 0){
				var row = document.createElement("tr");
				row.appendChild(loadingText);
				loadingParent.appendChild(row);
				this.game.appendChild(loadingParent);
			}
			loadingParent.style.width = "100%";
			loadingParent.style.height = "100%";
			loadingText.style.color = "#ffffff";
			loadingText.style.textAlign = "center";
			loadingText.innerHTML = "Loading " + (index*100/this.script.totalScript()).toFixed(2) + "%";
			if(this.script.totalScript() <= index){
				this.game.removeChild(loadingParent);
				this.prepareScript();
				return;
			}
			var imageURL = this.script.getImage(index);
			if(!imageURL){
				this.preloadImage(index+1, loadingParent, loadingText);
				return;
			}
			var image = document.createElement("img");
			var vnwe = this;
			image.addEventListener("load", function(){
				vnwe.preloadImage(index+1, loadingParent, loadingText);
			});
			image.addEventListener("error", function(){
				console.error("Error cannot load " + imageURL);
				vnwe.preloadImage(index+1, loadingParent, loadingText);
			});
			image.src = imageURL;
		};

		this.verifyGame = function(){
			var verification = new VNWeScript();
			if(typeof this.script.getVersion !== "function" || this.script.getVersion() !== verification.getVersion()){
				alert(this.lang.verificationFailed);
				console.log(this.lang.verificationFailed);
				return;
			}
			this.script.resetLine();
			this.preloadImage();
		};

		this.init = function(){
			if(document.onselectstart){
				document.onselectstart=function(){return false;};
			}
			if(document.oncontextmenu){
				document.oncontextmenu=function(){return false;};
			}
			this.game = document.createElement("div");
			this.game.style.position = "absolute";
			this.game.style.left = "50%";
			this.game.style.top = "50%";
			this.game.style.width = "800px";
			this.game.style.height = "600px";
			this.game.style.marginLeft = "-400px";
			this.game.style.marginTop = "-300px";
			this.game.style.backgroundColor = "#000000";
			this.game.style.border = "1px solid #ffffff";
			document.body.style.backgroundColor = "#000000";
			document.body.appendChild(this.game);

			for(var i=0;i<3;i++){
				var imageDiv = document.createElement("img");
				imageDiv.style.position = "absolute";
				imageDiv.style.left = "0px";
				imageDiv.style.top = "0px";
				imageDiv.style.width = "100%";
				imageDiv.style.height = "100%";
				imageDiv.style.opacity = "0";
				this.game.appendChild(imageDiv);
				this.imageBuffer.push(imageDiv);
			}

			this.verifyGame();
		};
	}

	window.VNWeLanguage = VNWeEnglishLanguage;
	window.VNWeScript = VNWeScript;
	window.VNWe = function(script){
		var game = new VNWe(script);
		game.init();
	};
})(window);
