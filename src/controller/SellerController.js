const sellerModel = require('../model/SellerModel');
const helperResonse = require('../helper/common');

const sellerController = {
    getAllSeller: async (req, res) => {
        try {
            let searchParams = req.query.search || "";
            let sortBy = req.query.sortBy || "name";
            let sort = req.query.sort || 'ASC';

            const result = await sellerModel.getAllSeller(searchParams, sortBy, sort);

            helperResonse.response(res, result.rows, 200, "Get Data Seller Success!");
        } catch (error) {
            console.log(error);
        }
    },

    getDetailSeller: async (req, res) => {
        const id = Number(req.params.id);

        const {
            rowCount
        } = await sellerModel.findId(id);

        if (!rowCount) {
            res.json({
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
            name,
            alamat,
            gender,
            tanggal_lahir,
            email,
            password
        } = req.body;

        const data = {
            name,
            alamat,
            gender,
            tanggal_lahir,
            email,
            password
        }

        sellerModel.createSeller(data).then(result => {
            helperResonse.response(res, result.rows, 201, "Data Seller Created")
        }).catch(error => {
            res.send(error)
        })

    },

    updateSeller: async (req, res) => {
        const id = Number(req.params.id);
        const {
            name,
            alamat,
            gender,
            tanggal_lahir,
            email,
            password
        } = req.body

        const {
            rowCount
        } = await sellerModel.findId(id)

        if (!rowCount) {
            res.json({
                message: "Seller Not Found!"
            });
        }

        const data = {
            id,
            name,
            alamat,
            gender,
            tanggal_lahir,
            email,
            password
        }

        sellerModel.updateSeller(data).then(result => {
            helperResonse.response(res, result.rows, 201, "Data Seller Updated!");
        }).catch(error => {
            res.send(error);
        })
    },

    deleteSeller: async (req, res) => {

        const id = Number(req.params.id);
        const {
            rowCount
        } = await sellerModel.findId(id)

        if (!rowCount) {
            res.json({
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