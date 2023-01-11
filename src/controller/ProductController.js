const productModel = require('../model/ProductModel');
const helperResponse = require('../helper/common');

const productController = {
    getAllProduct: async (req, res) => {
        const {
            rowCount
        } = await productModel.getAllProduct();

        if (!rowCount) {
            res.json({
                message: "Product Not Found"
            })
        }

        productModel.getAllProduct().then(result => {
            helperResponse.response(res, result.rows, 200, "Get Data Success!")
        }).catch(error => {
            res.send(error);
        })
    },

    getDetailProduct: async (req, res) => {
        const id = Number(req.params.id);

        const {
            rowCount
        } = await productModel.findId(id);

        if (!rowCount) {
            res.json({
                message: "Data Product Not Found!"
            })
        }

        productModel.getDetailProduct(id).then(result => {
            helperResponse.response(res, result.rows, 200, "Get Data By Id Success!");
        }).catch(error => {
            res.send(error);
        })
    },

    createProduct: (req, res) => {
        const {
            id_seller,
            id_categories,
            name,
            price,
            size,
            color,
            stock,
            deskripsi,
            rating,
            ulasan
        } = req.body

        const data = {
            id_seller,
            id_categories,
            name,
            price,
            size,
            color,
            stock,
            deskripsi,
            rating,
            ulasan
        }

        productModel.createProduct(data).then(result => {
            helperResponse.response(res, result.rows, 201, "Data Product Created!");
        }).catch(error => {
            res.send(error);
        })
    },

    updateProduct: async (req, res) => {
        const id = Number(req.params.id);
        const {
            rowCount
        } = await productModel.findId(id)

        if (!rowCount) {
            res.json({
                message: "Data Product Not Found!"
            });
        }

        const {
            id_seller,
            id_categories,
            name,
            price,
            size,
            color,
            stock,
            deskripsi,
            rating,
            ulasan
        } = req.body

        const data = {
            id,
            id_seller,
            id_categories,
            name,
            price,
            size,
            color,
            stock,
            deskripsi,
            rating,
            ulasan
        }

        productModel.updateProduct(data).then(result => {
            helperResponse.response(res, result.rows, 201, "Data Product Updated!")
        }).catch(error => {
            res.send(error)
        })


    },

    deleteProduct: async (req, res) => {
        const id = Number(req.params.id);
        const {
            rowCount
        } = await productModel.findId(id);

        if (!rowCount) {
            res.json({
                message: "Data Product Not Found"
            })
        }

        productModel.deleteProduct(id).then(result => {
            helperResponse.response(res, result.rows, 200, "Product Deleted!")
        }).catch(error => {
            res.send(error)
        })
    }
}

module.exports = productController;