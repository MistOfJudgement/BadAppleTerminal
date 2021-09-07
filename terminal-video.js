const ffmpeg = require("ffmpeg");
const Jimp = require("jimp");
const color = require("/site/test/color.js");
const fs = require("fs");
var width = process.stdout.columns;
var height = process.stdout.rows;
var fps = 30
var spf = 1000.0/fps;

var file = process.argv[2];
var video = [];

var fileOutput = process.argv[3]
var _output = fs.createWriteStream(fileOutput)
var imagePacker = function(arr) {
    out = [];
    for(var i = 0; i < arr.length/4; i++) {
        out.push([arr[i*4+0], arr[i*4+1], arr[i*4+2], arr[i*4+3]])
    }
    return out
}
var processFilePromise = function(file) {
    return new Promise(resolve => {Jimp.read(file)//open file as image
	    .then(image => {//process image
	        //video.push(imagePacker([...image.bitmap.data]))
	        _output.write(color.coloredString(imagePacker([...image.bitmap.data])) + "\n")
	        console.log("---" + video.length + " " + Jimp.intToRGBA(image.getPixelColor(0, 0)).toString())
	        
	    }).then(() => fs.unlinkSync(file)).then(()=>resolve())
	    .catch(err => {
	        console.log("read e" + err);
	    });//end of read image callback
    });
}
try {
    var _process = new ffmpeg(file);
    _process.then(function (_video) {//ffmpeg file promise
        _video.fnExtractFrameToJPG("/site/temp", //extraction promise
        {
            every_n_frames : 1,
            size:`${width}x${height}`,
            file_name:"frame_%s",
            keep_aspect_ratio:false
        },
        function (error, files) {// extraction callback
    		if (!error) {
    			console.log('Frames: ' + files.length);
    			
    			Promise.all(files.map(processFilePromise)).then(()=>_output.end())
    // 			Promise.all(files.map(processFilePromise)).then(()=>{
    // 			    var ind = 0;
    // 			    setInterval(()=>{
    // 			     //   console.log(video[ind++])
    // 			        console.clear()
    // 			        console.log(color.coloredString(video[ind++]))
    // 			        //console.log(video[ind])
    // 			        if(ind >= video.length) ind = 0;
    // 			    }, spf)
    // 			});
    		} else {
    		    console.log("extact:" + error);
    		}
		})
    }).then(()=>console.log("a"))//file promise end
} catch (e) {
    console.log(e.code);
    console.log(e.msg);
}

//Promise.all(promises).then(()=>console.log("b"+typeof(video)))
//setTimeout(()=>console.log("a" + video), 10000)
