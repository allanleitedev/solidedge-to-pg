//const fs = require('fs')
const path = require('path');
const { execFileSync } = require('child_process');

const pathbat = __dirname + "\\src\\script\\tojson.bat"

function getStructureJson(directory){

    var exec = path.join(__dirname + `\\src\\script\\seToJson \r\nReportBom.exe -l "${directory}"`)

    var data = `cd ${exec}`

    console.log(data)
    fs.writeFileSync(pathbat,data)

    execFileSync(pathbat)
    
    var filelist = fs.readdirSync(`${__dirname}\\src\\script\\json`)
    console.log(filelist)

    var assemblies = []

    filelist.map((map)=>{
        map.substring(map.length -5,map.length) == '.json'?assemblies.push(map):null
    })

    var json = fs.readFileSync(`${__dirname}\\src\\script\\json\\${assemblies[0]}`, "utf8", function(err, data){
        if(err){
          return console.log("Erro ao ler arquivo");
        }
        var jsonData = JSON.parse(data);
        console.log(jsonData)
        return jsonData
    })
    console.log(json)

    try {
        fs.unlinkSync(`${__dirname}\\src\\script\\tojson.bat`)
        fs.unlinkSync(`${__dirname}\\src\\script\\json\\${assemblies[0]}`)
    } catch (error) {
        console.log(error)
    }
    
    return JSON.parse(json)
}
