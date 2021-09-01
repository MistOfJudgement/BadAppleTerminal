const fs = require('fs');

var d_width = 64.0*2;
var d_height = 18.0*2;
var images =[];
var fps = 30;
var spf = 1000.0/fps
var temp = 0
function isLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i);
}
function isDigit(str) {
    return str >= '0' && str <= '9'
}
function rleToImage(rleString, size) {
    var i = 0;
    var counter = 0;
    var repeat;
    var dest = new Array(size)
    while( i < rleString.length) {
        while(isLetter(rleString[i])) {
            dest[counter] = (rleString[i] ==='W' ? "#" : " ")
            counter++;
            i++;
        }
        repeat = 0;
        while(isDigit(rleString[i])) {
            repeat = 10 * repeat + (parseInt(rleString[i]))
            i++
        } 
        var temp = rleString[i]; 
        i++;
        while(repeat-- > 0) {
            dest[counter] = (temp === 'W'? "#":" ")
            counter ++;
        }
    }
    return dest;
}

function resize(image, f_w, f_h, width, height) {
    var output = []
    for(var y = 0; y < height; y++) {
        for(var x = 0; x < width; x++) {
            for (var dy = 0; dy < f_h; dy++) {
                for(var dx = 0; dx < f_w; dx++) {
                    output[(y*f_h+dy)*d_width+x*f_w+dx] = image[(y*width)+x]
                }
            }
        }
    }
    return output
}
var pattern = new RegExp(".{" + d_width + "}", "g")
function displayImage(image) {
    console.clear()
    
    console.log(image.join("").match(pattern).join("\n"));
    
}
function displayImageString(str) {
    console.clear()
    console.log(str.match(pattern).join("\n"))
}
// d_width = 8;
// d_height = 8;
// displayImage(resize(["#", " ", "#", " ","#", " ", "#", " ","#", " ", "#", " ","#", " ", "#", " "], 2, 2, 4, 4))


fs.readFile('badapple.rle', (err, data) => {
    console.log("read Start")

    if (err) {
        console.log(err);
        return;
    }
    console.log("no error")
    const frames = data.toString().split('\n');
    console.log("split complete")
    const header = frames[0].split(' ');
    console.log("header" + header);
    images.length = parseInt(header[0]);
    var width = header[1];
    var height = header[2];
    f_width = d_width/width;
    f_height = d_height/height;
    console.log(f_width + " " + f_height + " " + width + " " + height)
    console.log(header);
    for(var i = 0; i < header[0]; i++) {
        images[i] = resize(rleToImage(frames[i+1], width*height), f_width, f_height, width, height).join("");

    }
    //console.log(images[0])
    console.log("fDone");

});


setInterval(() => {
    displayImageString(images[temp++])
    if(temp >= images.length) {
        temp = 0
    }
}, spf)
console.log("end");


