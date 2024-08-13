const db = require ("../database")
const {isEmptyOrNull} = require("../utils/service")

// ========================================= getAll Category ===================================================
const getAll_categoy = async(req,res)=>{
    const list = await db.query("SELECT * FROM category")
    res.json({
        result:list
    })
}

//===========================================get One Category ==============================================
const getone_category = (req,res)=>{
    var id = req.params.id
    var sql = "SELECT * FROM category WHERE category_id = ?"
    db.query(sql,[id],(err,row)=>{
        if(err){
            res.json({
                message : err,
                err : true
            })
        }else{
            res.json({
                result:row
            })
        }
    })

}

//======================== Create Category================== 
const create_category  = (req,res) =>{
    const {
        name_en,
        name_kh,
        image,
        description,
        parent_id,
        status,

    }=req.body

    var message = {}
    if(isEmptyOrNull(name_en)){
        message.name_en = "name_en required!"
    }
    if(isEmptyOrNull(name_kh)){
        message.name_kh = "name_kh required!"
    }
    if(Object.keys(message).length >0){
        res.json({
            err : true,
            message : message
        })
        return
    } 

    var sql  = 'INSERT INTO category ( `name_en`, `name_kh`, `image`, `description`, `parent_id`, `status`) VALUES(?,?,?,?,?,?)'
    
    var param_data = [
        name_en,
        name_kh,
        image,
        description,
        parent_id,
        status
    ]


    db.query(sql,param_data,(err,row)=>{
        if(err){
            res.json({
                message : err,
                err : true
            })
        }
        else{
            res.json({
                message : "Category create successfully!",
                data : row
            })
        }
    })
}
//========================= Update Category ===================================

const update_category = (req,res)=>{
    const {
        category_id ,
        name_en,
        name_kh,
        image,
        description,
        parent_id,
        status,

    }=req.body
  
    var message = {}

    if(isEmptyOrNull(category_id)){
        message.category_id = "Category_id required!"
    }
    if(isEmptyOrNull(name_en)){
        message.name_en = "name_en required!"
    }
    if(isEmptyOrNull(name_kh)){
        message.name_kh = "name_kh required!"
    }
    if(Object.keys(message).length >0){
        res.json({
            err : true,
            message : message
        })
        return
    } 

    var sql = "UPDATE category SET name_en=?, name_kh=?,image=?, description=?, parent_id=?, status=? WHERE category_id=?";
    var param_sql = [name_en,name_kh,image,description,parent_id,status,category_id]

    db.query(sql,param_sql,(err,row)=>{
        if(err){
            res.json({
                err : true,
                message : err

            })
        }else{
            res.json({
                message : row.affectedRows ? "Update Category successfully!" : "Data not in system",
                data : row
            })
        }
    })
}

/// =====================================Remove Category ====================================================
const remove_category =(req,res)=>{
    var {id} = req.params
    var sql = "DELETE FROM category WHERE category_id = ?"
    db.query(sql,[id],(err,row)=>{
        if(err){
            res.json({
                err:true,
                message:err
            })
        }else{
            res.json({
                message : (row.affectedRows !=0)?"Delete Category successfuly!": "Data not in system",
                data : row
            })
        }
    })
}

module.exports = {
    getAll_categoy,
    getone_category,
    create_category,
    update_category,
    remove_category
}