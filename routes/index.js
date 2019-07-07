const express = require('express');
const router = express.Router();
const authController = require('../controller/authentication');
const suggestionBoardController = require('../controller/populate');
const searchController = require('../controller/search');
const jwtChecker = require('../middleware/jwtchecker.js');

router.get('/', (req, res, next) => { 
   res.json('functional')
})

//public
router.post('/createuser', authController.create_user);
router.post('/validateuser', authController.validate_user);

//private
router.get('/suggestionboard', jwtChecker.jwtVerify , suggestionBoardController.suggestion_board);
router.post('/newsuggestion', jwtChecker.jwtVerify, suggestionBoardController.new_suggestion);
router.post('/deletesuggestion/:id', jwtChecker.jwtVerify, suggestionBoardController.delete_suggestion);
router.get('/searchcategory', jwtChecker.jwtVerify, searchController.search_suggestion_category);


module.exports = router;