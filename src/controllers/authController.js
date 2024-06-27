const UserModel = require("../models/userModel")
const bcryp = require('bcrypt')
const asyncHandle = require('express-async-handler')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const getJsonWebToken = async (email, id) => {
    const payload = {
        email,
        id,
    };
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: '7d',
    });

    return token;
};

const register = asyncHandle(async (req, res) => {
    const { email, fullname, password } = (req.body)

    const exitstingUser = await UserModel.findOne({ email });
    if (exitstingUser) {
        res.status(401)
        throw new Error('User has already exits!!')
    }

    const salt = await bcryp.genSalt(10)
    const hashPassword = await bcryp.hash(password, salt)

    const newUser = new UserModel({
        email,
        fullname: fullname ?? '',
        password: hashPassword
    })
    await newUser.save()

    res.status(200).json({
        message: "Register new user successfully",
        data: {
            ...newUser,
            accesstoken: await getJsonWebToken(email, newUser.id)
        },
    });
})
module.exports = {
    register,
}