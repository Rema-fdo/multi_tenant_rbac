const bcrypt = require('bcryptjs');
const superAdminRepository = require("../repositories/superAdmin.repositories");


exports.createAdmin = async(name, email, password) => {
    const admin = await superAdminRepository.getAdminByEmail(email);
    if (admin) throw new Error('User already exists');

    const createAdmin = await superAdminRepository.createAdmin(name, email, password);

    return{createAdmin}
};