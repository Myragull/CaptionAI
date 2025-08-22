const express =  require('express') 
const authRoutes = require('./routes/auth.routes')
const captionRoutes = require("./routes/caption.route")
const cookieParser = require('cookie-parser')
const errorMiddleware = require("../src/middlewares/error.middleware")

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use('/api/auth', authRoutes)
app.use('/api/caption',captionRoutes)
app.use(errorMiddleware);

module.exports = app