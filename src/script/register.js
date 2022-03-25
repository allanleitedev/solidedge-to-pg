async function register(dad,childrens){
    console.log(dad)
    var dadcode = dad.substring(0,6)
    var daddesc = dad.substring( 9, dad.length - 4)
    var id = dadcode.replace(".","")
    var dadgroup = document.getElementById(`${id}group`).value
    var dadsubgroup = document.getElementById(`${id}subgroup`).value
    var draftpath = document.querySelector("#draftpicker").files
    var path = draftpath[0].path.substring(0,draftpath[0].path.length - draftpath[0].name.length)
    console.log(path)
    path = path.replace('\\','\\\\')
    console.log(path)
    

    var verifydad = await searchProduct(dadcode)

    verifydad.rowCount == 0?renderLog(newProduct(dadcode,daddesc,dadgroup,dadsubgroup,1)):null
    //document.getElementById("logs").styles.visibility = 'hidden'

    childrens.map(async (child)=>{

        var verifychild = await searchProduct(child.code)
        verifychild.rowCount == 1?renderLog(newStructure(dadcode,child.code,child.quant)):null
        //document.getElementById("logs").styles.visibility = 'hidden'
            
    })

    renderLog(newProcess(dadcode))
    renderLog(newDraft(dadcode,path + '\\\\'))
    //document.getElementById("logs").styles.visibility = "hidden"

}

function renderLog(log){
    console.log(log)
    
}