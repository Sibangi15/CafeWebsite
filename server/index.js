const connectToMongo = require('./db');
var cors = require('cors')

connectToMongo();

const express = require('express')
const app = express()
const port = process.env.PORT || 5000;

app.use(cors({
  origin: ["http://localhost:5173"],
  credentials: true
}));
app.use(express.json())

app.use('/api/auth', require('./routes/auth'))
app.use('/api/menu', require('./routes/menu'))
app.use('/api/order', require('./routes/order'))
app.use("/api/admin", require("./routes/admin"));

app.listen(port, () => {
  console.log(`Cafe app listening on port ${port}`)
})