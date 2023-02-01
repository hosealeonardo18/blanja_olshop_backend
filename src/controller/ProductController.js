const productModel = require('../model/ProductModel');
const sellerModel = require('../model/SellerModel');
const helperResponse = require('../helper/common');
const { v4: uuidv4 } = require('uuid');

const productController = {
	getAllProduct: async (req, res) => {
		try {
			const page = Number(req.query.page) || 1;
			const limit = Number(req.query.limit) || 10;
			const offset = (page - 1) * limit;
			let searchParams = req.query.search || '';
			let sortBy = req.query.sortBy || 'name';
			let sort = req.query.sort || 'ASC';

			const result = await productModel.getAllProduct(searchParams, sortBy, sort, limit, offset);

			const { rows: [count] } = await productModel.countData();

			const totalData = parseInt(count.count);
			const totalPage = Math.ceil(totalData / limit);
			const pagination = {
				currentPage: page,
				limit: limit,
				totalData: totalData,
				totalPage: totalPage,
			};

			helperResponse.response(res, result.rows, 200, 'Get Product Success!', pagination);
		} catch (error) {
			console.log(error);
		}
	},

	getDetailProduct: async (req, res) => {
		const id = req.params.id;
		const { rowCount } = await productModel.findId(id);

		if (!rowCount) return res.json({ message: 'Data Product Not Found!' });

		productModel.getDetailProduct(id).then((result) => {
			helperResponse.response(res, result.rows, 200, 'Get Data By Id Success!');
		}).catch((error) => {
			res.send(error);
		});
	},

	createProduct: async (req, res) => {
		const photo = req.file.filename;
		const PORT = process.env.PORT || 4000;
		const HOST = process.env.PGHOST || 'localhost';
		const role = req.payload.role;

		if (role !== 'seller') return res.json({ message: 'Sorry, you are not a seller!' });

		const email = req.payload.email;
		const { rows: [seller] } = await sellerModel.findEmail(email);

		const {
			id_categories,
			name,
			price,
			size,
			color,
			stock,
			description,
			rating,
			review } = req.body;

		const id = uuidv4();

		const data = {
			id,
			id_seller: seller.id_seller,
			id_categories,
			name,
			price,
			size,
			color,
			stock,
			description,
			rating,
			review,
			photo: `http://localhost:${PORT}/img/${photo}`
		};

		productModel.createProduct(data).then((result) => {
			helperResponse.response(res, result.rows, 201, 'Data Product Created!');
		}).catch((error) => {
			res.send(error);
		});
	},

	updateProduct: async (req, res) => {
		const photo = req.file.filename;
		const id = req.params.id;
		const PORT = process.env.PORT || 5000;
		const HOST = process.env.PGHOST || 'localhost';

		const role = req.payload.role;

		if (role !== 'seller') return res.json({ message: 'Sorry, you are not a seller!' });

		const { rowCount } = await productModel.findId(id);
		if (!rowCount) return res.json({ message: 'Data Product Not Found!' });

		const email = req.payload.email;
		const {
			rows: [seller],
		} = await sellerModel.findEmail(email);

		const { id_categories, name, price, size, color, stock, description, rating, review } = req.body;

		const data = {
			id,
			id_seller: seller.id_seller,
			id_categories,
			name,
			price,
			size,
			color,
			stock,
			description,
			rating,
			review,
			photo: `http://${HOST}:${PORT}/img/${photo}`,
		};

		productModel
			.updateProduct(data)
			.then((result) => {
				helperResponse.response(res, result.rows, 201, 'Data Product Updated!');
			})
			.catch((error) => {
				res.send(error);
			});
	},

	deleteProduct: async (req, res) => {
		const id = req.params.id;
		const role = req.payload.role;

		if (role !== 'seller') return res.json({ message: 'Sorry, you are not a seller!' });

		const { rowCount } = await productModel.findId(id);
		if (!rowCount) return res.json({ message: 'Data Product Not Found' });


		productModel.deleteProduct(id).then((result) => {
			helperResponse.response(res, result.rows, 200, 'Product Deleted!');
		}).catch((error) => {
			res.send(error);
		});
	},
};

module.exports = productController;
