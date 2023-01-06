const { article } = require('../models');
const db = require("../models");
 const Article = db.article;


const getArticles = async (req, res) => {
    try {
        const art = await db.sequelize.query(`select CodeArt, LibArt, Descrip, CodeCat, prix1, imagepath from article `);

        res.status(200).json(art[0]);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
const getartByCat = async (req, res) => {
  let codeart = req.params.codeart;
    try {
        const art = await db.sequelize.query(`select * from article where CodeCat ="${codeart}"order by codeart` );
             res.status(200).json(art[0]);
         } catch (error) {
             res.status(404).json({ message: error.message });
         }
}
const getArticlesByCodeSocieteAndCodeCateg = async (req, res) => {
    let codeSoc = req.params.codeSoc;
  let codeCateg = req.params.codeCateg

    try {

        const artcat = await db.sequelize.query(`select * from article where CodeCat in (select CodeCat from categorie where CodeCat=${codeCateg}) and sel=(select sel from societe where code="${codeSoc}")`);

        res.status(200).json(artcat);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
////////////////////////////H-E-N-I///////////////////////////////

const creerArticle = async (req, res) => {

    var data = req.body;
  

    console.log('----------------------------');
    console.log(data);
   
    try {
        const art = await db.sequelize.query(
            "INSERT INTO article (CodeArt, LibArt, abrev, CodeCat, unite) VALUES (?, ?, ?, ?, ?);",
            { replacements: [data.CodeArt, data.LibArt, data.abrev, data.CodeCat, data.unite] }
          );
          if (!data.CodeArt || !data.LibArt || !data.abrev || !data.CodeCat || !data.unite) {
            return res.status(400).json({ error: "Missing required fields" });
          }


          return res.status(201).json({ message: "article creer avec succees" });
    } catch (erreur) {
        return res.status(500).json({ erreur })
    }
};

///////////////////////////////////////////////////////////




const getArticleByID = async (req, res) => {
    try {

   const art = await Article.findByPk(req.params.id);

        res.status(200).json(art);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

 const createArticle = async (req, res) => {


    const newArticle = new Article(req.body)

    try {
        await newArticle.save();
        const art = await Article.findByPk(newArticle.CodeArt);

        res.status(200).json(art );
    } catch (error) {
        console.log(error)
       res.status(409).json({ message: error.message });

    }
}

 const updateArticle= async (req, res) => {
    const { id } = req.params;

    try {
   const art1= await Article.update(req.body,{
    where:{CodeArt:id}
   });
   const art = await Article.findByPk(art1.CodeArt);

   res.status(200).json(art);
} catch (error) {
    console.log(error)
   res.status(409).json({ message: error.message });

}
}

 const deleteArticle = async (req, res) => {
    const { id } = req.params;

    const art = await getarticle(id);
    await art.destroy();



    res.json({ message:  `${art.CodeArt} est supprimé` });
}
async function  getarticle(id){
    const article = await Article.findByPk(id);
    if (!article) throw 'article not found';
    return article;
}
module.exports = {
    creerArticle,
    getArticles,
    getartByCat,
    getArticleByID,
    createArticle,
    updateArticle,
    deleteArticle,
    getArticlesByCodeSocieteAndCodeCateg
}
