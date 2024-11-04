const { body } = require("express-validator");

const validateMembershipPasscode = [
    body('passcode').custom(value => {
        return value === process.env.MEMBERSHIP_PASSCODE;
    }).withMessage("Wrong passcode")
]

const validateCreateMessage = [
    body('title')
        .trim()
        .isLength({ min: 2 }).withMessage("Title must be at least 2 characters")
        .escape(),
    body('message')
        .trim()
        .isLength({ min: 2 }).withMessage("Message must be at least 2 characters")
        .escape()
]

const validateAdminPasscode = [
    body('passcode')
        .custom(value => value === process.env.ADMIN_PASSCODE)
        .withMessage("Wrong passcode")
]

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

const validateLogin = [
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
]

module.exports = {
    validateMembershipPasscode,
    validateCreateMessage,
    validateAdminPasscode,
    validateSignUp,
    validateLogin
}