// TRATAMENTO DE INSERÇÃO DE IMAGEM,
document.querySelector(".foto").addEventListener("click", () =>{
    document.querySelector("#foto").click()
})

document.querySelector(".imgdim").addEventListener("click", () =>{
    document.querySelector("#imgdim").click()
})

document.querySelector(".fotofam").addEventListener("click", () =>{
    document.querySelector("#faminput").click()
})
 //--- CONVERTE IMAGENS EM URL
        //FUNÇÃO
        async function imgUrl(imageArchive){
        
            let arquivo = imageArchive
            const formdata = new FormData()
                formdata.append("image", arquivo)
                console.log(arquivo)
                console.log(typeof(arquivo))
                console.log(arquivo)
        
                let res = await fetch("https://api.imgur.com/3/image/", {
                    method: "post",
                    headers: {
                        Authorization: "Client-ID 2494298978edcbc"
                    },
                    body: formdata
                }).then(data => data.json()).then(data => {
                   console.log(data.data)
                   return data.data.link 
                    
                })
                console.log(res)
                console.log(typeof(res))
                return res
              }

//-------------// TRATAMENTO DOS INPUTS
//GUARDA IMAGEM
let imagebin
let imagebindim
let imagebinfam
//EXIBE FOTO DO PRODUTO
async function readImageFoto() {
    if (this.files && this.files[0]) {
    var file = new FileReader();
    file.onload = async function(e) {
    document.getElementById("fotoprod").src = e.target.result;
    //console.log(e.target.result)
    document.querySelector(".fotoDoProduto").remove()
    document.querySelector(".foto .material-icons-outlined").remove()
};      
file.readAsDataURL(this.files[0]);
imagebin = await imgUrl(this.files[0]);
console.log(this.files[0])
console.log(imagebin)
console.log(typeof(imagebin))
}
}
document.getElementById("foto").addEventListener("change", readImageFoto, false);

//-----

//-----


//BOTÃO MODAL FAMILIA
 function exibeModal(button){
     if (button == 'on'){
        document.querySelector("#modalfamilia").style.visibility = 'visible'
        document.querySelector("#modalfamilia").style.opacity = 1
        document.querySelector(".contain").style.filter = 'blur(20px)'
     }else if (button == 'off'){
        document.querySelector("#modalfamilia").style.visibility = 'hidden'
        document.querySelector("#modalfamilia").style.opacity = 0
        document.querySelector(".contain").style.filter = 'blur(0px)'
     }
    
 }

//VERIFICA VALOR DA FAMÍLIA

let familia = document.getElementById("familia")
familia.addEventListener("blur", () =>{

    var valor = familia.value

    console.log(familia.value.length)
    console.log(valor)
    console.log(valor % 1)

    if((valor> 999 || valor < 700 || valor % 1 !== 0) && familia.value.length !== 0){
        alert("Valor incorreto! insira um valor inteiro e utilize uma família entre 700 e 999")
        familia.value = null
    }
})

//DEFINE PREÇO R$ 00,00 CASO SEJA NULL
function precoZero(a){
    if(a.value == undefined){
        a.value = 0
    }
}

//TRANSFORMA EM LETRAS MAIUSCULAS
function upperCaseF(a){
    setTimeout(function(){
        a.value = a.value.toUpperCase();
    }, 1);
}

//FORMATA VALOR MONETÁRIO

let count = [[1]]

//-----------//CONTROLA INSERSÃO E REMOÇÃO DE VARIAÇÕES


//DELETA VARIAÇÃO

function deletaVariacao(index){

    count[index]
    document.querySelector(`.variacao${index}`).remove()
}

// DELETA OPÇÃO
function deletaRow(varia,option){
    document.querySelector(`#options${varia} > .linha${varia}_${option}`).remove()
}

//INSERE OPÇÃO DENTRO DE VARIAÇÃO
function adicionaLinha(varia){
    count[varia].push(count[varia].length+1)
    var opcao = `
    <td><input type="text" placeholder="00" maxlength="2" name="varcod" id="varcod" onkeydown="upperCaseF(this)"></td>
    <td><input type="text" placeholder="EXAMPLE XXX" name="vardesc" id="vardesc" onkeydown="upperCaseF(this)"></td>
    <td><input type="text" placeholder="INFO ADC ..." name="varinfo" id="varinfo" onkeydown="upperCaseF(this)"></td>
    <td><input type="text" placeholder="R$ 0,00" name="varpreco" id="varpreco" class="money" value="R$ 0,00" onblur="precoZero(this)"></td>
    <td><input type="number" min="1" max="100" id="myPercent" value="0"/>%</td>
    <td><img src="src/img/outline_delete_black_24dp.png" class="remvar" alt=""onclick="deletaRow(${varia},${count[varia].length-1})"></td>`
    var tbody = document.getElementById(`options${varia}`);
    var tr = document.createElement('tr');
    tr.classList.add(`linha${varia}_${count[varia].length-1}`)
    tr.innerHTML = opcao  
    tbody.appendChild(tr);

}

//INSERE NOVA VARIAÇÃO
function adicionaVariacao(){

    count.push([1])
    var variacao = `<td>
                                    <input type="text" placeholder="VARIAÇÂO" onkeydown="upperCaseF(this)"><img src="src/img/outline_delete_black_24dp.png" class="remvar" alt="" onclick="deletaVariacao(${count.length-1})" >
                                    <table >
                                        <tH>CÓD.</tH>
                                        <tH>DESCRIÇÂO</tH>
                                        <tH>INFO ADCIONAL</tH>
                                        <tH>PREÇO</tH>
                                        <tH>AJUSTE</tH>
                                        <th></th>
                                        <tbody id="options${count.length-1}" >
                                            <tr class="linha${count.length-1}_0">
                                                <td><input type="text" placeholder="00" maxlength="2" name="varcod" id="varcod" onkeydown="upperCaseF(this)"></td>
                                                <td><input type="text" placeholder="EXAMPLE XXX" name="vardesc" id="vardesc" onkeydown="upperCaseF(this)"></td>
                                                <td><input type="text" placeholder="INFO ADC ..." name="varinfo" id="varinfo" onkeydown="upperCaseF(this)"></td>
                                                <td><input type="text" placeholder="R$ 0,00" name="varpreco" id="varpreco" value="R$ 0,00" class="money" onblur="precoZero(this)"></td>
                                                <td><input type="number" min="1" max="100" id="myPercent" value="0"/>%</td>
                                                <td><img src="src/img/outline_delete_black_24dp.png" class="remvar" alt=""  onclick="deletaRow(${count.length-1},1)"></td>
                                            </tr>
                                        </tbody>
                                        <tr><td><img src="src/img/sharp_add_box_black_24dp.png" class="addop" onclick="adicionaLinha(${count.length-1})" alt="" ></td></tr>
                                    </table>                                
                                </td>`

                            var tbody = document.getElementById('variations');
                            var tr = document.createElement('tr');
                            tr.classList.add(`variacao`)
                            tr.classList.add(`variacao${count.length-1}`)
                            tr.innerHTML = variacao
                            tbody.appendChild(tr);
}

//--------------------------// REALIZA CADASTRO NO BANCO DE DADOS//---------------------------------------//
//-------------- Cadastra Nova Família -----------------//
function cadastraFamilia(){
        var famcode = document.querySelector("#codigofam").value
        var famdesc = document.querySelector("#nomefam").value

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
    
        var raw = JSON.stringify({
            "famcode": famcode,
            "famdesc": famdesc,
            "famimage": imagebinfam,
    });
    
        console.log(JSON.parse(raw))
    
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };
    
        fetch("https://polar-crag-16613.herokuapp.com/familia", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
}


