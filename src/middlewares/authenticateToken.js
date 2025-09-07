import jwt from 'jsonwebtoken'; // gọi jwt
import { account_roles } from '../constants/constants';

const authenticateToken = (req, res, next) => {
    console.log(req.method, req.path);
    const openRoutes = ['/auth', '/product', '/category', '/order', '/file', '/public'];
    const adminRoutes = ['/admin'];
    // Kiểm tra nếu route không cần token thì cho qua
    if (openRoutes.some(route => req.path.includes('/api/v1' + route))) {
        return next();
    }

    try {
        const authorization = req.headers['authorization'];

        if (authorization) {
            const token = authorization.split(' ')[1];

            if (token) {
                const secretKey = process.env.ACCESS_TOKEN_SECRET_KEY;

                jwt.verify(token, secretKey, (err, user) => {
                    if (err) {
                        console.log("Token invalid");
                        return res.status(401).send({ message: "Unauthorized" }); // Token không hợp lệ
                    }
                    if (
                        adminRoutes.some(route => req.path.includes(`/api/v1/${route}`)) &&
                        ![account_roles.ADMIN, account_roles.SUPER_ADMIN].includes(user.role)
                    ) {
                        return res.status(403).send({ message: "Unauthorized, admin only" });
                    }
                    req.user = user;
                    return next();
                });
            } else {
                // Trường hợp token không tồn tại sau "Bearer "
                console.log("Token not provided");
                return res.status(401).send({ message: "Unauthorized, token not provided" });
            }
        } else {
            // Trường hợp không có authorization header
            console.log("No authorization header");
            return res.status(401).send({ message: "Unauthorized, no authorization header" });
        }
    } catch (error) {
        console.log("Authentication error: ", error.getMessage());
        return res.status(500).send({ message: "Unauthorized due to error" });
    }
};

export default authenticateToken;