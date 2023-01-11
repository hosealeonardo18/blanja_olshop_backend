const Pool = require('../config/db');

const getAllSeller = () => {
    return Pool.query(`SELECT * FROM seller`)
}

const getDetailSeller = (id) => {
    return Pool.query(`SELECT * FROM seller WHERE id_seller=${id};`)
}

const createSeller = (data) => {
    const {
        name,
        alamat,
        gender,
        tanggal_lahir,
        email,
        password
    } = data;

    return Pool.query(`INSERT INTO seller(name , alamat, gender, tanggal_lahir , email, password)
    VALUES ('${name}', '${alamat}', '${gender}', '${tanggal_lahir}', '${email}', '${password}')`)
}

const updateSeller = (data) => {
    const {
        id,
        name,
        alamat,
        gender,
        tanggal_lahir,
        email,
        password
    } = data

    return Pool.query(`UPDATE seller SET name='${name}', alamat='${alamat}', gender='${gender}', tanggal_lahir='${tanggal_lahir}', email='${email}', password='${password}' WHERE id_seller=${id}`)
}

const deleteSeller = (id) => {
    return Pool.query(`DELETE FROM seller WHERE id_seller = ${id}`)
}

const findId = (id) => {
    return new Promise((resolve, reject) => {
        Pool.query(`SELECT id_seller FROM seller WHERE id_seller=${id}`, (error, result) => {
            if (!error) {
                resolve(result);
            } else {
                reject(error);
            };
        });
    });
};


module.exports = {
    getAllSeller,
    getDetailSeller,
    createSeller,
    updateSeller,
    deleteSeller,
    findId
}