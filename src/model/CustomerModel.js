const Pool = require('../config/db');


const getAllCustomer = (searchParams, sortBy, sort, limit, offset) => {
    return Pool.query(`SELECT * FROM customer WHERE fullname LIKE '%${searchParams}%' ORDER BY ${sortBy} ${sort} LIMIT ${limit} OFFSET ${offset}`)
}

const getDetailCustomer = (id) => {
    return Pool.query(`SELECT * FROM customer WHERE id_customer='${id}'`)
}

const createCustomer = (data) => {
    const {
        id,
        fullname,
        address,
        gender,
        date_of_birthday,
        email,
        password,
        role
    } = data

    return Pool.query(`INSERT INTO customer(id_customer, fullname , address, gender, date_of_birthday , email, password, role)
    VALUES ('${id}','${fullname}', '${address}', '${gender}', '${date_of_birthday}', '${email}', '${password}', '${role}')`);
}

const updateCustomer = (data) => {
    const {
        id,
        fullname,
        address,
        gender,
        date_of_birthday,
        email,
        password,
        role
    } = data;

    return Pool.query(`UPDATE customer SET fullname='${fullname}', address='${address}', gender='${gender}', date_of_birthday='${date_of_birthday}', email='${email}', password='${password}', role='${role}' WHERE id_customer='${id}';`)
}

const deleteCustomer = (id) => {
    return Pool.query(`DELETE FROM customer WHERE id_customer='${id}'`)
}

const findId = (id) => {
    return new Promise((resolve, reject) => {
        Pool.query(`SELECT id_customer FROM customer WHERE id_customer='${id}'`, (error, result) => {
            if (!error) {
                resolve(result);
            } else {
                reject(error);
            }
        });
    });
};

const countData = () => {
    return Pool.query(`SELECT COUNT(*) FROM customer`);
}

const findEmail = (email) => {
    return new Promise((resolve, reject) => {
        Pool.query(`SELECT * FROM customer WHERE email='${email}'`, (error, result) => {
            if (!error) {
                resolve(result);
            } else {
                reject(error);
            }
        });
    });
};

module.exports = {
    getAllCustomer,
    getDetailCustomer,
    createCustomer,
    updateCustomer,
    deleteCustomer,
    findId,
    countData,
    findEmail
}