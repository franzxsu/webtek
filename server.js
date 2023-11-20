const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.render("../views/index.ejs")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  console.log(`http://localhost:${port}/`)
})  

app.get('/login', (req, res) => {
    res.send('naklik jay login')
  })