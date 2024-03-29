const sellerModel = require('../model/SellerModel');
const helperResonse = require('../helper/common');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const authHelper = require('../helper/AuthHelper');
const jwt = require('jsonwebtoken');


const sellerController = {
	// get Seller
	getAllSeller: async (req, res) => {
		try {
			const page = Number(req.query.page) || 1;
			const limit = Number(req.query.limit) || 5;
			const offset = (page - 1) * limit;
			let searchParams = req.query.search || "";
			let sortBy = req.query.sortBy || "name";
			let sort = req.query.sort || 'ASC';

			const result = await sellerModel.getAllSeller(searchParams, sortBy, sort, limit, offset);

			const { rows: [count] } = await sellerModel.countData();

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

	// get detail seller
	getDetailSeller: async (req, res) => {
		const id = req.params.id;
		const { rowCount } = await sellerModel.findId(id);

		if (!rowCount) return res.json({ message: "Data Seller Not Found!" })

		sellerModel.getDetailSeller(id).then(result => {
			helperResonse.response(res, result.rows, 200, "Get Data Success!")
		}).catch(error => {
			res.send(error)
		})
	},

	// update data Seller
	updateSeller: async (req, res) => {
		const id = req.params.id;
		const {
			fullname,
			address,
			gender,
			date_of_birthday,
			email,
			password,
			store_name
		} = req.body;

		const { rowCount } = await sellerModel.findId(id);

		if (!rowCount) return res.json({ message: "Seller Not Found!" });

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
			role: 'seller',
			store_name,
		};

		sellerModel.updateSeller(data).then(result => {
			helperResonse.response(res, result.rows, 201, "Data Seller Updated!");
		}).catch(error => {
			res.send(error);
		})
	},

	// delete data seller
	deleteSeller: async (req, res) => {
		const id = req.params.id;
		const { rowCount } = await sellerModel.findId(id);

		if (!rowCount) return res.json({ message: "Data Seller Not Found" });

		sellerModel.deleteSeller(id).then(result => {
			helperResonse.response(res, result.rows, 201, "Data Seller Deteled!");
		}).catch(error => {
			res.send(error)
		})
	},

	// auth register seller
	registerSeller: async (req, res) => {
		const {
			fullname,
			address,
			gender,
			date_of_birthday,
			email,
			password,
			store_name
		} = await req.body;

		const { rowCount } = await sellerModel.findEmail(email);

		if (rowCount) return res.json({ message: "Email already use!" })

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
			role: 'seller',
			store_name
		}

		sellerModel.createSeller(data).then(result => {
			helperResonse.response(res, result.rows, 201, "Data Seller Created")
		}).catch(error => {
			res.send(error)
		})
	},

	// auth login seller
	loginSeller: async (req, res) => {
		try {
			const { email, password } = req.body;
			const { rows: [seller] } = await sellerModel.findEmail(email);

			if (!seller) return res.status(401).json({ message: "Email Not Register!" });

			const validatePassword = bcrypt.compareSync(password, seller.password);
			if (!validatePassword) return res.status(403).json({ message: "Password Incorrect!" });

			delete seller.password;
			delete seller.address;
			delete seller.gender;
			delete seller.date_of_birthday;
			delete seller.id_seller;

			let payload = {
				email: seller.email,
				role: seller.role
			}

			seller.token = authHelper.generateToken(payload);
			seller.refreshToken = authHelper.generateRefreshToken(payload);

			helperResonse.response(res, seller, 201, "Login Successfull!");
		} catch (error) {
			res.status(401).send({
				message: error.message
			})
		}
	},

	// auth refresh token seller
	refreshToken: (req, res) => {
		try {
			const refreshToken = req.body.refreshToken;
			let decode = jwt.verify(refreshToken, process.env.SECRETE_KEY_JWT);

			const payload = {
				email: decode.email,
				role: decode.role
			};

			const result = {
				token: authHelper.generateToken(payload),
				refreshToken: authHelper.generateRefreshToken(payload)
			};

			helperResonse.response(res, result, 200)
		} catch (error) {
			console.log(error);
		}
	},

	// auth profile seller
	profileSeller: async (req, res) => {
		const email = req.payload.email;
		const { rows: [seller] } = await sellerModel.findEmail(email);

		delete seller.password;
		helperResonse.response(res, seller, 200);
	}
}

module.exports = sellerController;