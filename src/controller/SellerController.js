const sellerModel = require('../model/SellerModel');
const helperResonse = require('../helper/common');
const bcrypt = require('bcryptjs');
const {
    v4: uuidv4
} = require('uuid');


const sellerController = {
    getAllSeller: async (req, res) => {
        try {
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 5;
            const offset = (page - 1) * limit;
            let searchParams = req.query.search || "";
            let sortBy = req.query.sortBy || "name";
            let sort = req.query.sort || 'ASC';

            const result = await sellerModel.getAllSeller(searchParams, sortBy, sort, limit, offset);

            const {
                rows: [count]
            } = await sellerModel.countData();

            const totalData = parseInt(count.count);
            const totalPage = Math.ceil(totalData / limit)
            const pagination = {
                currentPage: page,
                limit: limit,
                totalData: totalData,
                totalPage: totalPage
            }

            helperResonse.response(res, result.rows, 200, "Get Data Seller Success!", pagination);
        } catch (error) {
            console.log(error);
        }
    },

    getDetailSeller: async (req, res) => {
        const id = req.params.id;

        const {
            rowCount
        } = await sellerModel.findId(id);

        if (!rowCount) {
            return res.json({
                message: "Data Seller Not Found!"
            })
        }

        sellerModel.getDetailSeller(id).then(result => {
            helperResonse.response(res, result.rows, 200, "Get Data Success!")
        }).catch(error => {
            res.send(error)
        })

    },

    createSeller: async (req, res) => {
        const {
            fullname,
            address,
            gender,
            date_of_birthday,
            email,
            password,
            role
        } = req.body;

        const {
            rowCount
        } = await sellerModel.findEmail(email);

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
            role
        }

        sellerModel.createSeller(data).then(result => {
            helperResonse.response(res, result.rows, 201, "Data Seller Created")
        }).catch(error => {
            res.send(error)
        })

    },

    updateSeller: async (req, res) => {
        const id = req.params.id;
        const {
            fullname,
            address,
            gender,
            date_of_birthday,
            email,
            password,
            role
        } = req.body

        console.log(fullname,
            address,
            gender,
            date_of_birthday,
            email,
            password,
            role);

        const {
            rowCount
        } = await sellerModel.findId(id)

        if (!rowCount) {
            return res.json({
                message: "Seller Not Found!"
            });
        }

        const data = {
            id,
            fullname,
            address,
            gender,
            date_of_birthday,
            email,
            password,
            role
        }

        sellerModel.updateSeller(data).then(result => {
            helperResonse.response(res, result.rows, 201, "Data Seller Updated!");
        }).catch(error => {
            res.send(error);
        })
    },

    deleteSeller: async (req, res) => {

        const id = req.params.id;
        const {
            rowCount
        } = await sellerModel.findId(id)

        if (!rowCount) {
            return res.json({
                message: "Data Seller Not Found"
            });
        }

        sellerModel.deleteSeller(id).then(result => {
            helperResonse.response(res, result.rows, 201, "Data Seller Deteled!");
        }).catch(error => {
            res.send(error)
        })


    }
}

module.exports = sellerController;