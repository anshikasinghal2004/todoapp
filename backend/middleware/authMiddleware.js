import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json("No Token");

    try {
        const decoded = jwt.verify(token, "secretkey");
        req.userId = decoded.id;
        next();
    }
    catch {
        res.status(401).json("Invalid token");
    }
};