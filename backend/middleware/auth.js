import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
    const { token } = req.headers;
    
    if (!token) {
        // 401 Unauthorized: The client failed to provide credentials
        return res.status(401).json({ success: false, message: "Not Authorized. Login Again." });
    }

    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        // 403 Forbidden: The token is invalid or expired
        console.error("JWT Verification Error:", error.message);
        return res.status(403).json({ success: false, message: "Invalid or expired token." });
    }
};

export default authMiddleware;