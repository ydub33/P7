const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const postCtrl = require('../controllers/post');

router.post('/', auth, multer, postCtrl.createPost);
router.patch('/:id', auth, multer, postCtrl.modifyPost);
router.get('/', auth, postCtrl.getAllPosts);
router.get('/:id', auth, postCtrl.getPost);
router.delete('/:id', auth, postCtrl.deletePost);

router.patch('/like/:id/:pid', postCtrl.likePost);
router.patch('/unlike/:id/:pid', auth, postCtrl.unlikePost);

module.exports = router; 