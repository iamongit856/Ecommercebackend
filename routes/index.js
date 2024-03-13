const express = require("express")
const router = express.Router()
const mssql = require("mssql") // Change sql to mssql here
const axios = require('axios');

// config for your database
var pool
const config = {
    user: 'vijay_Ecommerce_user',
    password: '7l#92R2uz',
    server: '38.242.197.161',
    database: 'Ecommerce',
    options: {
        encrypt: false,
        enableArithAbort: true,
    },
};

// connect to your database
async function cons() {
    try {
        pool = await mssql.connect(config); // Change sql to mssql here
        console.log("Connection done")
    } catch (error) {
        console.log("Connection Error")
    }
}

cons()

//  Login
router.route("/login").post(async (req, res) => {
    let { email, password } = req.body;
    try {
        
        let result = await pool.request()
            .input('email', mssql.VarChar, email)
            .input('password', mssql.VarChar, password)
            .query('select * from logintable where email=@email and password=@password');
        return res.status(200).json(result);
    } catch (err) {
        res.status(500).json({
            msg: "Login Error Check Credentials"
        });
    }
});

module.exports = router
