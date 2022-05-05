const imgbbUploader = require("imgbb-uploader");

async function imgBb(imageName){

         let arquivo

         console.log(imageName)
         console.log(imageName.indexOf('\\'))

         arquivo = imageName.replaceAll("\\",'/').trim()
        console.log(arquivo)
        // function to encode file data to base64 encoded string
         function base64_encode(file) {
            // read binary data
            var bitmap = fs.readFileSync(file);
            // convert binary data to base64 encoded string
            return new Buffer.from(bitmap).toString('base64');
         }

         // convert image to base64 encoded string
         var base64str = base64_encode(arquivo);

         console.log("String: " + base64str)
         const options = {
         apiKey: "b344a3a3d537062bfb62860e1f9d6c8d", // MANDATORY

         base64string:`${base64str}`, // OPTIONAL: pass a local file (max 32Mb)

         name: `${imageName}`, // OPTIONAL: pass a custom filename to imgBB API

         };
         console.log(`Obtendo url de: ${imageName}`)
           let res = await imgbbUploader(options)
           .then((response) => {
              console.log(response)
              return response
           }).catch((error) => {
               console.error(error)
               return error
            });
         console.log(res.url)
         return res
       }
       
 