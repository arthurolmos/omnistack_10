const axios = require('axios')
const Dev = require('../models/Dev')

const parseStringAsArray = require('../utils/parseStringAsArray')

module.exports = {

    index: async (req, res) => {
        const devs = await Dev.find()

        return res.json(devs)
    },

    store: async (req, res) => {
    
        const { github_username, techs, latitude, longitude } = req.body
        
        let dev = await Dev.findOne({ github_username }) //Método do Model do Mongo para procurar registro
        console.log(dev)
        
        if(dev) return res.status(404).send('Dev já cadastrado!')

        let response 
        
        try {
            response = await axios.get(`https://api.github.com/users/${github_username}`)
        } catch (error) {
            return res.json(error)
        }

        const { name = login, avatar_url, bio } = response.data
    
        const techsArray = parseStringAsArray(techs)
    
        const location = {
            type: 'Point',
            coordinates: [longitude, latitude]
        }
    
        dev = await Dev.create({
            github_username,
            name,
            avatar_url,
            bio,
            techs: techsArray,
            location
        })

    
        return res.json(dev)
    },

    update: async (req, res) => {

        const { github_username } = req.body

        if(github_username === '') return
        
        const dev = await Dev.findOne({github_username: github_username})
        
        if(!dev) return res.send('User not found!')

        const { name, bio, techs } = req.body
        
        if(name !== '')
            dev.name = name

        if(bio !== '')
            dev.bio = bio

        if(techs != '') {
            const techsArray = parseStringAsArray(techs)
            dev.techs = techsArray
        }

        await dev.save()

        return res.json(dev)
    },

    destroy: async(req, res) => {
        console.log(req.body)

        const { github_username } = req.body
        console.log(github_username)

        if(github_username === '') return
        
        const dev = await Dev.deleteOne({github_username: github_username})
        console.log(dev)
        
        return res.json(dev)
    }
}