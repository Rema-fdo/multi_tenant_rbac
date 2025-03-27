const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const userRepository = require("../repositories/user.repositories");
const tenantRepository = require("../repositories/tenant.repositories");
const authHelper = require("../helpers/auth.helpers");

exports.login = async (email, password) => {
    const user = await userRepository.getUserByEmail(email);
    if (!user) throw new Error('Invalid email or password');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid email or password');

    const tenant = await tenantRepository.find(user.tenant_id);
    if (!tenant) throw new Error('Tenant not found');

    const payload = { id: user.id, tenant_id: user.tenant_id, role: user.role };

    const accessToken = await authHelper.generateToken(tenant.signing_secret, payload, "15m");
    const refreshToken = await authHelper.generateToken(tenant.signing_secret, payload, "7d");

    return { accessToken, refreshToken };
};

exports.createUser = async(name, email, password, tenant_id, role) => {
    const user = await userRepository.getUserByEmail(email);
    if (user) throw new Error('User already exists');

    const createUser = await userRepository.createUser(name, email, password, tenant_id, role);

    return{createUser}
};

exports.getUsers = async(tenant_id) => {
    return await userRepository.getUsersByTenantId(tenant_id)

};

exports.getUserById = async (id) => {
    const user = userRepository.getUserById(id);
    if (!user) throw new Error('User does not exists');
    return user
};

exports.refreshToken = async (token) => {
    if (!token) throw new Error("Unauthorized: No token provided");
    
    const decodedPayload = jwt.decode(token);
    if (!decodedPayload || !decodedPayload.tenant_id) throw new Error ("Invalid token");

    const tenant = await tenantRepository.find(decodedPayload.tenant_id);

    const decodedToken = await authHelper.decodeToken(token, tenant.signing_secret);

    const payload = { id: decodedPayload.id, tenant_id: decodedPayload.tenant_id, role: decodedPayload.role };

    const accessToken = await authHelper.generateToken(tenant.signing_secret, payload, "15m");

    return {accessToken}
};