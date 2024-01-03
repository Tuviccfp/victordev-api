const mong = require('mongoose');

const articlesSchema = new mong.Schema({
    titulo: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    short_description: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    post: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mong.model('Articles', articlesSchema);