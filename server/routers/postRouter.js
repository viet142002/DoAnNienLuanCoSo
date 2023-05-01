const Router = require('express').Router();
const auth = require('../middleware/auth');
const postController = require('../controllers/postController');

Router.get('/posts', auth, postController.getPosts);
Router.get('/user_posts/:id', auth, postController.getUserPosts);
Router.post('/posts', auth, postController.createPost);
Router.patch('/post/:id', auth, postController.updatePost);
Router.patch('/post/:id/like', auth, postController.likePost);
Router.patch('/post/:id/unlike', auth, postController.unLike);
Router.delete('/post/:id/delete', auth, postController.deletePost);

module.exports = Router;
