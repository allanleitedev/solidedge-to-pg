const fs = require('fs')
const path = require('path');
const { execFileSync } = require('child_process');

function getStructureJson(directory){

    var exec = path.join(__dirname,`seToJson\\\r\nReportBom.exe -l "${directory}"`)

    var data = `cd ${exec}`

    fs.writeFileSync("tojson.bat",data)

    execFileSync("tojson.bat")
    
    var filelist = fs.readdirSync(__dirname + '\\json')

    var assemblies = []

    filelist.map((map)=>{
        map.substring(map.length -5,map.length) == '.json'?assemblies.push(map):null
    })

    var json = fs.readFileSync( __dirname + "\\json\\" + assemblies[0] , "utf8", function(err, data){
        if(err){
          return console.log("Erro ao ler arquivo");
        }
        var jsonData = JSON.parse(data);
        console.log(jsonData)
        return jsonData
    })
    console.log(json)

    try {
        fs.unlinkSync("tojson.bat")
        fs.unlinkSync(`${__dirname}\\json\\${assemblies[0]}`)
    } catch (error) {
        console.log(error)
    }
    return JSON.parse(json)
}
getStructureJson('G:\\GESTAO DE PROCESSOS\\REIMPLEMENTACAO DE PRODUTO\\ROX\\montagens\\815.00 - ROX MINI 5_9W TRILHO MONO.asm')






