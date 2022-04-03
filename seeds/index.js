const mongoose = require('mongoose')
const Campground = require('../models/campground')
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')
const axios = require('axios')

mongoose.connect('mongodb://localhost:27017/yelp-camp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })

const sample = array => array[Math.floor(Math.random() * array.length)]

async function seedImg() {
    try {
        const resp = await axios.get('https://api.unsplash.com/photos/random', {
            params: {
                client_id: 'BmFQlnRHNXZViKNPo3FfzaqyQE0rG-cX9Tg7L-0PTeI',
                collections: 1114848,
            },
        })
        return resp.data.urls.small
    } catch (err) {
        console.error(err)
    }
}

const seedDB = async () => {
    await Campground.deleteMany({})
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000)
        const price = Math.floor(Math.random() * 20) + 10
        const camp = new Campground({
            title: `${sample(places)}, ${sample(descriptors)}`,
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            image: await seedImg(),
            description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat quia cupiditate fugiat dolor delectus nam, veniam commodi rerum quam nemo? Voluptatem quibusdam qui pariatur! Magni voluptas dolor qui saepe dignissimos.',
            price
        })
        await camp.save()
    }
}

seedDB().then(() => { console.log('SEEDED!!'); mongoose.connection.close() })