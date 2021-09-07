
var Jimp = require("jimp")
var input_file = process.argv[2]
var color = require("./color.js")
var imagePacker = function(arr) {
    out = [];
    for(var i = 0; i < arr.length/4; i++) {
        out.push([arr[i*4+0], arr[i*4+1], arr[i*4+2], arr[i*4+3]])
    }
    return out
}
color.fillChar = " ";
color.param = "48"
Jimp.read(input_file).then(image=> {
    console.log(color.coloredString(imagePacker([...image.resize(process.stdout.columns, process.stdout.rows-2).bitmap.data])) + "\u001b[0m")

})