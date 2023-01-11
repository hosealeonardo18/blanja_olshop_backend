const pool = require('../config/db');


const getAllCustomer = () => {
    return pool.query(`SELECT * FROM customer`)
}

const getDetailCustomer = (id) => {
    return pool.query(`SELECT * FROM customer WHERE id_customer=${id}`)
}

const createCustomer = (data) => {
    const {
        name,
        alamat,
        gender,
        tanggal_lahir,
        email,
        password
    } = data

    return pool.query(`INSERT INTO customer(name , alamat, gender, tanggal_lahir , email, password)
    VALUES ('${name}', '${alamat}', '${gender}', '${tanggal_lahir}', '${email}', '${password}')`);
}

const updateCustomer = (data) => {
    const {
        id,
        name,
        alamat,
        gender,
        tanggal_lahir,
        email,
        password
    } = data;

    return pool.query(`UPDATE customer SET name='${name}', alamat='${alamat}', gender='${gender}', tanggal_lahir='${tanggal_lahir}', email='${email}', password='${password}' WHERE id_customer=${id};`)
}

const deleteCustomer = (id) => {
    return pool.query(`DELETE FROM customer WHERE id_customer=${id}`)
}

const findId = (id) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT id_customer FROM customer WHERE id_customer=${id}`, (error, result) => {
            if (!error) {
                resolve(result);
            } else {
                reject(error);
            };
        });
    });
};


module.exports = {
    getAllCustomer,
    getDetailCustomer,
    createCustomer,
    updateCustomer,
    deleteCustomer,
    findId

}