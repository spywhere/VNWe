(function(window, undefined){
	"use strict";

	function VNWeEnglishLanguage(){
		this.verification_failed = "Game verification failed";
	}

	function VNWeScript(){
		this._images = [];
		this._paths = {
			images: "assets/images/",
			bgm: "assets/bgm/",
			sfx: "assets/sfx/",
			voices: "assets/voices/"
		};

		// VN Settings

		// Scripting

		this.image = function(url, speed){
			if(!url){return;}
			speed = speed || 30;

			this._images[this._images.length] = {
				url: url,
				speed: speed
			};
		}

		// Internal

		this.getImage = function(index){
			return this._images[index];
		}

		this.getPath = function(type, url){
			if(url){
				return this.getPath(type) + url;
			}else{
				return this._paths[type];
			}
		}

		this.totalImage = function(){
			return this._images.length;
		}

		this.getVersion = function(){
			return "VNWe v3.0";
		};
	}

	function VNWe(script){
		VNWe.lang = new VNWeLanguage();
		VNWe.script = script;

		VNWe.nextScript = function(e){
			if(e.keyCode && e.keyCode != 32 && e.keyCode != 13){
				return;
			}
			console.log("Run");
		}

		VNWe.prepareScript = function(){
			document.addEventListener("keypress", VNWe.nextScript);
			document.addEventListener("click", VNWe.nextScript);
		}

		VNWe.preloadImage = function(index, loadingParent, loadingText){
			index = index || 0;
			loadingParent = loadingParent || document.createElement("table");
			loadingText = loadingText || document.createElement("td");
			if(index === 0){
				var row = document.createElement("tr");
				row.appendChild(loadingText);
				loadingParent.appendChild(row);
				VNWe.game.appendChild(loadingParent);
			}
			loadingParent.style.width = "100%";
			loadingParent.style.height = "100%";
			loadingText.style.color = "#ffffff";
			loadingText.style.textAlign = "center";
			loadingText.innerHTML = "Loading " + (index*100/VNWe.script.totalImage()).toFixed(2) + "%";
			if(VNWe.script.totalImage() <= index){
				VNWe.game.removeChild(loadingParent);
				VNWe.prepareScript();
				return;
			}
			var image = document.createElement("img");
			image.addEventListener("load", function(e){
				VNWe.preloadImage(index+1, loadingParent, loadingText);
			});
			image.addEventListener("error", function(e){
				console.error("Error cannot load " + VNWe.script.getImage(index)["url"]);
				VNWe.preloadImage(index+1, loadingParent, loadingText);
			});
			image.src = VNWe.script.getPath("images", VNWe.script.getImage(index)["url"]);
		}

		VNWe.verifyGame = function(){
			var verification = new VNWeScript();
			if(typeof this.script.getVersion != "function" || this.script.getVersion() != verification.getVersion()){
				alert(this.lang.verification_failed);
				console.log(this.lang.verification_failed);
				return;
			}
			VNWe.preloadImage();
		};

		VNWe.init = function(){
			if(document.onselectstart){
				document.onselectstart=new Function("return false");
			}
			if(document.oncontextmenu){
				document.oncontextmenu=new Function("return false");
			}
			VNWe.game = document.createElement("div");
			VNWe.game.style.position = "absolute";
			VNWe.game.style.left = "50%";
			VNWe.game.style.top = "50%";
			VNWe.game.style.width = "800px";
			VNWe.game.style.height = "600px";
			VNWe.game.style.marginLeft = "-400px";
			VNWe.game.style.marginTop = "-300px";
			VNWe.game.style.backgroundColor = "#333333";
			document.body.style.backgroundColor = "#000000";
			document.body.appendChild(VNWe.game);
			VNWe.verifyGame();
		};

		VNWe.init();
	}


	window.VNWeLanguage = VNWeEnglishLanguage;
	window.VNWeScript = VNWeScript;
	window.VNWe = VNWe;
})(window);
