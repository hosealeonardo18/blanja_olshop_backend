const Pool = require('../config/db');


const getAllCustomer = (searchParams, sortBy, sort, limit, offset) => {
    return Pool.query(`SELECT * FROM customer WHERE name LIKE '%${searchParams}%' ORDER BY ${sortBy} ${sort} LIMIT ${limit} OFFSET ${offset}`)
}

const getDetailCustomer = (id) => {
    return Pool.query(`SELECT * FROM customer WHERE id_customer=${id}`)
}

const createCustomer = (data) => {
    const {
        name,
        address,
        gender,
        date_of_birthday,
        email,
        password
    } = data

    return Pool.query(`INSERT INTO customer(name , address, gender, date_of_birthday , email, password)
    VALUES ('${name}', '${address}', '${gender}', '${date_of_birthday}', '${email}', '${password}')`);
}

const updateCustomer = (data) => {
    const {
        id,
        name,
        address,
        gender,
        date_of_birthday,
        email,
        password
    } = data;

    return Pool.query(`UPDATE customer SET name='${name}', address='${address}', gender='${gender}', date_of_birthday='${date_of_birthday}', email='${email}', password='${password}' WHERE id_customer=${id};`)
}

const deleteCustomer = (id) => {
    return Pool.query(`DELETE FROM customer WHERE id_customer=${id}`)
}

const findId = (id) => {
    return new Promise((resolve, reject) => {
        Pool.query(`SELECT id_customer FROM customer WHERE id_customer=${id}`, (error, result) => {
            if (!error) {
                resolve(result);
            } else {
                reject(error);
            };
        });
    });
};

const countData = () => {
    return Pool.query(`SELECT COUNT(*) FROM customer`);
}

module.exports = {
    getAllCustomer,
    getDetailCustomer,
    createCustomer,
    updateCustomer,
    deleteCustomer,
    findId,
    countData
}