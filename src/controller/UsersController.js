const usersModel = require('../model/UsersModel');
const helperResponse = require('../helper/common');
const bcrypt = require('bcryptjs');
const {
  v4: uuidv4
} = require('uuid');
const authHelper = require('../helper/AuthHelper');
const jwt = require('jsonwebtoken');

const usersController = {

  register: async (req, res) => {
    try {
      const {
        fullname,
        email,
        password
      } = req.body;

      const {
        rowCount
      } = await usersModel.findEmail(email);

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
        email,
        password: passHash,
        role: "user"
      }

      usersModel.createUser(data).then(result => {
        helperResponse.response(res, result.rows, 200, "Register Success!")
      })
    } catch (error) {
      console.log(error);
    }
  },

  login: async (req, res) => {
    const {
      email,
      password
    } = req.body

    const {
      rows: [user]
    } = await usersModel.findEmail(email);

    if (!user) {
      return res.json({
        message: "Email Not Register!"
      })
    }

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.json({
        message: "Password Incorrect!"
      })
    }

    delete user.password
    let payload = {
      email: user.email,
      role: user.role
    }

    user.token = authHelper.generateToken(payload);
    user.refreshToken = authHelper.generateRefreshToken(payload);
    helperResponse.response(res, user, 201, "Login Successfull!")
  },

  refreshToken: (req, res) => {
    const refreshToken = req.body.refreshToken;
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
  },

  profile: async (req, res) => {
    const email = req.payload.email
    const {
      rows: [user]
    } = await usersModel.findEmail(email)

    delete user.password
    helperResponse.response(res, user, 200)
  }
}

module.exports = usersController