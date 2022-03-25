const input = document.querySelector("#filepicker")
let jsonarr = []

function getFiles(){
    let filespath = []
    document.querySelector('#asm').innerHTML =''
    console.log(input.files)
    for(i in input.files){
        filespath.push({path:input.files[i].path, name:input.files[i].name})
    }
    filespath.splice(filespath.length -2, filespath.length)
    console.log(filespath)

    jsonarr = filespath.map((path)=>{
        var json = {
            name:path.name,
            structure:getStructureJson(path.path)
        }
        return json
    })

    console.log(jsonarr)

    jsonarr.map((json)=>{
        var childrens = []

        json.structure.Child.map((child)=>{

            child.Level == 1 ? childrens.push({code:child.DocumentNumber,desc:child.Title,quant:child.Quantity}):null

        })
        renderStructure(json.name,childrens)
        
    })
    
    
    console.log(jsonarr)

    

}


function changeDraft(){
    var draftpath = document.querySelector("#draftpicker").files
    var path = draftpath[0].path.substring(0,draftpath[0].path.length - draftpath[0].name.length)
    console.log(path)
    document.querySelector(".labeldraft").innerHTML = `<p>${path}</p>`;


}
async function renderStructure(dad,childrens){
    var id = dad.substring(0,6).replace(".","")
    
    var listpai = ` 
    <li>
        <div class='${id} yelow'>
            ${dad}
            <input type="text" placeholder="GRUPO" name="grupo" id="${id}group">
            <input type="text" placeholder="SUBGRUPO" name="subgrupo" id="${id}subgroup">
            <label for="draftpicker" class="labeldraft">Get Draft Path</label>
            <input type="file" name="draftpicker" onchange="changeDraft()" id="draftpicker" webkitdirectory multiple>
            <button id="${id}register">Register</button>

        </div>
    </li>`
    document.querySelector('#asm').innerHTML += listpai
    
    
    document.querySelector('#asm').innerHTML += `<ul class='filhos${id} filhos'></ul>`


    childrens.map(async (child)=>{

        var verify = await searchProduct(child.code)
        console.log(verify)
        if(verify.rowCount == 0){
            var list = `<li class="children red"><input type="checkbox" name="filho${id}" id="filho${id}"><div class="code" contenteditable="true">${child.code}</div><div class="desc">${child.desc}</div><div class="qt">${child.quant}</div></li>`
        }else{
            var list = `<li class="children green"><input type="checkbox" name="filho${id}" id="filho${id}"><div class="code" contenteditable="true">${child.code}</div><div class="desc">${verify.rows[0].pronome}</div><div class="qt">${child.quant}</div></li>`
        }
        console.log(list)
        document.querySelector(`.filhos${id}`).innerHTML += list
    })

    document.getElementById(`${id}register`).addEventListener("click",function(){
        register(dad,childrens)
    })

}