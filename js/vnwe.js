(function(window){
	"use strict";

	function VNWeEnglishLanguage(){
		this.verificationFailed = "Game verification failed";
	}

	function VNWeScript(){
		// VN Settings
		this._game = {
			width: 800,
			height: 600,
			sfx: true,
			bgm: true,
			voices: true
		};
		this.texts = {
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
		this._script = {
			images: []
		};

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

		this.sound = function(properties){
			return this.mergeObject(this._sound, properties || {});
		};

		this.path = function(properties){
			return this.mergeObject(this._path, properties || {});
		};

		this.notebox = function(properties){
			return this.mergeObject(this._notebox, properties || {});
		};

		this.debug = function(properties){
			return this.mergeObject(this._debug, properties || {});
		};

		this.callbacks = function(properties){
			return this.mergeObject(this._callbacks, properties || {});
		};

		this.custom = function(code){
			this.custom = code || "";
		};

		// Scripting

		this.image = function(url, speed){
			if(!url){return;}
			speed = speed || 30;

			this._script.images[this._script.images.length] = {
				url: url,
				speed: speed
			};
		};

		// Internal

		this.start = function(){
			this._start = true;
		};

		this.getImage = function(index){
			return this._script.images[index];
		};

		this.getPath = function(type, url){
			if(url){
				return this.getPath(type) + url;
			}else{
				return this._paths[type];
			}
		};

		this.totalImage = function(){
			return this._script.images.length;
		};

		this.getVersion = function(){
			return "VNWe v3.0";
		};
	}

	function VNWe(script){
		this.lang = new VNWeLanguage();
		this.script = script;
		this.currentLine = 0;

		this.nextScript = function(e){
			if(e.keyCode && e.keyCode !== 32 && e.keyCode !== 13){
				return;
			}
			console.log("Run");
		};

		this.prepareScript = function(){
			document.addEventListener("keypress", this.nextScript);
			document.addEventListener("click", this.nextScript);
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
			loadingText.innerHTML = "Loading " + (index*100/this.script.totalImage()).toFixed(2) + "%";
			if(this.script.totalImage() <= index){
				this.game.removeChild(loadingParent);
				this.prepareScript();
				return;
			}
			var image = document.createElement("img");
			image.addEventListener("load", function(){
				this.preloadImage(index+1, loadingParent, loadingText);
			});
			image.addEventListener("error", function(){
				console.error("Error cannot load " + this.script.getImage(index).url);
				this.preloadImage(index+1, loadingParent, loadingText);
			});
			console.log(this.script.getImage(index));
			image.src = this.script.getPath("images", this.script.getImage(index).url);
		};

		this.verifyGame = function(){
			var verification = new VNWeScript();
			if(typeof this.script.getVersion !== "function" || this.script.getVersion() !== verification.getVersion()){
				alert(this.lang.verificationFailed);
				console.log(this.lang.verificationFailed);
				return;
			}
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
			this.game.style.backgroundColor = "#333333";
			document.body.style.backgroundColor = "#000000";
			document.body.appendChild(this.game);
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
