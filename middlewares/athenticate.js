const HttpError = require("../helpers/HttpError");
const jwt = require("jsonwebtoken");
const { User } = require("../schemas/userSchema");

const athenticate = async (req, res, next) => {
    try {
        const { authorization } = req.headers;

        if (!authorization) {
            throw HttpError(401, "Authorization header is missing");
        }

        const [bearer, token] = authorization.split(" ");
        if (bearer !== "Bearer" || !token) {
            throw HttpError(401, "Invalid authorization format");
        }

        const { id } = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findById(id);

        if (!user) {
            throw HttpError(401, "User not found");
        }

        req.user = user; // Додаємо користувача до запиту для подальшого використання
        next();
    } catch (err) {
        next(err);
    }
};

module.exports = athenticate;
