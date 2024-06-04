const express = require('express');
const exphbs  = require('express-handlebars');
const app = express();

// Setup handlebars engine
app.engine('.hbs', exphbs.engine({ extname: '.hbs', defaultLayout: "main"}));
app.set('view engine', 'handlebars');

// Route for rendering a view
app.get('/', (req, res) => {
    res.render('index');
});

// Route for REST API endpoint
app.get('/api/status', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'REST API is up and running' });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
