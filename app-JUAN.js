const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;
const htmlRoutes = require('./public/routes/htmlroutes');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use("/", htmlRoutes);

const posts = [];

class Post {
    constructor(username, thoughts) {
        this.username = username;
        this.thoughts = thoughts;
    }
}

const addPost = (username, thoughts) => {
    posts.push(new Post(username, thoughts));
}

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
});

app.get('/api/posts', (req, res) => {
    res.json(posts);
});

app.post('/api/posts', (req, res) => {
    const { username, thoughts } = req.body;
    addPost(username, thoughts);
    res.json({ message: 'Post added' });
});

app.delete('/api/posts', (req, res) => {
    posts.length = 0;
    res.json({ message: 'All posts deleted' });
});