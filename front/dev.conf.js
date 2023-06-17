require('dotenv').config({path:'../.env'})

module.exports = {
    API_SERVICE_URL: process.env.API_SERVICE_URL || 'http://localhost:3001'
}
