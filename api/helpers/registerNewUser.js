const User            = require("../../db/schemas/User");
const Credentials     = require("../../db/schemas/Credentials");
const bcrypt          = require("bcrypt");
const saltRounds      = 10;