const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      // Verificar que el usuario ya pasó por authMiddleware
      if (!req.user) {
        return res.status(401).json({
          message: "Authentication required",
        });
      }

      // Verificar si el rol está autorizado
      if (!allowedRoles.includes(req.user.rol)) {
        return res.status(403).json({
          message: `Access denied. Role ${req.user.rol} is not allowed to perform this action.`,
        });
      }

      next();
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };
};

module.exports = authorize;
