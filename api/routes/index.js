var express = require('express');
var router = express.Router();

var ctrlPost = require('../controllers/post');
var ctrlAuthor = require('../controllers/author');

router.get('/posts', ctrlPost.getPosts);
router.get('/post/:postid', ctrlPost.getPost);
router.post('/post', ctrlPost.createPost);
router.put('/post/:postid', ctrlPost.updatePost);
router.delete('/post/:postid', ctrlPost.deletePost);

router.get('/authors', ctrlAuthor.getAuthors);
router.get('/author/:authorid', ctrlAuthor.getAuthor);
router.post('/author', ctrlAuthor.createAuthor);
// router.put('/author:authorid', ctrlAuthor.updateAuthor);
router.delete('/author/:authorid', ctrlAuthor.deleteAuthor);

module.exports = router;