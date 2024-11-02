const db = require("../db/queries");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");

const validateSignUp = [
    body("full_name")
        .trim()
        .notEmpty().withMessage("Full name is required")
        .isLength({ min: 2 }).withMessage("Must have at least 2 characters")
        .escape(),
    body("username")
        .trim()
        .notEmpty().withMessage("Username is required")
        .isAlpha().withMessage("Username must only contain letters")
        .isLength({ min: 2 }).withMessage("Username must have at least 2 characters")
        .escape(),
    body("password")
        .notEmpty().withMessage("Password is required")
        .isLength({ min: 5 }).withMessage("Password must have at least 5 characters")
        .trim()
        .escape(),
    body("confirm_password")
        .custom((value, { req }) => {
            return value === req.body.password;
        }).withMessage("Passwords must match")
        .trim()
        .escape()
]

function signUpGet(req, res) {
    res.render("auth/signUp");
}

const signUpPost = [
    validateSignUp,
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).render("auth/signUp", { errors: errors.array() });
            }

            const { full_name, username, password } = req.body;

            const checkUser = await db.getUser(username);
            if (!checkUser) {
                const hashedPassword = await bcrypt.hash(password, 10);
                await db.addUser(full_name, username, hashedPassword);
                return res.redirect("/");
            }

            res.status(409).render("auth/signUp", { errorMessage: "User already exists" });
        } catch (err) {
            console.error(err);
        }
    }
]

module.exports = {
    signUpGet,
    signUpPost,
}