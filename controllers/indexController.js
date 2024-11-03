const db = require("../db/queries");
const { body, validationResult } = require('express-validator');

function indexGet(req, res) {
    res.render('index', { user: req.user });
}

function joinClubGet(req, res) {
    res.render('joinClub', { user: req.user });
}

const validatePasscode = [
    body('passcode').custom(value => {
        return value === process.env.PASSCODE;
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

module.exports = {
    indexGet,
    joinClubGet,
    joinClubPost
}