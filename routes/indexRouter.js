const { Router } = require('express');
const indexController = require('../controllers/indexController');

const indexRouter = Router();

indexRouter.get('/', indexController.indexGet);
indexRouter.get('/join-club', indexController.joinClubGet);
indexRouter.post("/join-club", indexController.joinClubPost);

module.exports = indexRouter;