
exports.KEY_TOKEN = "SDFAFas343@@$#@%%^124312$^@@!21()RTYERY4565641251Gre5%^$%$%$#52tifghu"

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
