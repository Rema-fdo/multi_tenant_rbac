require("dotenv").config();
const bcrypt = require('bcryptjs');
const superAdminRepository = require("../repositories/superAdmin.repositories");
const authHelper = require("../helpers/auth.helpers");

exports.createAdmin = async(name, email, password) => {
    const admin = await superAdminRepository.getAdminByEmail(email);
    if (admin) throw new Error('User already exists');

    const createAdmin = await superAdminRepository.createAdmin(name, email, password);

    return{createAdmin}
};

exports.login = async (email, password) => {
    const admin = await superAdminRepository.getAdminByEmail(email);
    if (!admin) throw new Error('Invalid email or password');

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) throw new Error('Invalid email or password');

    const payload = {id: admin.id, email: admin.email, role: "super_admin"}

    const accessToken = await authHelper.generateToken(process.env.SECRET_KEY, payload, "15m");
    const refreshToken = await authHelper.generateToken(process.env.SECRET_KEY, payload, "7d");

    return { accessToken, refreshToken };
};

exports.refreshToken = async(refreshToken) => {
    if (!refreshToken) throw new Error('Refresh Token required');
    const decoded = await authHelper.decodeToken(refreshToken, process.env.SECRET_KEY);
    
    const { email } = decoded;

    const admin = await superAdminRepository.getAdminByEmail(email);
    if (!admin) throw new Error('Admin not found');

    const payload = {id: admin.id, email: admin.email, role: "super_admin"}

    const accessToken = await authHelper.generateToken(process.env.SECRET_KEY, payload, "15m");
    return {accessToken}
}