// EVENTO SALVAR
function cadastraPreco(){
    document.querySelector(".preview").style.visibility = 'hidden'
    //OBTEM VALORES NO FORMULARIO
    var codigo = document.querySelector("#codigo").value
    var familia = document.querySelector("#familia").value
    var descricao = document.querySelector("#produto").value
    var ipi = document.querySelector("#ipi").value
    ipi = parseFloat(ipi)/100
    var custo = document.querySelector("#custo").value
    custo = parseFloat(custo.substring(3,custo.length))
    var markup = document.querySelector("#markup").value
    var ip = document.querySelector("#ip").value
    //var aplicacao= document.querySelector("#aplicacao").value
    var dimx = document.querySelector("#dimx").value
    var dimy = document.querySelector("#dimy").value
    var dimz = document.querySelector("#dimz").value

    var inout = document.querySelector("input[name=inout]:checked").id
    var type = document.querySelector("input[name=tipo]:checked").id
    var install = document.querySelector("input[name=instal]:checked").id
    var luz = document.querySelector("input[name=luz]:checked").id

    var branco = document.querySelector("#acabamento .branco input").checked
    var preto = document.querySelector("#acabamento .preto input").checked
    var grafite = document.querySelector("#acabamento .grafite input").checked
    var prata = document.querySelector("#acabamento .prata input").checked
    var marrom = document.querySelector("#acabamento .marrom input").checked
    var marromcort = document.querySelector("#acabamento .marromcort input").checked
    var bronzefosc = document.querySelector("#acabamento .bronzefosc input").checked
    var ourovelho = document.querySelector("#acabamento .ourovelho input").checked
    var dourado = document.querySelector("#acabamento .dourado input").checked
    var amarelo = document.querySelector("#acabamento .amarelo input").checked
    var vermelho = document.querySelector("#acabamento .vermelho input").checked
    var laranjaneon = document.querySelector("#acabamento .laranjaneon input").checked
    var salmao = document.querySelector("#acabamento .salmao input").checked
    var verdesalvia = document.querySelector("#acabamento .verdesalvia input").checked
    var verdesm = document.querySelector("#acabamento .verdesm input").checked
    var azul = document.querySelector("#acabamento .azul input").checked
    var roxo = document.querySelector("#acabamento .roxo input").checked
    var ameixa = document.querySelector("#acabamento .ameixa input").checked
    var natural = document.querySelector("#acabamento .natural input").checked

    var qtacab = document.querySelector("#qtcores input").value


    // PEGA QUANTIDADE DE VARIAÇÕES
    var quantVaria = document.querySelectorAll(".variacao")
    var variacoes = []

    //CRIA UM ARRAY COM TODAS AS INFORMAÇÕES DE VARIAÇÕES
    for(index = 0 ; index < quantVaria.length; index++){
        var tipo = document.querySelectorAll(`.variacao${index} input`).item(0).value
        var quant = document.querySelectorAll(`#options${index} tr`).length
        variacoes.push([])
        console.log("indice:" + index)
        console.log(tipo)
        console.log("Quantidade de variacoes: "+ quant)
        for(index2 = 0; index2 < quant; index2++){
            var varcod = document.querySelector(`#options${index} .linha${index}_${index2} #varcod`).value
            var vardesc = document.querySelector(`#options${index} .linha${index}_${index2} #vardesc`).value
            var varinfo = document.querySelector(`#options${index} .linha${index}_${index2} #varinfo`).value
            var varpreco = document.querySelector(`#options${index} .linha${index}_${index2} #varpreco`).value
            var varajuste = parseInt(document.querySelector(`#options${index} .linha${index}_${index2} #myPercent`).value)
            // VERIFICA SE PREÇO É UM NÚMERO
            if (varpreco.length == 0){
                varpreco = 0
            }else{
                varpreco = parseFloat(varpreco.substring(3,varpreco.length))
            }
            

            variacoes[index].push([tipo,varcod,vardesc,varinfo,varpreco,varajuste])
            console.log(variacoes)
        }
    }
    console.log(variacoes)

    //CADASTRA INFORMAÇÕES DE PRODUTO

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "procode": codigo,
        "prodesc": descricao,
        "proipi": ipi,
        "profamilia": familia,
        "procustbase": custo,
        "proimage": imagebin,
        "proimgiso":imagebindim,
        "proip": ip,
        "prodimx": dimx,
        "prodimy": dimy,
        "prodimz": dimz,
        "inout":inout,
        "type": type,
        "install": install,
        "luz": luz,
        "branco": branco,
        "preto": preto,
        "grafite": grafite,
        "prata": prata,
        "marrom": marrom,
        "marromcort": marromcort,
        "bronzefosc": bronzefosc,
        "ourovelho": ourovelho,
        "dourado": dourado,
        "amarelo": amarelo,
        "vermelho": vermelho,
        "laranjaneon": laranjaneon,
        "salmao": salmao,
        "verdesalvia": verdesalvia,
        "verdesm": verdesm,
        "azul": azul,
        "roxo": roxo,
        "ameixa": ameixa,
        "natural": natural,
        "qtacab": qtacab
});

    console.log(JSON.parse(raw))

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
    };

    fetch("https://polar-crag-16613.herokuapp.com/produto", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

    //CADASTRA VARIAÇÕES

    for (i = 0 ; i<variacoes.length; i++){
        console.log(variacoes[i])
        for(j=0; j<variacoes[i].length; j++){
            var raw = JSON.stringify({
                "vartipo":variacoes[i][j][0],
                "varcode":variacoes[i][j][1],
                "vardesc":variacoes[i][j][2],
                "varinfo":variacoes[i][j][3],
                "varcusto":variacoes[i][j][4],
                "varproduto":codigo
            })
            console.log(JSON.parse(raw))

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
    };

            fetch("https://polar-crag-16613.herokuapp.com/variacoes", requestOptions)
                .then(response => response.text())
                .then(result => console.log(result))
                .catch(error => console.log('error', error));
        }
    }


    //------------------------------------TRATA E CADASTRA COMBINAÇÕES ---------------------------------------//

    //CADASTRA COMBINAÇÕES
    let listcombina = combine(variacoes,codigo,descricao,custo,markup,ipi)
    console.log(custo)
    console.log(listcombina)
    let listcombinaprice = combJustPrice(variacoes,codigo,descricao,custo,markup,ipi)

    
    var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

    
    var cont = 0
    async function envia(){
        
        

        var raw = JSON.stringify({
            "prodvcode": listcombina[0][cont],
            "prodvdesc": listcombina[1][cont],
            "prodvpreco": listcombina[2][cont].toFixed(2),
            "prodvinfo": listcombina[3][cont]
            });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
            };
    
            await fetch("https://polar-crag-16613.herokuapp.com/prodvar", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
            cont++

            cont<=listcombina[0].length? envia():console.log(" Acabou! ")

    }
        
        envia();

        var contprice = 0
        async function enviaPrice(){
            
            
    
            var raw = JSON.stringify({
                "prodvcode": listcombinaprice[0][cont],
                "prodvdesc": listcombinaprice[1][cont],
                "prodvpreco": listcombinaprice[2][cont].toFixed(2),
                "prodvinfo": listcombinaprice[3][cont]
                });
    
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
                };
        
                await fetch("https://polar-crag-16613.herokuapp.com/prodvar1", requestOptions)
                .then(response => response.text())
                .then(result => console.log(result))
                .catch(error => console.log('error', error));
    
                contprice++
                cont<=listcombinaprice[0].length? enviaPrice():console.log(" Acabou! ")
    
        }
            
            enviaPrice();
    

    }

    // FUNÇÃO GERA COMBINAÇÕES DO ARRAY
    function combine(array,codebase,descbase,precobase,mark,ipipercent){
        console.log("Função Combine!")
        let codeBase = codebase
        let descBase = descbase
        let precoBase = parseFloat(precobase)
        let markup = mark
        let ipi = ipipercent
    
        let varia1 = {
            tipo : '',
            options:{
                code:[],
                desc:[],
                info:[],
                price:[],
                ajuste:[]
            }
        }
        if(array[0] !== undefined){
        varia1.tipo = array[0][0][0]
        for(i in array[0]){varia1.options.code.push(array[0][i][1])}
        for(i in array[0]){varia1.options.desc.push(array[0][i][2])}
        for(i in array[0]){varia1.options.info.push(array[0][i][3])}
        for(i in array[0]){varia1.options.price.push(array[0][i][4])}
        for(i in array[0]){varia1.options.ajuste.push(array[0][i][5])}
        }
        //---------
        let varia2 = {
            tipo:"",
            options:{
                code:[],
                desc:[],
                info:[],
                price:[],
                ajuste:[]
            }
        }
        if(array[1] !== undefined){
        varia2.tipo = array[1][0][0]
        for(i in array[1]){varia2.options.code.push(array[1][i][1])}
        for(i in array[1]){varia2.options.desc.push(array[1][i][2])}
        for(i in array[1]){varia2.options.info.push(array[1][i][3])}
        for(i in array[1]){varia2.options.price.push(array[1][i][4])}
        for(i in array[1]){varia2.options.ajuste.push(array[1][i][5])}
        }
        //---------
    
        let varia3 = {
            tipo:"",
            options:{
                code:[],
                desc:[],
                info:[],
                price:[],
                ajuste:[]
            }
        }
        if(array[2] !== undefined){
        varia3.tipo = array[2][0][0]
        for(i in array[2]){varia3.options.code.push(array[2][i][1])}
        for(i in array[2]){varia3.options.desc.push(array[2][i][2])}
        for(i in array[2]){varia3.options.info.push(array[2][i][3])}
        for(i in array[2]){varia3.options.price.push(array[2][i][4])}
        for(i in array[2]){varia3.options.ajuste.push(array[2][i][5])}
        }
        //---------
    
        let varia4 = {
            tipo:"",
            options:{
                code:[],
                desc:[],
                info:[],
                price:[],
                ajuste:[]
            }
        }
        if(array[3] !== undefined){
        varia4.tipo = array[3][0][0]
        for(i in array[3]){varia4.options.code.push(array[3][i][1])}
        for(i in array[3]){varia4.options.desc.push(array[3][i][2])}
        for(i in array[3]){varia4.options.info.push(array[3][i][3])}
        for(i in array[3]){varia4.options.price.push(array[3][i][4])}
        for(i in array[3]){varia4.options.ajuste.push(array[3][i][5])}
        }
        //---------
    
        let varia5 = {
            tipo:"",
            options:{
                code:[],
                desc:[],
                info:[],
                price:[],
                ajuste:[]
            }
        }
        if(array[4] !== undefined){
        varia5.tipo = array[4][0][0]
        for(i in array[4]){varia5.options.code.push(array[4][i][1])}
        for(i in array[4]){varia5.options.desc.push(array[4][i][2])}
        for(i in array[4]){varia5.options.info.push(array[4][i][3])}
        for(i in array[4]){varia5.options.price.push(array[4][i][4])}
        for(i in array[4]){varia5.options.ajuste.push(array[4][i][5])}
        }
        //---------
    
        let varia6 = {
            tipo:"",
            options:{
                code:[],
                desc:[],
                info:[],
                price:[],
                ajuste:[]
            }
        }
        if(array[5] !== undefined){
        varia6.tipo = array[5][0][0]
        for(i in array[5]){varia6.options.code.push(array[5][i][1])}
        for(i in array[5]){varia6.options.desc.push(array[5][i][2])}
        for(i in array[5]){varia6.options.info.push(array[5][i][3])}
        for(i in array[5]){varia6.options.price.push(array[5][i][4])}
        for(i in array[5]){varia6.options.ajuste.push(array[5][i][5])}
        }
        //---------
    
        let varia7 = {
            tipo:"",
            options:{
                code:[],
                desc:[],
                info:[],
                price:[],
                ajuste:[]
            }
        }
        if(array[6] !== undefined){
        varia7.tipo = array[6][0][0]
        for(i in array[6]){varia7.options.code.push(array[6][i][1])}
        for(i in array[6]){varia7.options.desc.push(array[6][i][2])}
        for(i in array[6]){varia7.options.info.push(array[6][i][3])}
        for(i in array[6]){varia7.options.price.push(array[6][i][4])}
        for(i in array[6]){varia7.options.ajuste.push(array[6][i][5])}
        }
        //---------
    
        let varia8 = {
            tipo:"",
            options:{
                code:[],
                desc:[],
                info:[],
                price:[],
                ajuste:[]
            }
        }
        if(array[7] !== undefined){
        varia8.tipo = array[7][0][0]
        for(i in array[7]){varia8.options.code.push(array[7][i][1])}
        for(i in array[7]){varia8.options.desc.push(array[7][i][2])}
        for(i in array[7]){varia8.options.info.push(array[7][i][3])}
        for(i in array[7]){varia8.options.price.push(array[7][i][4])}
        for(i in array[7]){varia8.options.ajuste.push(array[7][i][5])}
        }

        //--------
        let varia9 = {
            tipo:"",
            options:{
                code:[],
                desc:[],
                info:[],
                price:[],
                ajuste:[]
            }
        }

        if(array[8] !== undefined){
            varia9.tipo = array[8][0][0]
            for(i in array[8]){varia9.options.code.push(array[8][i][1])}
            for(i in array[8]){varia9.options.desc.push(array[8][i][2])}
            for(i in array[8]){varia9.options.info.push(array[8][i][3])}
            for(i in array[8]){varia9.options.price.push(array[8][i][4])}
            for(i in array[8]){varia9.options.ajuste.push(array[8][i][5])}
            }
        //---------
    
        let code = [[],[],[],[]]
        let acabamentos = document.querySelectorAll('#acabamento li input')
        let acabarray = [[],[]]
        for(i=0;i<acabamentos.length;i++){
            if (acabamentos.item(i).checked == true){
                acabarray[0].push(acabamentos.item(i).classList[0])
                acabarray[1].push(acabamentos.item(i).name)                
            }
        }
        var quantacab = parseInt(document.querySelector('#qtcores input').value)
            if(varia9.options.code.length>0){
                if(varia8.options.code.length>0){
                    for(i in varia1.options.code){
                        for (j in varia2.options.code){
                            for (k in varia3.options.code){
                                for (l in varia4.options.code){
                                    for (m in varia5.options.code){
                                        for (n in varia6.options.code){
                                            for (o in varia7.options.code){
                                                for (p in varia8.options.code){
                                                    for (q in varia9.options.code){
                                                        code[0].push(`${codeBase}.${varia1.options.code[i]}${varia2.options.code[j]}${varia3.options.code[k]}${varia4.options.code[l]}${varia5.options.code[m]}${varia6.options.code[n]}${varia7.options.code[o]}${varia8.options.code[p]}${varia9.options.code[q]}`)
                                                        code[1].push(`${descBase} ${varia1.options.desc[i]} ${varia2.options.desc[j]} ${varia3.options.desc[k]} ${varia4.options.desc[l]} ${varia5.options.desc[m]} ${varia6.options.desc[n]} ${varia7.options.desc[o]} ${varia8.options.desc[p]} ${varia9.options.desc[q]}`)
                                                        code[2].push((precoBase+(varia1.options.price[i]+(varia1.options.price[i]*(varia1.options.ajuste[i]/100)))+(varia2.options.price[j]+(varia2.options.price[j]*(varia2.options.ajuste[j]/100)))+(varia3.options.price[k]+(varia3.options.price[k]*(varia3.options.ajuste[k]/100)))+(varia4.options.price[l]+(varia4.options.price[l]*(varia4.options.ajuste[l]/100)))+(varia5.options.price[m]+(varia5.options.price[m]*(varia5.options.ajuste[m]/100)))+(varia6.options.price[n]+(varia6.options.price[n]*(varia6.options.ajuste[n]/100)))+(varia7.options.price[o]*(varia7.options.ajuste[o]/100)))+(varia8.options.price[p]+(varia8.options.price[p]*(varia8.options.ajuste[p]/100)))+(varia9.options.price[q]+(varia9.options.price[q]*(varia9.options.ajuste[q]/100))))*markup*(1+ipi)
                                                        code[3].push(`${varia1.options.info[i]} ${varia2.options.info[j]} ${varia3.options.info[k]} ${varia4.options.info[l]} ${varia5.options.info[m]} ${varia6.options.info[n]} ${varia7.options.info[o]} ${varia8.options.info[p]} ${varia9.options.info[q]}`)
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
        }else if(varia8.options.code.length>0){
            for(i in varia1.options.code){
                for (j in varia2.options.code){
                    for (k in varia3.options.code){
                        for (l in varia4.options.code){
                            for (m in varia5.options.code){
                                for (n in varia6.options.code){
                                    for (o in varia7.options.code){
                                        for (p in varia8.options.code){
                                            code[0].push(`${codeBase}.${varia1.options.code[i]}${varia2.options.code[j]}${varia3.options.code[k]}${varia4.options.code[l]}${varia5.options.code[m]}${varia6.options.code[n]}${varia7.options.code[o]}${varia8.options.code[p]}`)
                                            code[1].push(`${descBase} ${varia1.options.desc[i]} ${varia2.options.desc[j]} ${varia3.options.desc[k]} ${varia4.options.desc[l]} ${varia5.options.desc[m]} ${varia6.options.desc[n]} ${varia7.options.desc[o]} ${varia8.options.desc[p]}`)
                                            code[2].push((precoBase+(varia1.options.price[i]+(varia1.options.price[i]*(varia1.options.ajuste[i]/100)))+(varia2.options.price[j]+(varia2.options.price[j]*(varia2.options.ajuste[j]/100)))+(varia3.options.price[k]+(varia3.options.price[k]*(varia3.options.ajuste[k]/100)))+(varia4.options.price[l]+(varia4.options.price[l]*(varia4.options.ajuste[l]/100)))+(varia5.options.price[m]+(varia5.options.price[m]*(varia5.options.ajuste[m]/100)))+(varia6.options.price[n]+(varia6.options.price[n]*(varia6.options.ajuste[n]/100)))+(varia7.options.price[o]+(varia7.options.price[o]*(varia7.options.ajuste[o]/100)))+(varia8.options.price[p]+(varia8.options.price[p]*(varia8.options.ajuste[p]/100))))*markup*(1+ipi))
                                            code[3].push(`${varia1.options.info[i]} ${varia2.options.info[j]} ${varia3.options.info[k]} ${varia4.options.info[l]} ${varia5.options.info[m]} ${varia6.options.info[n]} ${varia7.options.info[o]} ${varia8.options.info[p]}`)
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }else if(varia7.options.code.length>0){
            for(i in varia1.options.code){
                for (j in varia2.options.code){
                    for (k in varia3.options.code){
                        for (l in varia4.options.code){
                            for (m in varia5.options.code){
                                for (n in varia6.options.code){
                                    for (o in varia7.options.code){
                                        code[0].push(`${codeBase}.${varia1.options.code[i]}${varia2.options.code[j]}${varia3.options.code[k]}${varia4.options.code[l]}${varia5.options.code[m]}${varia6.options.code[n]}${varia7.options.code[o]}`)
                                        code[1].push(`${descBase} ${varia1.options.desc[i]} ${varia2.options.desc[j]} ${varia3.options.desc[k]} ${varia4.options.desc[l]} ${varia5.options.desc[m]} ${varia6.options.desc[n]} ${varia7.options.desc[o]}`)
                                        code[2].push((precoBase+(varia1.options.price[i]+(varia1.options.price[i]*(varia1.options.ajuste[i]/100)))+(varia2.options.price[j]+(varia2.options.price[j]*(varia2.options.ajuste[j]/100)))+(varia3.options.price[k]+(varia3.options.price[k]*(varia3.options.ajuste[k]/100)))+(varia4.options.price[l]+(varia4.options.price[l]*(varia4.options.ajuste[l]/100)))+(varia5.options.price[m]+(varia5.options.price[m]*(varia5.options.ajuste[m]/100)))+(varia6.options.price[n]+(varia6.options.price[n]*(varia6.options.ajuste[n]/100)))+(varia7.options.price[o]+(varia7.options.price[o]*(varia7.options.ajuste[o]/100))))*markup*(1+ipi))
                                        code[3].push(`${varia1.options.info[i]} ${varia2.options.info[j]} ${varia3.options.info[k]} ${varia4.options.info[l]} ${varia5.options.info[m]} ${varia6.options.info[n]} ${varia7.options.info[o]}`)
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }else if(varia6.options.code.length>0){
            for(i in varia1.options.code){
                for (j in varia2.options.code){
                    for (k in varia3.options.code){
                        for (l in varia4.options.code){
                            for (m in varia5.options.code){
                                for (n in varia6.options.code){
                                        code[0].push(`${codeBase}.${varia1.options.code[i]}${varia2.options.code[j]}${varia3.options.code[k]}${varia4.options.code[l]}${varia5.options.code[m]}${varia6.options.code[n]}`)
                                        code[1].push(`${descBase} ${varia1.options.desc[i]} ${varia2.options.desc[j]} ${varia3.options.desc[k]} ${varia4.options.desc[l]} ${varia5.options.desc[m]} ${varia6.options.desc[n]}`)
                                        code[2].push((precoBase+(varia1.options.price[i]+(varia1.options.price[i]*(varia1.options.ajuste[i]/100)))+(varia2.options.price[j]+(varia2.options.price[j]*(varia2.options.ajuste[j]/100)))+(varia3.options.price[k]+(varia3.options.price[k]*(varia3.options.ajuste[k]/100)))+(varia4.options.price[l]+(varia4.options.price[l]*(varia4.options.ajuste[l]/100)))+(varia5.options.price[m]+(varia5.options.price[m]*(varia5.options.ajuste[m]/100)))+(varia6.options.price[n]+(varia6.options.price[n]*(varia6.options.ajuste[n]/100))))*markup*(1+ipi))
                                        code[3].push(`${varia1.options.info[i]} ${varia2.options.info[j]} ${varia3.options.info[k]} ${varia4.options.info[l]} ${varia5.options.info[m]} ${varia6.options.info[n]}`)
                                }
                            }
                        }
                    }
                }
            }
        }else if(varia5.options.code.length>0){
            for(i in varia1.options.code){
                for (j in varia2.options.code){
                    for (k in varia3.options.code){
                        for (l in varia4.options.code){
                            for (m in varia5.options.code){
                                        code[0].push(`${codeBase}.${varia1.options.code[i]}${varia2.options.code[j]}${varia3.options.code[k]}${varia4.options.code[l]}${varia5.options.code[m]}`)
                                        code[1].push(`${descBase} ${varia1.options.desc[i]} ${varia2.options.desc[j]} ${varia3.options.desc[k]} ${varia4.options.desc[l]} ${varia5.options.desc[m]}`)
                                        code[2].push((precoBase+(varia1.options.price[i]+(varia1.options.price[i]*(varia1.options.ajuste[i]/100)))+(varia2.options.price[j]+(varia2.options.price[j]*(varia2.options.ajuste[j]/100)))+(varia3.options.price[k]+(varia3.options.price[k]*(varia3.options.ajuste[k]/100)))+(varia4.options.price[l]+(varia4.options.price[l]*(varia4.options.ajuste[l]/100)))+(varia5.options.price[m]+(varia5.options.price[m]*(varia5.options.ajuste[m]/100))))*markup*(1+ipi))
                                        code[3].push(`${varia1.options.info[i]} ${varia2.options.info[j]} ${varia3.options.info[k]} ${varia4.options.info[l]} ${varia5.options.info[m]}`)
                            }
                        }
                    }
                }
            }
        }else if(varia4.options.code.length>0){
            for(i in varia1.options.code){
                for (j in varia2.options.code){
                    for (k in varia3.options.code){
                        for (l in varia4.options.code){
                                        code[0].push(`${codeBase}.${varia1.options.code[i]}${varia2.options.code[j]}${varia3.options.code[k]}${varia4.options.code[l]}`)
                                        code[1].push(`${descBase} ${varia1.options.desc[i]} ${varia2.options.desc[j]} ${varia3.options.desc[k]} ${varia4.options.desc[l]}`)
                                        code[2].push((precoBase+(varia1.options.price[i]+(varia1.options.price[i]*(varia1.options.ajuste[i]/100)))+(varia2.options.price[j]+(varia2.options.price[j]*(varia2.options.ajuste[j]/100)))+(varia3.options.price[k]+(varia3.options.price[k]*(varia3.options.ajuste[k]/100)))+(varia4.options.price[l]+(varia4.options.price[l]*(varia4.options.ajuste[l]/100))))*markup*(1+ipi))
                                        code[3].push(`${varia1.options.info[i]} ${varia2.options.info[j]} ${varia3.options.info[k]} ${varia4.options.info[l]}`)
                        }
                    }
                }
            }
        }else if(varia3.options.code.length>0){
            for(i in varia1.options.code){
                for (j in varia2.options.code){
                    for (k in varia3.options.code){
                                        code[0].push(`${codeBase}.${varia1.options.code[i]}${varia2.options.code[j]}${varia3.options.code[k]}`)
                                        code[1].push(`${descBase} ${varia1.options.desc[i]} ${varia2.options.desc[j]} ${varia3.options.desc[k]}`)
                                        code[2].push((precoBase+(varia1.options.price[i]+(varia1.options.price[i]*(varia1.options.ajuste[i]/100)))+(varia2.options.price[j]+(varia2.options.price[j]*(varia2.options.ajuste[j]/100)))+(varia3.options.price[k]+(varia3.options.price[k]*(varia3.options.ajuste[k]/100))))*markup*(1+ipi))
                                        code[3].push(`${varia1.options.info[i]} ${varia2.options.info[j]} ${varia3.options.info[k]}`)
                    }
                }
            }
        }else if(varia2.options.code.length>0){
            for(i in varia1.options.code){
                for (j in varia2.options.code){
                                        code[0].push(`${codeBase}.${varia1.options.code[i]}${varia2.options.code[j]}`)
                                        code[1].push(`${descBase} ${varia1.options.desc[i]} ${varia2.options.desc[j]}`)
                                        code[2].push((precoBase+(varia1.options.price[i]+(varia1.options.price[i]*(varia1.options.ajuste[i]/100)))+(varia2.options.price[j]+(varia2.options.price[j]*(varia2.options.ajuste[j]/100))))*markup*(1+ipi))
                                        code[3].push(`${varia1.options.info[i]} ${varia2.options.info[j]}`)
                }
            }
        }else if(varia1.options.code.length>0){
            for(i in varia1.options.code){
                                        code[0].push(`${codeBase}.${varia1.options.code[i]}`)
                                        code[1].push(`${descBase} ${varia1.options.desc[i]}`)
                                        code[2].push((precoBase+(varia1.options.price[i]+(varia1.options.price[i]*(varia1.options.ajuste[i]/100))))*markup*(1+ipi))
                                        code[3].push(`${varia1.options.info[i]}`)
            }
        }
        //---- ITERANDO ACABAMENTOS -------------
        let codeacab = [[],[],[],[]]
        if (quantacab == 1){
            for (i in code[0]){
                for (j in acabarray[0]){
                    codeacab[0].push(code[0][i]+acabarray[0][j])
                    codeacab[1].push(code[1][i]+" "+acabarray[1][j])
                    codeacab[2].push(code[2][i])
                    codeacab[3].push(code[3][i])
                }
            }
        }else if(quantacab == 2 ){
            for (i in code[0]){
                for (j in acabarray[0]){
                    for (k in acabarray[0]){
                        codeacab[0].push(code[0][i]+acabarray[0][j]+acabarray[0][k])
                        codeacab[1].push(code[1][i]+" "+acabarray[1][j]+" "+acabarray[1][k])
                        codeacab[2].push(code[2])
                        codeacab[3].push(code[3])
                    }
                   
                }
            }
        }else if(quantacab == 3 ){
            for (i in code[0]){
                for (j in acabarray[0]){
                    for (k in acabarray[0]){
                        for (l in acabarray[0]){
                            codeacab[0].push(code[0][i]+acabarray[0][j]+acabarray[0][k]+acabarray[0][l])
                            codeacab[1].push(code[1][i]+" "+acabarray[1][j]+" "+acabarray[1][k]+" "+acabarray[1][l])
                            codeacab[2].push(code[2][i])
                            codeacab[3].push(code[3][i])
                        }
                    }
                   
                }
            }
        }
        console.log(code)
        console.log(codeacab)
        console.log(varia1)
        return codeacab
    }


    //--------------------------// PREVIEW DOS PREÇOS //---------------------------------------//


// EVENTO prever
function previsualiza(){
    //OBTEM VALORES NO FORMULARIO
    var codigo = document.querySelector("#codigo").value
    var familia = document.querySelector("#familia").value
    var descricao = document.querySelector("#produto").value
    var ipi = document.querySelector("#ipi").value
    ipi = parseFloat(ipi)/100
    var custo = document.querySelector("#custo").value
    custo = parseFloat(custo.substring(3,custo.length))
    var markup = document.querySelector("#markup").value
    var ip = document.querySelector("#ip").value
    //var aplicacao= document.querySelector("#aplicacao").value
    var dimx = document.querySelector("#dimx").value
    var dimy = document.querySelector("#dimy").value
    var dimz = document.querySelector("#dimz").value

    var inout = document.querySelector("input[name=inout]:checked").id
    var type = document.querySelector("input[name=tipo]:checked").id
    var install = document.querySelector("input[name=instal]:checked").id
    var luz = document.querySelector("input[name=luz]:checked").id

    var branco = document.querySelector("#acabamento .branco input").checked
    var preto = document.querySelector("#acabamento .preto input").checked
    var grafite = document.querySelector("#acabamento .grafite input").checked
    var prata = document.querySelector("#acabamento .prata input").checked
    var marrom = document.querySelector("#acabamento .marrom input").checked
    var marromcort = document.querySelector("#acabamento .marromcort input").checked
    var bronzefosc = document.querySelector("#acabamento .bronzefosc input").checked
    var ourovelho = document.querySelector("#acabamento .ourovelho input").checked
    var dourado = document.querySelector("#acabamento .dourado input").checked
    var amarelo = document.querySelector("#acabamento .amarelo input").checked
    var vermelho = document.querySelector("#acabamento .vermelho input").checked
    var laranjaneon = document.querySelector("#acabamento .laranjaneon input").checked
    var salmao = document.querySelector("#acabamento .salmao input").checked
    var verdesalvia = document.querySelector("#acabamento .verdesalvia input").checked
    var verdesm = document.querySelector("#acabamento .verdesm input").checked
    var azul = document.querySelector("#acabamento .azul input").checked
    var roxo = document.querySelector("#acabamento .roxo input").checked
    var ameixa = document.querySelector("#acabamento .ameixa input").checked
    var natural = document.querySelector("#acabamento .natural input").checked

    var qtacab = document.querySelector("#qtcores input").value


    // PEGA QUANTIDADE DE VARIAÇÕES
    var quantVaria = document.querySelectorAll(".variacao")
    var variacoes = []

    //CRIA UM ARRAY COM TODAS AS INFORMAÇÕES DE VARIAÇÕES
    for(index = 0 ; index < quantVaria.length; index++){
        var tipo = document.querySelectorAll(`.variacao${index} input`).item(0).value
        var quant = document.querySelectorAll(`#options${index} tr`).length
        variacoes.push([])
        console.log("indice:" + index)
        console.log(tipo)
        console.log("Quantidade de variacoes: "+ quant)
        for(index2 = 0; index2 < quant; index2++){
            var varcod = document.querySelector(`#options${index} .linha${index}_${index2} #varcod`).value
            var vardesc = document.querySelector(`#options${index} .linha${index}_${index2} #vardesc`).value
            var varinfo = document.querySelector(`#options${index} .linha${index}_${index2} #varinfo`).value
            var varpreco = document.querySelector(`#options${index} .linha${index}_${index2} #varpreco`).value
            var varajuste = parseInt(document.querySelector(`#options${index} .linha${index}_${index2} #myPercent`).value)
            // VERIFICA SE PREÇO É UM NÚMERO
            if (varpreco.length == 0){
                varpreco = 0
            }else{
                varpreco = parseFloat(varpreco.substring(3,varpreco.length))
            }
            

            variacoes[index].push([tipo,varcod,vardesc,varinfo,varpreco,varajuste])
            console.log(variacoes)
        }
    }
    console.log(variacoes)
    //------------------------------------preview COMBINAÇÕES ---------------------------------------//

    //PREVIEW COMBINAÇÕES

    let listcombina = combJustPrice(variacoes,codigo,descricao,custo,markup,ipi)
    console.log(custo)
    console.log(listcombina)

    for (i in listcombina[0]){
        var table = document.querySelector('.preview')
        
        table.style.visibility = 'visible'
        
        table.innerHTML +=`
            <li><p>${listcombina[0][i]}</p><p>${listcombina[1][i]}</p><p>${listcombina[3][i]}</p><p>R$ - ${listcombina[2][i].toFixed(2)}</li>
        `
    }
    }

    function cancela(){
        document.querySelector(".preview").style.visibility = 'hidden'
        document.querySelector(".preview").innerHTML = `
        <li class="prevcontrol">
            <button id="salvar" onclick="cadastraPreco()" >Confirma</button>
            <button onclick="cancela()">Cancela</button>
        </li>`
    }

    //FUNÇÃO COMBINA ARRAY APENS OQUE VARIA PREÇO
    function combJustPrice(array,codebase,descbase,precobase,mark,ipipercent){
        console.log("Função Combine só preco!")
        let codeBase = codebase
        let descBase = descbase
        let precoBase = parseFloat(precobase)
        let markup = mark
        let ipi = ipipercent
    
        let varia1 = {
            tipo : '',
            options:{
                code:[],
                desc:[],
                info:[],
                price:[],
                ajuste:[]
            }
        }
        if(array[0] !== undefined){
        varia1.tipo = array[0][0][0]
        for(i in array[0]){varia1.options.code.push(array[0][i][1])}
        for(i in array[0]){varia1.options.desc.push(array[0][i][2])}
        for(i in array[0]){varia1.options.info.push(array[0][i][3])}
        for(i in array[0]){varia1.options.price.push(array[0][i][4])}
        for(i in array[0]){varia1.options.ajuste.push(array[0][i][5])}
        }
        //---------
        let varia2 = {
            tipo:"",
            options:{
                code:[],
                desc:[],
                info:[],
                price:[],
                ajuste:[]
            }
        }
        if(array[1] !== undefined){
        varia2.tipo = array[1][0][0]
        for(i in array[1]){varia2.options.code.push(array[1][i][1])}
        for(i in array[1]){varia2.options.desc.push(array[1][i][2])}
        for(i in array[1]){varia2.options.info.push(array[1][i][3])}
        for(i in array[1]){varia2.options.price.push(array[1][i][4])}
        for(i in array[1]){varia2.options.ajuste.push(array[1][i][5])}
        }
        //---------
    
        let varia3 = {
            tipo:"",
            options:{
                code:[],
                desc:[],
                info:[],
                price:[],
                ajuste:[]
            }
        }
        if(array[2] !== undefined){
        varia3.tipo = array[2][0][0]
        for(i in array[2]){varia3.options.code.push(array[2][i][1])}
        for(i in array[2]){varia3.options.desc.push(array[2][i][2])}
        for(i in array[2]){varia3.options.info.push(array[2][i][3])}
        for(i in array[2]){varia3.options.price.push(array[2][i][4])}
        for(i in array[2]){varia3.options.ajuste.push(array[2][i][5])}
        }
        //---------
    
        let varia4 = {
            tipo:"",
            options:{
                code:[],
                desc:[],
                info:[],
                price:[],
                ajuste:[]
            }
        }
        if(array[3] !== undefined){
        varia4.tipo = array[3][0][0]
        for(i in array[3]){varia4.options.code.push(array[3][i][1])}
        for(i in array[3]){varia4.options.desc.push(array[3][i][2])}
        for(i in array[3]){varia4.options.info.push(array[3][i][3])}
        for(i in array[3]){varia4.options.price.push(array[3][i][4])}
        for(i in array[3]){varia4.options.ajuste.push(array[3][i][5])}
        }
        //---------
    
        let varia5 = {
            tipo:"",
            options:{
                code:[],
                desc:[],
                info:[],
                price:[],
                ajuste:[]
            }
        }
        if(array[4] !== undefined){
        varia5.tipo = array[4][0][0]
        for(i in array[4]){varia5.options.code.push(array[4][i][1])}
        for(i in array[4]){varia5.options.desc.push(array[4][i][2])}
        for(i in array[4]){varia5.options.info.push(array[4][i][3])}
        for(i in array[4]){varia5.options.price.push(array[4][i][4])}
        for(i in array[4]){varia5.options.ajuste.push(array[4][i][5])}
        }
        //---------
    
        let varia6 = {
            tipo:"",
            options:{
                code:[],
                desc:[],
                info:[],
                price:[],
                ajuste:[]
            }
        }
        if(array[5] !== undefined){
        varia6.tipo = array[5][0][0]
        for(i in array[5]){varia6.options.code.push(array[5][i][1])}
        for(i in array[5]){varia6.options.desc.push(array[5][i][2])}
        for(i in array[5]){varia6.options.info.push(array[5][i][3])}
        for(i in array[5]){varia6.options.price.push(array[5][i][4])}
        for(i in array[5]){varia6.options.ajuste.push(array[5][i][5])}
        }
        //---------
    
        let varia7 = {
            tipo:"",
            options:{
                code:[],
                desc:[],
                info:[],
                price:[],
                ajuste:[]
            }
        }
        if(array[6] !== undefined){
        varia7.tipo = array[6][0][0]
        for(i in array[6]){varia7.options.code.push(array[6][i][1])}
        for(i in array[6]){varia7.options.desc.push(array[6][i][2])}
        for(i in array[6]){varia7.options.info.push(array[6][i][3])}
        for(i in array[6]){varia7.options.price.push(array[6][i][4])}
        for(i in array[6]){varia7.options.ajuste.push(array[6][i][5])}
        }
        //---------
    
        let varia8 = {
            tipo:"",
            options:{
                code:[],
                desc:[],
                info:[],
                price:[],
                ajuste:[]
            }
        }
        if(array[7] !== undefined){
        varia8.tipo = array[7][0][0]
        for(i in array[7]){varia8.options.code.push(array[7][i][1])}
        for(i in array[7]){varia8.options.desc.push(array[7][i][2])}
        for(i in array[7]){varia8.options.info.push(array[7][i][3])}
        for(i in array[7]){varia8.options.price.push(array[7][i][4])}
        for(i in array[7]){varia8.options.ajuste.push(array[7][i][5])}
        }

        //--------
        let varia9 = {
            tipo:"",
            options:{
                code:[],
                desc:[],
                info:[],
                price:[],
                ajuste:[]
            }
        }

        if(array[8] !== undefined){
            varia9.tipo = array[8][0][0]
            for(i in array[8]){varia9.options.code.push(array[8][i][1])}
            for(i in array[8]){varia9.options.desc.push(array[8][i][2])}
            for(i in array[8]){varia9.options.info.push(array[8][i][3])}
            for(i in array[8]){varia9.options.price.push(array[8][i][4])}
            for(i in array[8]){varia9.options.ajuste.push(array[8][i][5])}
            }
        //---------
    
        let code = [[],[],[],[]]
            if(varia9.options.code.length>0 && varia9.options.price[0]!==0){
                if(varia8.options.code.length>0 && varia8.options.price[0]!==0){
                    for(i in varia1.options.code){
                        for (j in varia2.options.code){
                            for (k in varia3.options.code){
                                for (l in varia4.options.code){
                                    for (m in varia5.options.code){
                                        for (n in varia6.options.code){
                                            for (o in varia7.options.code){
                                                for (p in varia8.options.code){
                                                    for (q in varia9.options.code){
                                                        code[0].push(`${codeBase}.${varia1.options.code[i]}${varia2.options.code[j]}${varia3.options.code[k]}${varia4.options.code[l]}${varia5.options.code[m]}${varia6.options.code[n]}${varia7.options.code[o]}${varia8.options.code[p]}${varia9.options.code[q]}`)
                                                        code[1].push(`${descBase} ${varia1.options.desc[i]} ${varia2.options.desc[j]} ${varia3.options.desc[k]} ${varia4.options.desc[l]} ${varia5.options.desc[m]} ${varia6.options.desc[n]} ${varia7.options.desc[o]} ${varia8.options.desc[p]} ${varia9.options.desc[q]}`)
                                                        code[2].push((precoBase+(varia1.options.price[i]+(varia1.options.price[i]*(varia1.options.ajuste[i]/100)))+(varia2.options.price[j]+(varia2.options.price[j]*(varia2.options.ajuste[j]/100)))+(varia3.options.price[k]+(varia3.options.price[k]*(varia3.options.ajuste[k]/100)))+(varia4.options.price[l]+(varia4.options.price[l]*(varia4.options.ajuste[l]/100)))+(varia5.options.price[m]+(varia5.options.price[m]*(varia5.options.ajuste[m]/100)))+(varia6.options.price[n]+(varia6.options.price[n]*(varia6.options.ajuste[n]/100)))+(varia7.options.price[o]*(varia7.options.ajuste[o]/100)))+(varia8.options.price[p]+(varia8.options.price[p]*(varia8.options.ajuste[p]/100)))+(varia9.options.price[q]+(varia9.options.price[q]*(varia9.options.ajuste[q]/100))))*markup*(1+ipi)
                                                        code[3].push(`${varia1.options.info[i]} ${varia2.options.info[j]} ${varia3.options.info[k]} ${varia4.options.info[l]} ${varia5.options.info[m]} ${varia6.options.info[n]} ${varia7.options.info[o]} ${varia8.options.info[p]} ${varia9.options.info[q]}`)
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
        }else if(varia8.options.code.length>0 && varia8.options.price[0]!==0){
            for(i in varia1.options.code){
                for (j in varia2.options.code){
                    for (k in varia3.options.code){
                        for (l in varia4.options.code){
                            for (m in varia5.options.code){
                                for (n in varia6.options.code){
                                    for (o in varia7.options.code){
                                        for (p in varia8.options.code){
                                            code[0].push(`${codeBase}.${varia1.options.code[i]}${varia2.options.code[j]}${varia3.options.code[k]}${varia4.options.code[l]}${varia5.options.code[m]}${varia6.options.code[n]}${varia7.options.code[o]}${varia8.options.code[p]}`)
                                            code[1].push(`${descBase} ${varia1.options.desc[i]} ${varia2.options.desc[j]} ${varia3.options.desc[k]} ${varia4.options.desc[l]} ${varia5.options.desc[m]} ${varia6.options.desc[n]} ${varia7.options.desc[o]} ${varia8.options.desc[p]}`)
                                            code[2].push((precoBase+(varia1.options.price[i]+(varia1.options.price[i]*(varia1.options.ajuste[i]/100)))+(varia2.options.price[j]+(varia2.options.price[j]*(varia2.options.ajuste[j]/100)))+(varia3.options.price[k]+(varia3.options.price[k]*(varia3.options.ajuste[k]/100)))+(varia4.options.price[l]+(varia4.options.price[l]*(varia4.options.ajuste[l]/100)))+(varia5.options.price[m]+(varia5.options.price[m]*(varia5.options.ajuste[m]/100)))+(varia6.options.price[n]+(varia6.options.price[n]*(varia6.options.ajuste[n]/100)))+(varia7.options.price[o]+(varia7.options.price[o]*(varia7.options.ajuste[o]/100)))+(varia8.options.price[p]+(varia8.options.price[p]*(varia8.options.ajuste[p]/100))))*markup*(1+ipi))
                                            code[3].push(`${varia1.options.info[i]} ${varia2.options.info[j]} ${varia3.options.info[k]} ${varia4.options.info[l]} ${varia5.options.info[m]} ${varia6.options.info[n]} ${varia7.options.info[o]} ${varia8.options.info[p]}`)
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }else if(varia7.options.code.length>0 && varia7.options.price[0]!==0){
            for(i in varia1.options.code){
                for (j in varia2.options.code){
                    for (k in varia3.options.code){
                        for (l in varia4.options.code){
                            for (m in varia5.options.code){
                                for (n in varia6.options.code){
                                    for (o in varia7.options.code){
                                        code[0].push(`${codeBase}.${varia1.options.code[i]}${varia2.options.code[j]}${varia3.options.code[k]}${varia4.options.code[l]}${varia5.options.code[m]}${varia6.options.code[n]}${varia7.options.code[o]}`)
                                        code[1].push(`${descBase} ${varia1.options.desc[i]} ${varia2.options.desc[j]} ${varia3.options.desc[k]} ${varia4.options.desc[l]} ${varia5.options.desc[m]} ${varia6.options.desc[n]} ${varia7.options.desc[o]}`)
                                        code[2].push((precoBase+(varia1.options.price[i]+(varia1.options.price[i]*(varia1.options.ajuste[i]/100)))+(varia2.options.price[j]+(varia2.options.price[j]*(varia2.options.ajuste[j]/100)))+(varia3.options.price[k]+(varia3.options.price[k]*(varia3.options.ajuste[k]/100)))+(varia4.options.price[l]+(varia4.options.price[l]*(varia4.options.ajuste[l]/100)))+(varia5.options.price[m]+(varia5.options.price[m]*(varia5.options.ajuste[m]/100)))+(varia6.options.price[n]+(varia6.options.price[n]*(varia6.options.ajuste[n]/100)))+(varia7.options.price[o]+(varia7.options.price[o]*(varia7.options.ajuste[o]/100))))*markup*(1+ipi))
                                        code[3].push(`${varia1.options.info[i]} ${varia2.options.info[j]} ${varia3.options.info[k]} ${varia4.options.info[l]} ${varia5.options.info[m]} ${varia6.options.info[n]} ${varia7.options.info[o]}`)
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }else if(varia6.options.code.length>0 && varia6.options.price[0]!==0){
            for(i in varia1.options.code){
                for (j in varia2.options.code){
                    for (k in varia3.options.code){
                        for (l in varia4.options.code){
                            for (m in varia5.options.code){
                                for (n in varia6.options.code){
                                        code[0].push(`${codeBase}.${varia1.options.code[i]}${varia2.options.code[j]}${varia3.options.code[k]}${varia4.options.code[l]}${varia5.options.code[m]}${varia6.options.code[n]}`)
                                        code[1].push(`${descBase} ${varia1.options.desc[i]} ${varia2.options.desc[j]} ${varia3.options.desc[k]} ${varia4.options.desc[l]} ${varia5.options.desc[m]} ${varia6.options.desc[n]}`)
                                        code[2].push((precoBase+(varia1.options.price[i]+(varia1.options.price[i]*(varia1.options.ajuste[i]/100)))+(varia2.options.price[j]+(varia2.options.price[j]*(varia2.options.ajuste[j]/100)))+(varia3.options.price[k]+(varia3.options.price[k]*(varia3.options.ajuste[k]/100)))+(varia4.options.price[l]+(varia4.options.price[l]*(varia4.options.ajuste[l]/100)))+(varia5.options.price[m]+(varia5.options.price[m]*(varia5.options.ajuste[m]/100)))+(varia6.options.price[n]+(varia6.options.price[n]*(varia6.options.ajuste[n]/100))))*markup*(1+ipi))
                                        code[3].push(`${varia1.options.info[i]} ${varia2.options.info[j]} ${varia3.options.info[k]} ${varia4.options.info[l]} ${varia5.options.info[m]} ${varia6.options.info[n]}`)
                                }
                            }
                        }
                    }
                }
            }
        }else if(varia5.options.code.length>0 && varia5.options.price[0]!==0){
            for(i in varia1.options.code){
                for (j in varia2.options.code){
                    for (k in varia3.options.code){
                        for (l in varia4.options.code){
                            for (m in varia5.options.code){
                                        code[0].push(`${codeBase}.${varia1.options.code[i]}${varia2.options.code[j]}${varia3.options.code[k]}${varia4.options.code[l]}${varia5.options.code[m]}`)
                                        code[1].push(`${descBase} ${varia1.options.desc[i]} ${varia2.options.desc[j]} ${varia3.options.desc[k]} ${varia4.options.desc[l]} ${varia5.options.desc[m]}`)
                                        code[2].push((precoBase+(varia1.options.price[i]+(varia1.options.price[i]*(varia1.options.ajuste[i]/100)))+(varia2.options.price[j]+(varia2.options.price[j]*(varia2.options.ajuste[j]/100)))+(varia3.options.price[k]+(varia3.options.price[k]*(varia3.options.ajuste[k]/100)))+(varia4.options.price[l]+(varia4.options.price[l]*(varia4.options.ajuste[l]/100)))+(varia5.options.price[m]+(varia5.options.price[m]*(varia5.options.ajuste[m]/100))))*markup*(1+ipi))
                                        code[3].push(`${varia1.options.info[i]} ${varia2.options.info[j]} ${varia3.options.info[k]} ${varia4.options.info[l]} ${varia5.options.info[m]}`)
                            }
                        }
                    }
                }
            }
        }else if(varia4.options.code.length>0 && varia4.options.price[0]!==0){
            for(i in varia1.options.code){
                for (j in varia2.options.code){
                    for (k in varia3.options.code){
                        for (l in varia4.options.code){
                                        code[0].push(`${codeBase}.${varia1.options.code[i]}${varia2.options.code[j]}${varia3.options.code[k]}${varia4.options.code[l]}`)
                                        code[1].push(`${descBase} ${varia1.options.desc[i]} ${varia2.options.desc[j]} ${varia3.options.desc[k]} ${varia4.options.desc[l]}`)
                                        code[2].push((precoBase+(varia1.options.price[i]+(varia1.options.price[i]*(varia1.options.ajuste[i]/100)))+(varia2.options.price[j]+(varia2.options.price[j]*(varia2.options.ajuste[j]/100)))+(varia3.options.price[k]+(varia3.options.price[k]*(varia3.options.ajuste[k]/100)))+(varia4.options.price[l]+(varia4.options.price[l]*(varia4.options.ajuste[l]/100))))*markup*(1+ipi))
                                        code[3].push(`${varia1.options.info[i]} ${varia2.options.info[j]} ${varia3.options.info[k]} ${varia4.options.info[l]}`)
                        }
                    }
                }
            }
        }else if(varia3.options.code.length>0 && varia3.options.price[0]!==0){
            for(i in varia1.options.code){
                for (j in varia2.options.code){
                    for (k in varia3.options.code){
                                        code[0].push(`${codeBase}.${varia1.options.code[i]}${varia2.options.code[j]}${varia3.options.code[k]}`)
                                        code[1].push(`${descBase} ${varia1.options.desc[i]} ${varia2.options.desc[j]} ${varia3.options.desc[k]}`)
                                        code[2].push((precoBase+(varia1.options.price[i]+(varia1.options.price[i]*(varia1.options.ajuste[i]/100)))+(varia2.options.price[j]+(varia2.options.price[j]*(varia2.options.ajuste[j]/100)))+(varia3.options.price[k]+(varia3.options.price[k]*(varia3.options.ajuste[k]/100))))*markup*(1+ipi))
                                        code[3].push(`${varia1.options.info[i]} ${varia2.options.info[j]} ${varia3.options.info[k]}`)
                    }
                }
            }
        }else if(varia2.options.code.length>0 && varia2.options.price[0]!==0){
            for(i in varia1.options.code){
                for (j in varia2.options.code){
                                        code[0].push(`${codeBase}.${varia1.options.code[i]}${varia2.options.code[j]}`)
                                        code[1].push(`${descBase} ${varia1.options.desc[i]} ${varia2.options.desc[j]}`)
                                        code[2].push((precoBase+(varia1.options.price[i]+(varia1.options.price[i]*(varia1.options.ajuste[i]/100)))+(varia2.options.price[j]+(varia2.options.price[j]*(varia2.options.ajuste[j]/100))))*markup*(1+ipi))
                                        code[3].push(`${varia1.options.info[i]} ${varia2.options.info[j]}`)
                }
            }
        }else if(varia1.options.code.length>0){
            for(i in varia1.options.code && varia1.options.price[0]!==0){
                                        code[0].push(`${codeBase}.${varia1.options.code[i]}`)
                                        code[1].push(`${descBase} ${varia1.options.desc[i]}`)
                                        code[2].push((precoBase+(varia1.options.price[i]+(varia1.options.price[i]*(varia1.options.ajuste[i]/100))))*markup*(1+ipi))
                                        code[3].push(`${varia1.options.info[i]}`)
            }
        }
        return code
    }