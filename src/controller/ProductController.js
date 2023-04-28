const productModel = require('../model/ProductModel');
const sellerModel = require('../model/SellerModel');
const helperResponse = require('../helper/common');
const { v4: uuidv4 } = require('uuid');
const { uploadPhotoCloudinary, deletePhotoCloudinary } = require('../../cloudinary')
const moment = require('moment');

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
		const role = req.payload.role;

		if (role !== 'seller') return res.status(401).json({ message: 'Sorry, you are not a seller!' });

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
		} = req.body;

		const id = uuidv4();

		const upload = await uploadPhotoCloudinary(req.file.path)

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
			rating: 0,
			review: "",
			photo: upload.secure_url || url,
			created_at: moment(Date.now()).format('DD-MM-YYYY')
		};

		return productModel.createProduct(data).then((result) => {
			helperResponse.response(res, result.rows, 201, 'Data Product Created!');
		}).catch((error) => {
			console.log(error);
			res.send(error);
		});
	},

	updateProduct: async (req, res) => {
		const id = req.params.id;
		const role = req.payload.role;
		if (role !== 'seller') return res.json({ message: 'Sorry, you are not a seller!' });

		const { rowCount } = await productModel.findId(id);
		if (!rowCount) return res.json({ message: 'Data Product Not Found!' });

		const email = req.payload.email;
		const {
			rows: [seller],
		} = await sellerModel.findEmail(email);

		const { rows: [cekUser] } = await productModel.getDetailProduct(id)

		// split Url image
		const nameImage = cekUser?.photo.split("/")[7]?.split(".")[0];

		const { id_categories, name, price, size, color, stock, description } = req.body;

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
			rating: 0,
			review: "",
			updated_at: moment(Date.now()).format('DD-MM-YYYY')
		};

		if (req.file) {
			await deletePhotoCloudinary(nameImage)
			const upload = await uploadPhotoCloudinary(req.file.path)
			data.photo = upload.secure_url || url
		} else {
			data.photo = cekUser.photo;
		}

		return productModel.updateProduct(data).then((result) => {
			helperResponse.response(res, result.rows, 201, 'Data Product Updated!');
		})
			.catch((error) => {
				console.log(error);
				res.send(error);
			});
	},

	deleteProduct: async (req, res) => {
		const id = req.params.id;
		// const role = req.payload.role;

		// if (role !== 'seller') return res.json({ message: 'Sorry, you are not a seller!' });

		const { rowCount } = await productModel.findId(id);
		if (!rowCount) return res.json({ message: 'Data Product Not Found' });

		const { rows: [cekUser] } = await productModel.getDetailProduct(id)

		if (cekUser.photo.length > 0) {
			const nameImage = cekUser?.photo.split("/")[7]?.split(".")[0];
			await deletePhotoCloudinary(nameImage)
		}

		productModel.deleteProduct(id).then((result) => {
			helperResponse.response(res, result.rows, 200, 'Product Deleted!');
		}).catch((error) => {
			res.send(error);
		});
	},
};

module.exports = productController;
