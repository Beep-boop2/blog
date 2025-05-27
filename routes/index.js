var express = require('express');
var router = express.Router();
const articleController = require('../controllers/articleController');
const commentController = require('../controllers/commentController');
const userController = require('../controllers/userController');
const ensureUserAuthenticated = require('../middleware/ensureUserAuthenticated.js');
const userHasRole = require('../middleware/userHasRole');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/article');
});
router.get('/article/add', ensureUserAuthenticated, userHasRole('author'), articleController.renderAddForm);
router.post('/article/add', ensureUserAuthenticated, userHasRole('author'), articleController.addArticle);

router.get('/article/:articleId', articleController.displayArticle);
router.get('/article/', articleController.displayAll);
router.get('/article/:articleId/edit', ensureUserAuthenticated, userHasRole('author'), articleController.renderEditForm);
router.post('/article/:articleId/edit', ensureUserAuthenticated, userHasRole('author'), articleController.updateArticle);
router.get('/article/:articleId/delete', ensureUserAuthenticated, articleController.deleteArticle);

router.post('/article/:articleId/comment/create', commentController.createComment);
router.post('/comment/:commentId/reply/create', commentController.addReply);

router.get('/register', userController.renderRegistrationForm);
router.post('/register', userController.register);

router.get('/login', userController.renderLogin);
router.post('/login', userController.login);
router.get('/logout', userController.logout);


router.get('/comment/:commentId/delete', ensureUserAuthenticated, userHasRole('admin'), commentController.deleteComment);
router.get('/comment/:commentId/reply/:replyId/delete', ensureUserAuthenticated, userHasRole('admin'), commentController.deleteReply);
module.exports = router;
