const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    posterId: {
        type: String,
        required: true
    },
    post: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
    },
    likers: {
        type: [String]
    },

},
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Post', postSchema);