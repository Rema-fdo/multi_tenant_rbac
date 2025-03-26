const tenantRepository = require("../repositories/tenant.repositories");

exports.createTenant = async(name) => {
    return await tenantRepository.createTenant(name);
};