const db = require ("../database")
const {isEmptyOrNull} = require("../utils/service")

// ========================================= getAll WishList ===================================================
// const getAll_wishlist = async(req,res)=>{
//     var {customer_id} = req.body
//     var sql = "SELECT * FROM wishlist WHERE customer_id";
//     // const sql = "SELECT wl.id, p.* FROM wishlist wl"
//     // sql += "INNER JOIN product p ON (p.product_id = wl.product_id)"
//     // sql += "WHERE wl.customer_id = ?"
//     var list = await db.query(sql,[customer_id])
//     res.json({
//         result:list
//     })
// }

const getFavorite = async(req,res)=>{
    const list = await db.query("SELECT * FROM favorites")
    res.json({
        message: "get all favorites",
        result:list
    })
}


const createFavorite = async (req, res) => {
    try {
        const { customer_id, product_id } = req.body;

        if (!customer_id || !product_id) {
            return res.status(400).json({ message: "Customer ID and Product ID are required" });
        }

        // Check if the product is already in the customer's favorites
        const checkSql = "SELECT * FROM favorites WHERE customer_id = ? AND product_id = ? AND is_deleted = 0";
        const existingFavorite = await db.query(checkSql, [customer_id, product_id]);

        if (existingFavorite.length > 0) {
            return res.status(409).json({ message: "Product is already in the wishlist" });
        }

        // Insert the new favorite item
        const insertSql = "INSERT INTO favorites (customer_id, product_id, created_at) VALUES (?, ?, NOW())";
        const result = await db.query(insertSql, [customer_id, product_id]);

        return res.status(201).json({
            message: "Product added to wishlist successfully!",
            result,
        });
    } catch (error) {
        console.error("Error adding product to wishlist:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};



const remove_wishlist = async (req,res) =>{
    var {wishlist_id} = req.body
    var sql = "DELETE FROM wishlist WHERE wishlist_id = ?"
    var data = await db.query(sql,[wishlist_id])
    res.json({
        message : "Product Remove from your wishlist!",
        result: data
    })

}
module.exports ={
    getFavorite,
    createFavorite,
    remove_wishlist,
}
