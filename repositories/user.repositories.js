const User = require("../models/user");

exports.getUserByEmail = async (email) => {
    return await User.findOne({ where: { email } });
}

exports.createUser = async (name, email, password, tenant_id, role) => {
    const user = await User.create({ name, email, password, tenant_id, role });
    const { password: _, ...userWithoutPassword } = user.toJSON();
    return await userWithoutPassword;
}

exports.getUsersByTenantId = async(tenant_id)=>{
    return await User.findAll({ where: { tenant_id } });
}

exports.getUserById = async (id) => {
    return await User.findOne({
        where: { id },
        attributes: { exclude: ["password"] },
    });
};

exports.getUserByIdAndTenantID = async (user_id, tenant_id) => {
    return await User.findOne({ where: { id: user_id, tenant_id } });
};

exports.updateUserRefreshToken = async (userId, refreshToken) => {
    return await User.update({ refreshToken }, { where: { id: userId } });
};

exports.findByRefreshToken = async (refreshToken) => {
        return await User.findOne({ where: { refreshToken } });
};