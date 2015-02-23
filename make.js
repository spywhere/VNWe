var fs = require("fs");
var path = require("path");
var babel = require("babel");
var uglify = require("uglify-js");

var sourceDir = "src/";
var outputDir = "js/";

fs.readdir(sourceDir, function(err, files){
	if(err){
		throw err;
	}
	console.log("Packing code ...");
	var packedCode = "";

	packedCode += "(window)=>{";
	files.forEach(function(file, index, files){
		console.log("Reading " + file + " ...");
		packedCode += fs.readFileSync(path.join(sourceDir, file));
	});
	packedCode += "}(window);";

	console.log("Compiling code ...");
	var result = babel.transform(packedCode);
	var outputPath = path.join(outputDir, "vnwe");
	fs.writeFile(outputPath+".js", result.code, function(err){
		if(err){
			throw err;
		}
		console.log("Code has been compiled into vnwe.js !");
	});
	var minifiedCode = uglify.minify(result.code, {fromString: true}).code;
	fs.writeFile(outputPath+".min.js", minifiedCode, function (err) {
		if(err){
			throw err;
		}
		console.log("Code has been minified into vnwe.min.js !");
	});
});
