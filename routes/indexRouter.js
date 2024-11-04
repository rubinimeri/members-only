const { Router } = require('express');
const indexController = require('../controllers/indexController');

const indexRouter = Router();

indexRouter.get('/', indexController.indexGet);
indexRouter.get('/join-club', indexController.joinClubGet);
indexRouter.get("/create-message", indexController.createMessageGet);
indexRouter.get("/admin", indexController.adminGet);
indexRouter.post("/join-club", indexController.joinClubPost);
indexRouter.post("/create-message", indexController.createMessagePost);
indexRouter.post("/admin", indexController.adminPost);

module.exports = indexRouter;