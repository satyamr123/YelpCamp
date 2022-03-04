const express = require('express');
const app = express();
const mongoose = require('mongoose')
const path = require('path')
const methodOverride = require('method-override')

const Campground = require('./models/campground')

mongoose.connect('mongodb://localhost:27017/yelp-camp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/makeground', async (req, res) => {
    const camp = new Campground({ title: 'My Backyard', price: '10$', description: 'Cheap Camping', location: 'Garden camps' })
    await camp.save();
    res.send(camp)
})

app.listen(3000, () => {
    console.log('SERVER UP AND RUNNING')
})