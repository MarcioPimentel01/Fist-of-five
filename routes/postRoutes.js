const express = require('express');
const postController = require('../controllers/postController');
const router = express.Router();

router.post('/', postController.createPost);
router.get('/', postController.getAllPosts);
router.delete('/:id', postController.deletePost);

module.exports = router;
