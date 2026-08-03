import jwt from "jsonwebtoken";

const isAuth = (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            console.log("Token not found");

            return res.status(401).json({
                message: "Token is not found"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.userId = decoded.userId;

        next();
    } catch (error) {
        console.log("Authentication error:", error.message);

        return res.status(401).json({
            message: "Token expired or invalid"
        });
    }
};

export default isAuth;