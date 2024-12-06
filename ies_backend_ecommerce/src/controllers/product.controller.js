const { json } = require("express")
const db = require("../database")
const Pagination = require('../model/paginationModel');
const { isEmptyOrNull } = require("../utils/service")


//================ Get Product =========
const getAll_product = async (req, res) => {
    try {
        const { page, perpage } = req.query;  // Get page and perpage from query parameters

        const pagination = new Pagination('', page, perpage);

       
        const sql = "SELECT * FROM product LIMIT ? OFFSET ?";
        const products = await db.query(sql, [pagination.perPage, pagination.offset]);

       
        const countSql = "SELECT COUNT(*) AS total FROM product";
        const countResult = await db.query(countSql);
        const totalItems = countResult[0]?.total || 0;

        // Send paginated response
        res.json({
            status: 200,
            ...pagination.buildResponse(products, totalItems),
        });
    } catch (error) {
        console.error("Error fetching products:", error.message);
        res.status(500).json({
            message: "An error occurred while fetching products.",
            error: error.message,
        });
    }
};




///========================  Get One Product =================
const getOne_product = async (req, res) => {
    const { product_id } = req.params;
    var sql = 'SELECT * FROM product WHERE product_id =?'
    var result = await db.query(sql, [product_id])

    res.json({
        result: result
    })
}

///========================  create Product =================
const create_product = (req, res) => {
  
    var {
        category_id,
        barcode,
        name,
        quantity,
        price,
        image,
        description,

    } = req.body;

    var message = {}
    var filename  = null;
    if (req.file) {
        filename = req.file.filename
    }
    if (isEmptyOrNull(category_id)) {
        message.category_id = "Category id required!"
    }
    if (isEmptyOrNull(barcode)) {
        message.barcode = "Barcode required!"
    }
    if (isEmptyOrNull(name)) {
        message.name = "Name required!"
    }
    if (isEmptyOrNull(quantity)) {
        message.quantity = "Quantity required!"
    }
    if (isEmptyOrNull(price)) {
        message.price = "Price required!"
    }
    if (Object.keys(message).length > 0) {
        res.json({
            error: true,
            message: message
        })
        return false;
    }
 
    var sql = "INSERT INTO product (category_id,barcode,name,quantity,price,image,description) VALUES (?,?,?,?,?,?,?)"
    var param = [category_id, barcode, name, quantity, price, filename, description]
    var result = db.query(sql, param)
    res.json({
        message: "Create product Success!",
        status: 200,
        result: result,
        file: req.file,
    })
}


///========================  update Product =================
const update_product = async (req, res) => {
    var {
        product_id,
        category_id,
        barcode,
        name,
        quantity,
        price,
        image,
        description,

    } = req.body;

    var message = {}
    if (isEmptyOrNull(product_id)) {
        message.product_id = "Product id required!"
    }
    if (isEmptyOrNull(category_id)) {
        message.category_id = "Category id required!"
    }
    if (isEmptyOrNull(barcode)) {
        message.barcode = "Barcode required!"
    }
    if (isEmptyOrNull(name)) {
        message.name = "Name required!"
    }
    if (isEmptyOrNull(quantity)) {
        message.quantity = "Quantity required!"
    }
    if (isEmptyOrNull(price)) {
        message.price = "Price required!"
    }
    if (Object.keys(message).length > 0) {
        res.json({
            error: true,
            message: message
        })
        return false;
    }

    var sql = "UPDATE product SET category_id =? ,barcode=?,name =? ,quantity =? ,price =?,image=?,description =? WHERE product_id =?"
    var param = [category_id, barcode, name, quantity, price, image, description, product_id]
    var result = db.query(sql, param)
    res.json({
        message: "Update product Success!",
        result: result
    })
}


///========================  remove Product =================
const remove_product = async (req, res) => {
    const { product_id } = req.body
    var sql = 'DELETE * FROM product WHERE product_id = ?'
    var result = await db.query(sql, [product_id])

    res.json({
        message: "Remove Succcess!",
        result: result
    })
}


///======================== changeProductStatus =================
const changeProductStatus_product = async (req, res) => {
    const { is_active } = req.body
    var sql = "UPDATE product SET is_active = ? WHERE product_id = ?"
    const result = await db.query(sql, [is_active])
    res.json({
        message: "Update product to " + (is_active == 0 ? "inactived" : "actived"),
        result: result
    })
}


///======================== searchProduct =================

// const searchProduct = async (req, res) => {
//     try {
//         const { search } = req.query;

//         if (!search || search.trim() === "") {
//             return res.status(400).json({
//                 message: "search is required.",
//             });
//         }
//         const sql = "SELECT * FROM product WHERE name LIKE ?";
//         const result = await db.query(sql, [`%${search}%`]);


