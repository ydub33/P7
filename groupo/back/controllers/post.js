const fs = require('fs');
const Post = require('../models/Post');

// Créer une post
exports.createPost = async (req, res) => {
    console.log(req.body)
    const { post } = req.body
    if (!post) {
        return res.status(400).json({ message: 'Missing data' })
    }
    try {
        //Création d'un post
        const newPost = new Post({
            posterId: req.user,
            name : req.user,
            post: req.body.post,
            imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
            likers: []
        })
        let data = await newPost.save()
        return res.json({ message: 'Post créé', data: data })
    } catch (err) {       
        return res.status(500).json({ err })
    }
}
// Modifier un post
exports.modifyPost = (req, res) => {
    if (req.file) {
        Post.findOne({ _id: req.params.id })
            .then(post => {

                // Supprime l'ancienne image
                const filename = post.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    const postObject = {
                        post: req.body.post,
                        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                    }
                    Post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
                        .then(() => res.status(200).json({ message: 'Post modifié !' }))
                        .catch(err => res.status(400).json({ err }));
                })
            })
            .catch(error => res.status(500).json({ error }));
    } else {
        const postObject = { ...req.body };
        Post.findOne({ _id: req.params.id })
            .then(post => {
                Post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Post modifié!' }))
                    .catch(error => res.status(401).json({ error }));
            })
            .catch((error) => {
                res.status(400).json({ error });
            });
    }
};

//Suppression d'un post
exports.deletePost = (req, res) => {
    console.log(req.user)
    Post.findOne({ _id: req.params.id })
        .then(post => {
            // Supprime l'image
            const filename = post.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Post.deleteOne({ _id: req.params.id })
                    .then(() => { res.status(200).json({ message: 'Post supprimé !' }) })
                    .catch(error => res.status(401).json({ error }));
            });
        })
        .catch(error => {
            res.status(500).json({ message: 'Erreur serveur', error });
        });
};

// Posts existants
exports.getAllPosts = (req, res, next) => {
    Post.find().sort({ createdAt: -1 })
        .then((posts) => res.status(200).json(posts))
        .catch(error => res.status(400).json({ error: error }))
}
//Afficher un seul post
exports.getPost = (req, res) => {
    Post.findOne({ _id: req.params.id })
        .then((post) => res.status(200).json(post))
        .catch(error => res.status(500).json({ error }));
};

// Like utilisateur
exports.likePost = async (req, res) => {
    try {
        let post = await Post.findOne({ _id: req.params.id })
        post.likers.push(req.params.pid)

        await Post.updateOne(
            { _id: req.params.id },
            { likers: post.likers },
            { _id: req.params.id }
        )

        return res.send({ message: "Post liked" });
    } catch (err) {
        return res.status(500).send(err);
    }
};
// Dislike utilisateur
exports.unlikePost = async (req, res) => {
    try {
        let post = await Post.findOne({ _id: req.params.id })
        post.likers = post.likers.filter(pid => pid !== req.params.pid)

        await Post.updateOne(
            { _id: req.params.id },
            { likers: post.likers },
            { _id: req.params.id }
        )

        return res.send({ message: "Post liked" });
    } catch (err) {
        return res.status(500).send(err);
    }
};