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
	var license = "/** @license\n" + fs.readFileSync("LICENSE") + "*/\n\n";
	var packedCode = "";

	packedCode += "(window)=>{";
	files.forEach(function(file, index, files){
		console.log("Reading " + file + " ...");
		packedCode += fs.readFileSync(path.join(sourceDir, file));
	});
	packedCode += "}(window);";

	console.log("Compiling code ...");
	var result = babel.transform(packedCode, {comments: false});
	var outputPath = path.join(outputDir, "vnwe");
	fs.writeFile(outputPath+".js", license+result.code, function(err){
		if(err){
			throw err;
		}
		console.log("Code has been compiled into vnwe.js !");
	});
	var minifiedOption = {
		fromString: true,
		mangle: true,
		output: {
			max_line_len: 500
		}
	};
	var minifiedCode = uglify.minify(result.code, minifiedOption).code;
	fs.writeFile(outputPath+".min.js", license+minifiedCode, function(err){
		if(err){
			throw err;
		}
		console.log("Code has been minified into vnwe.min.js !");
	});
});
