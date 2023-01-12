const Pool = require('../config/db');

const getAllSeller = (searchParams, sortBy, sort, limit, offset) => {
    return Pool.query(`SELECT * FROM seller WHERE name LIKE '%${searchParams}%' ORDER BY ${sortBy} ${sort} LIMIT ${limit} OFFSET ${offset}`)
}

const getDetailSeller = (id) => {
    return Pool.query(`SELECT * FROM seller WHERE id_seller=${id};`)
}

const createSeller = (data) => {
    const {
        name,
        address,
        gender,
        date_of_birthday,
        email,
        password
    } = data;

    return Pool.query(`INSERT INTO seller(name , address, gender, date_of_birthday , email, password)
    VALUES ('${name}', '${address}', '${gender}', '${date_of_birthday}', '${email}', '${password}')`)
}

const updateSeller = (data) => {
    const {
        id,
        name,
        address,
        gender,
        date_of_birthday,
        email,
        password
    } = data

    return Pool.query(`UPDATE seller SET name='${name}', address='${address}', gender='${gender}', date_of_birthday='${date_of_birthday}', email='${email}', password='${password}' WHERE id_seller=${id}`)
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

const countData = () => {
    return Pool.query(`SELECT COUNT(*) FROM seller`);
}


module.exports = {
    getAllSeller,
    getDetailSeller,
    createSeller,
    updateSeller,
    deleteSeller,
    findId,
    countData
}