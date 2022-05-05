const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

  var serviceAccount = require('./serviceAccountKey.json')

  initializeApp({
    credential: cert(serviceAccount)
  });
  
  const db = getFirestore();

async function setProduct(family,product,data){

  
  const produto = await db.collection(`linhas/${family}/products`).doc(product).set(data)
  return produto
}

async function setFamilia(family,datafam){
  const familia = await db.collection('linhas').doc(family).set(datafam)
  return familia
}
