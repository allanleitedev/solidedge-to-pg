const fs = require('fs')
const pg = require('pg')

const config =  fs.readFileSync( __dirname + "\\src\\configs\\database.json" , "utf8", function(err, data){
    if(err){
      return console.log("Erro ao ler arquivo");
    }
    
    var jsonData = JSON.parse(data);
    return jsonData
  })

const client = new pg.Client(JSON.parse(config));

client.connect()

async function searchDesc(code){
    const query = `
    select pronome,grupo from produto where produto like '${code} %';
`
    let result = await client.query(query)
    let response = []
    console.log(code)
    console.log(result)
    response = result.rows[0]
    return response
}

//SEARCH tipacab
async function searchTipacab(code){
    const query = `
    select prodtac1.ptltico,tipacab.tpadesc from prodtac1 inner join tipacab on (prodtac1.ptltico = tipacab.tpacodi ) where prodtac1.ptaprco like '${code} %' ORDER BY prodtac1.ptlsequ;
`
    let result = await client.query(query)
    let response = []
    response = result.rows
    return response
}

//SEARCH variations
async function searchVariations(tipacabcode){
    const query = `
    select * from acabconf where amctipacab = '${tipacabcode}' and amcstatus <> 'I' order by amccodigo;
`
    let result = await client.query(query)
    let response = []
    response = result.rows
    console.log(response)
    return response
}

async function searchException(code){
    const query = `
    select * from confexce where cfeprodu like '${code} %';
`
    let result = await client.query(query)
    let response
    result.length>0?response = result.rows[0].cfeexcec:response=''
    return response
}

async function searchRules(codexce){
    const query = `
    select exaexcl,extexcl from excecoe2 where excodigo = '${codexce}';
`
    let result = await client.query(query)
    let response = []
    response = result.rows
    return response
}

async function searchImage(code){
    const query = `
    select proimgrot from proimag1 where proimgcod like '${code} %';
`
    let result = await client.query(query)
    let response = []
    console.log(result.rows[0].proimgrot)
    response = result.rows[0].proimgrot
    return response
}

async function searchDimmensions(code){
    const query = `
    select prodularg,producomp,produprof from produto where produto like '${code} %';
`
    let result = await client.query(query)
    let response = []
    console.log(result.rows[0].proimgrot)
    response[0] = result.rows[0].prodularg
    response[1] = result.rows[0].producomp
    response[2] = result.rows[0].produprof
    return response
}

async function searchGpDesc(grupo){
    const query = `
    select grunome from grupo where grupo =${grupo};
`
    let result = await client.query(query)
    let response = []
    console.log(result.rows[0].grunome)
    response = result.rows[0].grunome
    return response
}

async function getVarPrice(produto,variacao,tipo){
    const query = `
    select avvlr from acabvall where avcod = '${variacao}' and avtab = '34' and avpro = '${produto}' and avtpa = '${tipo}';
`
    let result = await client.query(query)
    let response = []
    
    if(result.rows.length>0){
        response = result.rows[0].avvlr
    }else{
        console.log(result.rows)
        response = 0
    }

    
    return response
}

async function getBasePrice(produto){
    const query = `
    select prvenda from tabprven where produto = '${produto}' and ttpvcod = '34';
`
    let result = await client.query(query)
    let response = []
    console.log(result.rows[0].prvenda)
    response = result.rows[0].prvenda
    return response
}

//FORMAT DATE (TODAY) FOR POSTGRES
function dataAtual(){
    let data = new Date()
    let dia = data.getDate()
    let mes = data.getMonth()+1
    let ano = data.getFullYear()
    mes = leftPad(mes, 2)

    let hoje = `${ano}-${mes}-${dia}`
    return hoje
};

//ADJUST MONTH FOR DATE
function leftPad(value, totalWidth, paddingChar) {
    var length = totalWidth - value.toString().length + 1;
    return Array(length).join(paddingChar || '0') + value;
  };
