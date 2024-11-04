const db = require("../db/queries");
const { validationResult } = require('express-validator');
const {
    validateMembershipPasscode,
    validateCreateMessage,
    validateAdminPasscode
} = require("../middleware/validateFields");

async function indexGet(req, res) {
    const messages = await db.getMessages();
    res.render('index', { user: req.user, messages: messages });
}

function joinClubGet(req, res) {
    res.render('joinClub', { user: req.user });
}


const joinClubPost = [
    validateMembershipPasscode,
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
    res.render("createMessage", { user: req.user });
}

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

async function deleteMessagePost(req, res) {
    const { messageId } = req.params;
    await db.deleteMessage(parseInt(messageId));
    res.redirect("/");
}

module.exports = {
    indexGet,
    joinClubGet,
    joinClubPost,
    createMessageGet,
    createMessagePost,
    deleteMessagePost,
    adminGet,
    adminPost
}