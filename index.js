const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const db = require('./config');
var bodyParser = require('body-parser');



mongoose.connect(db.mongoURI, { useNewUrlParser: true })
.then(() => console.log('connected'))
.catch(err => console.log(err))

const Member = mongoose.model('Member', {
    first_name: String,
    last_name: String,
    degree: String,
    sig: String,
    year: String
})


app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
   
})

app.get('/success', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'success.html'))
   
})

app.post('/success', (req,res) => {
    const newMember = new Member({
        first_name: req.body.fname,
        last_name: req.body.lname,
        degree: req.body.degree,
        sig: req.body.sig,
        year: req.body.year
    })

   newMember.save()
   res.redirect('/success')
   
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server listening on port ${PORT}`))