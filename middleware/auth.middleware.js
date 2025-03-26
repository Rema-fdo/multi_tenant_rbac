const jwt = require("jsonwebtoken");
const tenantRepository = require("../repositories/tenant.repositories");

module.exports = async (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }
    const tokenWithoutBearer = token.replace("Bearer ", "");
    try {
        const decodedPayload = jwt.decode(tokenWithoutBearer);
        if (!decodedPayload || !decodedPayload.tenant_id) {
            return res.status(401).json({ message: "Invalid token" });
        }

        const tenant = await tenantRepository.find(decodedPayload.tenant_id);
        if (!tenant) {
            return res.status(401).json({ message: "Tenant not found" });
        }

        const decoded = jwt.verify(tokenWithoutBearer, tenant.signing_secret);
        req.user = decoded; 

        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
    
};
