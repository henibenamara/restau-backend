const express = require('express');
const app = express();
const cors = require('cors');

const articleRouter = require("./routes/articles.route")
const categorieRouter = require("./routes/categories.route")

app.use(express.json());
app.use(cors());

app.use('/api/articles', articleRouter);

app.use('/api/categorie', categorieRouter);
app.use('/images', express.static('public/images/'));

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 3001;
app.listen(port, () => console.log('Server listening on port ' + port));
