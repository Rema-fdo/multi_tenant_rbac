const SuperAdmin = require("../models/superAdmin");

exports.createAdmin = async (name, email, password) => {
    const admin = await SuperAdmin.create({ name, email, password});
    const { password: _, ...adminWithoutPassword } = admin.toJSON();
    return await adminWithoutPassword;
}

exports.getAdminByEmail = async (email) => {
    return await SuperAdmin.findOne({ where: { email } });
}