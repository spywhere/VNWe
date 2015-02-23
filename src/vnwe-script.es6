class VNWeStep {
	constructor(settings){
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
	}

	ending(ending){
		this._ending = ending;
	}

	image(){
		if("_image" in this){
			return this.path("images", this._image.url);
		}else{
			return null;
		}
	}

	path(type, url){
		if(url){
			return this.path(type) + url;
		}else{
			return this._paths[type];
		}
	}
}

class VNWeScript {
	constructor(){
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

		this._callbacks.loading.images = this._imageProgress;
		this._callbacks.finish.game = ()=>{
			alert("End!");
		};
	}

	mergeObject(source, merge){
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
	}

	game(properties){
		if(properties === null || properties === undefined){
			return this._game;
		}else{
			return this;
		}
	}

	texts(properties){
		if(properties === null || properties === undefined){
			return this._texts;
		}else{
			return this;
		}
	}

	images(properties){
		if(properties === null || properties === undefined){
			return this._images;
		}else{
			return this;
		}
	}

	prompter(properties){
		if(properties === null || properties === undefined){
			return this._prompter;
		}else{
			return this;
		}
	}

	sounds(properties){
		if(properties === null || properties === undefined){
			return this._sounds;
		}else{
			return this;
		}
	}

	paths(properties){
		if(properties === null || properties === undefined){
			return this._paths;
		}else{
			return this;
		}
	}

	notes(properties){
		if(properties === null || properties === undefined){
			return this._notes;
		}else{
			return this;
		}
	}

	debug(properties){
		if(properties === null || properties === undefined){
			return this._debug;
		}else{
			return this;
		}
	}

	callbacks(properties){
		if(properties === null || properties === undefined){
			return this._callbacks;
		}else{
			return this;
		}
	}

	custom(code){
		this._code = code || "";
		return this;
	}

	// Scripting

	text(text, speed){
		if(!text){
			return this;
		}
		speed = speed || 30;
		this._text = {
			text: text,
			speed: speed
		};
		return this;
	}

	image(url, duration){
		if(!url){
			return this;
		}
		duration = duration || 100;

		this._image = {
			url: url,
			duration: duration
		};
		return this;
	}

	auto(delay){
		if(delay === null || delay === undefined || delay < 0){
			delay = 0;
		}
		var step = this._makeStep();
		step.ending({
			delay: delay,
			prompter: false
		});
		this._script[this._nextLine()] = step;
		return this;
	}

	wait(prompter){
		if(prompter === null || prompter === undefined){
			prompter = true;
		}
		var step = this._makeStep();
		step.ending({
			delay: -1,
			prompter: prompter
		});
		this._script[this._nextLine()] = step;
		return this;
	}

	// Internal

	_imageProgress(script, ctx, progress){
		ctx.clearRect(0, 0, script._game.width, script._game.height);
		ctx.font = "16px sans-serif";
		ctx.fillStyle = "#ffffff";
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.fillText("Loading " + (progress*100).toFixed(2) + "%", script._game.width/2, script._game.height/2);
	}

	_makeStep(){
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
	}

	_resetLine(){
		this._line = 0;
	}

	_getLine(){
		return this._line;
	}

	_nextLine(){
		return this._line++;
	}

	_getImage(line){
		return this._getScript(line).image();
	}

	_getScript(line){
		if(line === null || line === undefined){
			line = this._nextLine();
		}
		return this._script[line];
	}

	_totalScript(){
		return this._script.length;
	}

	getVersion(){
		return "VNWe v3.0";
	}
}

window.VNWeScript = VNWeScript;
