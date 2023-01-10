const Pool = require('../config/db');

let selectAllCategories = () => {
    return Pool.query(`SELECT * FROM categories;`)
}

let selectDetailCategories = (id) => {
    return Pool.query(`SELECT * FROM categories WHERE id_categories=${id};`)
}
let createCategories = (data) => {
    const {
        id_categories,
        name
    } = data

    return Pool.query(`INSERT INTO categories(id_categories, name)
    VALUES (${id_categories},'${name}')`)
}
let updateCategories = () => {

}
let deleteCategories = () => {

}


module.exports = {
    selectAllCategories,
    selectDetailCategories,
    createCategories,
    updateCategories,
    deleteCategories
};