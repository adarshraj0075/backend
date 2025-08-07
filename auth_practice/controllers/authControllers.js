const argon2 = require(argon2);
const db=require("../models");
const jwt=require("jsonwebtoken");
const dotenv=require("dotenv");
dotenv.config();

const jwt_password=process.env.JWT_PASSWORD;

const signUp = asy