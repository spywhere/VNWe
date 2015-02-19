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
			image: "prompter.png",
			interval: 200,
			width: 13,
			height: 13,
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

		this.text = function(text, speed){
			if(!text){return;}
			speed = speed || 30;

			this._text = {
				text: text,
				speed: speed
			};
		};

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
			var step = this._makeStep();
			step.ending({
				delay: delay,
				prompter: false
			});
			this._script[this._nextLine()] = step;
		};

		this.wait = function(prompter){
			if(prompter === null || prompter === undefined){
				prompter = true;
			}
			var step = this._makeStep();
			step.ending({
				delay: -1,
				prompter: prompter
			});
			this._script[this._nextLine()] = step;
		};

		// Internal

		this._imageProgress = function(script, ctx, progress){
			ctx.clearRect(0, 0, script._game.width, script._game.height);
			ctx.font = "16px sans-serif";
			ctx.fillStyle = "#ffffff";
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			ctx.fillText("Loading " + (progress*100).toFixed(2) + "%", script._game.width/2, script._game.height/2);
		};

		this._makeStep = function(){
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
			if("_text" in this && this._text){
				step._text = this._text;
				this._text = undefined;
			}
			if("_image" in this && this._image){
				step._image = this._image;
				this._image = undefined;
			}
			return step;
		};

		this._resetLine = function(){
			this._line = 0;
		};

		this._getLine = function(){
			return this._line;
		};

		this._nextLine = function(){
			return this._line++;
		};

		this._getImage = function(line){
			return this._getScript(line).image();
		};

		this._getScript = function(line){
			if(line === null || line === undefined){
				line = this._nextLine();
			}
			return this._script[line];
		};

		this._totalScript = function(){
			return this._script.length;
		};

		this.getVersion = function(){
			return "VNWe v3.0";
		};

		this._callbacks.loading.images = this._imageProgress;
		this._callbacks.finish.game = function(){
			alert("End!");
		};
	}

	function VNWe(script){
		this.markupPattern = /\[(clr|[bi]|\/([bsic])|([cs])=([^\]]+))\]/i;
		this.lang = new VNWeLanguage();
		this.script = script;
		this.waiting = {};
		this.render = {};

		this.getTick = function(){
			return (new Date()).getTime();
		};

		this.endScript = function(){
			clearInterval(this.renderThread);
			this.renderThread = undefined;
			if(this.script._callbacks.finish.game){
				var ctx = this.game.getContext("2d");
				ctx.save();
				this.script._callbacks.finish.game(this.script, ctx);
				ctx.restore();
			}
		};

		this.runText = function(script, currentIndex){
			if(currentIndex === null || currentIndex === undefined){
				currentIndex = 0;
			}

			if(currentIndex < script._text.text.length){
				this.waiting.text = true;
			}else{
				this.waiting.text = false;
				return;
			}
			if(!("text" in this.render)){
				this.render.text = "";
			}

			var matches = this.markupPattern.exec(script._text.text.substr(currentIndex));
			var escape = script._text.text.substr(currentIndex, 2);
			if(escape == "\\[" || escape == "\\\\"){
				this.render.text += escape;
				currentIndex += 2;
			}else if(matches && matches.index == 0){
				var markup = matches[1];
				if(markup == "clr"){
					this.render.text = "";
				}else{
					this.render.text += script._text.text.substr(currentIndex, matches[0].length);
				}
				currentIndex += matches[0].length;
			}else{
				this.render.text += script._text.text[currentIndex++];
			}

			if(this.waiting.text){
				var vnwe = this;
				setTimeout(function(){
					vnwe.runText(script, currentIndex);
				}, script._text.speed);
			}
		};

		this.fadeImage = function(script, endTime){
			var image = script._image;
			endTime = endTime || this.getTick()+image.duration;

			var img = new Image();
			img.src = script.path("images", image.url);

			var elapse = endTime-this.getTick();
			if(elapse < 0 || image.duration === 2){
				this.render.image = {
					image: img,
					opacity: 1
				};
				this.waiting.image = false;
			}else{
				this.render.image = {
					image: img,
					opacity: 1-elapse/image.duration
				};
				this.waiting.image = true;
			}

			if(this.waiting.image){
				var vnwe = this;
				setTimeout(function(){
					vnwe.fadeImage(script, endTime);
				}, 25);
			}
		};

		this.renderFrame = function(){
			var ctx = this.game.getContext("2d");
			if("image" in this.render){
				ctx.save();
				ctx.globalAlpha = this.render.image.opacity;
				ctx.drawImage(this.render.image.image, 0, 0);
				ctx.restore();
			}
			if("text" in this.render){
				var currentIndex = 0;
				var ox = 0;
				var oy = 0;
				var bold = false;
				var italic = false;
				var defSize = "14";
				var fontSize = "14";
				var defColor = "#ffffff";
				var fontColor = "#ffffff";

				while(currentIndex < this.render.text.length){
					var matches = this.markupPattern.exec(this.render.text.substr(currentIndex));
					var escape = this.render.text.substr(currentIndex, 2);
					if(escape == "\\[" || escape == "\\\\"){
						currentIndex += 1;
						// Add one more belows
					}else if(matches && matches.index == 0){
						if(matches[3]){
							var styleType = matches[3];
							var value = matches[4];
							if(styleType == "s"){
								fontSize = value;
							}else if(styleType == "c"){
								fontColor = value;
							}
						}else{
							var markup = matches[1];
							if(markup == "b"){
								bold = true;
							}else if(markup == "/b"){
								bold = false;
							}else if(markup == "i"){
								italic = true;
							}else if(markup == "/i"){
								italic = false;
							}else if(markup == "/s"){
								fontSize = defSize;
							}else if(markup == "/c"){
								fontColor = defColor;
							}
						}
						currentIndex += matches[0].length;
						continue;
					}

					var fontName = "";
					if(bold){
						fontName += "bold ";
					}
					if(italic){
						fontName += "italic ";
					}
					fontName += fontSize + "px ";
					fontName += "sans-serif";

					ctx.save();
					ctx.font = fontName;
					ctx.fillStyle = fontColor;
					ctx.fillText(this.render.text[currentIndex], 100+ox, 400+oy);
					ox += ctx.measureText(this.render.text[currentIndex]).width;
					ctx.restore();
					currentIndex++;
				}
			}
		};

		this.nextScript = function(){
			for(var key in this.waiting){
				if(this.waiting[key]){
					return;
				}
			}

			this.waiting.main = true;
			this.currentLine = this.script._nextLine();
			if(this.currentLine >= this.script._totalScript()){
				this.endScript();
				return;
			}
			var script = this.script._getScript(this.currentLine);

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

			if("_text" in script){
				this.runText(script);
			}

			if("_image" in script){
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
			this.renderThread = setInterval(function(){
				vnwe.renderFrame();
			}, 1000/60);
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

		this.preloadImage = function(index){
			index = index || 0;

			var ctx = this.game.getContext("2d");
			if(this.script._totalScript() <= index){
				ctx.save();
				ctx.clearRect(0, 0, script._game.width, script._game.height);
				ctx.restore();
				this.prepareScript();
				return;
			}

			if(this.script._callbacks.loading.images){
				ctx.save();
				this.script._callbacks.loading.images(this.script, ctx, index/this.script._totalScript());
				ctx.restore();
			}

			var imageURL = this.script._getImage(index);
			if(!imageURL){
				this.preloadImage(index+1);
				return;
			}
			var image = new Image();
			var vnwe = this;
			image.addEventListener("load", function(){
				vnwe.preloadImage(index+1);
			});
			image.addEventListener("error", function(){
				console.error("Error cannot load " + imageURL);
				vnwe.preloadImage(index+1);
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
			this.script._resetLine();
			this.preloadImage();
		};

		this.init = function(){
			if(document.onselectstart){
				document.onselectstart=function(){return false;};
			}
			if(document.oncontextmenu){
				document.oncontextmenu=function(){return false;};
			}
			this.game = document.createElement("canvas");
			var supported = this.game.getContext && this.game.getContext("2d");
			if(!supported){
				this.game = document.createElement("div");
			}
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
			if(!supported){
				var table = document.createElement("table");
				table.style.width = "100%";
				table.style.height = "100%";
				this.game.appendChild(table);
				var row = document.createElement("tr");
				table.appendChild(row);
				var cell = document.createElement("td");
				cell.align = "center";
				cell.style.color = "#ffffff";
				cell.innerHTML = "Your browser is not support canvas. Please upgrade to newer version.";
				row.appendChild(cell);
				return;
			}
			this.game.width = "800";
			this.game.height = "600";

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
