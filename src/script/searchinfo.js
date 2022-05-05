const listacab = document.querySelector("#acab tbody")

function deletaTipo(a){
a.parentNode.remove()
}

function renderTipacab(code,desc){
    var tipo = `
                <tr class="variacao0 variacao t${code}" >
                    <td>
                        <img src="src/img/outline_delete_black_24dp.png" class="remvar" alt=""  onclick="deletaTipo(this)">
                        <input type="text" class="vartype" placeholder="VARIAÇÂO" onkeydown="upperCaseF(this)" value="${desc}" id="t${code}">
                        <table >
                            <tH>CÓD.</tH>
                            <tH>DESCRIÇÂO</tH>
                            <tH>INFO ADCIONAL</tH>
                            <tH>PREÇO</tH>
                            <tH>AJUSTE</tH>
                            <tbody id="options0" >
                            </tbody>
                            <tr>
                                <td>
                                    <img src="src/img/sharp_add_box_black_24dp.png" class="addop" onclick="adicionaLinha(0)" alt="">
                                </td>
                            </tr>
                        </table>                                
                    </td>
                </tr>
    `
    code >=07 && code <08?null:listacab.innerHTML += tipo
}

function renderVariacao(tipo,code,desc,preco){
    var variacao = document.querySelector(`.${tipo} tbody`)
    var item = `
        <tr class="c${tipo}" id="c${code.trim()}">
            <td><input type="text" placeholder="00" maxlength="2" name="varcod" id="varcod" onkeydown="upperCaseF(this)" value="${code}"></td>
            <td><input type="text" placeholder="EXAMPLE XXX" name="vardesc" id="vardesc" onkeydown="upperCaseF(this)" value="${desc}"></td>
            <td><input type="text" placeholder="INFO ADC ..." name="varinfo" id="varinfo" onkeydown="upperCaseF(this)"></td>
            <td><input type="text" placeholder="R$ 0,00" name="varpreco" id="varpreco" value="R$ ${preco}"class="money" onblur="precoZero(this)"></td>
            <td><input type="number" min="1" max="100" id="myPercent" value="0"/>%</td>
            <td><img src="src/img/outline_delete_black_24dp.png" class="remvar" alt=""  onclick="deletaRow(0,1)"></td>
        </tr>
    `
    console.log(tipo)
    tipo!=='t07'?variacao.innerHTML += item:null
}

function renderDescription(desc){
    console.log(desc)
    document.getElementById("produto").value = desc
}

function renderBasePrice(baseprice){
    console.log(baseprice)
    document.getElementById("custo").value = baseprice
}

function renderFamily(fam,famdesc){
    console.log(fam)
    document.getElementById("familia").value = fam
    document.querySelector(".famdesc").innerHTML = `<p>${famdesc}</p>`
}

function renderDimensions(larg,comp,prof){
    console.log(larg,comp,prof) 
    document.getElementById("dimx").value = larg
    document.getElementById("dimy").value = comp
    document.getElementById("dimz").value = prof
}


async function getInfos(){
    var procode = document.getElementById("codigo").value
    var description = await searchDesc(procode)
    var famdesc = await searchGpDesc(description.grupo)
    var exception = await searchException(procode)
    var baseprice = await getBasePrice(procode)
    console.log(exception)

    var rules = await searchRules(exception)
    console.log(rules)
    console.log(description.pronome)

    var dimmensions = await searchDimmensions(procode)
    renderDimensions(dimmensions[0],dimmensions[1],dimmensions[2])

    renderDescription(description.pronome)
    renderBasePrice(baseprice)
    renderFamily(description.grupo,famdesc)

    var tipacab = await searchTipacab(procode)

    console.log(tipacab)

    // PRELOGA A IMAGEM DO PRODUTO
    let pathimgauto = await searchImage(procode)
    
    let urlimgauto =  await imgBb(pathimgauto)
    console.log(urlimgauto)

    document.getElementById("fotoprod").src = urlimgauto.url
    document.querySelector(".fotoDoProduto").remove()
    document.querySelector(".foto .material-icons-outlined").remove()

    // RENDERIZA VARIAÇÕES DE ACABAMENTO
    tipacab.map(async (tipo)=>{
        renderTipacab(tipo.ptltico,tipo.tpadesc)
        var variacoes = await searchVariations(tipo.ptltico)
        variacoes.map(async (varia)=>{
            var pricevar = await getVarPrice(procode,varia.amccodigo,tipo.ptltico)
            var test = true
            rules.map((rule)=>{
                if((rule.exaexcl == varia.amccodigo) && (rule.extexcl == tipo.ptltico)){
                    test = false
                }
            })
            
            test == true? renderVariacao(`t${tipo.ptltico}`,varia.amccodigo,varia.amcdescri,pricevar):null
        })
    })
    

}

async function changeIsometric(){
    if (this.files && this.files[0]) {
        var file = new FileReader();
        file.readAsDataURL(this.files[0]);
        var urlimgiso = await imgBb(this.files[0].path);
        document.getElementById("fotodim").src = urlimgiso.url;
        document.querySelector(".fotoIsometrica").remove()
        document.querySelector(".imgdim .material-icons-outlined").remove()
    }
}
document.getElementById("imgdim").addEventListener("change", changeIsometric, false);

async function readImagefam(){
    if (this.files && this.files[0]) {
        var file = new FileReader();
        file.readAsDataURL(this.files[0]);
        var urlimgfam = await imgBb(this.files[0].path);
        console.log(urlimgfam)
        document.getElementById("fotofam").src = urlimgfam.url;
        document.querySelector(".fotofam > span").remove()
    }
}
document.getElementById("faminput").addEventListener("change", readImagefam, false);