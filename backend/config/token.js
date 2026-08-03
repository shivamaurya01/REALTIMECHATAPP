import jwt from "jsonwebtoken";

const genToken = async(userId) => {
    try {
        const token =await jwt.sign(
            {userId},
            process.env.JWT_SECRET,
            { expiresIn: "2d" }
        ) 
        return token;
    } catch (error) {
        console.error("gen token error:", error);
    }
};

export default genToken;