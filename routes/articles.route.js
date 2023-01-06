const express= require('express');

//import  upload from '../middleware/uploadProvider.js';
const { getArticles, getArticleByID,getartByCat, createArticle, updateArticle, deleteArticle,getArticlesByCodeSocieteAndCodeCateg, creerArticle } =require('../controllers/articles');


const router = express.Router();
router.get('/',getArticles);
router.post('/',creerArticle);
router.get('/:codeart',getartByCat)

module.exports = router;
