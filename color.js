
module.exports.param = "48"
var escapedColor = (pixel) => `\u001b[${module.exports.param};2;${pixel.r};${pixel.g};${pixel.b}m`;
module.exports.intToRGBA = i => ({"b":i&255,"g":(i>>8)&255,"r":(i>>16)&255,"a":(i>>24)&255});
module.exports.RGBAToInt = rgba => (rgba[2]|rgba[1]<<8|rgba[0]<<16|rgba[3]<<255)
module.exports.fillChar = " ";
module.exports.coloredString = function(image) {
    var output = "";
    var pf = typeof(image[0]) == typeof(0) ? module.exports.intToRGBA : (i) => module.exports.intToRGBA(module.exports.RGBAToInt(i))
    var prev;
    image.forEach((pixel) => {
        output += (pixel !== "\n")?  escapedColor(pf(pixel)) + module.exports.fillChar : "\n";
    });
    return output;
};