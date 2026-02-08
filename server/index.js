var cors = require('cors')
const express = require('express')
const connectToMongo = require('./db');

const app = express()
connectToMongo();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: "https://cafewebsite-frontend.onrender.com",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "auth-token"]
}));

app.use(express.json())

app.use('/api/auth', require('./routes/auth'))
app.use('/api/menu', require('./routes/menu'))
app.use('/api/order', require('./routes/order'))
app.use("/api/admin", require("./routes/admin"));

app.listen(port, () => {
  console.log(`Cafe app listening on port ${port}`)
})