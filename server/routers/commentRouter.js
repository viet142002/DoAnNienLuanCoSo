const Router = require('express').Router();
const auth = require('../middleware/auth');
const commentController = require('../controllers/commentController');

Router.post('/comment', auth, commentController.createComment);
Router.patch('/comment/:id', auth, commentController.editComment);
Router.patch('/comment/:id/like', auth, commentController.likeComment);
Router.patch('/comment/:id/unlike', auth, commentController.unLikeComment);
Router.delete('/comment/:id', auth, commentController.deleteComment);

module.exports = Router;
