const Tenant = require("../models/tenant");
const crypto = require("crypto");

exports.find = async (id) => {
    return await Tenant.findOne({ where: { id } });
}

exports.createTenant =async (name)=> {
    return await Tenant.create({ name,
        signing_secret: crypto.randomBytes(32).toString("hex")
     });
}