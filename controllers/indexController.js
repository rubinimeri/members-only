const db = require("../db/queries");
const { body, validationResult } = require('express-validator');

async function indexGet(req, res) {
    const messages = await db.getMessages();
    console.log(messages);
    res.render('index', { user: req.user, messages: messages });
}

function joinClubGet(req, res) {
    res.render('joinClub', { user: req.user });
}

const validatePasscode = [
    body('passcode').custom(value => {
        return value === process.env.MEMBERSHIP_PASSCODE;
    }).withMessage("Wrong passcode")
]

const joinClubPost = [
    validatePasscode,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render("joinClub", { errors: errors.array() });
        }
        const { id } = req.user;
        await db.updateMembership(id);
        res.redirect('/');
    }
]

function createMessageGet(req, res) {
    res.render("createMessage");
}

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

const createMessagePost = [
    validateCreateMessage,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render("createMessage", { errors: errors.array() });
        }
        const { id } = req.user;
        const { title, message } = req.body;
        await db.addMessage(title, message, id);
        res.redirect("/");
    }
]

function adminGet(req, res) {
    res.render("admin", { user: req.user, errors: [] });
}

const validateAdminPasscode = [
    body('passcode')
        .custom(value => value === process.env.ADMIN_PASSCODE)
        .withMessage("Wrong passcode")
]

const adminPost = [
    validateAdminPasscode,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render("admin", { user: req.user, errors: errors.array() });
        }
        const { id } = req.user;
        await db.updateAdminPrivilege(id);
        res.redirect("/");
    }
]

module.exports = {
    indexGet,
    joinClubGet,
    joinClubPost,
    createMessageGet,
    createMessagePost,
    adminGet,
    adminPost
}