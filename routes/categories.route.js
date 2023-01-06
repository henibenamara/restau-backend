const express= require('express');


const { getCategories,getCatByCatSociete,getCatbySoc} =require('../controllers/categories');


const router = express.Router();

router.get('/',getCategories);
router.get('/societe/:codeSoc',getCatbySoc)
router.get('/:codeCateg/societe/:codeSoc',getCatByCatSociete);

module.exports = router;



