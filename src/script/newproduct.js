
async function newProductFs(){
    var family = document.getElementById("familia").value
    var famdesc = document.querySelector(".famdesc p").innerHTML
    var famimage = document.getElementById("fotofam").src

    var prodcode = document.getElementById("codigo").value
    var description = document.getElementById("produto").value.trim()
    var image = document.getElementById("fotoprod").src
    var isometric = document.getElementById("fotodim").src
    var ip = document.getElementById("ip").value
    var dimx = parseInt(document.getElementById("dimx").value)
    var dimy = parseInt(document.getElementById("dimy").value)
    var dimz = parseInt(document.getElementById("dimz").value)
    var qtcores = parseInt(document.getElementById("qtcores").value)
    var basecost = parseFloat(document.getElementById("custo").value)
    var markup = parseFloat(document.getElementById("markup").value)
    // SELECIONA CORES
    var colors=[]
    var coresnode = document.querySelectorAll("#acabamento ul li input")
    coresnode.forEach((data)=>{
        data.checked == true ? colors.push(data.id):null
    })
    console.log(colors)

    //SELECIONA TIPOS
    var inoutnode = document.querySelectorAll(".inout input")
    var typenode = document.querySelectorAll(".tipo input")
    var instalnode = document.querySelectorAll(".instal input")
    var luznode = document.querySelectorAll(".luz input")

    var inout = ''
    inoutnode.forEach((data)=>data.checked? inout = data.id:null)

    var type = ''
    typenode.forEach((data)=>data.checked? type = data.id:null)

    var instal = ''
    instalnode.forEach((data)=>data.checked? instal = data.id:null)

    var luz = ''
    luznode.forEach((data)=>data.checked? luz = data.id:null)

    var json = {
        code: prodcode,
        description: description,
        basecost:basecost,
        markup:markup,
        image: image,
        isometric:isometric,
        ip: ip,
        width: dimx,
        length: dimy,
        heigth: dimz,
        quantcolors: qtcores,
        colors: colors,
        inout: inout,
        type:type,
        instal:instal,
        luz:luz,
        variations:[]
    }

    //SELECIONA VARIAÇÕES

    var vartypenode = document.querySelectorAll("#acab .variacao .vartype")

    vartypenode.forEach((data)=>{
        
        var variation = {
            vartype:data.value,
            options:[]
        }
        var optionsnode = document.querySelectorAll(`#acab .${data.id} .c${data.id}`)

        optionsnode.forEach((option)=>{
            var optcode = document.querySelector(`#acab  .${data.id} #${option.id} #varcod`).value.trim()
            var optdesc = document.querySelector(`#acab  .${data.id} #${option.id} #vardesc`).value.trim()
            var optinfo = document.querySelector(`#acab  .${data.id} #${option.id} #varinfo`).value.trim()
            var optpreco = document.querySelector(`#acab  .${data.id} #${option.id} #varpreco`).value.trim()
            var optadjust = document.querySelector(`#acab  .${data.id} #${option.id} #myPercent`).value.trim()

            optadjust = parseInt(optadjust)
            optpreco = optpreco.replaceAll(' ', '')
            optpreco = optpreco.replaceAll('R$', '')
            optpreco = optpreco.replaceAll(',', '.')
            optpreco = parseFloat(optpreco)
            console.log(optpreco)

            variation.options.push({
                code:optcode,
                desc:optdesc,
                info:optinfo,
                cost:optpreco,
                adjust:optadjust
            }) 

        })
        console.log(variation)
        json.variations.push(variation)
    })
    
    setProduct(family,prodcode,json)

    console.log(json)
}

async function newFamilyFs(){
    var family = document.getElementById("codigofam").value
    var famdesc = document.getElementById("nomefam").value
    var famimage = document.getElementById("fotofam").src

    var json = {
        famcode:family,
        famdesc:famdesc,
        famimage:famimage
    }

    setFamilia(family,json)
}