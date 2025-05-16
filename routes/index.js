var express = require('express');
var router = express.Router();
const articleController = require('../controllers/articleController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/article');
});
router.get('/article/add', articleController.renderAddForm);
router.post('/article/add', articleController.addArticle);

router.get('/article/:articleId', articleController.displayArticle);
router.get('/article/', articleController.displayArticle);
module.exports = router;
