class VNWe {
	constructor(script){
		this.markupPattern = /\[(clr|[bi]|\/([bsic])|([cs])=([^\]]+))\]/i;
		this.lang = new VNWeLanguage();
		this.script = script;
		this.waiting = {};
		this.render = {};
	}

	getTick(){
		return (new Date()).getTime();
	}

	endScript(){
		clearInterval(this.renderThread);
		this.renderThread = undefined;
		if(this.script._callbacks.finish.game){
			let ctx = this.game.getContext("2d");
			ctx.save();
			this.script._callbacks.finish.game(this.script, ctx);
			ctx.restore();
		}
	}

	runText(script, currentIndex){
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

		let matches = this.markupPattern.exec(script._text.text.substr(currentIndex));
		let esc = script._text.text.substr(currentIndex, 2);
		if(esc === "\\[" || esc === "\\\\"){
			this.render.text += esc;
			currentIndex += 2;
		}else if(matches && matches.index === 0){
			let markup = matches[1];
			if(markup === "clr"){
				this.render.text = "";
			}else{
				this.render.text += script._text.text.substr(currentIndex, matches[0].length);
			}
			currentIndex += matches[0].length;
		}else{
			this.render.text += script._text.text[currentIndex++];
		}

		if(this.waiting.text){
			setTimeout(()=>{
				this.runText(script, currentIndex);
			}, script._text.speed);
		}
	}

	fadeImage(script, endTime){
		let image = script._image;
		endTime = endTime || this.getTick()+image.duration;

		let img = new Image();
		img.src = script.path("images", image.url);

		let elapse = endTime-this.getTick();
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
			setTimeout(()=>{
				this.fadeImage(script, endTime);
			}, 25);
		}
	}

	renderFrame(){
		let ctx = this.game.getContext("2d");
		if("image" in this.render){
			ctx.save();
			ctx.globalAlpha = this.render.image.opacity;
			ctx.drawImage(this.render.image.image, 0, 0);
			ctx.restore();
		}
		if("text" in this.render){
			let currentIndex = 0;
			let ox = 0;
			let oy = 0;
			let bold = false;
			let italic = false;
			let defSize = "14";
			let fontSize = "14";
			let defColor = "#ffffff";
			let fontColor = "#ffffff";

			while(currentIndex < this.render.text.length){
				let matches = this.markupPattern.exec(this.render.text.substr(currentIndex));
				let esc = this.render.text.substr(currentIndex, 2);
				if(esc === "\\[" || esc === "\\\\"){
					currentIndex += 1;
					// Add one more belows
				}else if(matches && matches.index === 0){
					if(matches[3]){
						let styleType = matches[3];
						let value = matches[4];
						if(styleType === "s"){
							fontSize = value;
						}else if(styleType === "c"){
							fontColor = value;
						}
					}else{
						let markup = matches[1];
						if(markup === "b"){
							bold = true;
						}else if(markup === "/b"){
							bold = false;
						}else if(markup === "i"){
							italic = true;
						}else if(markup === "/i"){
							italic = false;
						}else if(markup === "/s"){
							fontSize = defSize;
						}else if(markup === "/c"){
							fontColor = defColor;
						}
					}
					currentIndex += matches[0].length;
					continue;
				}

				let fontName = "";
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
	}

	nextScript(){
		for(let key in this.waiting){
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
		let script = this.script._getScript(this.currentLine);

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
			let ending = script._ending;
			if(ending.delay < 0){
				this.waiting.main = false;
			}else{
				setTimeout(()=>{
					this.waiting.main = false;
					this.nextScript();
				}, ending.delay);
			}
		}
	}

	prepareScript(){
		this.renderThread = setInterval(()=>{
			this.renderFrame();
		}, 1000/60);
		document.addEventListener("keypress", (e)=>{
			if(e.keyCode && e.keyCode !== 32 && e.keyCode !== 13){
				return;
			}
			this.nextScript();
		});
		document.addEventListener("click", ()=>{
			this.nextScript();
		});
		this.nextScript();
	}

	preloadImage(index){
		index = index || 0;

		let ctx = this.game.getContext("2d");
		if(this.script._totalScript() <= index){
			ctx.save();
			ctx.clearRect(0, 0, this.script._game.width, this.script._game.height);
			ctx.restore();
			this.prepareScript();
			return;
		}

		if(this.script._callbacks.loading.images){
			ctx.save();
			this.script._callbacks.loading.images(this.script, ctx, index/this.script._totalScript());
			ctx.restore();
		}

		let imageURL = this.script._getImage(index);
		if(!imageURL){
			this.preloadImage(index+1);
			return;
		}
		let image = new Image();
		image.addEventListener("load", ()=>{
			this.preloadImage(index+1);
		});
		image.addEventListener("error", ()=>{
			console.error("Error cannot load " + imageURL);
			this.preloadImage(index+1);
		});
		image.src = imageURL;
	}

	verifyGame(){
		let verification = new VNWeScript();
		if(typeof this.script.getVersion !== "function" || this.script.getVersion() !== verification.getVersion()){
			alert(this.lang.verificationFailed);
			console.log(this.lang.verificationFailed);
			return;
		}
		this.script._resetLine();
		this.preloadImage();
	}

	init(){
		if(document.onselectstart){
			document.onselectstart=()=>{
				return false;
			};
		}
		if(document.oncontextmenu){
			document.oncontextmenu=()=>{
				return false;
			};
		}
		this.game = document.createElement("canvas");
		let supported = this.game.getContext && this.game.getContext("2d");
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
			let table = document.createElement("table");
			table.style.width = "100%";
			table.style.height = "100%";
			this.game.appendChild(table);
			let row = document.createElement("tr");
			table.appendChild(row);
			let cell = document.createElement("td");
			cell.align = "center";
			cell.style.color = "#ffffff";
			cell.innerHTML = "Your browser is not support canvas. Please upgrade to newer version.";
			row.appendChild(cell);
			return;
		}
		this.game.width = "800";
		this.game.height = "600";

		this.verifyGame();
	}
}

window.VNWe = (script)=>{
	let game = new VNWe(script);
	game.init();
};

