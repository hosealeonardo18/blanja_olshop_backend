const Pool = require('../config/db');

const getAllProduct = (searchParams, sortBy, sort) => {
    return Pool.query(`SELECT * FROM product WHERE name LIKE '%${searchParams}%' ORDER BY ${sortBy} ${sort} `)
}

const getDetailProduct = (id) => {
    return Pool.query(`SELECT * FROM product WHERE id_produk=${id}`)
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
        deskripsi,
        rating,
        ulasan
    } = data;

    return Pool.query(`INSERT INTO product(id_seller, id_categories, name, price , size, color, stock, deskripsi,rating, ulasan)
    VALUES ('${id_seller}', '${id_categories}', '${name}', ${price}, ${size}, '${color}', ${stock}, '${deskripsi}', ${rating}, '${ulasan}')`)
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
        deskripsi,
        rating,
        ulasan
    } = data

    return Pool.query(`UPDATE product SET id_seller = ${id_seller}, id_categories = ${id_categories}, name = '${name}', price = ${price} , size = ${size}, color = '${color}', stock = ${stock}, deskripsi = '${deskripsi}', rating = ${rating}, ulasan = '${ulasan}' WHERE id_produk = ${id};`)
}

const deleteProduct = (id) => {
    return Pool.query(`DELETE FROM product WHERE id_produk = ${id}`)
}

const findId = (id) => {
    return new Promise((resolve, reject) => {
        Pool.query(`SELECT id_produk FROM product WHERE id_produk=${id}`, (error, result) => {
            if (!error) {
                resolve(result);
            } else {
                reject(error);
            };
        });
    });
};

module.exports = {
    getAllProduct,
    getDetailProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    findId
}