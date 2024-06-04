const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001

app.use(express.static('./public'));
app.use(express.json());

const users = ['juan','andres','jackie'];

const addUser = (username) => {
    users.push(...username)
}


app.listen(PORT, () => {
console.log(`running on port ${PORT}`)});

app.get("/",(req,res) => { res.sendFile(`${__dirname}/index.html`)} )

app.get('/api/users',(req,res) => {
    res.json(users)
});

app.delete('/',(req,res) => {
    
    console.log('delete request received')
})

app.post('/api/users', (req,res) => {
 //grab input
 const {username}  = req.body
    console.log(username)
 //add user
 addUser(username)
 //output confirmation
 res.json({message: 'user added'})
})