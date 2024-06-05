const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001

//set environment variables 

//give application access to the public folder for static components of app

app.use(express.static('./public'));
app.use(express.json());

//created logic for a post and storage for the posts

const posts = []

class post {
 constructor(username,thoughts){
 this.username = username,
 this.thoughts = thoughts
}

//fucntion to create a new post with provided information

}
const addPosts = (username,thoughts) => {
    posts.push(new post(username,thoughts))
}

//show what port it is listening on
app.listen(PORT, () => {
console.log(`running on port ${PORT}`)});

//get route for index files

app.get("/",(req,res) => { res.sendFile(`${__dirname}/index.html`)} )

//get route for the posts API

app.get('/api/posts',(req,res) => {
    res.json(posts)
});

//create logic for deleting posts

app.delete('/',(req,res) => {
    
    console.log('delete request received')
})

//route to update posts database

app.post('/api/posts', (req,res) => {
 //grab input
 const {username,thoughts}  = req.body
 console.log(username,thoughts)
 //add user
 addPosts(username,thoughts)
 //output confirmation
 res.json({message: 'user added'})
})