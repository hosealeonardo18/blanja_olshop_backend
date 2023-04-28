const Pool = require('../config/db');

const getAllSeller = (searchParams, sortBy, sort, limit, offset) => {
    return Pool.query(`SELECT * FROM seller WHERE fullname LIKE '%${searchParams}%' ORDER BY ${sortBy} ${sort} LIMIT ${limit} OFFSET ${offset}`)
}

const getDetailSeller = (id) => {
    return Pool.query(`SELECT * FROM seller WHERE id_seller='${id}';`)
}

const createSeller = (data) => {
    const {
        id,
        fullname,
        email,
        gender,
        phone_number,
        password,
        role,
        store_name
    } = data;

    return Pool.query(`INSERT INTO seller(id_seller, fullname , address, phone_number, gender, date_of_birthday , email, password, role, image, store_name)
    VALUES ('${id}', '${fullname}', '', '${phone_number}','${gender}', '', '${email}', '${password}', '${role}', '', '${store_name}')`)
}

const updateSeller = (data) => {
    const {
        id,
        fullname,
        address,
        phone_number,
        gender,
        date_of_birthday,
        email,
        password,
        role,
        image,
        store_name
    } = data

    return Pool.query(`UPDATE seller SET fullname='${fullname}', address='${address}', phone_number='${phone_number}',gender='${gender}', date_of_birthday='${date_of_birthday}', email='${email}', password='${password}', role='${role}', image='${image}', store_name='${store_name}' WHERE id_seller='${id}'`)
}

const deleteSeller = (id) => {
    return Pool.query(`DELETE FROM seller WHERE id_seller ='${id}'`)
}

const findId = (id) => {
    return new Promise((resolve, reject) => {
        Pool.query(`SELECT id_seller FROM seller WHERE id_seller='${id}'`, (error, result) => {
            if (!error) {
                resolve(result);
            } else {
                reject(error);
            }
        });
    });
};

const countData = () => {
    return Pool.query(`SELECT COUNT(*) FROM seller`);
}

const findEmail = (email) => {
    return new Promise((resolve, reject) => {
        Pool.query(`SELECT * FROM seller WHERE email='${email}'`, (error, result) => {
            if (!error) {
                resolve(result);
            } else {
                reject(error);
            }
        });
    });
};

module.exports = {
    getAllSeller,
    getDetailSeller,
    createSeller,
    updateSeller,
    deleteSeller,
    findId,
    countData,
    findEmail
}