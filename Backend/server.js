require('dotenv').config()
const app = require('./src/app')
const connectionDB = require('./src/db/db')

connectionDB()
app.listen(3000, () => {
    console.log("Server is running on port 3000")
})