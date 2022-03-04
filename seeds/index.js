const mongoose = require('mongoose')
const Campground = require('../models/campground')

mongoose.connect('mongodb://localhost:27017/yelp-camp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })

const seedDB = async () => {
    await Campground.deleteMany({})
    const c = new Campground({ title: 'Purple land' })
    await c.save()
}

seedDB().then(() => { console.log('Deleting Everything') })