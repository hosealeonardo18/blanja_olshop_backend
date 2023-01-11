const categoriesModel = require('../model/CategoriesModel');
const helperResponse = require('../helper/common');
const {
    Pool
} = require('pg');

let categoriesController = {
    getAllCategories: async (req, res) => {
        try {
            const {
                rowCount
            } = await categoriesModel.selectAllCategories();

            if (!rowCount) {
                res.json({
                    message: "Product Not Found"
                })
            }

            categoriesModel.selectAllCategories().then(result => {
                helperResponse.response(res, result.rows, 200, "Get Data Success!")
            }).catch(error => {
                res.send(error)
            })



        } catch (error) {
            console.log(error);
        }

    },

    getDetailCategories: async (req, res) => {
        const id = Number(req.params.id);
        const {
            rowCount
        } = await categoriesModel.selectDetailCategories(id)

        if (!rowCount) {
            res.json({
                message: `Data Not Found!`
            })
        }

        categoriesModel.selectDetailCategories(id).then(result => {
            helperResponse.response(res, result.rows[0], 200, "Get Data Success");
        }).catch(error => {
            res.send(error);
        })
    },

    createCategories: async (req, res) => {
        const {
            name
        } = req.body;

        let data = {
            name
        }

        categoriesModel.createCategories(data).then(result => {
            helperResponse.response(res, result.rowCount, 201, "Categories Created!")
        }).catch(error => res.send(error))

    },

    updateCategories: async (req, res) => {
        const id = Number(req.params.id)
        const {
            name
        } = req.body;

        const {
            rowCount
        } = await categoriesModel.findId(id);

        if (!rowCount) {
            return res.json({
                message: 'Product Not Found!'
            })
        }

        let data = {
            id,
            name,
        }

        categoriesModel.updateCategories(data).then(result => {
            helperResponse.response(res, result.rows, 201, "Categories Updated!")
        }).catch(error => res.send(error));
    },

    deteleCategories: async (req, res) => {
        try {
            const id = Number(req.params.id);
            const {
                rowCount
            } = await categoriesModel.findId(id);

            if (!rowCount) {
                res.json({
                    message: "Data Not Found!"
                })
            }

            categoriesModel.deleteCategories(id).then(result => {
                helperResponse.response(res, result.rows, 200, "Product Deleted!")
            })

        } catch (error) {
            console.log(error);
        }
    }
};

module.exports = categoriesController;