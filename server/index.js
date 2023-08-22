const express = require('express')
const connectDB = require('./Utils/connect')
const app = express()
const bodyParser = require('body-parser');
const cors = require('cors');
const UserRoutes = require('./routes/UserRoutes');
const CanvasRoutes = require('./routes/CanvasRoutes');
const RemarkRoutes = require('./routes/RemarkRoutes');
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
const port = 3000
require('dotenv').config()
connectDB();

app.get('/', (req, res) => {
    res.send('Backend Is live')
})

app.use('/api/user',UserRoutes)
app.use('/api/canvas',CanvasRoutes)
app.use('/api/remark',RemarkRoutes)

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})