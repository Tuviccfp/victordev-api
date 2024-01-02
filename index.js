const exp = require('express');
const mong = require('mongoose');
const cors = require('cors');
const Article = require('./models/articles');
require('dotenv').config()
const app = exp();
app.use(cors());
app.use(exp.json());
const acess = process.env.PORT || 3000;

mong.connect(process.env.MONGO_URL).then((result) => {
    console.log({sucess: true, message: 'Connect in mongo.'});
}).catch((err) => {
    console.log({sucess: false, message: err});
});

app.get('/get-articles', async (req, res) => {
    try {
        const get = await Article.find({}).populate(['titulo', 'short_description', 'createdAt']).sort({ createdAt: -1});
        res.status(200).json(get)
    } catch (error) {
        res.status(500).json({sucess: false, message: error});
    }
});

app.get('/get-articles/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const getArticleById = await Article.findById(id);
        if(!getArticleById) {
            return res.status(404).json({sucess: false, message: 'Cannot locate id.'});
        }
        res.status(200).json(getArticleById);
    } catch (error) {
        res.status(500).json({sucess: false, message: error});
    }
});

app.post('/post-articles', async (req, res) => {
    const { titulo, short_description, author, post } = req.body;
    try {
        const newArticle = new Article({
            titulo,
            short_description,
            author,
            post,
        })    
        await newArticle.save()
        res.status(201).json({sucess: true, newArticle: newArticle});
    } catch (error) {
        res.status(500).json({sucess: false, message: error});
    }
});

app.listen(acess, () => {
    console.log(`Server listening in port ${acess}`);
});