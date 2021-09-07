var fs = require("fs")
var video;
var index =0;
var splitToChunks = (str, num) => {
   const len = str.length / num;
   const creds = str.split("").reduce((acc, val) => {
      let { res, currInd } = acc;
      if(!res[currInd] || res[currInd].length < len){
         res[currInd] = (res[currInd] || "") + val;
      }else{
         res[++currInd] = val;
      }
      return { res, currInd };
   }, {
      res: [],
      currInd: 0
   });
   return creds.res;
};
fs.readFile("/site/output.bmpv", (err, data) => {
    video = data.toString().split("\n")//.map((e) =>splitToChunks(e, process.stdout.columns).join("\n"))
    
    setInterval(() => {
        //console.log(video[index])
        console.clear()
        console.log(video[index++])
        if(index == video.length) index = 0;
    }, 1000.0/12)
})

