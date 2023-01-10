const categoriesModel = require('../model/CategoriesModel');
const helperResponse = require('../helper/common');

let categoriesController = {
    getAllCategories: async (req, res) => {
        try {
            const result = await categoriesModel.selectAllCategories();
            helperResponse.response(res, result.rows, 200, "Get Data Success!")
            res.send(result)
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

    createCategories: (req, res) => {
        const {
            name
        } = req.body;


    }
};

module.exports = categoriesController;