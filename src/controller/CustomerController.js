const customerModel = require('../model/CustomerModel');
const helperResponse = require('../helper/common');
const bcrypt = require('bcryptjs');
const {
    v4: uuidv4
} = require('uuid');
const authHelper = require('../helper/AuthHelper');
const jwt = require('jsonwebtoken');


const customerController = {
    getAllCustomer: async (req, res) => {
        try {
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 5;
            const offset = (page - 1) * limit;
            let searchParams = req.query.search || "";
            let sortBy = req.query.sortBy || "fullname";
            let sort = req.query.sort || "ASC";

            const result = await customerModel.getAllCustomer(searchParams, sortBy, sort, limit, offset)

            const {
                rows: [count]
            } = await customerModel.countData();

            const totalData = parseInt(count.count);
            const totalPage = Math.ceil(totalData / limit);
            const pagination = {
                currentPage: page,
                limit: limit,
                totalData: totalData,
                totalPage: totalPage
            }

            helperResponse.response(res, result.rows, 200, "Get Data Customer Success!", pagination);
        } catch (error) {
            console.log(error);
        }
    },

    getDetailCustomer: async (req, res) => {
        const id = req.params.id

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

    updateCustomer: async (req, res) => {
        const id = req.params.id;
        const {
            fullname,
            address,
            gender,
            date_of_birthday,
            email,
            password,
        } = req.body;

        const {
            rowCount
        } = await customerModel.findId(id);

        if (!rowCount) {
            return res.json({
                message: "Customer Not Found!"
            });
        }

        const salt = bcrypt.genSaltSync(10);
        const passHash = bcrypt.hashSync(password, salt);

        const data = {
            id,
            fullname,
            address,
            gender,
            date_of_birthday,
            email,
            password: passHash,
            role: 'customer'
        };

        customerModel.updateCustomer(data).then(result => {
            helperResponse.response(res, result.rows, 201, "Customer Updated!");
        }).catch(error => {
            res.send(error);
        });
    },

    deleteCustomer: async (req, res) => {

        const id = req.params.id;

        const {
            rowCount
        } = await customerModel.findId(id);

        if (!rowCount) {
            return res.json({
                message: "Data Customer Not Found!"
            })
        }

        customerModel.deleteCustomer(id).then(result => {
            helperResponse.response(res, result.rows, 200, "Data Customer Deleted!")
        }).catch(error => {
            res.send(error)
        })
    },

    registerCustomer: async (req, res) => {
        try {
            const {
                fullname,
                address,
                gender,
                date_of_birthday,
                email,
                password,
            } = req.body

            const {
                rowCount
            } = await customerModel.findEmail(email);

            if (rowCount) {
                res.json({
                    message: "Email already use!"
                })
            }

            const salt = bcrypt.genSaltSync(10);
            const passHash = bcrypt.hashSync(password, salt);
            const id = uuidv4();

            const data = {
                id,
                fullname,
                address,
                gender,
                date_of_birthday,
                email,
                password: passHash,
                role: 'customer'
            }

            customerModel.registerCustomer(data).then(result => {
                helperResponse.response(res, result.rows, 201, "Register Customer Success!");
            }).catch(error => {
                res.send(error)
            })

        } catch (error) {
            console.log(error);
        }
    },

    loginCustomer: async (req, res) => {
        try {
            const {
                email,
                password
            } = req.body

            const {
                rows: [categories]
            } = await customerModel.findEmail(email)

            if (!categories) {
                return res.json({
                    message: "Email Not Register!"
                })
            }

            const validatePassword = bcrypt.compareSync(password, categories.password);
            if (!validatePassword) {
                return res.json({
                    message: "Password Incorect"
                })
            }

            delete categories.password;
            delete categories.address;
            delete categories.gender;
            delete categories.date_of_birthday;
            delete categories.id_customer;

            let payload = {
                email: categories.email,
                role: categories.role
            }

            categories.token = authHelper.generateToken(payload);
            categories.refreshToken = authHelper.generateRefreshToken(payload)

            helperResponse.response(res, categories, 201, "Login Successfull")

        } catch (error) {
            console.log(error);
        }
    },

    refreshTokenCustomer: (req, res) => {
        try {
            const {
                refreshToken
            } = req.body;

            let decode = jwt.verify(refreshToken, process.env.SECRETE_KEY_JWT);

            const payload = {
                email: decode.email,
                role: decode.role
            }

            const result = {
                token: authHelper.generateToken(payload),
                refreshToken: authHelper.generateRefreshToken(payload)
            }
            helperResponse.response(res, result, 200)

        } catch (error) {
            console.log(error);
        }
    },

    profileCustomer: async (req, res) => {
        try {
            const email = req.payload.email
            const {
                rows: [categories]
            } = await customerModel.findEmail(email);

            delete categories.password

            helperResponse.response(res, categories, 200);
        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = customerController;