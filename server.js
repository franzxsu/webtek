const express = require('express')
const path = require('path')
const app = express()
const port = 3000

app.set('view engine', 'ejs')

app.use('/scripts', express.static(path.join(__dirname, 'scripts')))

app.get('/', (req, res) => {
  res.render("../views/index.php")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  console.log(`http://localhost:${port}/`)
})  

app.get('/login', (req, res) => {
    res.render('../views/login.php')
    res.send('naklik jay login')
  })