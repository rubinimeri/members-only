const db = require("../db/queries");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const { validateSignUp, validateLogin } = require("../middleware/validateFields");
const passport = require("../strategies/localStrategy");

function signUpGet(req, res) {
    res.render("auth/signUp");
}

const signUpPost = [
    validateSignUp,
    async (req, res, next) => {
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
                const user = await db.getUser(username);
                return req.login(user, (err) => {
                    if (err) return next(err);
                    return res.redirect("/");
                })
            }

            res.status(409).render("auth/signUp", { errorMessage: "User already exists" });
        } catch (err) {
            console.error(err);
        }
    }
]

function loginGet(req, res) {
    res.render("auth/login");
}

const loginPost = [
    validateLogin,
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render("auth/login", { errors: errors.array() });
        }
        next()
    },
    passport.authenticate("local", { successRedirect: "/" })
]

function logoutPost(req, res, next) {
    req.logout((err) => {
        if (err) return next(err);
        res.redirect("/");
    });
}

module.exports = {
    signUpGet,
    signUpPost,
    loginGet,
    loginPost,
    logoutPost
}