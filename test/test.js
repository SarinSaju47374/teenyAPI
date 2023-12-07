import fs from "fs";

let readable = fs.createReadStream("./file.txt")
let writeable = fs.createWriteStream("./jitha.txt");
writeable.on("finish",()=>{
    console.log("File is written")
})
writeable.on("error",(err)=>{
    console.log(err)
})
readable.pipe(writeable)