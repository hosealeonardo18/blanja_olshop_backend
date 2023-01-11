const customerModel = require('../model/CustomerModel');
const helperResponse = require('../helper/common');
const {
    Pool
} = require('pg');


const customerController = {
    getAllCustomer: async (req, res) => {
        try {
            let searchParams = req.query.search || "";
            let sortBy = req.query.sortBy || "name";
            let sort = req.query.sort || "ASC";

            const result = await customerModel.getAllCustomer(searchParams, sortBy, sort)

            helperResponse.response(res, result.rows, 200, "Get Data Customer Success!");

        } catch (error) {
            console.log(error);
        }
    },

    getDetailCustomer: async (req, res) => {
        const id = Number(req.params.id)

        const {
            rowCount
        } = await customerModel.getDetailCustomer(id)

        if (!rowCount) {
            return res.json({
                message: 'Data Customer Not Found!'
            })
        }

        customerModel.getDetailCustomer(id).then(result => {
            helperResponse.response(res, result.rows, 200, 'Get Data Success!')
        }).catch(error => {
            res.send(error)
        })
    },

    createCustomer: (req, res) => {
        const {
            name,
            alamat,
            gender,
            tanggal_lahir,
            email,
            password
        } = req.body


        const data = {
            name,
            alamat,
            gender,
            tanggal_lahir,
            email,
            password
        }
        customerModel.createCustomer(data).then(result => {
            helperResponse.response(res, result.rowCount, 201, "Data Customer Created!");
        }).catch(error => {
            res.send(error)
        })
    },

    updateCustomer: async (req, res) => {
        const id = Number(req.params.id);
        const {
            name,
            alamat,
            gender,
            tanggal_lahir,
            email,
            password
        } = req.body;

        const {
            rowCount
        } = await customerModel.findId(id);

        if (!rowCount) {
            res.json({
                message: "Customer Not Found!"
            });
        };

        const data = {
            id,
            name,
            alamat,
            gender,
            tanggal_lahir,
            email,
            password
        };

        customerModel.updateCustomer(data).then(result => {
            helperResponse.response(res, result.rows, 201, "Customer Updated!");
        }).catch(error => {
            res.send(error);
        });
    },

    deleteCustomer: async (req, res) => {

        const id = Number(req.params.id);

        const {
            rowCount
        } = await customerModel.findId(id);

        if (!rowCount) {
            res.json({
                message: "Data Customer Not Found!"
            })
        }

        customerModel.deleteCustomer(id).then(result => {
            helperResponse.response(res, result.rows, 200, "Data Customer Deleted!")
        }).catch(error => {
            res.send(error)
        })


    }
}

module.exports = customerController;