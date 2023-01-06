
const { categorie } = require('../models');
const db=require('../models')
Categorie=db.categorie

const getCategories = async (req, res) => {
    try {
        const cat = await Categorie.findAll()

        res.status(200).json(cat);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getCatByCatSociete = async (req, res) => {
    let codeCateg = req.params.codeCateg;
    let codeSoc = req.params.codeSoc;
    try {

        const soc = await db.sequelize.query(`select * from categorie where CodeCat=${codeCateg} and sel=(select sel from societe where code="${codeSoc}")`);

             res.status(200).json(soc[0]);
         } catch (error) {
             res.status(404).json({ message: error.message });
         }
}

const getCatbySoc = async (req, res) => {
    let codeSoc = req.params.codeSoc;
    try {

        const cat = await db.sequelize.query(`select * from categorie where sel=(select sel from societe where Code="${codeSoc}")`);
            console.log(cat)
             res.status(200).json(cat[0]);
         } catch (error) {
             res.status(404).json({ message: error.message });
         }
}


module.exports = {
    getCategories,
    getCatByCatSociete,
    getCatbySoc
}
