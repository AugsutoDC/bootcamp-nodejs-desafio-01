const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

app.use(express.urlencoded({ extended: false })) // diz para o express q usaremos informações q estarão no corpo, informações do html
app.set('view engine', 'njk')

const checkAgeMiddlewares = (req, res, next) => {
  const { age } = req.query
  if (!age) {
    return res.redirect('/')
  }

  return next()
}

app.get('/', (req, res) => {
  return res.render('form')
})

app.get('/major', checkAgeMiddlewares, (req, res) => {
  const { age } = req.query
  return res.render('major', { age })
})

app.get('/minor', checkAgeMiddlewares, (req, res) => {
  const { age } = req.query
  return res.render('minor', { age })
})

app.post('/check', (req, res) => {
  if (req.body.age >= 18) return res.redirect(`major?age=${req.body.age}`)
  else return res.redirect(`minor?age=${req.body.age}`)
})

app.listen(3000)
