import jwt from 'jsonwebtoken';

// 1. Authentication Middleware
// Verifies the JWT is valid and not expired
export const authenticateToken = (req, res, next) => {
  // Get the header: "Authorization: Bearer <token>"
  const authHeader = req.headers['authorization'];
  
  // Split 'Bearer' and the token, return undefined if missing
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: "Access Denied: No Token Provided" });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET || 'dev_secret_key', (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Access Denied: Invalid Token" });
    }

    // Success: Attach the decoded payload to the request object
    // req.user now contains { id, username, role, permissions: [] }
    req.user = user; 
    next();
  });
};

// 2. Authorization Middleware (Factory Function)
// Checks if the user has a specific permission
export const authorizePermission = (requiredPermission) => {
  return (req, res, next) => {
    // Ensure the user was authenticated first
    if (!req.user) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const userPermissions = req.user.permissions || [];

    if (!userPermissions.includes(requiredPermission)) {
      return res.status(403).json({ 
        error: "Forbidden: You do not have permission to perform this action",
        required: requiredPermission
      });
    }

    next();
  };
};