const tenantRepository = require("../repositories/tenant.repositories");
const userRepository = require("../repositories/user.repositories")
exports.createTenant = async(name) => {
    return await tenantRepository.createTenant(name);
};

exports.manageTenantAccess = async(tenant_id, user_id, role) => {
    const tenant = await tenantRepository.find(tenant_id);
    if (!tenant) throw new Error("Tenant not found");
    const user = await userRepository.getUserByIdAndTenantID(user_id, tenant_id);
    if (!user) throw new Error("User not found in this tenant");
    if (role) {
        user.role = role;
        await user.save();
    }
    return { message: `User ${user_id} updated successfully in Tenant ${tenant_id}` };
}