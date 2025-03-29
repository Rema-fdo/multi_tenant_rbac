const jwt = require("jsonwebtoken");
const tenantRepository = require("../repositories/tenant.repositories");
const userRepository = require("../repositories/user.repositories");
const superAdminRepository = require("../repositories/superAdmin.repositories")
const authHelpers = require("../helpers/auth.helpers");

module.exports = async (req, res, next) => {
    try {
    const token = req.header("Authorization");
    const tenant_id = req.header("TenantId");

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }
    const tokenWithoutBearer = token.replace("Bearer ", "");
    
        let secret= null
        if (tenant_id) {
            const tenant = await tenantRepository.find(tenant_id);
            if (tenant) {
                secret = tenant.signing_secret;
                req.tenant = tenant;
            } else {
                return res.status(401).json({ message: "Unauthorized: Invalid TenantId" });
            }
        }
        else {
            secret= process.env.SECRET_KEY
        }
        const decodedToken = await authHelpers.decodeToken(tokenWithoutBearer, secret);
        if (!decodedToken){
            return res.status(401).json({ message: "Unauthorized: Invalid token" });
        }
        let user = null
        if (decodedToken.role == "super_admin"){
            user = await superAdminRepository.getAdminbyId(decodedToken.id)
        }
        else {
            user = await userRepository.getUserById(decodedToken.id)
        }
        req.user = user
        req.role = decodedToken.role;

        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized: " + error.message });
    }
    
};
