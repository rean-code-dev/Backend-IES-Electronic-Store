
exports.KEY_TOKEN = "SDFAFas343@@$#@%%^124312$^@@!21()RTYERY4565641251Gre5%^$%$%$#52tifghu"
exports.KEY_REFRESH_TOKEN = "fgfaksf34567893423@$##$%^%$^$%$%&^&FFGFGFHDFFG#$%^$%^%^&%^$%@#$$^%$#$33#$%#$^%$%$%$^%$#$%$#%^%$#$%$%^%$%$%#$@f"    
const multer = require("multer")
exports.isEmptyOrNull = (value)=>{
    if(value == "" || value == null || value == undefined){
        return true
    }
    return false
}


exports.invoiceNumber = (number) =>{
    var str = "" +(number +1)
    var pad = "0000"
    var invoice = pad.substring(0, pad.length - str.length) + str;
    return "INV"+invoice;
}

exports.productBarcode = (number) =>{
    var str = ""+(number +1)
    var pad = "0000"
    var barcode = pad.substring(0, pad.length - str.length) + str;
    return "P"+barcode;
}




https://express.com/en/resources/middleware/multer.html
exports.upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, callbck) {
            callbck(null, "C:/xampp/htdocs/project/image_cic" )
        },  
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            cb(null, file.fieldname + '-' + uniqueSuffix)
        }
    }),
    limits: {
        fileSize: 1024 * 1024 * 3
    },
    fileFilter:(req, file, cb) => {
         console.log(file)
        if (file.mimetype !== "image/png" || file.mimetype !== "image/jpg" || file.mimetype !== "image/jpeg") {
            cb(null, false);
        } else {
            cb(null, true);
        }
    }

})