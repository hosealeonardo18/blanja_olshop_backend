const customerModel = require('../model/CustomerModel');
const helperResponse = require('../helper/common');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const authHelper = require('../helper/AuthHelper');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const { uploadPhotoCloudinary, deletePhotoCloudinary } = require('../../cloudinary')


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
			const { rows: [count] } = await customerModel.countData();

			const { rows: [cekUser] } = result
			delete cekUser.password;

			const totalData = parseInt(count.count);
			const totalPage = Math.ceil(totalData / limit);
			const pagination = {
				currentPage: page,
				limit: limit,
				totalData: totalData,
				totalPage: totalPage
			}

			return helperResponse.response(res, result.rows, 200, "Get Data Customer Success!", pagination);
		} catch (error) {
			console.log(error);
		}
	},

	getDetailCustomer: async (req, res) => {
		const id = req.params.id;
		const { rowCount } = await customerModel.getDetailCustomer(id);

		if (!rowCount) return res.json({ message: 'Data Customer Not Found!' });

		customerModel.getDetailCustomer(id).then(result => {
			helperResponse.response(res, result.rows, 200, 'Get Data Success!');
		}).catch(error => {
			res.send(error);
		})
	},

	updateCustomer: async (req, res) => {
		const id = req.params.id;
		const {
			fullname,
			address,
			phone_number,
			gender,
			date_of_birthday,
			email,
			password,
		} = req.body;

		const { rowCount } = await customerModel.findId(id);

		if (!rowCount) return res.json({ message: "Customer Not Found!" });

		const salt = bcrypt.genSaltSync(10);
		const passHash = bcrypt.hashSync(password, salt);

		const data = {
			id,
			fullname,
			address,
			phone_number,
			gender,
			date_of_birthday: moment(date_of_birthday).format('DD-MM-YYYY'),
			email,
			password: passHash,
			role: 'customer',
		};

		const { rows: [cekPhoto] } = await customerModel.getDetailCustomer(id)
		const nameImage = cekPhoto?.image.split("/")[7]?.split(".")[0];

		if (req.file) {
			if (cekPhoto?.image) {
				await deletePhotoCloudinary(nameImage)
				const upload = await uploadPhotoCloudinary(req.file.path)
				data.image = upload.secure_url || url
			} else {
				const upload = await uploadPhotoCloudinary(req.file.path)
				data.image = upload.secure_url || url
			}
		} else {
			data.image = cekPhoto.image;
		}

		return customerModel.updateCustomer(data).then(result => {
			helperResponse.response(res, result.rows, 201, "Customer Updated!");
		}).catch(error => {
			res.send(error);
		});
	},

	deleteCustomer: async (req, res) => {
		const id = req.params.id;
		const { rowCount } = await customerModel.findId(id);

		if (!rowCount) return res.json({ message: "Data Customer Not Found!" })

		const { rows: [cekPhoto] } = await customerModel.getDetailCustomer(id)
		const nameImage = cekPhoto?.image.split("/")[7]?.split(".")[0];

		if (cekPhoto.image) {
			await deletePhotoCloudinary(nameImage)
		}

		return customerModel.deleteCustomer(id).then(result => {
			helperResponse.response(res, result.rows, 200, "Data Customer Deleted!")
		}).catch(error => {
			res.send(error)
		})
	},

	registerCustomer: async (req, res) => {
		try {
			const {
				fullname,
				gender,
				email,
				password,
			} = req.body

			const { rowCount } = await customerModel.findEmail(email);
			if (rowCount) return res.json({ message: "Email already use!" })

			const salt = bcrypt.genSaltSync(10);
			const passHash = bcrypt.hashSync(password, salt);
			const id = uuidv4();

			const data = {
				id,
				fullname,
				gender,
				email,
				password: passHash,
				role: 'customer'
			}

			return customerModel.registerCustomer(data).then(result => {
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
			const { email, password } = req.body;
			const { rows: [cekUser] } = await customerModel.findEmail(email);

			if (!cekUser) return res.json({ message: "Email Not Register!" });

			const validatePassword = bcrypt.compareSync(password, cekUser.password);
			if (!validatePassword) return res.json({ message: "Password Incorect" });

			delete cekUser.password;
			delete cekUser.address;
			delete cekUser.gender;
			delete cekUser.date_of_birthday;
			delete cekUser.id_customer;

			let payload = {
				email: cekUser.email,
				role: cekUser.role
			}

			cekUser.token = authHelper.generateToken(payload);
			cekUser.refreshToken = authHelper.generateRefreshToken(payload)

			return helperResponse.response(res, cekUser, 201, "Login Successfull")
		} catch (error) {
			console.log(error);
		}
	},

	refreshTokenCustomer: (req, res) => {
		try {
			const { refreshToken } = req.body;
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
			const { rows: [cekUser] } = await customerModel.findEmail(email);

			delete cekUser.password

			return helperResponse.response(res, cekUser, 200, "Get Profile Success!");
		} catch (error) {
			console.log(error);
		}
	}

}

module.exports = customerController;