//         if (result.length === 0) {
//             return res.status(404).json({
//                 result: [],
//             });
//         }

//         // Return success response
//         res.json({
//             message: "Search successful!!",
//             result: result,
//         });
//     } catch (error) {

//         console.error("Error searching products:", error.message);
//         res.status(500).json({
//             message: "An error occurred while searching for products.",
//             error: error.message,
//         });
//     }
// };


// const searchProduct = async (req, res) => {
//     try {
//         const { search, page, perPage } = req.query;
//         const pagination = new Pagination(search, page, perPage);

//         if (!pagination.query.trim()) {
//             return res.status(400).json({
//                 message: "Search query is required.",
//             });
//         }


//         const sql = "SELECT * FROM product WHERE name LIKE ? LIMIT ? OFFSET ?";
//         const products = await db.query(sql, [`%${pagination.query}%`, pagination.perPage, pagination.offset]);

//         // Fetch total count for the search query
//         const countSql = "SELECT COUNT(*) AS total FROM product WHERE name LIKE ?";
//         const countResult = await db.query(countSql, [`%${pagination.query}%`]);
//         const totalItems = countResult[0]?.total || 0;


//         if (products.length === 0) {
//             return res.status(404).json({
//                 ...pagination.buildResponse([], totalItems),
//             });
//         }

//         res.json({
//             ...pagination.buildResponse(products, totalItems),
//         });
//     } catch (error) {
//         console.error("Error searching products:", error.message);
//         res.status(500).json({
//             message: "An error occurred while searching for products.",
//             error: error.message,
//         });
//     }
// };
const searchProduct = async (req, res) => {
    try {
        const { search, page, perpage } = req.query; // Match "perpage" as used in the request

        // Initialize Pagination class
        const pagination = new Pagination(search, page, perpage);

        // Validate the search term
        if (!pagination.query.trim()) {
            return res.status(400).json({
                message: "Search query is required.",
            });
        }
        const sql = "SELECT * FROM product WHERE name LIKE ? LIMIT ? OFFSET ?";
        const products = await db.query(sql, [`%${pagination.query}%`, pagination.perPage, pagination.offset]);

    
        const countSql = "SELECT COUNT(*) AS total FROM product WHERE name LIKE ?";
        const countResult = await db.query(countSql, [`%${pagination.query}%`]);
        const totalItems = countResult[0]?.total || 0;

     
        if (products.length === 0) {
            return res.status(404).json({
                message: "No products found.",
                ...pagination.buildResponse([], totalItems),
            });
        }

        // Send the paginated response
        res.json({
            status: 200,
            ...pagination.buildResponse(products, totalItems),
        });
    } catch (error) {
        console.error("Error searching products:", error.message);
        res.status(500).json({
            message: "An error occurred while searching for products.",
            error: error.message,
        });
    }
};



//  const searchProductBycategory = async (req, res) => {
//         try {
//             const { category_id } = req.query;
//             if (!category_id || category_id.trim() === "") {
//                 return res.status(400).json({
//                     message: "Category ID is required.",
//                 });
//             }
//         const sql = "SELECT * FROM product WHERE category_id = ?";
//         const result = await db.query(sql, [category_id]);
//         if (result.length === 0) {
//             return res.status(404).json({
//                 result: [],
//             });
//         }
//         res.json({
//             result: result,
//         });

//         } catch (error) {    
//             console.error("Error searching products:", error.message);
//             res.status(500).json({
//                 message: "An error occurred while searching for products.",
//                 error: error.message,
//             });
//         }
//     };

const searchProductBycategory = async (req, res) => {
    try {
        const { category_id, page, perpage } = req.query;

        if (!category_id || category_id.trim() === "") {
            return res.status(400).json({
                message: "Category ID is required.",
            });
        }

        const pagination = new Pagination('', page, perpage);

        const sql = "SELECT * FROM product WHERE category_id = ? LIMIT ? OFFSET ?";
        const products = await db.query(sql, [category_id, pagination.perPage, pagination.offset]);

        const countSql = "SELECT COUNT(*) AS total FROM product WHERE category_id = ?";
        const countResult = await db.query(countSql, [category_id]);
        const totalItems = countResult[0]?.total || 0;


        if (products.length === 0) {
            return res.status(404).json({
                message: "No products found.",
                ...pagination.buildResponse([], totalItems),
            });
        }

        // Send paginated response
        res.json({
            status: 200,
            ...pagination.buildResponse(products, totalItems),
        });

    } catch (error) {
        console.error("Error searching products:", error.message);
        res.status(500).json({
            message: "An error occurred while searching for products.",
            error: error.message,
        });
    }
};







module.exports = {
    getAll_product,
    searchProduct,
    searchProductBycategory,
    getOne_product,
    create_product,
    update_product,
    remove_product,
    changeProductStatus_product,
    // searchProduct

}