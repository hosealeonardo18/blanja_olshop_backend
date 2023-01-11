const Pool = require('../config/db');

let selectAllCategories = (search, sortBy, sort) => {
    return Pool.query(`SELECT * FROM categories WHERE name LIKE '%${search}%' ORDER BY ${sortBy} ${sort}`)
}

const selectDetailCategories = (id) => {
    return Pool.query(`SELECT * FROM categories WHERE id_categories=${id};`)
}

const createCategories = (data) => {
    const {
        name
    } = data

    return Pool.query(`INSERT INTO categories(name)
    VALUES ('${name}')`);
}

const updateCategories = (data) => {
    const {
        id,
        name
    } = data;

    return Pool.query(`UPDATE categories SET name='${name}' WHERE id_categories=${id}`);
}

const deleteCategories = (id) => {
    return Pool.query(`DELETE FROM categories WHERE id_categories = ${id}`);
}

const findId = (id) => {
    return new Promise((resolve, reject) => {
        Pool.query(`SELECT id_categories FROM categories WHERE id_categories=${id}`, (error, result) => {
            if (!error) {
                resolve(result);
            } else {
                reject(error);
            };
        });
    });
};

module.exports = {
    selectAllCategories,
    selectDetailCategories,
    createCategories,
    updateCategories,
    deleteCategories,
    findId
};