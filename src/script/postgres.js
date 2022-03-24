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

// REGISTRY BASE PRODUCT FOR CONFIGURATION
function newProduct(code,description,group,subgroup,peso){
    const query = `
    select * into prodtemp from produto where produto like 'COPYMODEL%';
    update prodtemp set produto = '${code}', pronome = '${description}', grupo = '${group}', subgrupo = '${subgroup}',propeso = '${peso}';
    insert into produto select * from prodtemp;
    drop table prodtemp;`;

    var title = '';
    var msg = '';

    client.query(query,(err,res)=>{
        if(err){
            title = 'Product not Registred!';
            msg = err.stack;
        }
        else{
            title = "Product Registred";
            msg = res.Message;

        }
    });
    
    const log = {
        "title":title,
        "Message":msg
    }

    return log;
}

// REGISTRY PRODUCT STRUCTURE
function newStructure(dad,children,amount){
    const query = `
    insert into estrutur (estproduto,estfilho,estusamed,estqtduso,fase,estarea,estpriemb,esthash,estver,estperspe,estnotif)
    values ('${dad}','${children}','N',${amount},(select profase from produto where produto like '${children} %'),0,0,'',0,0,'N');`;

    //ATT PRODUCT (DAD) TO MANUFACTURED IN PRODUCT TABLE
    const query2 = `
    update produto set proorigem = 'F', propeso = 0.5 where produto like '${dad} %';
    `;

    var title = '';
    var msg = '';

    client.query(query,(err,res)=>{
        if(err){
            title = 'Product not Registred!';
            msg = err.stack;
        }
        else{
            title = "Product Registred";
            msg = res.Message;

            client.query(query2)
        }
    });
    
    const log = {
        "title":title,
        "Message":msg
    }
    return log;
}

// REGISTRY PRODUCT PROCESS
function newProcess(code){
    const query = `
    select * into proctemp from processo where produto like '830.3030.AOO %';
    update proctemp set produto = '${code}', prhoras = 0.100000;
    insert into processo select * from proctemp;
    drop table proctemp;
`;

    var title = '';
    var msg = '';

    client.query(query,(err,res)=>{
        if(err){
            title = 'Product not Registred!';
            msg = err.stack;
        }
        else{
            title = "Product Registred";
            msg = res.Message;

        }
    });
    
    const log = {
        "title":title,
        "Message":msg
    }

    return log;
}

// REGISTRY DRAFT FILE DIRECTORY AND NAME
function newDraft(code,directory){
    const query = `
    insert into desenho1 (desenho,desrevi,desaprov,descopia,desresp,desfile,desnrev,auxdesfile)
    values ('${code}',1,'${dataAtual()}',1,'AUTO','${directory}${code}.DFT',0,'${directory}${code}.DFT');
;
`;

    var title = '';
    var msg = '';

    client.query(query,(err,res)=>{
        if(err){
            title = 'Product not Registred!';
            msg = err.stack;
        }
        else{
            title = "Product Registred";
            msg = res.Message;

        }
    });
    
    const log = {
        "title":title,
        "Message":msg
    }

    return log;
}

//

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
