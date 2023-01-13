const Pool = require('../config/db');

const getAllProduct = (searchParams, sortBy, sort, limit, offset) => {
    return Pool.query(`SELECT product.*, seller.name AS seller_name, categories.name AS categories_name  
    FROM product 
    INNER JOIN seller ON seller.id_seller = product.id_seller
    INNER JOIN categories ON categories.id_categories = product.id_categories 
    WHERE product.name LIKE '%${searchParams}%' ORDER BY ${sortBy} ${sort} LIMIT ${limit} OFFSET ${offset} `)
    // return Pool.query(`SELECT * FROM product WHERE name LIKE '%${searchParams}%' ORDER BY ${sortBy} ${sort} `)
}

const getDetailProduct = (id) => {
    return Pool.query(`SELECT product.*, seller.name AS seller_name, categories.name AS categories_name  
    FROM product 
    INNER JOIN seller ON seller.id_seller = product.id_seller
    INNER JOIN categories ON categories.id_categories = product.id_categories 
    WHERE id_product=${id}`)
    // return Pool.query(`SELECT * FROM product WHERE id_product=${id}`)
}

const createProduct = (data) => {
    const {
        id_seller,
        id_categories,
        name,
        price,
        size,
        color,
        stock,
        description,
        rating,
        review
    } = data;

    return Pool.query(`INSERT INTO product(id_seller, id_categories, name, price , size, color, stock, description,rating, review)
    VALUES ('${id_seller}', '${id_categories}', '${name}', ${price}, '${size}', '${color}', ${stock}, '${description}', ${rating}, '${review}')`)
}

const updateProduct = (data) => {
    const {
        id,
        id_seller,
        id_categories,
        name,
        price,
        size,
        color,
        stock,
        description,
        rating,
        review
    } = data

    return Pool.query(`UPDATE product SET id_seller = ${id_seller}, id_categories = ${id_categories}, name = '${name}', price = ${price} , size = '${size}', color = '${color}', stock = ${stock}, description = '${description}', rating = ${rating}, review = '${review}' WHERE id_product = ${id};`)
}

const deleteProduct = (id) => {
    return Pool.query(`DELETE FROM product WHERE id_product = ${id}`)
}

const findId = (id) => {
    return new Promise((resolve, reject) => {
        Pool.query(`SELECT id_product FROM product WHERE id_product=${id}`, (error, result) => {
            if (!error) {
                resolve(result);
            } else {
                reject(error);
            }
        });
    });
};

const countData = () => {
    return Pool.query(`SELECT COUNT(*) FROM product`)
}

module.exports = {
    getAllProduct,
    getDetailProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    findId,
    countData
}