const connectToMongo = require('./db');
var cors = require('cors')

connectToMongo();

const express = require('express')
const app = express()
const port = 5000

app.use(cors())
app.use(express.json())

app.use('/api/auth', require('./routes/auth'))
app.use('/api/menu', require('./routes/menu'))
app.use('/api/order', require('./routes/order'))

app.listen(port, () => {
  console.log(`iNotebook app listening on port ${port}`)
})