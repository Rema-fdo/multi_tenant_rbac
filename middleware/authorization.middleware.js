const rolePermissions = {
    "/user:post": { "roles": ["admin", "super_admin"] },
    "/users:get": { "roles": ["admin", "super_admin"] },
    "/profile:get": { "roles": ["user"] },
    "/profile/:id:get": { "roles": ["admin"] },
    "/tenant:post": { "roles": ["super_admin"] },
    "/tenants/:id/access:post": { "roles": ["super_admin"] }
};
  
module.exports = (req, res, next) => {
    try {
      const userRole = req.role; 
      console.log(userRole)
      if (!userRole) {
        return res.status(403).json({ message: "Forbidden: No role assigned" });
      }
  
      const endpointKey = `${req.baseUrl}${req.route.path}:${req.method.toLowerCase()}`;
      console.log(endpointKey)
  
      const allowedRoles = rolePermissions[endpointKey]?.roles || [];
      console.log(allowedRoles)
      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({ message: "Forbidden: Insufficient permissions" });
      }
  
      next();
    } catch (error) {
      return res.status(500).json({ message: "Authorization Error: " + error.message });
    }
};
  