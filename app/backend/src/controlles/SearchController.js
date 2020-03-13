const axios = require('axios')
const Dev = require('../models/Dev')

const parseStringAsArray = require('../utils/parseStringAsArray')

module.exports = {
    async index (req, res) {
        const { latitude, longitude, techs} = req.query

        const techsArray = parseStringAsArray(techs)

        const devs = await Dev.find({
            techs: {
                $in: techsArray
            },
            location: { //Filtro de localização, usando near para procurar até 10km diametro de proximidade
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [ longitude, latitude ]
                    },
                    $maxDistance: 10000
                }
            }
        })

        return res.json({devs: [] })
    }
}